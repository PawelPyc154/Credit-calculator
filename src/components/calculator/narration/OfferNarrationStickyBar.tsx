'use client'

import clsx from 'clsx'
import type { ChangeEvent } from 'react'
import { useCallback, useEffect, useMemo, useRef } from 'react'
import { MdPause, MdPlayArrow } from 'react-icons/md'
import tw from 'tw-tailwind'
import type {
  NarrationOffer,
  NarrationWordEntry,
  NarrationWordSelectionOptions,
} from './OfferNarration'
import { createNarrationSections, createNarrationWordEntries } from './OfferNarration'

type OfferNarrationStickyBarProps = {
  offer: NarrationOffer
  targetSelector?: string
  restoreFocus?: () => void
  initialSectionId?: string | null
  requestedSectionId?: string | null
  onSectionChange?: (sectionId: string, options?: NarrationWordSelectionOptions) => void
  className?: string
  activeWordIndex: number
  onWordIndexChange?: (index: number, options?: NarrationWordSelectionOptions) => void
  isPlaying?: boolean
  onPlaybackToggle?: (shouldPlay: boolean) => void
  onWordSelect?: (globalIndex: number, options?: NarrationWordSelectionOptions) => void
}

export function OfferNarrationStickyBar({
  offer,
  initialSectionId,
  requestedSectionId,
  onSectionChange,
  className,
  activeWordIndex,
  onWordIndexChange,
  isPlaying = false,
  onPlaybackToggle,
  onWordSelect,
}: OfferNarrationStickyBarProps) {
  const sections = useMemo(() => createNarrationSections(offer, true, false), [offer])

  const sectionWordEntries = useMemo<NarrationWordEntry[]>(
    () => createNarrationWordEntries(sections),
    [sections],
  )

  const sectionWordCounts = useMemo(() => {
    const counts = new Map<string, number>()
    sectionWordEntries.forEach((entry) => {
      counts.set(entry.sectionId, (counts.get(entry.sectionId) ?? 0) + 1)
    })
    return counts
  }, [sectionWordEntries])

  const totalWordCount = useMemo(() => {
    return sections.reduce((total, section) => total + (sectionWordCounts.get(section.id) ?? 0), 0)
  }, [sectionWordCounts, sections])

  const totalGapPx = useMemo(() => {
    const gapCount = Math.max(sections.length - 1, 0)
    const GAP_SIZE_PX = 4 // Tailwind gap-1 => 0.25rem ≈ 4px
    return gapCount * GAP_SIZE_PX
  }, [sections.length])

  const preferredSectionId = requestedSectionId ?? initialSectionId ?? sections[0]?.id ?? null

  const sliderMax = Math.max(sectionWordEntries.length - 1, 0)
  const isSliderInteractive = sectionWordEntries.length > 1

  const manualSectionSelectionRef = useRef(false)

  const clampedWordIndex = sectionWordEntries.length
    ? Math.min(Math.max(activeWordIndex, 0), sliderMax)
    : 0

  useEffect(() => {
    if (!sectionWordEntries.length) {
      if (activeWordIndex !== 0) {
        onWordIndexChange?.(0)
      }
      return
    }

    if (clampedWordIndex !== activeWordIndex) {
      onWordIndexChange?.(clampedWordIndex)
    }
  }, [activeWordIndex, clampedWordIndex, onWordIndexChange, sectionWordEntries.length])

  useEffect(() => {
    if (!preferredSectionId || !sectionWordEntries.length) return
    const currentEntry = sectionWordEntries[clampedWordIndex]
    if (currentEntry?.sectionId === preferredSectionId) return
    const fallbackIndex = sectionWordEntries.findIndex(
      (entry) => entry.sectionId === preferredSectionId,
    )
    if (fallbackIndex >= 0 && fallbackIndex !== clampedWordIndex) {
      onWordIndexChange?.(fallbackIndex)
    }
  }, [
    clampedWordIndex,
    onWordIndexChange,
    preferredSectionId,
    sectionWordEntries,
    sectionWordEntries.length,
  ])

  const activeWordEntry = sectionWordEntries[clampedWordIndex] ?? null

  const fallbackSectionIndex = preferredSectionId
    ? sections.findIndex((section) => section.id === preferredSectionId)
    : 0

  const activeSectionIndex =
    activeWordEntry?.sectionIndex ?? (fallbackSectionIndex >= 0 ? fallbackSectionIndex : 0)

  const activeSection = sections[activeSectionIndex] ?? null

  useEffect(() => {
    if (!activeSection?.id) return
    const shouldAutoPlay = manualSectionSelectionRef.current
    onSectionChange?.(activeSection.id, shouldAutoPlay ? { autoPlay: true } : undefined)
    manualSectionSelectionRef.current = false
  }, [activeSection?.id, onSectionChange])

  const handleSliderChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const next = Math.min(Math.max(Number(event.currentTarget.value), 0), sliderMax)
      onWordIndexChange?.(next)
    },
    [onWordIndexChange, sliderMax],
  )

  return (
    <StickyInner className={className}>
      <WordSliderWrapper>
        <SliderLayout>
          <SliderButtonColumn>
            <SliderToggleButton
              type="button"
              aria-pressed={isPlaying}
              onClick={() => onPlaybackToggle?.(!isPlaying)}
              data-playing={isPlaying ? 'true' : 'false'}
            >
              {isPlaying ? <MdPause size={16} /> : <MdPlayArrow size={16} />}
            </SliderToggleButton>
          </SliderButtonColumn>
          <SliderMain>
            <SliderTrack>
              <WordSlider
                type="range"
                disabled={!isSliderInteractive}
                value={clampedWordIndex}
                min={0}
                max={sliderMax}
                step={1}
                aria-valuemin={0}
                aria-valuemax={sliderMax}
                aria-valuenow={clampedWordIndex}
                aria-valuetext={
                  activeWordEntry
                    ? `${activeWordEntry.displayWord || activeWordEntry.word} (${sections[activeWordEntry.sectionIndex]?.title ?? ''})`
                    : undefined
                }
                aria-label="Przewijaj narrację po słowach sekcji"
                onChange={handleSliderChange}
              />
            </SliderTrack>
            <SliderLegend>
              {sections.map((section, index) => {
                const wordCount = sectionWordCounts.get(section.id) ?? 0
                const ratio = totalWordCount > 0 ? Math.max(wordCount, 1) / totalWordCount : 1
                const widthCalc = `calc((100% - ${totalGapPx}px) * ${ratio})`

                const sectionEntries = sectionWordEntries.filter(
                  (entry) => entry.sectionId === section.id,
                )
                const lastEntry =
                  sectionEntries.length > 0 ? sectionEntries[sectionEntries.length - 1] : null
                const lastWordIndex = lastEntry ? lastEntry.globalIndex : null

                const isActive = index === activeSectionIndex
                const isCompleted =
                  index < activeSectionIndex ||
                  (index === activeSectionIndex &&
                    lastWordIndex !== null &&
                    clampedWordIndex >= lastWordIndex)

                return (
                  <SliderLegendItem
                    key={section.id}
                    type="button"
                    className={clsx(isActive && 'is-active', isCompleted && 'is-complete')}
                    aria-pressed={isActive}
                    style={{ flex: `0 0 ${widthCalc}`, maxWidth: widthCalc }}
                    onClick={() => {
                      if (!isSliderInteractive) return
                      const targetEntry = sectionWordEntries.find(
                        (entry) => entry.sectionId === section.id,
                      )
                      if (targetEntry) {
                        manualSectionSelectionRef.current = true
                        onWordIndexChange?.(targetEntry.globalIndex, { autoPlay: true })
                        onWordSelect?.(targetEntry.globalIndex, { autoPlay: true })
                      }
                    }}
                  >
                    <SliderLegendLabel title={section.title}>{section.title}</SliderLegendLabel>
                  </SliderLegendItem>
                )
              })}
            </SliderLegend>
          </SliderMain>
        </SliderLayout>
      </WordSliderWrapper>
    </StickyInner>
  )
}

