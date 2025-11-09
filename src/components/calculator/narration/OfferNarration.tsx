'use client'

import clsx from 'clsx'
import type { ReactNode } from 'react'
import { useCallback, useEffect, useMemo } from 'react'
import { MdPause, MdPlayArrow } from 'react-icons/md'
import tw from 'tw-tailwind'

export type NarrationOffer = {
  bankId: string
  bankName: string
  loanAmount: number
  loanPeriodYears: number
  loanTermMonths: number
  monthlyPayment: number
  interestRate: number
  apr: number
  commission: number
  totalCost: number
  totalInterest?: number
  insurance?: number
  benefits: string[]
}

export type NarrationCta = {
  label: string
  onActivate: () => void
}

type OfferNarrationProps = {
  offer: NarrationOffer
  cta?: NarrationCta
  variant?: 'default' | 'compact' | 'list'
  className?: string
  activeSectionId?: string | null
  onSectionSelect?: (sectionId: string) => void
}

export type NarrationSection = {
  id: string
  title: string
  script: string
  highlights: string[]
}

type DetailCardProps = {
  label: string
  value?: string
  highlightKey: string
  isActive: boolean
  renderContent?: () => ReactNode
}

const formatCurrency = (value: number) =>
  value.toLocaleString('pl-PL', { style: 'currency', currency: 'PLN' })

const formatPercent = (value: number) =>
  `${value.toLocaleString('pl-PL', { maximumFractionDigits: 2 })}%`

const formatLoanTermYears = (years: number) => {
  const suffix =
    years === 1
      ? 'rok'
      : years % 10 >= 2 && years % 10 <= 4 && (years < 10 || years > 20)
        ? 'lata'
        : 'lat'
  return `${years} ${suffix}`
}

export const createNarrationSections = (
  offer: NarrationOffer,
  includeBenefits: boolean,
  hasCta: boolean,
): NarrationSection[] => {
  const hasBenefits = includeBenefits && offer.benefits.length > 0
  const insurancePart = offer.insurance
    ? `, a ubezpieczenia wynoszą ${formatCurrency(offer.insurance)}`
    : ''
  const interestPart = offer.totalInterest
    ? `, co oznacza około ${formatCurrency(offer.totalInterest)} odsetek`
    : ''

  const sections: NarrationSection[] = [
    {
      id: 'basics',
      title: 'Podstawowe parametry',
      script: `Kwota finansowania to ${formatCurrency(offer.loanAmount)}, spłacana przez ${formatLoanTermYears(
        offer.loanPeriodYears,
      )}, czyli ${offer.loanTermMonths} miesięcy. Szacunkowa rata wynosi około ${formatCurrency(
        offer.monthlyPayment,
      )} miesięcznie.`,
      highlights: ['loanAmount', 'loanPeriod', 'monthlyPayment'],
    },
    {
      id: 'interest',
      title: 'Oprocentowanie',
      script: `Oprocentowanie nominalne to ${formatPercent(offer.interestRate)}, a RRSO wynosi ${formatPercent(
        offer.apr,
      )}. Dzięki temu wiesz, jaki jest realny koszt finansowania${interestPart}.`,
      highlights: ['interestRate', 'apr', 'totalInterest'],
    },
    {
      id: 'costs',
      title: 'Koszty i prowizje',
      script: `Prowizja przy uruchomieniu kredytu to ${formatCurrency(offer.commission)}${insurancePart}. Całkowity koszt kredytu wraz z wszystkimi opłatami to ${formatCurrency(
        offer.totalCost,
      )}.`,
      highlights: ['commission', 'insurance', 'totalCost'],
    },
  ]

  sections.push({
    id: 'benefits',
    title: 'Dodatkowe informacje',
    script: hasBenefits
      ? `W tej ofercie możesz liczyć na dodatkowe korzyści: ${offer.benefits.join(', ')}.`
      : 'Bank nie zadeklarował dodatkowych benefitów w tej ofercie, ale podstawowe warunki pozostają korzystne.',
    highlights: ['benefits'],
  })

  sections.push({
    id: 'summary',
    title: 'Podsumowanie',
    script: `Podsumowując: rata ${formatCurrency(offer.monthlyPayment)} przez ${formatLoanTermYears(
      offer.loanPeriodYears,
    )} daje całkowity koszt ${formatCurrency(offer.totalCost)}. ${hasCta ? 'Jeśli chcesz przejść dalej, użyj przycisku poniżej.' : 'Możesz porównać tę ofertę z innymi i wybrać najlepszą.'}`,
    highlights: ['monthlyPayment', 'totalCost'],
  })

  return sections
}

