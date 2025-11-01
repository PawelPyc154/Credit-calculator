import type { ReactNode, Ref } from 'react'

import tw from 'tw-tailwind'
import { type ButtonProps, type ButtonPropsBasic, ButtonRadio } from '../button/button'
import { FieldWrapper } from '../fieldWrapper/fieldWrapper'
export type SelectControlOptions<Value extends string = string> = {
  text?: string
  value: Value
  colorVariants: ButtonProps['color']
  colorVariantsActive: ButtonProps['color']
  icon?: ReactNode
}[]

export type ButtonSelectProps = {
  className?: string
  wrapperClassName?: string
  options: {
    text?: string
    value: string
    colorVariants: ButtonProps['color']
    colorVariantsActive: ButtonProps['color']
    icon?: ReactNode
  }[]
  value: string
  // eslint-disable-next-line no-unused-vars
  onChange: React.ChangeEventHandler<HTMLInputElement>
  label?: ReactNode
  name: string
  error?: string
  isRequired?: boolean
  ref?: Ref<HTMLInputElement>
} & Pick<ButtonPropsBasic, 'size'>

export const ButtonSelect = ({
  className,
  wrapperClassName,
  options,
  onChange,
  value,
  label,
  error,
  isRequired,
  name,
  ref,
  size = 'lg',
}: ButtonSelectProps) => (
  <FieldWrapper className={className} error={error} isRequired={isRequired} label={label}>
    <Wrapper className={wrapperClassName}>
      {options.map((option) => (
        <ButtonRadio
          size={size}
          ref={ref}
          checked={value === option.value}
          colorVariants={option.colorVariants}
          colorVariantsActive={option.colorVariantsActive}
          name={name}
          key={option.value}
          value={option.value}
          onChange={onChange}
          {...(option.icon &&
            option.text && {
              className: 'pr-0 md:pr-4',
              iconWrapperClassName: 'absolute md:static top-0 left-2',
            })}
          icon={option.icon}
        >
          {option.text}
        </ButtonRadio>
      ))}
    </Wrapper>
  </FieldWrapper>
)

const Wrapper = tw.fieldset`grid md:flex gap-2 flex-wrap md:justify-center`
