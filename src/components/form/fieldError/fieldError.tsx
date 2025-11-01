import tw from 'tw-tailwind'

interface FieldErrorProps {
  error: string
}

export const FieldError = ({ error }: FieldErrorProps) => {
  return <Container>{error}</Container>
}

const Container = tw.div`text-red-500`
