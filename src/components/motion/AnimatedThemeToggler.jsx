import { useRef } from 'react'
import { flushSync } from 'react-dom'
import { useTheme } from '@/hooks/useTheme'
import { prefersReducedMotion } from '@/hooks/useReducedMotion'

const SUN = (
  <>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
  </>
)
const MOON = <path d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5Z" />

/** Theme button. The new theme spreads out from the button as a circle (View Transitions API). */
export default function AnimatedThemeToggler({ duration = 650 }) {
  const { theme, toggle } = useTheme()
  const ref = useRef(null)
  const toDark = theme === 'light'

  const onClick = async () => {
    const btn = ref.current
    if (!btn || !document.startViewTransition || prefersReducedMotion()) {
      toggle()
      return
    }
    const { top, left, width, height } = btn.getBoundingClientRect()
    const x = left + width / 2
    const y = top + height / 2
    const r = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y))
    const transition = document.startViewTransition(() => flushSync(toggle))
    await transition.ready
    document.documentElement.animate(
      { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${r}px at ${x}px ${y}px)`] },
      { duration, easing: 'ease-in-out', pseudoElement: '::view-transition-new(root)' },
    )
  }

  return (
    <button
      ref={ref}
      type="button"
      className="themebtn"
      onClick={onClick}
      aria-label={toDark ? 'Switch to dark theme' : 'Switch to light theme'}
      title={toDark ? 'Dark theme' : 'Light theme'}
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        {toDark ? MOON : SUN}
      </svg>
    </button>
  )
}
