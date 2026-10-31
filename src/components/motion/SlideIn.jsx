import { useEffect, useRef } from 'react'

/* `at`    = how much of the section (as a fraction of its height, capped at one screen) must be visible before it slides in
   `early` = start the slide while the section is still below the screen, so it has arrived when you get there */
export default function SlideIn({ from = 'right', at = 0.88, early = false, className = '', children, ...rest }) {
  const outer = useRef(null)
  const inner = useRef(null)

  useEffect(() => {
    const box = outer.current
    const el = inner.current
    if (!box || !el) return undefined
    if (!('IntersectionObserver' in window)) { el.classList.add('in'); return undefined }
    const steps = Array.from({ length: 41 }, (_, i) => i / 40)
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) { el.classList.remove('in'); return }
      const need = Math.min(e.boundingClientRect.height, window.innerHeight) * at
      if (e.intersectionRect.height >= need) el.classList.add('in')
    }, { threshold: steps, rootMargin: early ? '0px 0px 45% 0px' : '0px' })
    io.observe(box)
    return () => io.disconnect()
  }, [at, early])

  return (
    <div ref={outer} className="slidein-box" {...rest}>
      <div ref={inner} className={`slidein from-${from} ${className}`.trim()}>{children}</div>
    </div>
  )
}