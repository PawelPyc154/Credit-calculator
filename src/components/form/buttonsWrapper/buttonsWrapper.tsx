import type { ReactNode } from 'react'

import tw from 'tw-tailwind'

interface ButtonsWrapperProps {
  children: ReactNode
  className?: string
}

export const ButtonsWrapper = ({ children, className }: ButtonsWrapperProps) => (
  <Container className={className}>{children}</Container>
)

const Container = tw.div`flex gap-2`
