import { useEffect, useRef } from 'react'
import { prefersReducedMotion } from '@/hooks/useReducedMotion'

/** Animated dot grid behind every hero. Fades in towards the right, pulses softly. Colour = --c or --accent. */
export default function HeroDots() {
  const ref = useRef(null)

  useEffect(() => {
    const cv = ref.current
    if (!cv) return
    const ctx = cv.getContext('2d')
    let raf = 0
    let stop = false

    const start = () => {
      cancelAnimationFrame(raf)
      const dpr = Math.min(2, window.devicePixelRatio || 1)
      const r = cv.getBoundingClientRect()
      if (!r.width) return
      cv.width = r.width * dpr
      cv.height = r.height * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const cs = getComputedStyle(cv.closest('[style*="--c"]') || document.documentElement)
      const col = cs.getPropertyValue('--c').trim() || cs.getPropertyValue('--accent').trim()
      const gap = 28
      const pts = []
      for (let y = gap / 2; y < r.height; y += gap)
        for (let x = gap / 2; x < r.width; x += gap) pts.push([x, y, Math.random() * 6.28])
      let t = 0
      const frame = () => {
        ctx.clearRect(0, 0, r.width, r.height)
        ctx.fillStyle = col
        pts.forEach(([x, y, ph]) => {
          const fade = Math.pow(Math.max(0, x / r.width), 1.6)
          ctx.globalAlpha = (0.06 + 0.3 * (0.5 + 0.5 * Math.sin(t / 50 + ph + x / 120))) * fade
          ctx.beginPath()
          ctx.arc(x, y, 1.7, 0, 6.28)
          ctx.fill()
        })
        ctx.globalAlpha = 1
        t++
        if (!stop && !prefersReducedMotion()) raf = requestAnimationFrame(frame)
      }
      frame()
    }

    start()
    // redraw on resize and when the theme (accent colour) changes
    let timer
    const onResize = () => {
      clearTimeout(timer)
      timer = setTimeout(start, 150)
    }
    window.addEventListener('resize', onResize)
    const mo = new MutationObserver(start)
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })
    return () => {
      stop = true
      cancelAnimationFrame(raf)
      clearTimeout(timer)
      window.removeEventListener('resize', onResize)
      mo.disconnect()
    }
  }, [])

  return <canvas ref={ref} className="dots" aria-hidden="true" />
}
