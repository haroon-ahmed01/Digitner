import { useEffect, useRef, useState } from 'react'
import { Ic } from './icons'
import { cx, dots } from './util'
import { useMkt } from './ctx'

/** "We hire agents for ..." line that types and deletes the words. */
function useTyper(words) {
  const [text, setText] = useState(words[0])
  useEffect(() => {
    let w = 0
    let c = words[0].length
    let del = true
    let t
    const step = () => {
      const word = words[w]
      if (!del) {
        c++
        setText(word.slice(0, c))
        if (c === word.length) {
          del = true
          t = setTimeout(step, 1500)
          return
        }
      } else {
        c--
        setText(word.slice(0, c))
        if (c === 0) {
          del = false
          w = (w + 1) % words.length
        }
      }
      t = setTimeout(step, del ? 35 : 70)
    }
    t = setTimeout(step, 1800)
    return () => clearTimeout(t)
  }, [words])
  return text
}

/** Faint moving network behind the orbit. */
function Neural() {
  const ref = useRef(null)
  useEffect(() => {
    const cv = ref.current
    const cx2 = cv.getContext('2d')
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let W = 0
    let H = 0
    let P = []
    let raf
    const size = () => {
      const r = cv.getBoundingClientRect()
      const dpr = Math.min(2, window.devicePixelRatio || 1)
      W = r.width
      H = r.height
      cv.width = W * dpr
      cv.height = H * dpr
      cx2.setTransform(dpr, 0, 0, dpr, 0, 0)
      P = Array.from({ length: Math.min(90, Math.round((W * H) / 7000)) }, () => ({
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
      }))
    }
    size()
    window.addEventListener('resize', size)
    const nf = () => {
      cx2.clearRect(0, 0, W, H)
      const c = getComputedStyle(cv).getPropertyValue('--brand').trim() || '#5B54C4'
      cx2.fillStyle = c
      cx2.strokeStyle = c
      for (const p of P) {
        if (!reduce) {
          p.x += p.vx
          p.y += p.vy
          if (p.x < 0 || p.x > W) p.vx *= -1
          if (p.y < 0 || p.y > H) p.vy *= -1
        }
        cx2.globalAlpha = 0.4
        cx2.beginPath()
        cx2.arc(p.x, p.y, 1.7, 0, 6.3)
        cx2.fill()
      }
      for (let a = 0; a < P.length; a++) {
        for (let b = a + 1; b < P.length; b++) {
          const dx = P[a].x - P[b].x
          const dy = P[a].y - P[b].y
          const d = dx * dx + dy * dy
          if (d < 6400) {
            cx2.globalAlpha = 0.2 * (1 - d / 6400)
            cx2.beginPath()
            cx2.moveTo(P[a].x, P[a].y)
            cx2.lineTo(P[b].x, P[b].y)
            cx2.stroke()
          }
        }
      }
      cx2.globalAlpha = 1
      raf = requestAnimationFrame(nf)
    }
    raf = requestAnimationFrame(nf)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', size)
    }
  }, [])
  return <canvas ref={ref} className={cx('neural')} aria-hidden="true" />
}

