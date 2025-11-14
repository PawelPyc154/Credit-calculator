'use client'

import { useCookieConsent } from 'hooks/useCookieConsent'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import tw from 'tw-tailwind'

export const CookieBanner = () => {
  const {
    showBanner,
    showSettings,
    acceptAll,
    rejectAll,
    acceptSelected,
    consent,
    openSettings,
    closeSettings,
  } = useCookieConsent()
  const [analytics, setAnalytics] = useState(false)
  const [marketing, setMarketing] = useState(false)

  const handleSaveSettings = () => {
    acceptSelected({ analytics, marketing })
  }

  useEffect(() => {
    if (showSettings) {
      setAnalytics(consent?.analytics ?? false)
      setMarketing(consent?.marketing ?? false)
    }
  }, [showSettings, consent])

  useEffect(() => {
    if (typeof window === 'undefined') return

    const handleOpenSettings = () => {
      openSettings()
    }

    window.addEventListener('cookie-consent-open-settings', handleOpenSettings)

    return () => {
      window.removeEventListener('cookie-consent-open-settings', handleOpenSettings)
    }
  }, [openSettings])

  if (!showBanner && !showSettings) return null

  if (showSettings) {
    return (
      <Overlay>
        <SettingsModal role="dialog" aria-modal="true" aria-labelledby="cookie-settings-title">
          <ModalHeader>
            <ModalTitle id="cookie-settings-title">Ustawienia prywatności</ModalTitle>
            <CloseButton onClick={closeSettings}>✕</CloseButton>
          </ModalHeader>

          <ModalContent>
            <ModalDescription>
              Używamy plików cookies, aby zapewnić prawidłowe działanie strony oraz analizować ruch.
              Możesz wybrać, które kategorie cookies chcesz zaakceptować.
            </ModalDescription>

            <CookieCategories>
              {/* Niezbędne cookies - zawsze włączone */}
              <CategoryCard>
                <CategoryHeader>
                  <CategoryInfo>
                    <CategoryTitle>
                      Niezbędne
                      <RequiredBadge>Wymagane</RequiredBadge>
                    </CategoryTitle>
                    <CategoryDescription>
                      Te pliki są niezbędne do prawidłowego działania strony. Nie można ich
                      wyłączyć.
                    </CategoryDescription>
                  </CategoryInfo>
                  <Toggle
                    disabled
                    checked
                    type="button"
                    role="switch"
                    aria-checked="true"
                    aria-readonly="true"
                    aria-label="Niezbędne cookies są zawsze włączone"
                  >
                    <ToggleSlider checked />
                  </Toggle>
                </CategoryHeader>
              </CategoryCard>

              {/* Analityczne cookies */}
              <CategoryCard>
                <CategoryHeader>
                  <CategoryInfo>
                    <CategoryTitle>Analityczne</CategoryTitle>
                    <CategoryDescription>
                      Pomagają nam zrozumieć, jak użytkownicy korzystają ze strony. Używamy Google
                      Analytics.
                    </CategoryDescription>
                  </CategoryInfo>
                  <Toggle
                    type="button"
                    onClick={() => setAnalytics(!analytics)}
                    checked={analytics}
                    role="switch"
                    aria-checked={analytics}
                    aria-label="Zezwól na cookies analityczne"
                  >
                    <ToggleSlider checked={analytics} />
                  </Toggle>
                </CategoryHeader>
              </CategoryCard>

              {/* Marketingowe cookies */}
              <CategoryCard>
                <CategoryHeader>
                  <CategoryInfo>
                    <CategoryTitle>Marketingowe</CategoryTitle>
                    <CategoryDescription>
                      Służą do wyświetlania spersonalizowanych reklam. Używamy Google AdSense.
                    </CategoryDescription>
                  </CategoryInfo>
                  <Toggle
                    type="button"
                    onClick={() => setMarketing(!marketing)}
                    checked={marketing}
                    role="switch"
                    aria-checked={marketing}
                    aria-label="Zezwól na cookies marketingowe"
                  >
                    <ToggleSlider checked={marketing} />
                  </Toggle>
                </CategoryHeader>
              </CategoryCard>
            </CookieCategories>

            <ModalFooter>
              <SecondaryButton onClick={rejectAll}>Odrzuć wszystkie</SecondaryButton>
              <PrimaryButton onClick={handleSaveSettings}>Zapisz ustawienia</PrimaryButton>
            </ModalFooter>

            <ModalLinks>
              <ModalLink href="/polityka-prywatnosci">Polityka prywatności</ModalLink>
              <Separator>•</Separator>
              <ModalLink href="/regulamin">Regulamin</ModalLink>
            </ModalLinks>
          </ModalContent>
        </SettingsModal>
      </Overlay>
    )
  }

  return (
    <BannerContainer>
      <BannerContent>
        <BannerText>
          <BannerTitle>
            <BannerTitleIcon aria-hidden="true">🍪</BannerTitleIcon>
            Ta strona używa plików cookies
          </BannerTitle>
          <BannerDescription>
            Używamy plików cookies, aby zapewnić najlepsze doświadczenia na naszej stronie. Klikając
            "Akceptuj wszystkie", zgadzasz się na przechowywanie plików cookies na swoim urządzeniu.{' '}
            <BannerLink href="/polityka-prywatnosci">Polityka prywatności</BannerLink>
          </BannerDescription>
        </BannerText>
        <BannerButtons>
          <SettingsButton onClick={openSettings}>Ustawienia</SettingsButton>
          <RejectButton onClick={rejectAll}>Odrzuć</RejectButton>
          <AcceptButton onClick={acceptAll}>Akceptuj wszystkie</AcceptButton>
        </BannerButtons>
      </BannerContent>
    </BannerContainer>
  )
}

