'use client'

import { useAutoAnimate } from '@formkit/auto-animate/react'
import type { ReactNode } from 'react'
import tw from 'tw-tailwind'

import { FieldError } from '../fieldError/fieldError'
import { Label } from '../label/label'

export type FieldWrapperProps = {
  label?: ReactNode
  className?: string
  error?: string
  isRequired?: boolean
  children: ReactNode
}

export const FieldWrapper = ({
  label,
  className,
  error,
  isRequired,
  children,
}: FieldWrapperProps) => {
  const [animationParent] = useAutoAnimate<HTMLDivElement>()

  return (
    <Container className={className} ref={animationParent}>
      {label && <Label isRequired={isRequired}>{label}</Label>}
      {children}
      {error && <FieldError error={error} />}
    </Container>
  )
}

const Container = tw.div`text-sm w-full grid gap-1 content-start`
