import { Link } from 'react-router-dom'
import HeroDots from '@/components/motion/HeroDots'
import FloatIcons from '@/components/art/FloatIcons'
import OrbitArt from '@/components/art/OrbitArt'
import { useTyper } from '@/components/motion/Typer'
import { ORBIT_CHIPS, ORBIT_STYLE } from '@/data/orbits'
import AText from '@/components/motion/AText'
import { useEffect, useRef } from 'react'
import { prefersReducedMotion } from '@/hooks/useReducedMotion'

/**
 * One page = one `.view`. On laptop/desktop screens every block under the hero fades in only
 * when it scrolls into view. Tablet and mobile show everything normally.
 */
export function View({ children, style }) {
  const ref = useRef(null)

  useEffect(() => {
    const root = ref.current
    if (!root || prefersReducedMotion() || !window.matchMedia('(min-width: 1100px)').matches || !('IntersectionObserver' in window)) return
    const blocks = [...root.children].filter((el) => !el.matches('.hero, .phero, .mhero'))
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (!e.isIntersecting) return
          e.target.classList.add('sec-in')
          io.unobserve(e.target)
        }),
      { rootMargin: '0px 0px -12% 0px', threshold: 0 },
    )
    blocks.forEach((el) => {
      el.classList.add('sec-hide')
      io.observe(el)
    })
    return () => {
      io.disconnect()
      blocks.forEach((el) => el.classList.remove('sec-hide', 'sec-in'))
    }
  }, [])

  return (
    <div className="view enter" style={style} ref={ref}>
      {children}
    </div>
  )
}

/** Orbit art for a fixed route key ("about", "services", "consulting"…). */
export function RouteOrbit({ route }) {
  const [icon, chips, caption] = ORBIT_CHIPS[route] || []
  if (!icon) return null
  return <OrbitArt icon={icon} chips={chips} caption={caption} {...ORBIT_STYLE[route]} />
}

/** Typed words under the page title. words are shown as given when keep=true. */
export function PageTyper({ prefix, words, keep = true }) {
  const list = keep ? words : words.map((w) => w.toLowerCase().replace(/ management$/, '').replace(/^manage /, ''))
  const ref = useTyper(list, { add: 65, del: 30, hold: 1400, gap: 220 })
  return (
    <p className="typer ptyper">
      <span>{prefix}</span>
      <b className="ptyped" ref={ref} />
      <span className="caret" />
    </p>
  )
}

/**
 * Inner-page hero: dots canvas, floating icons, text on the left, orbit art on the right.
 * `art` is the orbit element, `floats` icon names, `solo` removes the art column.
 */
export function PageHero({ eyebrow, title, lede, children, art, floats, solo, style }) {
  return (
    <div className={`phero${solo ? ' solo' : ''}`} style={style}>
      <HeroDots />
      <FloatIcons icons={floats} />
      <div className="wrap">
        <div>
          {eyebrow && <p className="eyebrow">{eyebrow}</p>}
          {title}
          {children}
          {lede && <AText as="p" sub className="lede">{lede}</AText>}
        </div>
        {art}
      </div>
    </div>
  )
}

/** "See it in action" block that sits right under the hero (holds the hero's video / screens). */
export function Showcase({ title = 'See it in action', children }) {
  return (
    <section className="showcase" style={{ paddingBottom: 0 }}>
      <div className="sechead"><h2><AText>{title}</AText></h2></div>
      {children}
    </section>
  )
}

/** Purple call-to-action band. */
export function Band({ title, text, to, label, style }) {
  return (
    <div className="band" style={style}>
      <div>
        <h2><AText>{title}</AText></h2>
        {text && <p style={{ marginTop: 8, opacity: 0.88 }}>{text}</p>}
      </div>
      <Link className="btn" to={to}>{label}</Link>
    </div>
  )
}

