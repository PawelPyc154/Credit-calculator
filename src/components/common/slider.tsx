'use client'

import Image from 'next/image'
import { useState } from 'react'
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md'
import tw from 'tw-tailwind'
import { Button } from '../form/button/button'

export interface SliderProps {
  images: { name: string; src: string }[]
}

export const Slider = ({ images }: SliderProps) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  return (
    <Container>
      {images.map(({ src, name }, index) => (
        <ImageWrapper key={name} style={{ translate: `-${currentIndex * 100}%` }}>
          <Image
            src={src}
            alt={name}
            height={1080}
            width={1920}
            className="aspect-video object-contain"
            priority={index === 0 || index === currentIndex + 1 || index === currentIndex + 2}
            unoptimized={!index}
          />
        </ImageWrapper>
      ))}
      <DotListWrapper>
        {images.map(({ name }, index) => (
          <DowWrapper
            aria-label={`Go slide ${index + 1}`}
            onClick={() => {
              setCurrentIndex(index)
            }}
            key={name}
            className={currentIndex === index ? 'bg-white' : ''}
          />
        ))}
      </DotListWrapper>

      <ButtonStyled
        aria-label="Previous slide"
        disabled={currentIndex <= 0}
        className="left-4"
        icon={<MdKeyboardArrowLeft size={26} />}
        color="blackOutline"
        onClick={() => {
          setCurrentIndex((prev) => (prev <= 0 ? 0 : prev - 1))
        }}
      />

      <ButtonStyled
        aria-label="Next slide"
        disabled={currentIndex >= images.length - 1}
        className="right-4"
        icon={<MdKeyboardArrowRight size={26} />}
        color="blackOutline"
        onClick={() => {
          setCurrentIndex((prev) => (prev >= images.length - 1 ? images.length - 1 : prev + 1))
        }}
      />
    </Container>
  )
}

const Container = tw.div`relative w-full h-full overflow-hidden flex`
const ImageWrapper = tw.div`w-full shrink-0 grow-0 flex justify-center items-center transition-all select-none`
const DotListWrapper = tw.div`absolute bottom-0 left-1/2 -translate-x-1/2 p-2 flex gap-2`
const DowWrapper = tw.button`border-2 p-2 border-white rounded-full hover:bg-white`
const ButtonStyled = tw(Button)`absolute! top-1/2! -translate-y-1/2!`
