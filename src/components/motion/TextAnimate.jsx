import { createElement } from 'react'
import { motion } from 'motion/react'
import { prefersReducedMotion } from '@/hooks/useReducedMotion'

/**
 * Text that animates in by character / word / line (same API as Magic UI's <TextAnimate>).
 *   <TextAnimate animation="slideLeft" by="character">Hello</TextAnimate>
 *   <TextAnimate variants={{hidden:…, show:(i)=>…}} by="character">Wavy</TextAnimate>
 * Custom `variants.show` / `hidden` may be functions of the segment index `i`.
 */
const dist = 20
const PRESETS = {
  fadeIn: { hidden: { opacity: 0 }, show: { opacity: 1 } },
  blurIn: { hidden: { opacity: 0, filter: 'blur(10px)' }, show: { opacity: 1, filter: 'blur(0px)' } },
  blurInUp: { hidden: { opacity: 0, filter: 'blur(10px)', y: dist }, show: { opacity: 1, filter: 'blur(0px)', y: 0 } },
  slideUp: { hidden: { opacity: 0, y: dist }, show: { opacity: 1, y: 0 } },
  slideDown: { hidden: { opacity: 0, y: -dist }, show: { opacity: 1, y: 0 } },
  slideLeft: { hidden: { opacity: 0, x: -dist }, show: { opacity: 1, x: 0 } },
  slideRight: { hidden: { opacity: 0, x: dist }, show: { opacity: 1, x: 0 } },
  scaleUp: { hidden: { opacity: 0, scale: 0.5 }, show: { opacity: 1, scale: 1 } },
}
const STAGGER = { character: 0.03, word: 0.07, line: 0.12, text: 0 }

const split = (text, by) => {
  if (by === 'text') return [text]
  if (by === 'line') return text.split('\n')
  return text.split(/(\s+)/).filter(Boolean) // words and the spaces between them
}

export default function TextAnimate({
  children,
  as = 'span',
  by = 'word',
  animation = 'fadeIn',
  variants,
  delay = 0,
  duration = 0.4,
  once = true,
  className,
  style,
}) {
  const text = typeof children === 'string' ? children : String(children ?? '')
  if (prefersReducedMotion()) return createElement(as, { className, style }, text)

  const base = PRESETS[animation] || PRESETS.fadeIn
  const resolve = (v, i) => (typeof v === 'function' ? v(i) : v)
  const stagger = STAGGER[by] ?? 0.05

  const item = {
    hidden: (i) => resolve(variants?.hidden ?? base.hidden, i),
    show: (i) =>
      variants?.show
        ? resolve(variants.show, i)
        : { ...base.show, transition: { delay: delay + i * stagger, duration, ease: [0.22, 1, 0.36, 1] } },
  }

  const parts = split(text, by)
  let idx = 0
  const seg = (s, key) => {
    const i = idx++
    return (
      <motion.span key={key} custom={i} variants={item} style={{ display: 'inline-block', whiteSpace: by === 'line' ? 'pre-wrap' : 'pre' }}>
        {s}
      </motion.span>
    )
  }

  // For character mode keep each word together so lines only break between words.
  const body =
    by === 'character'
      ? text.split(/(\s+)/).filter(Boolean).map((w, wi) =>
          /^\s+$/.test(w) ? (
            <span key={wi}> </span>
          ) : (
            <span key={wi} style={{ display: 'inline-block', whiteSpace: 'nowrap' }}>
              {[...w].map((ch, ci) => seg(ch, `${wi}-${ci}`))}
            </span>
          ),
        )
      : parts.map((p, pi) => (/^\s+$/.test(p) ? <span key={pi}> </span> : seg(p, pi)))

  const Tag = motion[as] || motion.span
  return (
    <Tag className={className} style={style} aria-label={text} initial="hidden" whileInView="show" viewport={{ once, amount: 0.3 }}>
      <span aria-hidden="true">{body}</span>
    </Tag>
  )
}