export type NarrationDisplayStep = {
  id: string
  title: string
  description: string
  items: Array<{
    label: string
    value: string
    highlightKey: string
  }>
}

export const createNarrationDisplaySteps = (offer: NarrationOffer): NarrationDisplayStep[] => {
  const sections = createNarrationSections(offer, true, false)
  return sections.map((section) => {
    switch (section.id) {
      case 'basics':
        return {
          id: section.id,
          title: section.title,
          description: section.script,
          items: [
            {
              label: 'Kwota kredytu',
              value: formatCurrency(offer.loanAmount),
              highlightKey: 'loanAmount',
            },
            {
              label: 'Okres spłaty',
              value: `${formatLoanTermYears(offer.loanPeriodYears)} (${offer.loanTermMonths} mies.)`,
              highlightKey: 'loanPeriod',
            },
            {
              label: 'Miesięczna rata',
              value: formatCurrency(offer.monthlyPayment),
              highlightKey: 'monthlyPayment',
            },
          ],
        }
      case 'interest':
        return {
          id: section.id,
          title: section.title,
          description: section.script,
          items: [
            {
              label: 'Oprocentowanie nominalne',
              value: formatPercent(offer.interestRate),
              highlightKey: 'interestRate',
            },
            { label: 'RRSO', value: formatPercent(offer.apr), highlightKey: 'apr' },
            ...(typeof offer.totalInterest === 'number'
              ? [
                  {
                    label: 'Łączne odsetki',
                    value: formatCurrency(offer.totalInterest),
                    highlightKey: 'totalInterest',
                  },
                ]
              : []),
          ],
        }
      case 'costs':
        return {
          id: section.id,
          title: section.title,
          description: section.script,
          items: [
            {
              label: 'Prowizja banku',
              value: formatCurrency(offer.commission),
              highlightKey: 'commission',
            },
            ...(typeof offer.insurance === 'number'
              ? [
                  {
                    label: 'Ubezpieczenia',
                    value: formatCurrency(offer.insurance),
                    highlightKey: 'insurance',
                  },
                ]
              : []),
            {
              label: 'Całkowity koszt',
              value: formatCurrency(offer.totalCost),
              highlightKey: 'totalCost',
            },
          ],
        }
      case 'benefits':
        return {
          id: section.id,
          title: section.title,
          description: section.script,
          items:
            offer.benefits.length > 0
              ? offer.benefits.slice(0, 4).map((benefit, index) => ({
                  label: `Korzyść ${index + 1}`,
                  value: benefit,
                  highlightKey: 'benefits',
                }))
              : [
                  {
                    label: 'Informacja',
                    value: 'Brak deklarowanych benefitów',
                    highlightKey: 'benefits',
                  },
                ],
        }
      case 'summary':
        return {
          id: section.id,
          title: section.title,
          description: section.script,
          items: [
            {
              label: 'Rata',
              value: formatCurrency(offer.monthlyPayment),
              highlightKey: 'monthlyPayment',
            },
            {
              label: 'Całkowity koszt',
              value: formatCurrency(offer.totalCost),
              highlightKey: 'totalCost',
            },
          ],
        }
      default:
        return {
          id: section.id,
          title: section.title,
          description: section.script,
          items: [],
        }
    }
  })
}

const detailCardsConfig = (offer: NarrationOffer) => {
  const cards: Array<Omit<DetailCardProps, 'isActive'>> = [
    {
      label: 'Kwota kredytu',
      value: formatCurrency(offer.loanAmount),
      highlightKey: 'loanAmount',
    },
    {
      label: 'Okres spłaty',
      value: `${formatLoanTermYears(offer.loanPeriodYears)} (${offer.loanTermMonths} mies.)`,
      highlightKey: 'loanPeriod',
    },
    {
      label: 'Miesięczna rata',
      value: formatCurrency(offer.monthlyPayment),
      highlightKey: 'monthlyPayment',
    },
    {
      label: 'Oprocentowanie nominalne',
      value: formatPercent(offer.interestRate),
      highlightKey: 'interestRate',
    },
    {
      label: 'RRSO',
      value: formatPercent(offer.apr),
      highlightKey: 'apr',
    },
    {
      label: 'Prowizja banku',
      value: formatCurrency(offer.commission),
      highlightKey: 'commission',
    },
  ]

  if (typeof offer.insurance === 'number') {
    cards.push({
      label: 'Ubezpieczenia',
      value: formatCurrency(offer.insurance),
      highlightKey: 'insurance',
    })
  }

  if (typeof offer.totalInterest === 'number') {
    cards.push({
      label: 'Łączne odsetki',
      value: formatCurrency(offer.totalInterest),
      highlightKey: 'totalInterest',
    })
  }

  cards.push({
    label: 'Całkowity koszt',
    value: formatCurrency(offer.totalCost),
    highlightKey: 'totalCost',
  })

  cards.push({
    label: 'Korzyści dodatkowe',
    highlightKey: 'benefits',
    renderContent: () =>
      offer.benefits.length > 0 ? (
        <BenefitsList>
          {offer.benefits.slice(0, 6).map((benefit) => (
            <li key={benefit}>{benefit}</li>
          ))}
          {offer.benefits.length > 6 && <MoreBenefitsInfo>… i więcej</MoreBenefitsInfo>}
        </BenefitsList>
      ) : (
        <EmptyBenefits>Brak deklarowanych benefitów</EmptyBenefits>
      ),
  })

  return cards
}

