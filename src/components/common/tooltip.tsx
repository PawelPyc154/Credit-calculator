import Tippy, { type TippyProps } from '@tippyjs/react'
import 'tippy.js/dist/tippy.css'

export const Tooltip = (props: TippyProps) => (
  <Tippy
    {...props}
    theme="light"
    interactive={true}
    maxWidth={400}
    placement="top"
    className="custom-tooltip"
    appendTo={() => document.body}
    zIndex={9999}
  />
)
