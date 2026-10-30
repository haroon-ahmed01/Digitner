import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { image } from '@/utils/media'
import Icon from '@/components/ui/Icon'
import Reveal from '@/components/motion/Reveal'
import CardSwap, { Card } from '@/components/motion/CardSwap'
import ReflectiveCard from '@/components/motion/ReflectiveCard'
import '@/styles/offercards.css'

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

const PICS = ['offer-services.webp', 'offer-products.webp', 'offer-ai.webp']

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

/** "One partner" cards: metallic reflective cards that tilt and catch the light. items: [{to, icon, title, text, go}] */
export default function OfferCards({ items }) {
  const theme = useSiteTheme()
  const small = useBelow(900)
  const phone = useBelow(600)
  if (small) {
    return (
      <div className="offer-swap">
        <CardSwap
          key={phone ? 'p' : 't'}
          theme={theme}
          width={phone ? 300 : 380}
          height={phone ? 400 : 420}
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
          {items.map((o, i) => (
            <Card key={o.title}>
              <div className="sw">
                <div className="sw-pic">
                  <img src={image(o.img || PICS[i])} alt="" draggable="false" />
                </div>
                <div className="sw-body">
                  <div className="sw-head">
                    <span className="sw-ico"><Icon name={o.icon} /></span>
                    <h3>{o.title}</h3>
                  </div>
                  <p>{o.text}</p>
                  <Link className="sw-go" to={o.to}>{o.go} <Icon name="arrow" /></Link>
                </div>
              </div>
            </Card>
          ))}
        </CardSwap>
      </div>
    )
  }
  return (
    <div className="cards offer-cards">
      {items.map((o, i) => (
        <Reveal as={Link} className="oc" to={o.to} key={o.title} delay={i * 120}>
          <ReflectiveCard
            theme={theme}
            tint={theme === 'dark' ? '#cfcaff' : '#e4e0ff'}
            width="100%"
            height={300}
            radius={24}
            glare={0.6}
            tiltStrength={10}
            style={{ '--rc-height': 'var(--oc-h)' }}
          >
            <div className="oc-in">
              <div className="oc-pic">
                <img src={image(o.img || PICS[i])} alt="" loading="lazy" draggable="false" />
              </div>
              <div className="oc-body">
                <div className="oc-head">
                  <span className="oc-ico"><Icon name={o.icon} /></span>
                  <h3>{o.title}</h3>
                </div>
                <p>{o.text}</p>
                <span className="oc-go">{o.go} <Icon name="arrow" /></span>
              </div>
            </div>
          </ReflectiveCard>
        </Reveal>
      ))}
    </div>
  )
}
