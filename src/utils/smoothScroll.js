import Lenis from 'lenis'
import gsap from 'gsap'
import { prefersReducedMotion } from '@/hooks/useReducedMotion'

/**
 * Smooth (inertia) scrolling for the whole site, driven by GSAP's ticker.
 * One instance. Start it once from the layout; use scrollToTop / scrollToY for programmatic scrolls.
 */
let lenis = null
let tick = null

export function startSmoothScroll() {
  if (lenis || prefersReducedMotion()) return
  lenis = new Lenis({ duration: 1.15, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), smoothWheel: true })
  tick = (time) => lenis?.raf(time * 1000)
  gsap.ticker.add(tick)
  gsap.ticker.lagSmoothing(0)
}

export function stopSmoothScroll() {
  if (tick) gsap.ticker.remove(tick)
  lenis?.destroy()
  lenis = null
  tick = null
}

export const scrollToTop = () => (lenis ? lenis.scrollTo(0, { immediate: true }) : window.scrollTo(0, 0))

export const scrollToY = (y) =>
  lenis ? lenis.scrollTo(y, { duration: 1 }) : window.scrollTo({ top: y, behavior: prefersReducedMotion() ? 'auto' : 'smooth' })