export function OfferNarration({
  offer,
  cta,
  variant = 'default',
  className,
  activeSectionId,
  onSectionSelect,
}: OfferNarrationProps) {
  const sections = useMemo(() => createNarrationSections(offer, true, Boolean(cta)), [offer, cta])
  const detailCards = useMemo(() => detailCardsConfig(offer), [offer])
  const displaySteps = useMemo(() => createNarrationDisplaySteps(offer), [offer])

  const isCompact = variant === 'compact'
  const isListVariant = variant === 'list'

  const currentSectionId = activeSectionId ?? sections[0]?.id ?? null
  const currentSectionIndex = useMemo(() => {
    if (!currentSectionId) return 0
    const idx = sections.findIndex((section) => section.id === currentSectionId)
    return idx >= 0 ? idx : 0
  }, [currentSectionId, sections])

  const currentSection = sections[currentSectionIndex] ?? null
  const activeHighlights = useMemo(
    () => new Set(currentSection?.highlights ?? []),
    [currentSection],
  )
  const listDescriptions = useMemo(
    () => displaySteps.map((step) => step.description),
    [displaySteps],
  )

  useEffect(() => {
    if (currentSection?.id) {
      onSectionSelect?.(currentSection.id)
    }
  }, [currentSection?.id, onSectionSelect])

  const handleCta = useCallback(() => {
    cta?.onActivate()
  }, [cta])

  if (isListVariant) {
    return (
      <ListVariantList className={clsx(className)} data-offer-id={offer.bankId}>
        {displaySteps.map((step, index) => {
          const isActive = index === currentSectionIndex
          const isCompleted = index < currentSectionIndex
          return (
            <ListVariantItem key={step.id}>
              <ListVariantInteractive aria-pressed={isActive} role="presentation">
                <ListVariantCard
                  className={clsx({
                    'border-sky-200 bg-sky-50 shadow-md shadow-sky-200/50': isActive,
                    'border-emerald-200 bg-emerald-50 shadow-emerald-200/50 shadow-md': isCompleted,
                  })}
                >
                  <ListVariantHeader>
                    <ListVariantHeaderContent>
                      <ListVariantBadge
                        className={clsx({
                          'border-sky-300 bg-white text-sky-700': isActive,
                          'border-emerald-300 bg-emerald-500 text-white': isCompleted,
                        })}
                      >
                        {index + 1}
                      </ListVariantBadge>
                      <ListVariantTitleWrapper>
                        <ListVariantTitle
                          className={clsx({
                            'text-sky-900': isActive,
                            'text-emerald-900': isCompleted,
                          })}
                        >
                          {step.title}
                        </ListVariantTitle>
                        <ListVariantDescription
                          className={clsx({
                            'text-sky-700': isActive,
                            'text-emerald-700': isCompleted,
                            'text-slate-600': !isActive && !isCompleted,
                          })}
                        >
                          {listDescriptions[index]}
                        </ListVariantDescription>
                      </ListVariantTitleWrapper>
                    </ListVariantHeaderContent>
                    <ListVariantPlayButton
                      type="button"
                      aria-label={`Narracja sekcji ${step.title}`}
                      disabled
                      data-active={isActive ? 'true' : 'false'}
                      data-playing="false"
                      data-completed={isCompleted ? 'true' : 'false'}
                    >
                      <ListVariantPlayIcon aria-hidden="true">
                        {isActive ? <MdPause size={14} /> : <MdPlayArrow size={16} />}
                      </ListVariantPlayIcon>
                    </ListVariantPlayButton>
                  </ListVariantHeader>
                </ListVariantCard>
                {step.items.length > 0 && (
                  <ListVariantProperties>
                    {step.items.map((item) => (
                      <ListVariantProperty
                        key={`${step.id}-${item.label}`}
                        className={clsx({
                          'border-sky-200 bg-sky-50 text-sky-900 shadow-sky-100': isActive,
                          'border-emerald-200 bg-emerald-50 text-emerald-900 shadow-emerald-100':
                            isCompleted,
                        })}
                      >
                        <ListVariantPropertyLabel>{item.label}</ListVariantPropertyLabel>
                        <ListVariantPropertyValue>{item.value}</ListVariantPropertyValue>
                      </ListVariantProperty>
                    ))}
                  </ListVariantProperties>
                )}
              </ListVariantInteractive>
            </ListVariantItem>
          )
        })}
      </ListVariantList>
    )
  }

  const lastIndex = Math.max(sections.length - 1, 0)
  const isFirst = currentSectionIndex === 0
  const isLast = currentSectionIndex >= lastIndex

  return (
    <NarrationWrapper
      className={clsx(className, isCompact && 'lg:grid-cols-1', isCompact && 'gap-6', 'relative')}
      data-offer-id={offer.bankId}
    >
      <NarrationAside
        className={clsx(
          isCompact
            ? 'bg-slate-900 text-white shadow-lg shadow-slate-900/10'
            : 'bg-slate-900 text-white shadow-slate-900/20 shadow-xl',
        )}
      >
        <AsideHeader>
          <DemoBadge>Podgląd narracji</DemoBadge>
          <AsideHeading>{offer.bankName}</AsideHeading>
          <AsideSubtitle>Kluczowe parametry kredytu</AsideSubtitle>
        </AsideHeader>

        <TimelineList>
          {sections.map((section, index) => {
            const isActive = index === currentSectionIndex
            const isCompleted = index < currentSectionIndex
            return (
              <TimelineItem key={section.id}>
                <TimelineButton
                  type="button"
                  disabled
                  className={clsx({
                    'translate-x-1 border-sky-300/60 bg-sky-400/20 shadow-lg shadow-sky-500/20':
                      isActive,
                    'border-emerald-300/60 bg-emerald-400/20': isCompleted && !isActive,
                  })}
                >
                  <TimelineItemContent>
                    <TimelineStepBadge
                      className={clsx({
                        'bg-white text-slate-900': isActive,
                        'bg-white/10 text-white': !isActive,
                      })}
                    >
                      {index + 1}
                    </TimelineStepBadge>
                    <TimelineTextWrapper>
                      <TimelineTitle>{section.title}</TimelineTitle>
                      {isActive && (
                        <TimelineExcerpt>{section.script.slice(0, 80)}…</TimelineExcerpt>
                      )}
                    </TimelineTextWrapper>
                  </TimelineItemContent>
                </TimelineButton>
              </TimelineItem>
            )
          })}
        </TimelineList>

        <Controls>
          <PrevButton type="button" disabled={isFirst}>
            Poprzedni
          </PrevButton>
          <PlayButton type="button" disabled>
            {currentSection ? 'Odtwórz' : 'Pauza'}
          </PlayButton>
          <NextButton type="button" disabled={isLast || sections.length === 0}>
            Następny
          </NextButton>
        </Controls>

        <ScriptPanel aria-live="polite">
          <span>{currentSection?.script ?? 'Brak narracji do wyświetlenia.'}</span>
        </ScriptPanel>

        {cta && (
          <CTAWrapper>
            <CTAButton type="button" onClick={handleCta}>
              {cta.label}
            </CTAButton>
          </CTAWrapper>
        )}
      </NarrationAside>

      <NarrationDetails className={clsx(isCompact && 'grid-cols-1 md:grid-cols-2')}>
        {detailCards.map((card) => (
          <DetailCard
            key={card.label}
            label={card.label}
            value={card.value}
            highlightKey={card.highlightKey}
            isActive={currentSection ? activeHighlights.has(card.highlightKey) : false}
            renderContent={card.renderContent}
          />
        ))}
      </NarrationDetails>
    </NarrationWrapper>
  )
}

