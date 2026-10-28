/** True when the visitor asked the OS for less motion. Read once; fine for one-off animations. */
export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
