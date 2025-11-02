"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import tw from "tw-tailwind";
import {
  type CalculatorFormData,
  calculatorFormSchema,
} from "types/calculator";
import { formatCurrency } from "utils/calculator";

export type CalculatorFormProps = {
  onCalculate: (data: CalculatorFormData) => void;
  hasResults: boolean;
};

export const CalculatorForm = ({
  onCalculate,
  hasResults,
}: CalculatorFormProps) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<CalculatorFormData>({
    resolver: zodResolver(calculatorFormSchema),
    mode: "onChange", // Walidacja przy każdej zmianie
    defaultValues: {
      loanAmount: 500000,
      loanPeriod: 25,
      downPayment: 100000,
      monthlyIncome: 8000,
      purpose: "purchase",
    },
  });

  const formData = watch(); // Obserwuj wszystkie pola

  // Automatyczne obliczenia przy zmianie wartości
  useEffect(() => {
    if (isValid) {
      onCalculate(formData);
    }
  }, [formData, isValid, onCalculate]);

  const loanAmount = watch("loanAmount");
  const loanPeriod = watch("loanPeriod");
  const downPayment = watch("downPayment");
  const monthlyIncome = watch("monthlyIncome");

  const scrollToResults = () => {
    document.getElementById("results")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <FormCard>
      <FormHeader>
        <FormTitle>Kalkulator kredytu hipotecznego</FormTitle>
        <FormSubtitle>Dopasuj parametry kredytu do swoich potrzeb</FormSubtitle>
      </FormHeader>

      <Form onSubmit={handleSubmit(scrollToResults)}>
        <FormGrid>
          {/* Kwota kredytu */}
          <FormGroup>
            <LabelRow>
              <Label htmlFor="loanAmount">Kwota kredytu</Label>
              <ValueDisplay>{formatCurrency(loanAmount)}</ValueDisplay>
            </LabelRow>
            <SliderInput
              id="loanAmount"
              type="range"
              min="50000"
              max="2000000"
              step="10000"
              {...register("loanAmount", { valueAsNumber: true })}
              className={clsx(errors.loanAmount && "border-red-500")}
            />
            <SliderLabels>
              <SliderLabel>50 tys. zł</SliderLabel>
              <SliderLabel>2 mln zł</SliderLabel>
            </SliderLabels>
            {errors.loanAmount && (
              <ErrorMessage>{errors.loanAmount.message}</ErrorMessage>
            )}
          </FormGroup>

          {/* Okres kredytowania */}
          <FormGroup>
            <LabelRow>
              <Label htmlFor="loanPeriod">Okres kredytowania</Label>
              <ValueDisplay>{loanPeriod} lat</ValueDisplay>
            </LabelRow>
            <SliderInput
              id="loanPeriod"
              type="range"
              min="5"
              max="35"
              step="1"
              {...register("loanPeriod", { valueAsNumber: true })}
              className={clsx(errors.loanPeriod && "border-red-500")}
            />
            <SliderLabels>
              <SliderLabel>5 lat</SliderLabel>
              <SliderLabel>35 lat</SliderLabel>
            </SliderLabels>
            {errors.loanPeriod && (
              <ErrorMessage>{errors.loanPeriod.message}</ErrorMessage>
            )}
          </FormGroup>

          {/* Wkład własny */}
          <FormGroup>
            <LabelRow>
              <Label htmlFor="downPayment">Wkład własny</Label>
              <ValueDisplay>{formatCurrency(downPayment)}</ValueDisplay>
            </LabelRow>
            <SliderInput
              id="downPayment"
              type="range"
              min="0"
              max="1000000"
              step="10000"
              {...register("downPayment", { valueAsNumber: true })}
              className={clsx(errors.downPayment && "border-red-500")}
            />
            <SliderLabels>
              <SliderLabel>0 zł</SliderLabel>
              <SliderLabel>1 mln zł</SliderLabel>
            </SliderLabels>
            {errors.downPayment && (
              <ErrorMessage>{errors.downPayment.message}</ErrorMessage>
            )}
          </FormGroup>

          {/* Dochód miesięczny */}
          <FormGroup>
            <LabelRow>
              <Label htmlFor="monthlyIncome">Dochód miesięczny</Label>
              <ValueDisplay>{formatCurrency(monthlyIncome)}</ValueDisplay>
            </LabelRow>
            <SliderInput
              id="monthlyIncome"
              type="range"
              min="3000"
              max="30000"
              step="500"
              {...register("monthlyIncome", { valueAsNumber: true })}
              className={clsx(errors.monthlyIncome && "border-red-500")}
            />
            <SliderLabels>
              <SliderLabel>3 tys. zł</SliderLabel>
              <SliderLabel>30 tys. zł</SliderLabel>
            </SliderLabels>
            {errors.monthlyIncome && (
              <ErrorMessage>{errors.monthlyIncome.message}</ErrorMessage>
            )}
          </FormGroup>

          {/* Cel kredytu */}
          <FormGroup className="md:col-span-2">
            <Label htmlFor="purpose">Cel kredytu</Label>
            <PurposeGrid>
              <PurposeOption>
                <PurposeRadio
                  type="radio"
                  id="purchase"
                  value="purchase"
                  {...register("purpose")}
                />
                <PurposeLabel htmlFor="purchase">
                  <PurposeIcon>🏠</PurposeIcon>
                  <PurposeText>Zakup nieruchomości</PurposeText>
                </PurposeLabel>
              </PurposeOption>

              <PurposeOption>
                <PurposeRadio
                  type="radio"
                  id="refinancing"
                  value="refinancing"
                  {...register("purpose")}
                />
                <PurposeLabel htmlFor="refinancing">
                  <PurposeIcon>🔄</PurposeIcon>
                  <PurposeText>Refinansowanie</PurposeText>
                </PurposeLabel>
              </PurposeOption>

              <PurposeOption>
                <PurposeRadio
                  type="radio"
                  id="construction"
                  value="construction"
                  {...register("purpose")}
                />
                <PurposeLabel htmlFor="construction">
                  <PurposeIcon>🏗️</PurposeIcon>
                  <PurposeText>Budowa</PurposeText>
                </PurposeLabel>
              </PurposeOption>
            </PurposeGrid>
            {errors.purpose && (
              <ErrorMessage>{errors.purpose.message}</ErrorMessage>
            )}
          </FormGroup>
        </FormGrid>

        {hasResults && (
          <SubmitButton type="submit">
            <ButtonIcon>👇</ButtonIcon>
            Zobacz porównanie ofert
          </SubmitButton>
        )}
      </Form>
    </FormCard>
  );
};

