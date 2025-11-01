import Image from 'next/image'
import { type ChangeEventHandler, type ReactNode, useMemo } from 'react'
import { AiOutlineFileAdd } from 'react-icons/ai'
import { MdOutlineDelete } from 'react-icons/md'
import tw from 'tw-tailwind'
import { Button } from '../button/button'
import { FieldWrapper } from '../fieldWrapper/fieldWrapper'

export type FileInputProps = {
  icon?: ReactNode
  error?: string
  label?: string
  text?: string
  requirements?: string
  className?: string
  wrapperClassName?: string
  isRequired?: boolean
  value?: File | string
  onChange?: ChangeEventHandler<HTMLInputElement> | undefined
  onClickRemoveFile?: () => void
  ref?: React.Ref<HTMLInputElement>
}
export const FileInput = ({
  label,
  className,
  wrapperClassName,
  requirements,
  text,
  onChange,
  onClickRemoveFile,
  error,
  isRequired,
  value,
  ref,
  ...props
}: FileInputProps) => {
  const url = useMemo(
    () => (typeof value === 'string' || !value ? value || '' : URL.createObjectURL(value)),
    [value],
  )
  return (
    <FieldWrapper className={className} error={error} isRequired={isRequired} label={label}>
      <Wrapper className={wrapperClassName}>
        {!url ? (
          <>
            <InputStyled
              type="file"
              className={className}
              onChange={onChange}
              {...props}
              ref={ref}
            />

            <AiOutlineFileAdd size={40} className={'text-gray-500 '} />
            <TextWrapper>{text}</TextWrapper>
          </>
        ) : (
          <ImageWrapper>
            <Image unoptimized src={url} alt="" layout="fill" objectFit="cover" />
            <DeleteButtonWrapper>
              <Button
                icon={<MdOutlineDelete size="22" />}
                color="red"
                onClick={onClickRemoveFile}
              />
            </DeleteButtonWrapper>
          </ImageWrapper>
        )}
      </Wrapper>
      {requirements}
    </FieldWrapper>
  )
}

const Wrapper = tw.div`border-gray-300 border border-dashed p-4 hover:border-gray-700 relative flex justify-center items-center gap-4`
const TextWrapper = tw.div`font-semibold`
const InputStyled = tw.input`bg-transparent absolute inset-0 opacity-0 cursor-pointer`
const ImageWrapper = tw.div`rounded-md overflow-hidden relative h-full w-full`
const DeleteButtonWrapper = tw.div`bg-white bg-opacity-0 hover:bg-opacity-30  opacity-0 hover:opacity-100 absolute inset-0 flex items-center justify-center`
