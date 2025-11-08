'use client'

import tw from 'tw-tailwind'
import type { CalculatorFormData } from 'types/calculator'

export type SettingsPanelProps = {
  formData: CalculatorFormData
  onFormDataChange?: (data: Partial<CalculatorFormData>) => void
}

export const SettingsPanel = ({ formData, onFormDataChange }: SettingsPanelProps) => {
  return (
    <SettingsContainer>
      <SettingsHeader>
        <SettingsIcon>
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <title>Ustawienia</title>
            <circle cx="12" cy="12" r="3" />
            <path d="M12 1v6m0 6v6M5.64 5.64l4.24 4.24m4.24 4.24l4.24 4.24M1 12h6m6 0h6M5.64 18.36l4.24-4.24m4.24-4.24l4.24-4.24" />
          </svg>
        </SettingsIcon>
        <SettingsTitle>Ustawienia</SettingsTitle>
      </SettingsHeader>
      <SettingsDescription>Dodatkowe opcje i preferencje kalkulacji</SettingsDescription>

      <SettingsContent>
        <SettingGroup>
          <SettingLabel>Cel kredytu</SettingLabel>
          <SettingValue>
            {formData.purpose === 'purchase' && 'Zakup nieruchomości'}
            {formData.purpose === 'refinancing' && 'Refinansowanie'}
            {formData.purpose === 'construction' && 'Budowa'}
          </SettingValue>
        </SettingGroup>

        <SettingDivider />

        <SettingGroup>
          <SettingLabel>Dodatkowe opcje</SettingLabel>
          <SettingsList>
            <SettingItem>
              <SettingCheckbox type="checkbox" defaultChecked={false} />
              <SettingItemLabel>Uwzględnij ubezpieczenie</SettingItemLabel>
            </SettingItem>
            <SettingItem>
              <SettingCheckbox type="checkbox" defaultChecked={false} />
              <SettingItemLabel>Pokaż tylko oferty bez prowizji</SettingItemLabel>
            </SettingItem>
            <SettingItem>
              <SettingCheckbox type="checkbox" defaultChecked={false} />
              <SettingItemLabel>Filtruj po zdolności kredytowej</SettingItemLabel>
            </SettingItem>
          </SettingsList>
        </SettingGroup>
      </SettingsContent>
    </SettingsContainer>
  )
}

const SettingsContainer = tw.div`
  w-full
  bg-white
  rounded-xl
  border border-gray-200
  shadow-sm
  overflow-hidden
`

const SettingsHeader = tw.div`
  flex items-center gap-3
  px-6 py-4
  bg-blue-50
  border-b border-gray-200
`

const SettingsIcon = tw.span`
  flex items-center justify-center
  w-5 h-5
  text-blue-600
`

const SettingsTitle = tw.h3`
  text-base font-semibold
  text-gray-900
`

const SettingsDescription = tw.p`
  px-6 pt-2 pb-4
  text-sm text-gray-500
`

const SettingsContent = tw.div`
  px-6 py-4
`

const SettingGroup = tw.div`
  flex flex-col gap-2
`

const SettingLabel = tw.label`
  text-sm font-medium
  text-gray-700
`

const SettingValue = tw.div`
  text-sm text-gray-900
  font-medium
`

const SettingDivider = tw.div`
  my-4
  border-t border-gray-200
`

const SettingsList = tw.div`
  flex flex-col gap-3
`

const SettingItem = tw.label`
  flex items-center gap-3
  cursor-pointer
  hover:bg-gray-50
  p-2 rounded-lg
  transition-colors duration-200
`

const SettingCheckbox = tw.input`
  w-4 h-4
  text-blue-600
  border-gray-300
  rounded
  focus:ring-2 focus:ring-blue-500
`

const SettingItemLabel = tw.span`
  text-sm text-gray-700
`




