import { type FieldValues, type UseControllerProps, useController } from 'react-hook-form'

import { ButtonSelect, type ButtonSelectProps } from './buttonSelect'

type InputControlProps = { optional?: boolean } & Pick<
  ButtonSelectProps,
  'size' | 'wrapperClassName' | 'className' | 'options' | 'label' | 'isRequired'
>

export const ButtonSelectControl = <TFieldValues extends FieldValues = FieldValues>({
  control,
  name,
  rules,
  defaultValue,
  label,
  className,
  optional,
  shouldUnregister,
  ...restProps
}: InputControlProps & UseControllerProps<TFieldValues>) => {
  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
    rules,
    defaultValue,
    shouldUnregister,
  })

  return (
    <ButtonSelect
      className={className}
      label={label}
      error={error?.message}
      {...field}
      {...restProps}
      onChange={(v) =>
        field.onChange(
          field.value === v.target.value ? (optional ? null : v.target.value) : v.target.value,
        )
      }
    />
  )
}
