import type { UseFormRegisterReturn } from 'react-hook-form'
import tw from 'tw-tailwind'

export type PurposeSelectorProps = {
  register: UseFormRegisterReturn
  error?: string
}

const purposes = [
  { id: 'purchase', value: 'purchase', icon: '🏠', label: 'Zakup nieruchomości' },
  { id: 'refinancing', value: 'refinancing', icon: '🔄', label: 'Refinansowanie' },
  { id: 'construction', value: 'construction', icon: '🏗️', label: 'Budowa' },
] as const

export const PurposeSelector = ({ register, error }: PurposeSelectorProps) => {
  return (
    <FormGroup>
      <Label htmlFor="purpose">Cel kredytu</Label>
      <PurposeGrid>
        {purposes.map((purpose) => (
          <PurposeOption key={purpose.id}>
            <PurposeRadio type="radio" id={purpose.id} value={purpose.value} {...register} />
            <PurposeLabel htmlFor={purpose.id}>
              <PurposeIcon>{purpose.icon}</PurposeIcon>
              <PurposeText>{purpose.label}</PurposeText>
            </PurposeLabel>
          </PurposeOption>
        ))}
      </PurposeGrid>
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </FormGroup>
  )
}

const FormGroup = tw.div`flex flex-col gap-3`
const Label = tw.label`text-sm font-semibold text-gray-700 uppercase tracking-wide`
const PurposeGrid = tw.div`grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4`
const PurposeOption = tw.div`relative grid`
const PurposeRadio = tw.input`peer absolute opacity-0`
const PurposeLabel = tw.label`
  flex flex-col items-center justify-center p-4 sm:p-6 border-2 border-gray-200 rounded-xl cursor-pointer
  transition-all duration-300
  peer-checked:border-blue-600 peer-checked:bg-blue-50 peer-checked:shadow-md
  hover:border-blue-300 hover:bg-gray-50
  hover:scale-105 hover:shadow-xl
`
const PurposeIcon = tw.span`text-3xl sm:text-4xl mb-2 shrink-0`
const PurposeText = tw.span`text-sm sm:text-base font-medium text-gray-700 text-center`
const ErrorMessage = tw.p`text-sm text-red-600`
