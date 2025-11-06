'use client'

import { useCookieConsent } from 'hooks/useCookieConsent'
import Link from 'next/link'
import { useState } from 'react'
import tw from 'tw-tailwind'

export const CookieBanner = () => {
  const { showBanner, acceptAll, rejectAll, acceptSelected } = useCookieConsent()
  const [showSettings, setShowSettings] = useState(false)
  const [analytics, setAnalytics] = useState(false)
  const [marketing, setMarketing] = useState(false)

  if (!showBanner) return null

  const handleSaveSettings = () => {
    acceptSelected({ analytics, marketing })
  }

  if (showSettings) {
    return (
      <Overlay>
        <SettingsModal>
          <ModalHeader>
            <ModalTitle>Ustawienia prywatności</ModalTitle>
            <CloseButton onClick={() => setShowSettings(false)}>✕</CloseButton>
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
                  <Toggle disabled checked>
                    <ToggleSlider />
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
                  <Toggle onClick={() => setAnalytics(!analytics)} checked={analytics}>
                    <ToggleSlider />
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
                  <Toggle onClick={() => setMarketing(!marketing)} checked={marketing}>
                    <ToggleSlider />
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
        <BannerIcon>🍪</BannerIcon>
        <BannerText>
          <BannerTitle>Ta strona używa plików cookies</BannerTitle>
          <BannerDescription>
            Używamy plików cookies, aby zapewnić najlepsze doświadczenia na naszej stronie. Klikając
            "Akceptuj wszystkie", zgadzasz się na przechowywanie plików cookies na swoim urządzeniu.{' '}
            <BannerLink href="/polityka-prywatnosci">Polityka prywatności</BannerLink>
          </BannerDescription>
        </BannerText>
        <BannerButtons>
          <SettingsButton onClick={() => setShowSettings(true)}>Ustawienia</SettingsButton>
          <RejectButton onClick={rejectAll}>Odrzuć</RejectButton>
          <AcceptButton onClick={acceptAll}>Akceptuj wszystkie</AcceptButton>
        </BannerButtons>
      </BannerContent>
    </BannerContainer>
  )
}

// Banner styles
const BannerContainer = tw.div`fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-lg`
const BannerContent = tw.div`max-w-7xl mx-auto p-4 md:p-6 flex flex-col md:flex-row items-start md:items-center gap-4`
const BannerIcon = tw.div`text-4xl shrink-0`
const BannerText = tw.div`flex-1`
const BannerTitle = tw.h3`text-lg font-bold text-gray-900 mb-2`
const BannerDescription = tw.p`text-sm text-gray-600 leading-relaxed`
const BannerLink = tw(Link)`text-blue-600 hover:text-blue-700 underline`
const BannerButtons = tw.div`flex flex-wrap gap-2 shrink-0`

const SettingsButton = tw.button`px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition`
const RejectButton = tw.button`px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition`
const AcceptButton = tw.button`px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition`

// Modal styles
const Overlay = tw.div`fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4`
const SettingsModal = tw.div`bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col`
const ModalHeader = tw.div`flex items-center justify-between p-6 border-b border-gray-200`
const ModalTitle = tw.h2`text-2xl font-bold text-gray-900`
const CloseButton = tw.button`text-gray-400 hover:text-gray-600 text-2xl w-8 h-8 flex items-center justify-center`
const ModalContent = tw.div`p-6 overflow-y-auto flex-1`
const ModalDescription = tw.p`text-gray-600 mb-6 leading-relaxed`

const CookieCategories = tw.div`flex flex-col gap-4`
const CategoryCard = tw.div`border border-gray-200 rounded-lg p-4`
const CategoryHeader = tw.div`flex items-start justify-between gap-4`
const CategoryInfo = tw.div`flex-1`
const CategoryTitle = tw.h3`text-lg font-semibold text-gray-900 mb-2 flex items-center gap-2`
const RequiredBadge = tw.span`text-xs font-medium px-2 py-1 bg-gray-100 text-gray-600 rounded`
const CategoryDescription = tw.p`text-sm text-gray-600 leading-relaxed`

const Toggle = tw.button<{ checked: boolean }>`
  relative shrink-0 w-12 h-6 rounded-full transition
  ${(p) => (p.checked ? 'bg-blue-600' : 'bg-gray-300')}
  ${(p) => p.disabled && 'opacity-50 cursor-not-allowed'}
`
const ToggleSlider = tw.span`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition transform peer-checked:translate-x-6`

const ModalFooter = tw.div`flex gap-3 justify-end mb-4`
const SecondaryButton = tw.button`px-6 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition`
const PrimaryButton = tw.button`px-6 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition`

const ModalLinks = tw.div`flex items-center justify-center gap-2 text-sm text-gray-500 pt-4 border-t border-gray-200`
const ModalLink = tw(Link)`text-blue-600 hover:text-blue-700 underline`
const Separator = tw.span`text-gray-400`
