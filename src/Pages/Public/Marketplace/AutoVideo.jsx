import { useEffect } from 'react'

/** Muted looping video that starts by itself (and again on first touch/scroll, for browsers that block autoplay). */
export function useAutoplay(ref) {
  useEffect(() => {
    const v = ref.current
    if (!v) return undefined
    const kick = () => {
      v.muted = true
      v.playsInline = true
      const pr = v.play()
      if (pr) pr.catch(() => {})
    }
    kick()
    const canplay = () => {
      if (v.paused && !v.dataset.user) kick()
    }
    v.addEventListener('canplay', canplay, { once: true })
    let vio
    if ('IntersectionObserver' in window) {
      vio = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && !v.dataset.user && kick()), { threshold: 0.2 })
      vio.observe(v)
    }
    const evs = ['pointerdown', 'keydown', 'scroll']
    const again = () => {
      if (v.paused && !v.dataset.user) kick()
    }
    evs.forEach((ev) => window.addEventListener(ev, again, { once: true, passive: true }))
    return () => {
      v.removeEventListener('canplay', canplay)
      vio?.disconnect()
      evs.forEach((ev) => window.removeEventListener(ev, again))
    }
  }, [ref])
}
