import type { RefAttributes } from 'react'

import { type FieldValues, type UseControllerProps, useController } from 'react-hook-form'
import type { GroupBase } from 'react-select'

import type SelectType from 'react-select/dist/declarations/src/Select'
import type { StateManagerProps } from 'react-select/dist/declarations/src/useStateManager'
import { Select, SelectAsync, type SelectProps } from './select'

type SelectControlProps = SelectProps

export const SelectControl = <
  TFieldValues extends FieldValues = FieldValues,
  Option extends { label: string; value: string } = {
    label: string
    value: string
  },
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>,
>({
  control,
  name,
  rules,
  defaultValue,
  label,
  className,
  isMulti,
  options = [],
  ...restProps
}: SelectControlProps &
  StateManagerProps<Option, IsMulti, Group> &
  RefAttributes<SelectType<Option, IsMulti, Group>> &
  UseControllerProps<TFieldValues>) => {
  const {
    field: { value, onChange, onBlur, name: fieldName, ref },
    fieldState: { error },
  } = useController({
    name,
    control,
    rules,
    defaultValue,
  })

  const flatOptions = options?.flatMap((item) => ('options' in item ? item.options : item))

  return (
    <Select
      ref={ref}
      error={error?.message}
      className={className}
      label={label}
      onChange={(value) => {
        if (value === null) {
          onChange(value)
        } else {
          if ('label' in value) {
            onChange(value?.value)
          } else {
            onChange(value.map(({ value }) => value))
          }
        }
      }}
      value={
        isMulti
          ? flatOptions.filter((c) => value.includes(c.value))
          : flatOptions.find((c) => c.value === value)
      }
      options={options}
      isMulti={isMulti}
      name={fieldName}
      onBlur={onBlur}
      {...restProps}
    />
  )
}

type SelectAsyncControlProps = SelectProps

// not Work

export const SelectAsyncControl = <
  TFieldValues extends FieldValues = FieldValues,
  Option extends { label: string; value: string } = {
    label: string
    value: string
  },
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>,
>({
  control,
  name,
  rules,
  defaultValue,
  label,
  className,
  isMulti,
  options = [],
  ...restProps
}: SelectAsyncControlProps &
  StateManagerProps<Option, IsMulti, Group> &
  RefAttributes<SelectType<Option, IsMulti, Group>> &
  UseControllerProps<TFieldValues>) => {
  const {
    field: { value, onChange, onBlur, name: fieldName, ref },
    fieldState: { error },
  } = useController({
    name,
    control,
    rules,
    defaultValue,
  })

  const flatOptions = options?.flatMap((item) => ('options' in item ? item.options : item))

  return (
    <SelectAsync
      ref={ref}
      error={error?.message}
      className={className}
      label={label}
      onChange={(value) => {
        if (value === null) {
          onChange(value)
        } else {
          if ('label' in value) {
            onChange(value?.value)
          } else {
            onChange(value.map(({ value }) => value))
          }
        }
      }}
      value={
        isMulti
          ? flatOptions.filter((c) => value.includes(c.value))
          : flatOptions.find((c) => c.value === value)
      }
      options={options}
      isMulti={isMulti}
      name={fieldName}
      onBlur={onBlur}
      {...restProps}
    />
  )
}
