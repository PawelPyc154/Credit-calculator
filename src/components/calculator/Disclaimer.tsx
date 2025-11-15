'use client'

import tw from 'tw-tailwind'

export const Disclaimer = () => {
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

const Wrapper = tw.section`
  w-full
`

const Card = tw.div`
  mx-auto
  max-w-4xl
  rounded-lg
  border border-gray-200
  bg-gray-50
  px-3 py-2.5 sm:px-4 sm:py-3
  shadow-sm
`

const Title = tw.h3`
  mb-2
  text-sm font-semibold text-gray-900
`

const Text = tw.p`
  text-sm text-gray-600
  leading-relaxed
`