function DetailCard({ label, value, highlightKey, isActive, renderContent }: DetailCardProps) {
  return (
    <DetailCardContainer
      data-highlight-key={highlightKey}
      className={clsx({
        'border-sky-400 shadow-lg shadow-sky-200/60 ring-2 ring-sky-200': isActive,
      })}
    >
      <DetailCardContent>
        <DetailLabel>{label}</DetailLabel>
        {value && <DetailValue>{value}</DetailValue>}
        {renderContent?.()}
      </DetailCardContent>
      {isActive && <HighlightOverlay />}
    </DetailCardContainer>
  )
}

const NarrationWrapper = tw.section`grid gap-8 lg:grid-cols-[360px_minmax(0,1fr)]`
const NarrationAside = tw.aside`rounded-3xl p-6 text-white`
const AsideHeader = tw.header`flex flex-col gap-2`
const DemoBadge = tw.span`inline-flex w-fit items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white/80`
const AsideHeading = tw.h2`text-2xl font-semibold text-white sm:text-3xl`
const AsideSubtitle = tw.p`text-sm text-white/70`
const TimelineList = tw.ol`mt-6 flex flex-col gap-3`
const TimelineItem = tw.li`list-none`
const TimelineButton = tw.button`w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-left transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40 disabled:cursor-default`
const TimelineItemContent = tw.div`flex items-center gap-3`
const TimelineStepBadge = tw.span`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/20 text-sm font-semibold`
const TimelineTextWrapper = tw.div`flex flex-col`
const TimelineTitle = tw.span`text-sm font-semibold text-white`
const TimelineExcerpt = tw.span`text-xs text-white/70`
const Controls = tw.div`mt-6 grid grid-cols-3 gap-3`
const PrevButton = tw.button`rounded-full bg-white/10 px-3 py-2 text-sm font-semibold text-white transition hover:bg-white/20 disabled:cursor-not-allowed disabled:opacity-40`
const PlayButton = tw.button`rounded-full bg-white px-3 py-2 text-sm font-semibold text-slate-900 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40 disabled:text-slate-400`
const NextButton = tw.button`rounded-full bg-white/10 px-3 py-2 text-sm font-semibold text-white transition hover:bg-white/20 disabled:cursor-not-allowed disabled:opacity-40`
const ScriptPanel = tw.div`mt-6 rounded-2xl border border-white/10 bg-slate-950/40 p-4 text-sm leading-relaxed text-white/80 whitespace-pre-wrap`
const CTAWrapper = tw.div`mt-6`
const CTAButton = tw.button`flex w-full items-center justify-center gap-2 rounded-full bg-linear-to-r from-sky-500 to-emerald-400 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-500/30 transition hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40`
const NarrationDetails = tw.main`grid gap-4 sm:grid-cols-2 xl:grid-cols-3`
const DetailCardContainer = tw.article`relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-200`
const DetailCardContent = tw.div`flex flex-col gap-3`
const DetailLabel = tw.span`text-sm font-medium text-slate-500`
const DetailValue = tw.strong`text-2xl font-semibold text-slate-900`
const HighlightOverlay = tw.span`pointer-events-none absolute inset-0 rounded-3xl border border-sky-400/60 bg-sky-100/20`
const BenefitsList = tw.ul`list-disc pl-4 text-sm text-slate-600 space-y-1`
const MoreBenefitsInfo = tw.span`text-xs text-slate-500`
const EmptyBenefits = tw.span`text-sm text-slate-500`

