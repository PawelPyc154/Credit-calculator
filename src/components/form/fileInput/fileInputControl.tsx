import { type FieldValues, type UseControllerProps, useController } from 'react-hook-form'

import { FileInput, type FileInputProps } from './fileInput'

type FileInputControlProps = FileInputProps

export const FileInputControl = <TFieldValues extends FieldValues = FieldValues>({
  control,
  name,
  rules,
  defaultValue,
  label,
  className,
  ...restProps
}: FileInputControlProps & UseControllerProps<TFieldValues>) => {
  const {
    field: { onChange, ...restField },
    fieldState: { error },
  } = useController({
    name,
    control,
    rules,
    defaultValue,
  })

  return (
    <FileInput
      className={className}
      label={label}
      error={error?.message}
      {...restField}
      onChange={(e) => onChange(e.target.files?.[0])}
      onClickRemoveFile={() => onChange('')}
      {...restProps}
    />
  )
}
