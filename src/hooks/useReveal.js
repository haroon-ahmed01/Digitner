import { useCallback, useState } from 'react'

/**
 * Scroll-reveal. `const [ref, shown] = useReveal()` -> add `rv` + (shown ? ' in' : '') to the element.
 * One shared IntersectionObserver for the whole page.
 */
const callbacks = new WeakMap()
let observer

function getObserver() {
  if (observer || typeof IntersectionObserver === 'undefined') return observer
  observer = new IntersectionObserver(
    (entries) =>
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        callbacks.get(entry.target)?.()
        observer.unobserve(entry.target)
      }),
    { threshold: 0.1 },
  )
  return observer
}

export function useReveal() {
  const [shown, setShown] = useState(false)
  const ref = useCallback((node) => {
    if (!node) return
    const io = getObserver()
    if (!io) {
      setShown(true)
      return
    }
    callbacks.set(node, () => setShown(true))
    io.observe(node)
  }, [])
  return [ref, shown]
}