const StickyInner = tw.div`
  flex w-full flex-col gap-3 rounded-xl border border-slate-800/70 bg-slate-900/95 px-4 py-3 text-white shadow-xl shadow-slate-900/30 backdrop-blur
  sm:rounded-2xl sm:px-6 sm:py-4 sm:bg-slate-900/90
`
const WordSliderWrapper = tw.div`flex flex-col gap-1`
const SliderLayout = tw.div`flex items-stretch gap-2`
const SliderButtonColumn = tw.div`flex items-center pt-1`
const SliderToggleButton = tw.button`
  flex h-8 w-8 items-center justify-center rounded-full bg-white text-slate-400 shadow-sm transition
  hover:bg-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40
  cursor-pointer
`
const SliderMain = tw.div`flex min-w-0 flex-1 flex-col gap-1.5`
const SliderTrack = tw.div`w-full min-w-0 flex items-center`
const WordSlider = tw.input`
  w-full min-w-0 cursor-default accent-emerald-400 disabled:opacity-40
`
const SliderLegend = tw.div`mt-1 flex items-center gap-1 text-[11px] text-white/60`
const SliderLegendItem = tw.button`
  flex min-w-0 basis-0 items-center justify-center rounded-lg border border-white/5 bg-white/5 px-1 py-1 text-center text-white/70 transition overflow-hidden
  sm:px-2
  md:px-3
  cursor-pointer
  [&.is-active]:border-sky-300/40 [&.is-active]:bg-sky-500/10 [&.is-active]:text-white
  [&.is-complete]:border-emerald-300/40 [&.is-complete]:bg-emerald-500/10 [&.is-complete]:text-emerald-100
`
const SliderLegendLabel = tw.span`w-full truncate text-center`
