import { useEffect, useRef, useState } from 'react'
import { LogoRow } from '@/components/blocks/Media'
import OrbitImages from '@/components/motion/OrbitImages'
import { logo } from '@/utils/media'
import '@/styles/logoorbit.css'

const useWidth = () => {
  const [w, setW] = useState(() => (typeof window === 'undefined' ? 1200 : window.innerWidth))
  useEffect(() => {
    const on = () => setW(window.innerWidth)
    window.addEventListener('resize', on)
    return () => window.removeEventListener('resize', on)
  }, [])
  return w
}

const toImages = (rows, max) =>
  rows
    .slice(0, max)
    .map(([k, name]) => ({ src: logo(k), alt: name }))
    .filter((i) => i.src)

/** Client logos riding one orbit (drag, hover, click to bring one to the front). rows: [[logoKey, name]] */
export default function LogoOrbit({ row1, row2 = [] }) {
  const w = useWidth()
  const ref = useRef(null)
  const [run, setRun] = useState(0)
  // replay the intro (logos fly out and spread along the path) every time the section scrolls into view
  const orbit = w >= 1000
  useEffect(() => {
    const el = ref.current
    if (!el || typeof IntersectionObserver === 'undefined') return undefined
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setRun((n) => n + 1) },
      { threshold: 0.35 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [orbit])
  const size = 'lg'
  const cfg = { rx: 720, ry: 285, item: 90, max: 99, dur: 90 }
  // mix the two rows so neighbours alternate
  const mixed = []
  for (let i = 0; i < Math.max(row1.length, row2.length); i++) {
    if (row1[i]) mixed.push(row1[i])
    if (row2[i]) mixed.push(row2[i])
  }
  if (!orbit) {
    return (
      <div className="logo-orbits" aria-label="Customer logos">
        <div className="marquee"><div className="track"><LogoRow rows={row1} /></div></div>
        <div className="marquee"><div className="track rev"><LogoRow rows={row2} /></div></div>
      </div>
    )
  }
  return (
    <div className="logo-orbits" ref={ref} aria-label="Customer logos">
      <OrbitImages
        key={`${size}-${run}`}
        images={toImages(mixed, cfg.max)}
        shape="ellipse"
        radiusX={cfg.rx}
        radiusY={cfg.ry}
        itemSize={cfg.item}
        rotation={-6}
        duration={cfg.dur}
        depth={0.35}
        itemRadius={18}
        shadow={0.25}
        hoverScale={1.12}
        hoverSpeed={0.2}
        showPath
        pathColor="rgba(120,110,220,0.3)"
        pathWidth={1.5}
        draggable
        clickToFront
        fill
        intro
        className="logo-orbit"
      />
    </div>
  )
}