// Banner styles
const BannerContainer = tw.div`
  fixed inset-x-0 bottom-0 z-60 border-t border-slate-200 bg-white/95 backdrop-blur-xl
  shadow-[0_-12px_40px_-20px_rgba(15,23,42,0.4)] px-3 py-3
  sm:px-4 md:px-6
  supports-[padding-bottom:env(safe-area-inset-bottom)]:pb-[calc(env(safe-area-inset-bottom)+0.75rem)]
`
const BannerContent = tw.div`
  mx-auto flex w-full max-w-4xl flex-col gap-3 text-sm
  md:flex-row md:items-center md:gap-4 md:text-base
`
const BannerText = tw.div`flex-1`
const BannerTitle = tw.h3`flex items-center gap-2 text-base font-semibold text-slate-900 md:text-lg`
const BannerTitleIcon = tw.span`flex h-8 w-8 items-center justify-center rounded-full bg-linear-to-br from-amber-100 to-orange-200 text-lg shadow-inner`
const BannerDescription = tw.p`mt-1 text-xs leading-relaxed text-slate-600 md:text-sm`
const BannerLink = tw(
  Link,
)`font-medium text-blue-600 underline underline-offset-2 transition hover:text-blue-700 hover:underline-offset-4`
const BannerButtons = tw.div`
  flex w-full flex-col items-stretch gap-2
  sm:flex-row sm:flex-wrap sm:items-center sm:justify-end sm:gap-2 md:w-auto
`

const sharedButtonClasses = `inline-flex w-full items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition focus-visible:outline-none sm:w-auto cursor-pointer`
const SettingsButton = tw.button`${sharedButtonClasses} border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 focus-visible:ring-2 focus-visible:ring-slate-300 focus-visible:ring-offset-2`
const RejectButton = tw.button`${sharedButtonClasses} border border-transparent bg-slate-100 text-slate-700 hover:bg-slate-200 focus-visible:ring-2 focus-visible:ring-slate-300 focus-visible:ring-offset-2`
const AcceptButton = tw.button`${sharedButtonClasses} bg-linear-to-r from-emerald-600 to-emerald-500 text-white shadow-lg shadow-emerald-500/20 hover:from-emerald-500 hover:to-emerald-400 focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2`

// Modal styles
const Overlay = tw.div`fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4`
const SettingsModal = tw.div`bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col`
const ModalHeader = tw.div`flex items-center justify-between p-6 border-b border-gray-200`
const ModalTitle = tw.h2`text-2xl font-bold text-gray-900`
const CloseButton = tw.button`text-gray-400 hover:text-gray-600 text-2xl w-8 h-8 flex items-center justify-center cursor-pointer`
const ModalContent = tw.div`p-6 overflow-y-auto flex-1`
const ModalDescription = tw.p`text-gray-600 mb-6 leading-relaxed`

const CookieCategories = tw.div`flex flex-col gap-4`
const CategoryCard = tw.div`border border-gray-200 rounded-lg p-4`
const CategoryHeader = tw.div`flex items-start justify-between gap-4`
const CategoryInfo = tw.div`flex-1`
const CategoryTitle = tw.h3`text-lg font-semibold text-gray-900 mb-2 flex items-center gap-2`
const RequiredBadge = tw.span`text-xs font-medium px-2 py-1 bg-gray-100 text-gray-600 rounded`
const CategoryDescription = tw.p`text-sm text-gray-600 leading-relaxed`

const Toggle = tw.button<{ checked: boolean; disabled?: boolean }>`
  relative shrink-0 w-12 h-6 rounded-full transition
  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/60 focus-visible:ring-offset-2
  ${(p) => (p.checked ? 'bg-emerald-600' : 'bg-gray-300')}
  ${(p) => (p.disabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : 'cursor-pointer')}
`
const ToggleSlider = tw.span<{ checked: boolean }>`
  absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform
  ${(p) => (p.checked ? 'translate-x-6' : 'translate-x-0')}
`

const ModalFooter = tw.div`
  mt-6 flex flex-col gap-2 pt-4
  sm:flex-row sm:justify-end sm:gap-3 sm:pt-0
`
const SecondaryButton = tw.button`
  inline-flex items-center justify-center rounded-lg border border-slate-200 bg-white px-5 py-2.5
  text-sm font-medium text-slate-700 transition hover:bg-slate-50
  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/40 focus-visible:ring-offset-2
  cursor-pointer
`
const PrimaryButton = tw.button`
  inline-flex items-center justify-center rounded-lg bg-linear-to-r from-emerald-600 to-emerald-500 px-5 py-2.5
  text-sm font-semibold text-white transition hover:from-emerald-500 hover:to-emerald-400
  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2
  cursor-pointer
`

const ModalLinks = tw.div`flex items-center justify-center gap-2 text-sm text-gray-500 pt-4`
const ModalLink = tw(Link)`text-emerald-600 hover:text-emerald-700 underline`
const Separator = tw.span`text-gray-400`
