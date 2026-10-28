/**
 * Which text animation each page uses.
 *  - slideLeft by character : Home, Products, Contact
 *  - slideUp by word        : About, Services, Terms
 *  - wavy by character      : AI Solutions, AI Marketplace
 */
const WAVY = {
  hidden: { opacity: 0, y: 30, rotate: 45, scale: 0.5 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    rotate: 0,
    scale: 1,
    transition: {
      delay: i * 0.1,
      duration: 0.4,
      y: { type: 'spring', damping: 12, stiffness: 200, mass: 0.8 },
      rotate: { type: 'spring', damping: 8, stiffness: 150 },
      scale: { type: 'spring', damping: 10, stiffness: 300 },
    },
  }),
}
/** Same wave, quicker stagger, for longer sub headings. */
const WAVY_SUB = { hidden: WAVY.hidden, show: (i) => WAVY.show(i * 0.4) }

const LEFT = { by: 'character', animation: 'slideLeft' }
const UP = { by: 'word', animation: 'slideUp' }
const WAVE = { by: 'character', variants: WAVY, subVariants: WAVY_SUB }

export const textStyleFor = (pathname) => {
  if (pathname.startsWith('/about') || pathname.startsWith('/services') || pathname.startsWith('/terms')) return UP
  if (pathname.startsWith('/ai-')) return WAVE
  return LEFT
}