const ListVariantList = tw.ol`mt-4 flex flex-col gap-4`
const ListVariantItem = tw.li`list-none`
const ListVariantInteractive = tw.div`flex flex-col gap-2 rounded-2xl transition`
const ListVariantCard = tw.div`rounded-2xl border border-slate-100 bg-slate-50/80 p-5 shadow-sm transition`
const ListVariantHeader = tw.div`flex items-start justify-between gap-3`
const ListVariantHeaderContent = tw.div`flex items-start gap-3`
const ListVariantBadge = tw.span`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white text-sm font-semibold text-slate-700`
const ListVariantTitleWrapper = tw.div`flex flex-col gap-1`
const ListVariantTitle = tw.span`text-base font-semibold text-slate-900`
const ListVariantDescription = tw.span`text-sm leading-relaxed text-slate-600 whitespace-pre-wrap`
const ListVariantProperties = tw.ul`mt-3 flex flex-col gap-2 pl-10`
const ListVariantProperty = tw.li`flex items-center justify-between gap-4 rounded-xl border border-slate-200 bg-white px-4 py-2 shadow-sm`
const ListVariantPropertyLabel = tw.span`text-sm font-medium text-slate-600`
const ListVariantPropertyValue = tw.span`text-sm font-semibold text-slate-900`
const ListVariantPlayButton = tw.button`
  inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-400 transition
  cursor-default
`
const ListVariantPlayIcon = tw.span`flex items-center justify-center`
