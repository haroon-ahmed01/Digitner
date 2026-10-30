import { useEffect, useRef } from 'react'
import Icon from '@/components/ui/Icon'
import TiltedCard from './TiltedCard'
import { image } from '@/utils/media'
import { prefersReducedMotion } from '@/hooks/useReducedMotion'

const parse = (v) => {
  const m = v.match(/^([^\d]*)([\d,]+)(.*)$/)
  return m ? { pre: m[1], n: parseInt(m[2].replace(/,/g, ''), 10), post: m[3], comma: m[2].includes(',') } : null
}
const format = (p, x) => p.pre + (p.comma ? x.toLocaleString('en-US') : String(x)) + p.post

function countTo(el, value) {
  const p = parse(value)
  if (!p || /[–/]/.test(value)) {
    el.textContent = value
    return
  }
  const from = p.n >= 1000 && p.n < 3000 && !p.comma ? p.n - 25 : 0
  const dur = p.n > 100 ? 2200 : 1600
  let start = null
  cancelAnimationFrame(el._raf)
  const step = (ts) => {
    start ??= ts
    const t = Math.min(1, (ts - start) / dur)
    const e = 1 - Math.pow(1 - t, 4)
    el.textContent = format(p, Math.round(from + (p.n - from) * e))
    if (t < 1) el._raf = requestAnimationFrame(step)
  }
  el._raf = requestAnimationFrame(step)
}

/**
 * The dark stats band with count-up numbers.
 * stats: [[value, label]]   icons: icon names in the same order
 */
export default function CounterBand({ stats, icons = ['grid', 'users', 'phone', 'layers'], images }) {
  const imgOf = (i) => {
    const v = images && images[i]
    const u = v && typeof v === 'object' ? v.src || v.default || v.url : v
    return typeof u === 'string' && !/^(\/|https?:|data:|blob:)/.test(u) ? image(u) || u : u
  }
  const withImg = Boolean(images && images.length)
  const ref = useRef(null)

  useEffect(() => {
    const band = ref.current
    if (!band) return
    const odos = [...band.querySelectorAll('.odo')]
    const plain = () => odos.forEach((el) => (el.textContent = el.dataset.odo))
    if (prefersReducedMotion() || !('IntersectionObserver' in window)) {
      plain()
      return
    }
    band.classList.add('pre')
    const timers = []
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          band.classList.remove('pre')
          odos.forEach((el, i) => timers.push(setTimeout(() => countTo(el, el.dataset.odo), i * 120)))
        } else band.classList.add('pre')
      },
      { threshold: 0.35 },
    )
    io.observe(band)
    return () => {
      io.disconnect()
      timers.forEach(clearTimeout)
      odos.forEach((el) => cancelAnimationFrame(el._raf))
    }
  }, [stats])

  if (withImg)
    return (
      <div className="counters cards" ref={ref}>
        <div className="wrap">
          {stats.map(([value, label], i) => (
            <div className="ctr tcw" key={label} style={{ '--i': i }}>
              <TiltedCard
                imageSrc={imgOf(i)}
                altText={label}
                containerWidth="100%"
                containerHeight="var(--tc-h)"
                imageWidth="100%"
                imageHeight="var(--tc-h)"
                rotateAmplitude={12}
                scaleOnHover={1.05}
                glare={0.5}
                shadow={0.5}
                radius={22}
                perspective={900}
                showTooltip={false}
                gyroscope={false}
                intro={false}
              >
              </TiltedCard>
              <div className="tc-text">
                <div className="odo" data-odo={value} />
                <p>{label}</p>
                <div className="bar">
                  <i />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )

  return (
    <div className="counters" ref={ref}>
      <div className="wrap">
        {stats.map(([value, label], i) => (
          <div className="ctr" key={label}>
            <div className="ci">
              <Icon name={icons[i] || 'grid'} />
            </div>
            <div className="odo" data-odo={value} />
            <p>{label}</p>
            <div className="bar">
              <i />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
