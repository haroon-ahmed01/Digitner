import { useEffect, useState } from 'react'
import Reveal from '@/components/motion/Reveal'
import CardSwap, { Card } from '@/components/motion/CardSwap'
import '@/styles/swapdeck.css'

const useBelow = (px) => {
  const q = `(max-width:${px}px)`
  const [m, setM] = useState(() => typeof window !== 'undefined' && window.matchMedia(q).matches)
  useEffect(() => {
    const mq = window.matchMedia(q)
    const on = () => setM(mq.matches)
    mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [q])
  return m
}

const useSiteTheme = () => {
  const read = () => (document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light')
  const [theme, setTheme] = useState(read)
  useEffect(() => {
    const mo = new MutationObserver(() => setTheme(read()))
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })
    return () => mo.disconnect()
  }, [])
  return theme
}

/** Plain wrapper used inside the swapping stack (no scroll-reveal there). Supports `as`, like Reveal. */
const DeckItem = ({ as: Tag = 'div', className = '', children, ...props }) => (
  <Tag className={className} {...props}>{children}</Tag>
)

/**
 * A card grid on laptops (cards fly in from the sides) that turns into a swapping card stack on tablet and phone.
 *   <SwapDeck className="steps" items={STEPS} render={(item, i, Wrap) => <Wrap className="step" key={...}>…</Wrap>} />
 * Wrap is Reveal on laptop and a plain wrapper inside the stack. Needs 3+ items to become a stack. cardHeight = height of one card in the stack (px).
 */
export default function SwapDeck({ items, render, className = '', below = 900, cardHeight = 280 }) {
  const theme = useSiteTheme()
  const small = useBelow(below)
  const phone = useBelow(600)

  if (!small || items.length < 3) {
    return <div className={className}>{items.map((it, i) => render(it, i, Reveal))}</div>
  }
  return (
    <div className="swd" style={{ height: cardHeight + (phone ? 100 : 108) }}>
      <CardSwap
        key={phone ? 'p' : 't'}
        theme={theme}
        width={phone ? 300 : 380}
        height={cardHeight}
        cardDistance={phone ? 22 : 40}
        verticalDistance={phone ? 26 : 34}
        depth={phone ? 60 : 80}
        skewAmount={4}
        visibleCards={3}
        cardRadius={22}
        delay={4200}
        speed={1}
        bounce={0.35}
        parallax={0.3}
        hoverSpread={0.1}
        dim={0.5}
        autoplay
        pauseOnHover
        draggable
      >
        {items.map((it, i) => (
          <Card key={i}>
            <div className="swd-in">{render(it, i, DeckItem)}</div>
          </Card>
        ))}
      </CardSwap>
    </div>
  )
}
