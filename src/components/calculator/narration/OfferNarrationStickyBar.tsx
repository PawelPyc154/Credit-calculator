'use client'

import clsx from 'clsx'
import { useEffect, useMemo } from 'react'
import { MdPause, MdPlayArrow } from 'react-icons/md'
import tw from 'tw-tailwind'
import type { NarrationCta, NarrationOffer } from './OfferNarration'
import { createNarrationSections } from './OfferNarration'

type OfferNarrationStickyBarProps = {
  offer: NarrationOffer
  targetSelector?: string
  restoreFocus?: () => void
  initialSectionId?: string | null
  requestedSectionId?: string | null
  onSectionChange?: (sectionId: string) => void
  className?: string
}

export function OfferNarrationStickyBar({
  offer,
  initialSectionId,
  requestedSectionId,
  onSectionChange,
  className,
}: OfferNarrationStickyBarProps) {
  const sections = useMemo(() => createNarrationSections(offer, true, false), [offer])

  const activeSectionId = requestedSectionId ?? initialSectionId ?? sections[0]?.id ?? null
  const activeIndex = useMemo(() => {
    if (!activeSectionId) return 0
    const found = sections.findIndex((section) => section.id === activeSectionId)
    return found >= 0 ? found : 0
  }, [activeSectionId, sections])

  const activeSection = sections[activeIndex] ?? null

  useEffect(() => {
    if (activeSection?.id) {
      onSectionChange?.(activeSection.id)
    }
  }, [activeSection?.id, onSectionChange])

  return (
    <StickyInner className={className}>
      <WordSliderWrapper>
        <SliderLayout>
          <SliderButtonColumn>
            <SliderToggleButton type="button" disabled>
              <MdPlayArrow size={16} />
            </SliderToggleButton>
          </SliderButtonColumn>
          <SliderMain>
            <SliderTrack>
              <WordSlider
                type="range"
                disabled
                value={sections.length ? activeIndex : 0}
                min={0}
                max={Math.max(sections.length - 1, 0)}
              />
            </SliderTrack>
            <SliderLegend>
              {sections.map((section, index) => {
                const isActive = index === activeIndex
                const isCompleted = index < activeIndex
                return (
                  <SliderLegendItem
                    key={section.id}
                    type="button"
                    disabled
                    className={clsx(isActive && 'is-active', isCompleted && 'is-complete')}
                    aria-pressed={isActive}
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
  cursor-default
`
const SliderMain = tw.div`flex min-w-0 flex-1 flex-col gap-1.5`
const SliderTrack = tw.div`w-full min-w-0 flex items-center`
const WordSlider = tw.input`
  w-full min-w-0 cursor-default accent-emerald-400 disabled:opacity-40
`
const SliderLegend = tw.div`mt-1 flex flex-1 min-w-0 items-stretch gap-1 text-[11px] text-white/60 overflow-hidden`
const SliderLegendItem = tw.button`
  flex min-w-0 flex-1 items-center justify-center rounded-lg border border-white/5 bg-white/5 px-2 py-1 text-center text-white/70 transition overflow-hidden
  cursor-default
  [&.is-active]:border-sky-300/40 [&.is-active]:bg-sky-500/10 [&.is-active]:text-white
  [&.is-complete]:border-emerald-300/40 [&.is-complete]:bg-emerald-500/10 [&.is-complete]:text-emerald-100
`
const SliderLegendLabel = tw.span`w-full truncate whitespace-nowrap text-center`
