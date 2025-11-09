'use client'

import Image from 'next/image'
import { useCallback, useMemo, useState } from 'react'
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md'
import tw from 'tw-tailwind'
import { Button } from '../form/button/button'

export interface SliderProps {
  images: { name: string; src: string }[]
}

export const Slider = ({ images }: SliderProps) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const totalSlides = images.length
  const isSingleSlide = totalSlides <= 1

  const clampedIndex = useCallback(
    (index: number) => Math.min(Math.max(index, 0), Math.max(totalSlides - 1, 0)),
    [totalSlides],
  )

  const goToSlide = useCallback(
    (index: number) => {
      setCurrentIndex((prev) => {
        const normalized = clampedIndex(index)
        return prev === normalized ? prev : normalized
      })
    },
    [clampedIndex],
  )

  const handlePrevious = useCallback(() => {
    goToSlide(currentIndex - 1)
  }, [currentIndex, goToSlide])

  const handleNext = useCallback(() => {
    goToSlide(currentIndex + 1)
  }, [currentIndex, goToSlide])

  const slideTransform = useMemo(
    () => ({ transform: `translateX(-${currentIndex * 100}%)` }),
    [currentIndex],
  )

  return (
    <Container
      role="region"
      aria-roledescription="karuzela"
      aria-label="Galeria banków"
      data-count={totalSlides}
    >
      <Viewport>
        <Slides style={slideTransform}>
          {images.map(({ src, name }, index) => {
            const isActive = index === currentIndex
            return (
              <Slide
                key={`${name}-${index}`}
                aria-hidden={!isActive}
                aria-current={isActive}
                tabIndex={isActive ? 0 : -1}
              >
                <Image
                  src={src}
                  alt={name}
                  height={1080}
                  width={1920}
                  className="aspect-video h-full w-full object-contain"
                  priority={index === 0 || Math.abs(index - currentIndex) <= 1}
                  unoptimized={index === 0}
                />
              </Slide>
            )
          })}
        </Slides>
      </Viewport>

      {!isSingleSlide && (
        <>
          <Pagination>
            {images.map(({ name }, index) => {
              const isActive = index === currentIndex
              return (
                <DotButton
                  key={`${name}-dot-${index}`}
                  type="button"
                  aria-label={`Przejdź do slajdu ${index + 1}`}
                  aria-pressed={isActive}
                  data-active={isActive ? 'true' : 'false'}
                  onClick={() => goToSlide(index)}
                />
              )
            })}
          </Pagination>

          <ControlButton
            aria-label="Poprzedni slajd"
            disabled={currentIndex <= 0}
            className="left-4"
            icon={<MdKeyboardArrowLeft size={24} />}
            color="blackOutline"
            onClick={handlePrevious}
          />

          <ControlButton
            aria-label="Następny slajd"
            disabled={currentIndex >= totalSlides - 1}
            className="right-4"
            icon={<MdKeyboardArrowRight size={24} />}
            color="blackOutline"
            onClick={handleNext}
          />
        </>
      )}
    </Container>
  )
}

const Container = tw.div`relative w-full overflow-hidden rounded-xl bg-slate-900/5`
const Viewport = tw.div`relative w-full overflow-hidden`
const Slides = tw.div`flex transition-transform duration-500 ease-out`
const Slide = tw.div`flex w-full shrink-0 grow-0 items-center justify-center bg-slate-900/70 px-4 py-2 sm:px-6`
const Pagination = tw.div`absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-2 rounded-full bg-slate-950/60 px-3 py-2 backdrop-blur`
const DotButton = tw.button`
  h-2.5 w-2.5 rounded-full border border-white/40 transition
  data-[active='true']:scale-125 data-[active='true']:border-white data-[active='true']:bg-white
  hover:border-white hover:bg-white/80 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60
`
const ControlButton = tw(Button)`absolute! top-1/2! -translate-y-1/2! shadow-lg! shadow-slate-900/20!`
