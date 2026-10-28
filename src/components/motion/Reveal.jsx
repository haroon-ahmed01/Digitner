import { useReveal } from '@/hooks/useReveal'

/** Fades/slides children in when scrolled into view. <Reveal as="article" className="card">…</Reveal> */
export default function Reveal({ as: Tag = 'div', className = '', delay, style, children, ...props }) {
  const [ref, shown] = useReveal()
  const st = delay ? { ...style, transitionDelay: `${delay}ms` } : style
  return (
    <Tag ref={ref} className={`${className} rv${shown ? ' in' : ''}`.trim()} style={st} {...props}>
      {children}
    </Tag>
  )
}
