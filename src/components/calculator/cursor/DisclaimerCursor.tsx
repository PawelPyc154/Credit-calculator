'use client'

import tw from 'tw-tailwind'

export const DisclaimerCursor = () => {
  return (
    <Wrapper>
      <Card>
        <Title>Informacja</Title>
        <Text>
          Wyniki mają charakter poglądowy. Ostateczne warunki kredytu otrzymasz bezpośrednio w banku
          po analizie Twojej sytuacji finansowej.
        </Text>
      </Card>
    </Wrapper>
  )
}

const Wrapper = tw.section`w-full`

const Card = tw.div`
  mx-auto
  max-w-4xl
  rounded-xl
  border border-gray-200
  bg-white
  px-4 py-3
  text-sm text-gray-600
`

const Title = tw.h3`mb-2 text-sm font-semibold text-gray-900`

const Text = tw.p`leading-relaxed`
