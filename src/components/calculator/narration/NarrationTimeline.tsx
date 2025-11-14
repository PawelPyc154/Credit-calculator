'use client'

import clsx from 'clsx'
import tw from 'tw-tailwind'

type TimelineItem = {
  label: string
  value: string
  highlightKey: string
}

export type NarrationTimelineStep = {
  id: string
  title: string
  description: string
  items: TimelineItem[]
}

type NarrationTimelineProps = {
  steps: NarrationTimelineStep[]
  activeSectionId?: string | null
  onSelect?: (sectionId: string) => void
}

export function NarrationTimeline({ steps, activeSectionId, onSelect }: NarrationTimelineProps) {
  const activeIndex = steps.findIndex((step) => step.id === activeSectionId)

  return (
    <TimelineWrapper>
      <TimelineAxis>
        {steps.map((step, index) => {
          const isActive = step.id === activeSectionId
          const isCompleted = activeIndex !== -1 && index < activeIndex
          const showLine = index < steps.length - 1

          const snippet =
            step.description.length > 160 ? `${step.description.slice(0, 160)}…` : step.description

          return (
            <TimelineStep key={step.id}>
              <MarkerWrapper>
                <Marker className={clsx(isActive && 'is-active', isCompleted && 'is-complete')} />
                {showLine && (
                  <MarkerLine
                    className={clsx(
                      isCompleted && 'bg-sky-400/60',
                      !isCompleted && 'bg-slate-600/40',
                    )}
                  />
                )}
              </MarkerWrapper>

              <StepContent>
                <StepHeader>
                  <HeaderLeft>
                    <StepNumber>{index + 1}</StepNumber>
                    <div>
                      <StepTitle>{step.title}</StepTitle>
                      <StepDescription>{snippet}</StepDescription>
                    </div>
                  </HeaderLeft>
                  <StepTrigger
                    type="button"
                    onClick={() => onSelect?.(step.id)}
                    className={clsx(isActive && 'text-sky-200')}
                  >
                    {isActive ? 'Aktywna sekcja' : 'Przejdź'}
                  </StepTrigger>
                </StepHeader>
                <ItemsGrid>
                  {step.items.map((item) => (
                    <ItemRect
                      key={`${step.id}-${item.label}`}
                      data-narration-key={item.highlightKey}
                      className={clsx(isActive && 'is-active', isCompleted && 'is-complete')}
                      onClick={() => onSelect?.(step.id)}
                    >
                      <ItemLabel>{item.label}</ItemLabel>
                      <ItemValue>{item.value}</ItemValue>
                    </ItemRect>
                  ))}
                </ItemsGrid>
              </StepContent>
            </TimelineStep>
          )
        })}
      </TimelineAxis>
    </TimelineWrapper>
  )
}

const TimelineWrapper = tw.div`relative flex flex-col gap-6`
const TimelineAxis = tw.div`relative pl-10`
const TimelineStep = tw.div`relative pb-10 last:pb-0`

const MarkerWrapper = tw.div`absolute left-0 top-2 flex w-8 items-start justify-center`
const Marker = tw.span`
  relative z-10 h-4 w-4 rounded-full border-2 border-sky-200/60 bg-slate-900 shadow-[0_0_0_3px_rgba(15,23,42,1)] transition-all duration-200
  [&.is-active]:border-sky-400 [&.is-active]:bg-sky-400
  [&.is-complete]:border-emerald-400 [&.is-complete]:bg-emerald-400
`
const MarkerLine = tw.span`absolute left-1/2 top-5 bottom-0 w-[2px] translate-x-[-50%] bg-slate-600/40 transition-all duration-300`

const StepContent = tw.div`flex flex-col gap-4 rounded-3xl border border-slate-800/70 bg-slate-900/85 p-6 shadow-xl shadow-slate-900/40 backdrop-blur`
const StepHeader = tw.div`flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between`
const HeaderLeft = tw.div`flex flex-col gap-2 sm:flex-row sm:items-start sm:gap-3`
const StepNumber = tw.span`flex h-6 w-6 items-center justify-center rounded-full bg-white/15 text-xs font-semibold text-white shadow-inner`
const StepTitle = tw.h4`text-base font-semibold text-white`
const StepDescription = tw.p`max-w-3xl text-xs text-slate-200/80`
const StepTrigger = tw.button`
  text-xs font-semibold text-sky-300 underline-offset-2 transition hover:text-sky-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-300/60
  cursor-pointer
`
const ItemsGrid = tw.div`grid gap-3 sm:grid-cols-2 lg:grid-cols-3`

const ItemRect = tw.div`
  rounded-2xl border border-sky-500/20 bg-sky-500/15 px-4 py-3 transition-all duration-200
  hover:border-sky-400/50 hover:bg-sky-500/25 cursor-pointer
  [&.is-active]:border-sky-300 [&.is-active]:bg-sky-400/25 [&.is-active]:shadow-[0_14px_32px_-12px_rgba(56,189,248,0.45)]
  [&.is-complete]:border-emerald-300/40 [&.is-complete]:bg-emerald-500/12
`
const ItemLabel = tw.p`text-xs font-medium uppercase tracking-wide text-sky-100`
const ItemValue = tw.p`text-sm font-semibold text-white`
