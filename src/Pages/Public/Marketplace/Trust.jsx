import { useEffect, useRef, useState } from 'react'
import { Ic } from './icons'
import W from './Words'
import { FD } from './data'
import { cx } from './util'

const SCORE = [34, 61, 78, 92]
const S = [96, 74, 52, 30]
const rr = (s) => {
  const w = s * 5
  const x = (500 - w) / 2
  const r = w * 0.22
  return { x, w, d: `M${x + r},${x} H${x + w - r} A${r},${r} 0 0 1 ${x + w},${x + r} V${x + w - r} A${r},${r} 0 0 1 ${x + w - r},${x + w} H${x + r} A${r},${r} 0 0 1 ${x},${x + w - r} V${x + r} A${r},${r} 0 0 1 ${x + r},${x} Z` }
}
const R = [1, 2, 3].map((k) => rr(S[3 - k])) // R[0] = Draft, R[1] = Do, R[2] = Drive

/** The 4D Trust Framework: nested squares that light up from Detect to Drive, with a trust score that counts up. */
function FourD() {
  const [k, setK] = useState(0)
  const [auto, setAuto] = useState(true)
  const [score, setScore] = useState(SCORE[0])
  const cur = useRef(SCORE[0])

  useEffect(() => {
    if (!auto) return undefined
    const t = setInterval(() => setK((n) => (n + 1) % 4), 2800)
    return () => clearInterval(t)
  }, [auto])

  useEffect(() => {
    const from = cur.current
    const to = SCORE[k]
    const t0 = performance.now()
    let raf
    const st = (n) => {
      const p = Math.min(1, (n - t0) / 900)
      cur.current = Math.round(from + (to - from) * (1 - Math.pow(1 - p, 3)))
      setScore(cur.current)
      if (p < 1) raf = requestAnimationFrame(st)
    }
    raf = requestAnimationFrame(st)
    return () => cancelAnimationFrame(raf)
  }, [k])

  const tok = k === 0 ? { left: '50%', top: '66%' } : { left: (R[k - 1].x + R[k - 1].w) / 5 - 4 + '%', top: (R[k - 1].x + R[k - 1].w) / 5 - 4 + '%' }
  return (
    <div className={cx('fd rv')} onClick={() => setAuto(false)}>
      <div className={cx('fdviz')} aria-hidden="true">
        <svg viewBox="0 0 500 500">
          <defs>
            <linearGradient id="mkfdg" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#a79fff" />
              <stop offset=".5" stopColor="#5B54C4" />
              <stop offset="1" stopColor="#8f88ff" />
            </linearGradient>
          </defs>
          {R.slice().reverse().map((g, j) => {
            const n = 3 - j
            return (
              <g key={n}>
                <path className={cx('ffill', (n === k || n <= k) && 'on')} d={g.d} />
                <path className={cx('fring', n === k && 'on')} d={g.d} />
                <path className={cx('fflow', 'r' + n, n === k && 'on')} d={g.d} />
                <circle className={cx('fspark')} r="4.5"><animateMotion dur={`${5 + n * 2}s`} repeatCount="indefinite" path={g.d} /></circle>
                <circle className={cx('fspark')} r="3" opacity=".7"><animateMotion dur={`${5 + n * 2}s`} begin={`-${(5 + n * 2) / 2}s`} repeatCount="indefinite" path={g.d} /></circle>
              </g>
            )
          })}
        </svg>
        <span className={cx('fwave')} />
        <span className={cx('fwave')} />
        <span className={cx('fwave')} />
        <div className={cx('fcore')}>
          <span className={cx('ci')}><Ic n={FD[k][2]} s={26} /></span>
          <b>{FD[k][0].toUpperCase()}</b>
        </div>
        {[1, 2, 3].map((n) => (
          <span key={n} className={cx('flbl', n === k && 'on')} style={{ top: R[n - 1].x / 5 + '%' }}>
            <span className={cx('li')}><Ic n={FD[n][2]} s={13} /></span>
            {FD[n][0]}
          </span>
        ))}
        <div className={cx('fscore')}>
          <small>KHOJ trust score</small>
          <b>{score}</b>
          <div className={cx('fb')}><i style={{ width: SCORE[k] + '%' }} /></div>
        </div>
        <span className={cx('ftok')} style={tok}><i>KH</i>KHOJ</span>
      </div>
      <div className={cx('fdlist')}>
        {FD.map((d, i) => (
          <button key={d[0]} type="button" className={cx('fdi', i === k && 'on')} onClick={() => setK(i)}>
            <span className={cx('ix')}><Ic n={d[2]} s={24} /></span>
            <span>
              <h3>D{i + 1} · {d[0]} <small>{d[1]}</small></h3>
              <p>{d[3]}</p>
              <span className={cx('yes')}>
                {d[4].map(([kk, t]) => <span key={t} className={cx(kk)}>{t}</span>)}
                <span>e.g. {d[5]}</span>
              </span>
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}

export default function Trust() {
  return (
    <section id="trust" style={{ paddingTop: 0 }}>
      <div className={cx('wrap')}>
        <div className={cx('sh')}>
          <span className={cx('eyebrow')}><span><Ic n="shield" s={15} /></span>The Digitner 4D Trust Framework</span>
          <W>From a dot to the core<span className={cx('d')}>.</span> <span className={cx('soft')}>Agents earn every step.</span></W>
        </div>
        <FourD />
        <div className={cx('rules rv')}>
          <div className={cx('rule')}><span><Ic n="power" s={20} /></span>Stop any agent, or all of them</div>
          <div className={cx('rule')}><span><Ic n="list" s={20} /></span>Every action in the Trust ledger</div>
          <div className={cx('rule')}><span><Ic n="chart" s={20} /></span>A daily trust score per agent</div>
        </div>
      </div>
    </section>
  )
}
