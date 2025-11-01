'use client'

import Tippy, { type TippyProps } from '@aslakson/tippyjs-react'

import React, { useState } from 'react'

import 'tippy.js/dist/tippy.css'

import tw from 'tw-tailwind'

export const Menu = ({ content, children, ...props }: TippyProps) => {
  const [visible, setVisible] = useState(false)

  const show = () => setVisible(true)

  const hide = () => setVisible(false)

  return (
    <Tippy
      arrow={false}
      visible={visible}
      onClickOutside={hide}
      {...props}
      interactive
      hideOnClick="toggle"
      trigger="click"
      className="bg-white! shadow-lg! shadow-gray-150 p-0! rounded-lg!"
      content={<Content onClick={hide}>{content}</Content>}
    >
      {children && React.cloneElement(children, { onClick: visible ? hide : show })}
    </Tippy>
  )
}

const Content = tw.div`grid gap-2 p-1`
