/* eslint-disable react/button-has-type */

import clsx from "clsx";

import Link from "next/link";
import type React from "react";
import type { ComponentProps, ReactNode, Ref } from "react";
import tw from "tw-tailwind";
import { Spinner } from "components/common/spinner";

const colors = {
  none: tw``,
  white: tw`text-black bg-white hover:bg-gray-100`,
  gray: tw`text-black bg-gray-100 hover:bg-gray-200`,
  darkGray: tw`text-white bg-gray-800 hover:bg-gray-900`,
  emerald: tw`text-white bg-green-600 hover:bg-green-700`,
  red: tw`text-white bg-red-600 hover:bg-red-700`,
  black: tw`text-white bg-black hover:opacity-90`,
  blackOutline: tw`border-2 border-black text-black hover:bg-black hover:text-white`,
};

const loadingColors: typeof colors = {
  none: tw``,
  white: tw`text-white`,
  gray: tw`text-gray-100`,
  darkGray: tw`text-gray-200`,
  emerald: tw`text-emerald-600`,
  red: tw`text-red-600`,
  black: tw`text-black`,
  blackOutline: tw`bg-black text-white`,
};

const sizes = {
  lg: tw`h-11`,
  base: tw`h-10`,
  md: tw`h-9`,
  sm: tw`h-8 w-8`,
};

const iconWrapperSizes: Record<keyof typeof sizes, string> = {
  lg: tw`h-11 w-11`,
  base: tw`h-10 w-10`,
  md: tw`h-9 w-9`,
  sm: tw`h-8 w-8`,
};

export type ButtonPropsBasic = {
  color?: keyof typeof colors;
  size?: keyof typeof sizes;
  icon?: ReactNode;
  iconWrapperClassName?: string;
};

export type ButtonProps = Pick<
  React.JSX.IntrinsicElements["button"],
  "onClick" | "className" | "children" | "type" | "disabled"
> &
  ButtonPropsBasic & { isLoading?: boolean; ref?: Ref<HTMLButtonElement> };

export const Button = ({
  children,
  className,
  type = "button",
  color = "emerald",
  isLoading,
  size = "base",
  icon,
  iconWrapperClassName,
  ref,
  ...props
}: ButtonProps) => {
  return (
    <button
      ref={ref}
      className={getContainerStyles({
        className,
        color,
        size,
        isLoading,
        hasIcon: !!icon,
        hasChildren: !!children,
      })}
      type={type}
      {...props}
    >
      {icon ? (
        <IconWrapper
          className={clsx(iconWrapperClassName, iconWrapperSizes[size])}
        >
          {icon}
        </IconWrapper>
      ) : null}
      {children}
      {isLoading && <Spinner size="sm" />}
    </button>
  );
};

type ButtonRadioProps = ButtonPropsBasic & {
  value: string;

  className?: string;

  children?: string;

  name: string;

  checked: boolean;

  colorVariants?: keyof typeof colors;

  colorVariantsActive?: keyof typeof colors;

  onChange: React.ChangeEventHandler<HTMLInputElement>;

  ref?: Ref<HTMLInputElement>;
};

export const ButtonRadio = ({
  value,
  icon,
  iconWrapperClassName,
  size = "base",
  className,
  children,
  name,
  checked,
  colorVariants = "emerald",
  colorVariantsActive = "gray",
  onChange,
  ref,
}: ButtonRadioProps) => (
  <div
    className={getContainerStyles({
      className: className,
      color: checked ? colorVariantsActive : colorVariants,
      size,
      hasIcon: !!icon,
      hasChildren: !!children,
    })}
  >
    <label className="absolute inset-0">
      <input
        ref={ref}
        onChange={onChange}
        type="checkbox"
        name={name}
        className="absolute inset-0"
        value={value}
        checked={checked}
        style={{ appearance: "none", WebkitAppearance: "none" }}
      />
    </label>

    {icon ? (
      <IconWrapper
        className={clsx(iconWrapperClassName, iconWrapperSizes[size])}
      >
        {icon}
      </IconWrapper>
    ) : null}
    {children}
  </div>
);

type LinkButtonProps = ComponentProps<typeof Link> &
  ButtonPropsBasic & { children?: ReactNode; className?: string };

export const LinkButton = ({
  children,
  className,
  color = "emerald",
  size = "base",
  icon,
  iconWrapperClassName,
  ...props
}: LinkButtonProps) => (
  <Link
    className={getContainerStyles({
      className,
      color,
      size,
      hasIcon: !!icon,
      hasChildren: !!children,
    })}
    {...props}
  >
    {icon ? (
      <IconWrapper
        className={clsx(iconWrapperClassName, iconWrapperSizes[size])}
      >
        {icon}
      </IconWrapper>
    ) : null}
    {children}
  </Link>
);

type LinkNativeButtonProps = React.JSX.IntrinsicElements["a"] &
  ButtonPropsBasic & {
    children?: ReactNode;
    className?: string;
    ref?: Ref<HTMLAnchorElement>;
  };

export const LinkNativeButton = ({
  children,
  className,
  color = "emerald",
  size = "base",
  icon,
  ref,
  iconWrapperClassName,
  ...props
}: LinkNativeButtonProps) => (
  <a
    ref={ref}
    className={getContainerStyles({
      className,
      color,
      size,
      hasIcon: !!icon,
      hasChildren: !!children,
    })}
    {...props}
  >
    {icon ? (
      <IconWrapper
        className={clsx(iconWrapperClassName, iconWrapperSizes[size])}
      >
        {icon}
      </IconWrapper>
    ) : null}
    {children}
  </a>
);

const IconWrapper = tw.span`flex items-center justify-center`;

const getContainerStyles = ({
  color = "emerald",
  isLoading,
  size = "base",
  hasIcon,
  hasChildren,
  className,
}: {
  color?: keyof typeof colors;
  hasIcon: boolean;
  hasChildren: boolean;
  size?: keyof typeof sizes;
  isLoading?: boolean;
  className?: string;
}) =>
  clsx(
    "relative flex cursor-pointer select-none items-center justify-center rounded-md font-medium disabled:pointer-events-none disabled:opacity-30",
    hasIcon
      ? hasChildren
        ? clsx("pr-4", sizes[size])
        : iconWrapperSizes[size]
      : "px-4",
    colors[color],
    isLoading && ["pointer-events-none", loadingColors[color]],
    sizes[size],
    className
  );
