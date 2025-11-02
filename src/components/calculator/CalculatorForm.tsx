"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import { useForm } from "react-hook-form";
import tw from "tw-tailwind";
import {
  type CalculatorFormData,
  calculatorFormSchema,
} from "types/calculator";

export type CalculatorFormProps = {
  onSubmit: (data: CalculatorFormData) => void;
  isLoading?: boolean;
};

export const CalculatorForm = ({
  onSubmit,
  isLoading = false,
}: CalculatorFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CalculatorFormData>({
    resolver: zodResolver(calculatorFormSchema),
    defaultValues: {
      loanAmount: 500000,
      loanPeriod: 25,
      downPayment: 100000,
      monthlyIncome: 8000,
      purpose: "purchase",
    },
  });

  return (
    <FormCard>
      <FormTitle>📋 Wypełnij formularz</FormTitle>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormGroup>
          <Label htmlFor="loanAmount">Kwota kredytu (zł)</Label>
          <Input
            id="loanAmount"
            type="number"
            step="10000"
            {...register("loanAmount", { valueAsNumber: true })}
            className={clsx(errors.loanAmount && "border-red-500")}
          />
          {errors.loanAmount && (
            <ErrorMessage>{errors.loanAmount.message}</ErrorMessage>
          )}
        </FormGroup>

        <FormGroup>
          <Label htmlFor="loanPeriod">Okres kredytowania (lata)</Label>
          <Input
            id="loanPeriod"
            type="number"
            step="1"
            {...register("loanPeriod", { valueAsNumber: true })}
            className={clsx(errors.loanPeriod && "border-red-500")}
          />
          {errors.loanPeriod && (
            <ErrorMessage>{errors.loanPeriod.message}</ErrorMessage>
          )}
        </FormGroup>

        <FormGroup>
          <Label htmlFor="downPayment">Wkład własny (zł)</Label>
          <Input
            id="downPayment"
            type="number"
            step="10000"
            {...register("downPayment", { valueAsNumber: true })}
            className={clsx(errors.downPayment && "border-red-500")}
          />
          {errors.downPayment && (
            <ErrorMessage>{errors.downPayment.message}</ErrorMessage>
          )}
        </FormGroup>

        <FormGroup>
          <Label htmlFor="monthlyIncome">Dochód miesięczny (zł)</Label>
          <Input
            id="monthlyIncome"
            type="number"
            step="1000"
            {...register("monthlyIncome", { valueAsNumber: true })}
            className={clsx(errors.monthlyIncome && "border-red-500")}
          />
          {errors.monthlyIncome && (
            <ErrorMessage>{errors.monthlyIncome.message}</ErrorMessage>
          )}
        </FormGroup>

        <FormGroup>
          <Label htmlFor="purpose">Cel kredytu</Label>
          <Select
            id="purpose"
            {...register("purpose")}
            className={clsx(errors.purpose && "border-red-500")}
          >
            <option value="purchase">Zakup nieruchomości</option>
            <option value="refinancing">Refinansowanie</option>
            <option value="construction">Budowa</option>
          </Select>
          {errors.purpose && (
            <ErrorMessage>{errors.purpose.message}</ErrorMessage>
          )}
        </FormGroup>

        <SubmitButton type="submit" disabled={isLoading}>
          {isLoading ? "Obliczam..." : "🔍 Oblicz najlepsze oferty"}
        </SubmitButton>
      </Form>
    </FormCard>
  );
};

const FormCard = tw.div`w-full max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6 md:p-8 -mt-8 relative z-10`;
const FormTitle = tw.h2`text-2xl font-bold text-gray-800 mb-6`;
const Form = tw.form`space-y-6`;
const FormGroup = tw.div`flex flex-col space-y-2`;
const Label = tw.label`text-sm font-semibold text-gray-700`;
const Input = tw.input`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition`;
const Select = tw.select`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition bg-white`;
const ErrorMessage = tw.p`text-sm text-red-600`;
const SubmitButton = tw.button`w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-bold py-4 px-6 rounded-lg transition duration-200 text-lg`;
