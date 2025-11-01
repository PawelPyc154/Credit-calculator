import type { Ref } from "react";

import ReactSelect, {
  type GroupBase,
  type Props as SelectProps,
  type SelectInstance,
} from "react-select";
import AsyncSelect, { type AsyncProps } from "react-select/async";
import { FieldWrapper } from "../fieldWrapper/fieldWrapper";

export interface SelectFieldProps {
  className?: string;
  error?: string;
  isRequired?: boolean;
  label: string;
}

export const Select = <
  Option = unknown,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>
>({
  className,
  error,
  isRequired,
  label,
  ref,
  ...restRrops
}: SelectFieldProps &
  SelectProps<Option, IsMulti, Group> & {
    ref?: Ref<SelectInstance<Option, IsMulti, Group>>;
  }) => (
  <FieldWrapper
    className={className}
    error={error}
    isRequired={isRequired}
    label={label}
  >
    <ReactSelect
      openMenuOnFocus
      ref={ref}
      styles={{
        control: (base) => ({
          ...base,
          height: "44px",
          border: "1px solid rgb(209 213 219)",
          borderRadius: "8px",
        }),
        menu: (provided) => ({ ...provided, zIndex: 41 }),
      }}
      {...restRrops}
    />
  </FieldWrapper>
);

export const SelectAsync = <
  Option = unknown,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>
>({
  className,
  error,
  isRequired,
  label,
  ...restProps
}: SelectFieldProps &
  AsyncProps<Option, IsMulti, Group> & {
    ref?: Ref<SelectInstance<Option, IsMulti, Group>>;
  }) => (
  <FieldWrapper
    className={className}
    error={error}
    isRequired={isRequired}
    label={label}
  >
    <AsyncSelect
      styles={{
        control: (base) => ({
          ...base,
          height: "44px",
          border: "1px solid rgb(209 213 219)",
          borderRadius: "6px",
        }),
      }}
      {...restProps}
    />
  </FieldWrapper>
);