const FormCard = tw.div`w-full max-w-5xl mx-auto bg-white rounded-2xl shadow-2xl p-8 md:p-10 -mt-16 relative z-10 border border-gray-100`;
const FormHeader = tw.div`mb-8 text-center`;
const FormTitle = tw.h2`text-3xl md:text-4xl font-bold text-gray-900 mb-2`;
const FormSubtitle = tw.p`text-gray-600 text-lg`;

const Form = tw.form`space-y-8`;
const FormGrid = tw.div`grid grid-cols-1 md:grid-cols-2 gap-8`;
const FormGroup = tw.div`flex flex-col space-y-3`;
const LabelRow = tw.div`flex justify-between items-center`;
const Label = tw.label`text-sm font-semibold text-gray-700 uppercase tracking-wide`;
const ValueDisplay = tw.span`text-lg font-bold text-blue-600`;

const SliderInput = tw.input`
  w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer
  [&::-webkit-slider-thumb]:appearance-none
  [&::-webkit-slider-thumb]:w-5
  [&::-webkit-slider-thumb]:h-5
  [&::-webkit-slider-thumb]:rounded-full
  [&::-webkit-slider-thumb]:bg-blue-600
  [&::-webkit-slider-thumb]:cursor-pointer
  [&::-webkit-slider-thumb]:shadow-lg
  [&::-webkit-slider-thumb]:transition-all
  [&::-webkit-slider-thumb]:hover:bg-blue-700
  [&::-webkit-slider-thumb]:hover:scale-110
  [&::-moz-range-thumb]:w-5
  [&::-moz-range-thumb]:h-5
  [&::-moz-range-thumb]:rounded-full
  [&::-moz-range-thumb]:bg-blue-600
  [&::-moz-range-thumb]:border-0
  [&::-moz-range-thumb]:cursor-pointer
  [&::-moz-range-thumb]:shadow-lg
  [&::-moz-range-thumb]:transition-all
  [&::-moz-range-thumb]:hover:bg-blue-700
  [&::-moz-range-thumb]:hover:scale-110
`;

const SliderLabels = tw.div`flex justify-between text-xs text-gray-500`;
const SliderLabel = tw.span``;
const ErrorMessage = tw.p`text-sm text-red-600`;

const PurposeGrid = tw.div`grid grid-cols-3 gap-4`;
const PurposeOption = tw.div`relative`;
const PurposeRadio = tw.input`peer absolute opacity-0`;
const PurposeLabel = tw.label`
  flex flex-col items-center justify-center p-4 border-2 border-gray-200 rounded-xl cursor-pointer
  transition-all duration-200
  peer-checked:border-blue-600 peer-checked:bg-blue-50 peer-checked:shadow-md
  hover:border-blue-300 hover:bg-gray-50
`;
const PurposeIcon = tw.span`text-3xl mb-2`;
const PurposeText = tw.span`text-sm font-medium text-gray-700 text-center`;

const SubmitButton = tw.button`
  w-full bg-linear-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800
  text-white font-bold py-5 px-8 rounded-xl
  transition-all duration-200 text-lg
  shadow-lg hover:shadow-xl
  flex items-center justify-center gap-3
  transform hover:scale-[1.02] active:scale-[0.98]
`;

const ButtonIcon = tw.span`text-xl`;
