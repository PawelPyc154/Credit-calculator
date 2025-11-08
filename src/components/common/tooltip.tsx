import Tippy, { type TippyProps } from '@tippyjs/react'
import 'tippy.js/dist/tippy.css'

export const Tooltip = (props: TippyProps) => (
  <Tippy
    {...props}
    theme="light-border"
    interactive={true}
    maxWidth={320}
    placement="top"
    className="custom-tooltip"
    appendTo={() => document.body}
    zIndex={9999}
    delay={[100, 0]}
    duration={[200, 150]}
  />
)
