import { useLocation } from 'react-router-dom'
import TextAnimate from './TextAnimate'
import { textStyleFor } from '@/utils/textStyle'

/**
 * Heading / sub-heading text with the animation chosen for the current page
 * (see utils/textStyle.js).  <AText as="h2">Title</AText>   <AText as="p" sub>Description</AText>
 * `sub` = longer text: animates by word instead of by character.
 */
const Plain = ({ as: Tag = 'span', children, ...rest }) => <Tag {...rest}>{children}</Tag>

export default function AText({ as = 'span', sub, delay = 0, children, ...props }) {
  const { pathname } = useLocation()
  if (typeof children !== 'string') return <Plain as={as} {...props}>{children}</Plain>
  const s = textStyleFor(pathname)
  const by = sub ? 'word' : s.by
  const extra = s.variants ? { variants: sub ? s.subVariants : s.variants } : { animation: s.animation }
  return (
    <TextAnimate as={as} by={by} delay={delay} {...extra} {...props}>
      {children}
    </TextAnimate>
  )
}
