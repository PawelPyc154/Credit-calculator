import clsx from "clsx";
import type { ReactNode, Ref } from "react";
import tw from "tw-tailwind";

import { FieldWrapper } from "../fieldWrapper/fieldWrapper";

const colors = { white: tw`bg-white `, gray: tw`bg-gray-200` };

export type InputProps = Pick<
	React.JSX.IntrinsicElements["input"],
	"type" | "onChange" | "onBlur" | "value" | "name" | "placeholder" | "disabled"
> & {
	label?: string;

	icon?: ReactNode;

	error?: string;

	className?: string;

	isRequired?: boolean;

	color?: keyof typeof colors;

	ref?: Ref<HTMLInputElement>;
};

export const Input = ({
	label,
	className,
	icon,
	color = "white",
	error,
	isRequired,
	disabled,
	ref,
	...props
}: InputProps) => (
	<FieldWrapper
		className={clsx(disabled && "opacity-50", className)}
		error={error}
		isRequired={isRequired}
		label={label}
	>
		<Wrapper>
			<InputStyled
				className={clsx([colors[color], !!icon && "pl-10"])}
				disabled={disabled}
				{...props}
				ref={ref}
			/>

			<IconWrapper>{icon}</IconWrapper>
		</Wrapper>
	</FieldWrapper>
);

const Wrapper = tw.div`relative`;

const InputStyled = tw.input`bg-white rounded-lg px-3 h-11 flex border border-gray-300 items-center w-full pb-px`;

const IconWrapper = tw.div`absolute text-xl h-10 px-3 flex justify-center items-center top-1/2 left-0 -translate-y-1/2`;
