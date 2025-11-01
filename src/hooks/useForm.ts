import { zodResolver } from "@hookform/resolvers/zod";
import {
	type FieldValues,
	type UseFormProps,
	type UseFormReturn,
	useForm as useFormBase,
} from "react-hook-form";

import type { z } from "zod";

type FormSchema = z.ZodType<FieldValues>;

export const useForm = <TSchema extends FormSchema>(
	props: Omit<UseFormProps<z.infer<TSchema>>, "resolver"> & {
		schema: TSchema;
	},
): UseFormReturn<z.infer<TSchema>> => {
	return useFormBase<z.infer<TSchema>>({
		...props,
		// @ts-expect-error - Zod v4 type incompatibility with @hookform/resolvers
		resolver: zodResolver(props.schema),
	}) as UseFormReturn<z.infer<TSchema>>;
};
