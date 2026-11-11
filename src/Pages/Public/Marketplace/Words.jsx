import { Children, cloneElement, isValidElement, useEffect, useRef, useState } from 'react'
import { cx } from './util'

/** Headline whose words slide in one after another the first time it scrolls into view. */
export default function W({ as: Tag = 'h2', className = '', style, children }) {
  const ref = useRef(null)
  const [go, setGo] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el || !('IntersectionObserver' in window)) {
      setGo(true)
      return undefined
    }
    const io = new IntersectionObserver(
      (es) =>
        es.forEach((e) => {
          if (e.isIntersecting) {
            setGo(true)
            io.disconnect()
          }
        }),
      { threshold: 0.35 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  let n = 0
  const walk = (node) =>
    Children.map(node, (ch) => {
      if (typeof ch === 'string') {
        return ch
          .split(/(\s+)/)
          .filter(Boolean)
          .map((t, i) =>
            /^\s+$/.test(t) ? (
              t
            ) : (
              <span key={i} className="mk-wd" style={{ animationDelay: `${n++ * 0.06}s` }}>
                {t}
              </span>
            ),
          )
      }
      if (isValidElement(ch) && ch.type !== 'br') return cloneElement(ch, undefined, walk(ch.props.children))
      return ch
    })

  return (
    <Tag ref={ref} className={cx('w', go && 'go', className)} style={style}>
      {walk(children)}
    </Tag>
  )
}
