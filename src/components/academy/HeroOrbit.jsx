import { useEffect, useRef, useState } from 'react'
import { AI_SUBS, ACADEMY, ORBIT_MODS } from '@/data/academy'
import { prefersReducedMotion } from '@/hooks/useReducedMotion'

const reduced = prefersReducedMotion()

/**
 * Home hero art: the Digitner tile tilts with the pointer, six business functions orbit it and light up
 * one by one, and an "AI" chip circles it with a rotating sub-label. Decorative only (aria-hidden).
 */
export default function HeroOrbit() {
  const [on, setOn] = useState(reduced ? -1 : 0)
  const [sub, setSub] = useState(0)
  const orbitRef = useRef(null)
  const tileRef = useRef(null)

  useEffect(() => {
    if (reduced) return
    const a = setInterval(() => setOn((i) => (i + 1) % ORBIT_MODS.length), 1600)
    const b = setInterval(() => setSub((i) => (i + 1) % AI_SUBS.length), 1600)
    return () => {
      clearInterval(a)
      clearInterval(b)
    }
  }, [])

  const tilt = (e) => {
    const orbit = orbitRef.current
    const tile = tileRef.current
    if (!orbit || !tile) return
    const r = orbit.getBoundingClientRect()
    const x = (e.clientX - r.left) / r.width - 0.5
    const y = (e.clientY - r.top) / r.height - 0.5
    tile.style.setProperty('--ry', `${(x * 22).toFixed(1)}deg`)
    tile.style.setProperty('--rx', `${(-y * 22).toFixed(1)}deg`)
  }
  const flat = () => {
    tileRef.current?.style.setProperty('--ry', '0deg')
    tileRef.current?.style.setProperty('--rx', '0deg')
  }

  return (
    <div className="ac-orbit-wrap" aria-hidden="true">
      <div
        className="ac-orbit"
        ref={orbitRef}
        style={reduced ? undefined : { pointerEvents: 'auto' }}
        onPointerMove={reduced ? undefined : tilt}
        onPointerLeave={reduced ? undefined : flat}
      >
        <svg className="ac-lines" viewBox="0 0 500 500" aria-hidden="true"><polygon className="ac-edge" points="250,45 412,124 453,279 376,412 250,455 124,412 47,279 88,124"/>{!reduced && (
            <>
              <circle className="ac-pkt" r="4"><animateMotion dur="10s" begin="0s" repeatCount="indefinite" path="M250,45 L412,124 L453,279 L376,412 L250,455 L124,412 L47,279 L88,124 Z"/></circle>
              <circle className="ac-pkt" r="3"><animateMotion dur="10s" begin="-3.3s" repeatCount="indefinite" path="M250,45 L412,124 L453,279 L376,412 L250,455 L124,412 L47,279 L88,124 Z"/></circle>
              <circle className="ac-pkt" r="3.5"><animateMotion dur="10s" begin="-6.6s" repeatCount="indefinite" path="M250,45 L412,124 L453,279 L376,412 L250,455 L124,412 L47,279 L88,124 Z"/></circle>
            </>
          )}<g className="ac-ring"><circle className="ac-dash" cx="250" cy="250" r="160"/><path className="ac-dash" d="M250 70 L250 110 M250 390 L250 430 M70 250 L110 250 M390 250 L430 250"/></g><circle className="ac-node ac-hollow" cx="262" cy="35" r="7"/><circle className="ac-node" cx="402" cy="133" r="6"/><circle className="ac-node" cx="461" cy="267" r="6"/><circle className="ac-node ac-hollow" cx="367" cy="422" r="7"/><circle className="ac-node" cx="260" cy="447" r="6"/><circle className="ac-node" cx="112" cy="423" r="6"/><circle className="ac-node ac-hollow" cx="56" cy="270" r="7"/><circle className="ac-node" cx="80" cy="136" r="6"/></svg>
        <div className="ac-tile">
          <div className="ac-tile-inner" ref={tileRef}>
            <svg viewBox="0 0 100 100" aria-hidden="true"><defs><linearGradient id="dgB" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="100" y2="100"><stop offset="0" stopColor="#5447DA"/><stop offset="1" stopColor="#4C3DC0"/></linearGradient></defs><rect width="100" height="100" rx="18" fill="url(#dgB)"/><g className="ac-frame"><rect x="28.2" y="28.2" width="43.6" height="43.6" rx="3" fill="#fff"/><rect x="39.7" y="39.7" width="20.6" height="20.6" rx="1" fill="url(#dgB)"/></g></svg>
            <span className="ac-shine" />
          </div>
        </div>
        {ORBIT_MODS.map((m, i) => (
          <span className={`ac-ochip${on === i ? ' ac-on' : ''}`} style={{ left: `${m.x}%`, top: `${m.y}%` }} key={m.n}>
            <svg viewBox="0 0 24 24" dangerouslySetInnerHTML={{ __html: m.svg }} />
            {m.n}
          </span>
        ))}
        <div className="ac-ai-orbit">
          <span className="ac-ai-arm">
            <span className="ac-ochip ac-ai">
              <span className="ac-spark">
                <svg viewBox="0 0 24 24">
                  <path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z" />
                </svg>
              </span>
              AI<em className="ac-aisub">{AI_SUBS[sub]}</em>
            </span>
          </span>
        </div>
      </div>
      <div className="ac-motto">
        {ACADEMY.motto[0]}<b>{ACADEMY.motto[1]}</b>{ACADEMY.motto[2]}
        <br />
        {ACADEMY.motto[3]}
      </div>
    </div>
  )
}
