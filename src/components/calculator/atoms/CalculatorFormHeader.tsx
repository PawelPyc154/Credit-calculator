import tw from 'tw-tailwind'

export const CalculatorFormHeader = () => {
  return (
    <FormHeader>
      <FormTitle>Kalkulator kredytu hipotecznego</FormTitle>
      <FormSubtitle>Dopasuj parametry kredytu do swoich potrzeb</FormSubtitle>
    </FormHeader>
  )
}

const FormHeader = tw.div`mb-8 text-center`
const FormTitle = tw.h2`text-3xl md:text-4xl font-bold text-gray-900 mb-2`
const FormSubtitle = tw.p`text-gray-600 text-lg`
