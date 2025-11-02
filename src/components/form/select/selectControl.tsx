import type { RefAttributes } from "react";

import {
  type FieldValues,
  type UseControllerProps,
  useController,
} from "react-hook-form";
import type {
  GroupBase,
  Props as ReactSelectProps,
  SelectInstance,
} from "react-select";
import { Select, SelectAsync, type SelectFieldProps } from "./select";

type SelectControlProps = SelectFieldProps;

export const SelectControl = <
  TFieldValues extends FieldValues = FieldValues,
  Option extends { label: string; value: string } = {
    label: string;
    value: string;
  },
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>
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
  ReactSelectProps<Option, IsMulti, Group> &
  RefAttributes<SelectInstance<Option, IsMulti, Group>> &
  UseControllerProps<TFieldValues>) => {
  const {
    field: { value, onChange, onBlur, name: fieldName, ref },
    fieldState: { error },
  } = useController({
    name,
    control,
    rules,
    defaultValue,
  });

  const flatOptions =
    options?.flatMap((item: Option | Group) =>
      "options" in item ? item.options : item
    ) ?? [];

  return (
    <Select
      ref={ref}
      error={error?.message}
      className={className}
      label={label}
      onChange={(newValue) => {
        if (newValue === null) {
          onChange(null);
        } else if (Array.isArray(newValue)) {
          onChange(newValue.map((item: Option) => item.value));
        } else if (
          newValue &&
          typeof newValue === "object" &&
          "value" in newValue
        ) {
          onChange((newValue as Option).value);
        }
      }}
      value={
        isMulti
          ? flatOptions.filter(
              (c: Option) => Array.isArray(value) && value.includes(c.value)
            )
          : flatOptions.find((c: Option) => c.value === value)
      }
      options={options}
      isMulti={isMulti}
      name={fieldName}
      onBlur={onBlur}
      {...restProps}
    />
  );
};

type SelectAsyncControlProps = SelectFieldProps;

// not Work

export const SelectAsyncControl = <
  TFieldValues extends FieldValues = FieldValues,
  Option extends { label: string; value: string } = {
    label: string;
    value: string;
  },
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>
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
  ReactSelectProps<Option, IsMulti, Group> &
  RefAttributes<SelectInstance<Option, IsMulti, Group>> &
  UseControllerProps<TFieldValues>) => {
  const {
    field: { value, onChange, onBlur, name: fieldName, ref },
    fieldState: { error },
  } = useController({
    name,
    control,
    rules,
    defaultValue,
  });

  const flatOptions =
    options?.flatMap((item: Option | Group) =>
      "options" in item ? item.options : item
    ) ?? [];

  return (
    <SelectAsync
      ref={ref}
      error={error?.message}
      className={className}
      label={label}
      onChange={(newValue) => {
        if (newValue === null) {
          onChange(null);
        } else if (Array.isArray(newValue)) {
          onChange(newValue.map((item: Option) => item.value));
        } else if (
          newValue &&
          typeof newValue === "object" &&
          "value" in newValue
        ) {
          onChange((newValue as Option).value);
        }
      }}
      value={
        isMulti
          ? flatOptions.filter(
              (c: Option) => Array.isArray(value) && value.includes(c.value)
            )
          : flatOptions.find((c: Option) => c.value === value)
      }
      options={options}
      isMulti={isMulti}
      name={fieldName}
      onBlur={onBlur}
      {...restProps}
    />
  );
};
