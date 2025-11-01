import type { ReactNode } from 'react'

import tw from 'tw-tailwind'
import { FieldWrapper } from '../fieldWrapper/fieldWrapper'

export interface ButtonSelectProps {
  className?: string
  classNameOptionsWrapper?: string
  options?: {
    slot: ReactNode
    value: string
  }[]
  value: string
  // eslint-disable-next-line no-unused-vars
  onChange: React.ChangeEventHandler<HTMLInputElement>
  label: ReactNode
  name: string
  error?: string
  isRequired?: boolean
  ref?: React.Ref<HTMLInputElement>
}

export const ButtonSelectBorder = ({
  className,
  options = [],
  onChange,
  value,
  label,
  error,
  isRequired,
  name,
  classNameOptionsWrapper,
  ref,
}: ButtonSelectProps) => (
  <FieldWrapper className={className} error={error} isRequired={isRequired} label={label}>
    <Wrapper className={classNameOptionsWrapper}>
      {options.map((option) => (
        <Option key={option.value} className={value === option.value ? 'ring-4 ring-blue-500' : ''}>
          {option.slot}
          <Input
            ref={ref}
            onChange={onChange}
            type="radio"
            name={name}
            value={option.value}
            checked={value === option.value}
            style={{ appearance: 'none', WebkitAppearance: 'none' }}
          />
        </Option>
      ))}
    </Wrapper>
  </FieldWrapper>
)

const Wrapper = tw.fieldset`flex gap-4 flex-wrap`
const Option = tw.div`relative cursor-pointer rounded-xl overflow-hidden`
const Input = tw.input`absolute inset-0`
