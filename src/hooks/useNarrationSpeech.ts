import type { NarrationWordEntry } from 'components/calculator/narration/OfferNarration'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

type UseNarrationSpeechParams = {
  wordEntries: NarrationWordEntry[]
  voicePreference?: string
  locale?: string
  rate?: number
  pitch?: number
  volume?: number
  onWordBoundary?: (wordIndex: number) => void
  onPlaybackFinished?: () => void
  onPlaybackStarted?: () => void
}

type UseNarrationSpeechResult = {
  isSupported: boolean
  isPlaying: boolean
  selectedVoice: SpeechSynthesisVoice | null
  playFrom: (startIndex: number) => boolean
  stop: () => void
  availableVoices: SpeechSynthesisVoice[]
  hasReliableBoundaries: boolean
  lastBoundaryAt: number | null
}

const DEFAULT_LOCALE = 'pl-PL'
const DEFAULT_VOICE_PREFERENCE = 'Zosia'

const hasSpeechSupport = () =>
  typeof window !== 'undefined' && typeof window.speechSynthesis !== 'undefined'

export function useNarrationSpeech({
  wordEntries,
  voicePreference = DEFAULT_VOICE_PREFERENCE,
  locale = DEFAULT_LOCALE,
  rate = 1,
  pitch = 1,
  volume = 1,
  onWordBoundary,
  onPlaybackFinished,
  onPlaybackStarted,
}: UseNarrationSpeechParams): UseNarrationSpeechResult {
  const isSupported = hasSpeechSupport()

  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([])
  const [isPlaying, setIsPlaying] = useState(false)

  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null)
  const startIndexRef = useRef(0)
  const boundariesRef = useRef<number[]>([])
  const stopRequestedRef = useRef(false)
  const lastDeliveredIndexRef = useRef<number | null>(null)
  const boundarySequenceRef = useRef(0)
  const lastBoundaryCharIndexRef = useRef<number | null>(null)
  const [hasReliableBoundaries, setHasReliableBoundaries] = useState(false)
  const [lastBoundaryAt, setLastBoundaryAt] = useState<number | null>(null)

  const cleanupUtterance = useCallback(() => {
    utteranceRef.current = null
    boundariesRef.current = []
    lastDeliveredIndexRef.current = null
  }, [])

  // Load available voices (async in some browsers)
  useEffect(() => {
    if (!isSupported) return
    const synth = window.speechSynthesis

    const handleVoicesChanged = () => {
      setVoices(synth.getVoices())
    }

    handleVoicesChanged()

    if (typeof synth.addEventListener === 'function') {
      synth.addEventListener('voiceschanged', handleVoicesChanged)
      return () => synth.removeEventListener('voiceschanged', handleVoicesChanged)
    }

    const previousHandler = synth.onvoiceschanged
    synth.onvoiceschanged = handleVoicesChanged

    return () => {
      if (synth.onvoiceschanged === handleVoicesChanged) {
        synth.onvoiceschanged = previousHandler ?? null
      }
    }
  }, [isSupported])

  const selectedVoice = useMemo(() => {
    if (!voices.length) return null

    const normalizedPreference = voicePreference.trim().toLowerCase()
    const preferredVoice =
      voices.find((voice) => voice.name.toLowerCase().includes(normalizedPreference)) ??
      voices.find((voice) => voice.name.toLowerCase().includes(DEFAULT_VOICE_PREFERENCE))

    if (preferredVoice) {
      return preferredVoice
    }

    const normalizedLocale = locale.toLowerCase()
    const exactLocaleVoice = voices.find((voice) => voice.lang?.toLowerCase() === normalizedLocale)
    if (exactLocaleVoice) {
      return exactLocaleVoice
    }

    const localePrefixParts = normalizedLocale.split('-')
    const localePrefix = localePrefixParts[0] ?? normalizedLocale
    const localePrefixVoice = voices.find((voice) =>
      voice.lang?.toLowerCase().startsWith(localePrefix),
    )
    if (localePrefixVoice) {
      return localePrefixVoice
    }

    return voices[0] ?? null
  }, [locale, voicePreference, voices])

  const deliverWordBoundary = useCallback(
    (globalIndex: number) => {
      if (!Number.isFinite(globalIndex)) return
      if (globalIndex < 0 || globalIndex >= wordEntries.length) return
      if (lastDeliveredIndexRef.current === globalIndex) return
      lastDeliveredIndexRef.current = globalIndex
      setLastBoundaryAt(Date.now())
      onWordBoundary?.(globalIndex)
    },
    [onWordBoundary, wordEntries.length],
  )

  const playFrom = useCallback(
    (startIndex: number) => {
      if (!isSupported) return false
      if (!wordEntries.length) return false

      const synth = window.speechSynthesis
      const safeStartIndex = Math.min(Math.max(startIndex, 0), wordEntries.length - 1)
      const remainingEntries = wordEntries.slice(safeStartIndex)

      if (!remainingEntries.length) {
        return false
      }

      const wordsText = remainingEntries
        .map((entry) => entry.word)
        .join(' ')
        .trim()
      if (!wordsText) {
        return false
      }

      // Cancel any ongoing speech
      if (synth.speaking || synth.pending) {
        stopRequestedRef.current = true
        synth.cancel()
        stopRequestedRef.current = false
      }

      const utterance = new SpeechSynthesisUtterance(wordsText)
      utterance.lang = selectedVoice?.lang ?? locale
      utterance.rate = rate
      utterance.pitch = pitch
      utterance.volume = volume
      if (selectedVoice) {
        utterance.voice = selectedVoice
      }

      // Prepare boundaries for quick lookup
      const boundaries: number[] = []
      let cursor = 0
      remainingEntries.forEach((entry, index) => {
        boundaries.push(cursor)
        cursor += entry.word.length
        if (index < remainingEntries.length - 1) {
          cursor += 1 // account for inserted space between words
        }
      })

      startIndexRef.current = safeStartIndex
      boundariesRef.current = boundaries
      utteranceRef.current = utterance
      lastDeliveredIndexRef.current = null
      stopRequestedRef.current = false
      boundarySequenceRef.current = 0
      lastBoundaryCharIndexRef.current = null
      setHasReliableBoundaries(false)
      setLastBoundaryAt(null)

      const lookupBoundary = (charIndex: number) => {
        const boundariesList = boundariesRef.current
        if (!boundariesList.length) return safeStartIndex
        for (let i = boundariesList.length - 1; i >= 0; i -= 1) {
          const boundary = boundariesList[i]
          if (boundary !== undefined && charIndex >= boundary) {
            return safeStartIndex + i
          }
        }
        return safeStartIndex
      }

      utterance.onstart = () => {
        setIsPlaying(true)
        setLastBoundaryAt(Date.now())
        deliverWordBoundary(safeStartIndex)
        onPlaybackStarted?.()
      }

      utterance.onboundary = (event) => {
        if (event.name && event.name !== 'word') return
        const charIndex =
          typeof event.charIndex === 'number' && !Number.isNaN(event.charIndex)
            ? event.charIndex
            : null

        let globalIndex: number | null = null

        if (charIndex !== null) {
          globalIndex = lookupBoundary(charIndex)
          if (lastBoundaryCharIndexRef.current === charIndex) {
            // Boundary events without increasing charIndex; fall back to sequence counter
            globalIndex = null
          } else {
            lastBoundaryCharIndexRef.current = charIndex
            const relativeIndex = globalIndex - safeStartIndex + 1
            if (relativeIndex > boundarySequenceRef.current) {
              boundarySequenceRef.current = relativeIndex
            }
            if (!hasReliableBoundaries && charIndex > 0) {
              setHasReliableBoundaries(true)
            }
          }
        }

        if (globalIndex === null) {
          const relativeIndex = boundarySequenceRef.current
          const maxRelativeIndex = remainingEntries.length - 1
          const clampedRelativeIndex = Math.min(relativeIndex, maxRelativeIndex)
          globalIndex = safeStartIndex + clampedRelativeIndex
          if (relativeIndex <= maxRelativeIndex) {
            boundarySequenceRef.current = relativeIndex + 1
          }
        }

        deliverWordBoundary(globalIndex)
      }

      utterance.onend = () => {
        cleanupUtterance()
        const wasStopped = stopRequestedRef.current
        stopRequestedRef.current = false
        setIsPlaying(false)
        if (!wasStopped) {
          onPlaybackFinished?.()
        }
        boundarySequenceRef.current = 0
        lastBoundaryCharIndexRef.current = null
        setHasReliableBoundaries(false)
        setLastBoundaryAt(null)
      }

      utterance.onerror = () => {
        cleanupUtterance()
        stopRequestedRef.current = false
        setIsPlaying(false)
        onPlaybackFinished?.()
        boundarySequenceRef.current = 0
        lastBoundaryCharIndexRef.current = null
        setHasReliableBoundaries(false)
        setLastBoundaryAt(null)
      }

      const speak = () => {
        synth.speak(utterance)
      }

      if (synth.speaking || synth.pending) {
        window.setTimeout(speak, 50)
      } else {
        speak()
      }

      return true
    },
    [
      cleanupUtterance,
      deliverWordBoundary,
      hasReliableBoundaries,
      isSupported,
      locale,
      onPlaybackFinished,
      onPlaybackStarted,
      pitch,
      rate,
      selectedVoice,
      volume,
      wordEntries,
    ],
  )

  const stop = useCallback(() => {
    if (!isSupported) return
    const synth = window.speechSynthesis
    const hadSpeech = synth.speaking || synth.pending
    stopRequestedRef.current = hadSpeech
    if (hadSpeech) {
      synth.cancel()
    }
    cleanupUtterance()
    if (!hadSpeech) {
      stopRequestedRef.current = false
    }
    setIsPlaying(false)
    setHasReliableBoundaries(false)
    setLastBoundaryAt(null)
  }, [cleanupUtterance, isSupported])

  // Cleanup on unmount
  useEffect(() => stop, [stop])

  return {
    isSupported,
    isPlaying,
    selectedVoice,
    playFrom,
    stop,
    availableVoices: voices,
    hasReliableBoundaries,
    lastBoundaryAt,
  }
}