/** Agent chips orbiting the core; every couple of seconds one agent "reports" and a packet flies to the core. */
function Orbit() {
  const { D, T } = useMkt()
  const AGO = D.AGO
  const FEED = D.FEED
  const root = useRef(null)
  const [fi, setFi] = useState(-1)

  useEffect(() => {
    const o = root.current
    const chips = [...o.querySelectorAll('.mk-chipo')]
    const lines = [...o.querySelectorAll('.mk-ln')]
    const core = o.querySelector('.mk-core')
    const packets = o.querySelector('.mk-packets')
    const N = AGO.length
    const RX = 258
    const RY = 196
    const CX = 300
    const CY = 286
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const pk = []
    const timers = new Set()
    const later = (fn, ms) => {
      const t = setTimeout(() => {
        timers.delete(t)
        fn()
      }, ms)
      timers.add(t)
    }
    const fire = (k) => {
      if (k < 0 || !chips[k]) return
      pk.push({ k, t: 0 })
      chips[k].classList.add('mk-lit')
      lines[k].classList.add('mk-hot')
      later(() => {
        chips[k].classList.remove('mk-lit')
        lines[k].classList.remove('mk-hot')
      }, 1300)
    }
    let n = 0
    const feed = () => {
      setFi(n)
      fire(AGO.findIndex((a) => a.p === FEED[n % FEED.length][0]))
      n++
    }
    let rot = 0
    let last = performance.now()
    let hover = false
    const on = () => (hover = true)
    const off = () => (hover = false)
    o.addEventListener('mouseenter', on)
    o.addEventListener('mouseleave', off)
    const pos = []
    let raf
    const frame = (now) => {
      const dt = Math.min(50, now - last)
      last = now
      if (!reduce) rot += dt * (hover ? 0.00003 : 0.0001)
      for (let i = 0; i < N; i++) {
        const a = -Math.PI / 2 + (i * 2 * Math.PI) / N + rot
        const x = CX + RX * Math.cos(a)
        const y = CY + RY * Math.sin(a)
        const d = (Math.sin(a) + 1) / 2
        pos[i] = [x, y]
        const c = chips[i]
        c.style.left = x / 6 + '%'
        c.style.top = y / 6 + '%'
        c.style.transform = `translate(-50%,-50%) scale(${(0.86 + d * 0.18).toFixed(3)})`
        c.style.zIndex = d > 0.5 ? 6 : 2
        c.style.opacity = (0.6 + d * 0.4).toFixed(2)
        lines[i].setAttribute('x2', x.toFixed(1))
        lines[i].setAttribute('y2', y.toFixed(1))
      }
      let svg = ''
      for (let q = pk.length - 1; q >= 0; q--) {
        const p = pk[q]
        p.t += dt / 900
        if (p.t >= 1) {
          pk.splice(q, 1)
          core.classList.remove('mk-hit')
          void core.offsetWidth
          core.classList.add('mk-hit')
          continue
        }
        const [x, y] = pos[p.k]
        const e = 1 - Math.pow(1 - p.t, 2)
        svg += `<circle class="mk-pkt" cx="${x + (CX - x) * e}" cy="${y + (CY - y) * e}" r="${7 - 3 * e}" fill="url(#mkpk)"/>`
        for (const lag of [0.12, 0.24]) {
          const t2 = Math.max(0, p.t - lag)
          const e2 = 1 - Math.pow(1 - t2, 2)
          svg += `<circle cx="${x + (CX - x) * e2}" cy="${y + (CY - y) * e2}" r="${2.6 - lag * 4}" fill="#8f88ff" opacity="${0.6 - lag}"/>`
        }
      }
      packets.innerHTML = svg
      raf = requestAnimationFrame(frame)
    }
    raf = requestAnimationFrame(frame)
    later(feed, 1000)
    const iv = reduce ? 0 : setInterval(feed, 2200)
    return () => {
      cancelAnimationFrame(raf)
      clearInterval(iv)
      timers.forEach(clearTimeout)
      o.removeEventListener('mouseenter', on)
      o.removeEventListener('mouseleave', off)
    }
  }, [AGO, FEED])

  const [name, text] = fi < 0 ? ['', ''] : FEED[fi % FEED.length]
  return (
    <div className={cx('orbit')} id="orbit" ref={root} aria-label="Digitner agents around the core">
      <Neural />
      <div className={cx('ring r2')} />
      <div className={cx('ring')} />
      <div className={cx('ring r3')} />
      <svg className={cx('net')} viewBox="0 0 600 600" aria-hidden="true">
        <defs>
          <radialGradient id="mkpk">
            <stop offset="0" stopColor="#fff" />
            <stop offset=".45" stopColor="#8f88ff" />
            <stop offset="1" stopColor="#5B54C4" stopOpacity="0" />
          </radialGradient>
        </defs>
        <g>
          {AGO.map((a) => (
            <line key={a.p} className={cx('ln')} x1="300" y1="286" x2="300" y2="286" />
          ))}
        </g>
        <g className={cx('packets')} />
      </svg>
      <div className={cx('core')}>
        <span className={cx('scan')} />
        <span className={cx('halo')} />
        <span className={cx('sq')} />
        <span className={cx('corelbl')}>{T ? T.name.toUpperCase() : 'MARKETPLACE'}</span>
      </div>
      <div>
        {AGO.map((a, i) => (
          <span key={a.p} className={cx('chipo')} style={{ animationDelay: `${0.4 + i * 0.1}s` }}>
            <span className={cx('ic')}><Ic n={a.ic} s={14} /></span>
            {a.p}
            <small>{a.n}</small>
            <span className={cx('st')} />
          </span>
        ))}
      </div>
      <div className={cx('feed')} aria-live="off">
        <span className={cx('ping')} />
        <span id="feedtx" key={fi}>
          {name && <><b>{name}</b> {text}</>}
        </span>
      </div>
    </div>
  )
}

/** First screen of the home page. */
export default function Hero() {
  const { T, D } = useMkt()
  const typed = useTyper(D.WORDS)
  return (
    <div className={cx('dots')} style={{ borderBottom: '1px solid var(--line)' }}>
      <div className={cx('wrap hero')}>
        <div>
          <span className={cx('pillx in')}>
            <span className={cx('ping')} />
            {T ? T.pill : '100+ customers served across 4 locations'}
          </span>
          <h1 style={{ marginTop: 28 }}>
            {T ? (
              <>
                <span className={cx('in d1')} style={{ display: 'block' }}>{dots(T.hero1)}</span>
                <span className={cx('in d2 grad')} style={{ display: 'block' }}>{T.hero2}</span>
              </>
            ) : (
              <>
                <span className={cx('in d1')} style={{ display: 'block' }}>
                  Hire<span className={cx('d')}>.</span> Approve<span className={cx('d')}>.</span> Grow<span className={cx('d')}>.</span>
                </span>
                <span className={cx('in d2 grad')} style={{ display: 'block' }}>Now with agents.</span>
              </>
            )}
          </h1>
          <p className={cx('typer in d3')}>
            <span className={cx('tyi')} />
            We hire agents for <b>{typed}</b>
            <span className={cx('caret')} />
          </p>
          <p className={cx('lede in d4')}>
            {T ? T.lede : 'Pick agents from the Digitner AI Marketplace. They join your team, do the work, and wait for your yes.'}
          </p>
          <div className={cx('ctas in d5')}>
            <a className={cx('btn pri')} href="#agents">
              <span><Ic n="store" /></span>Browse agents<span><Ic n="arrow" /></span>
            </a>
            {T && (
              <a className={cx('btn')} href={T.ws}>
                <Ic n="briefcase" s={18} />Open workspace<Ic n="arrow" s={18} />
              </a>
            )}
          </div>
        </div>
        <Orbit />
      </div>
    </div>
  )
}
