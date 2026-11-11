import { useEffect, useState } from 'react'
import { Ic } from './icons'
import W from './Words'
import { cx } from './util'
import { useMkt } from './ctx'

/** "You talk to SAARTHI": pick a request and watch the guide hand it to an agent, step by step, then ask for approval. */
export default function RouteDemo() {
  const { T, D, toast } = useMkt()
  const P = D.PROMPTS
  const [pi, setPi] = useState(0)
  const [tick, setTick] = useState(P[0].s.length) // starts fully played, like the original
  const [anim, setAnim] = useState(false)
  const p = P[pi]

  const play = (i) => {
    setPi(i)
    setTick(0)
    setAnim(false)
  }
  useEffect(() => {
    if (tick >= p.s.length) return undefined
    const t = setTimeout(() => {
      setTick((n) => n + 1)
      setAnim(true)
    }, 700)
    return () => clearTimeout(t)
  }, [tick, p])

  return (
    <section id="s-how" className={cx('dots')} style={{ borderBlock: '1px solid var(--line)' }}>
      <div className={cx('wrap split')}>
        <div className={cx('rv')}>
          <span className={cx('eyebrow')}><span><Ic n="chat" s={15} /></span>One place to ask</span>
          <W style={{ marginTop: 16 }}>You talk to SAARTHI<span className={cx('d')}>.</span> <span className={cx('soft')}>SAARTHI briefs the team.</span></W>
          <p className={cx('lede')} style={{ marginTop: 16 }}>Saarthi means the guide. Ask in plain words; the right agent picks it up.</p>
          <div className={cx('prompts')}>
            {P.map((x, i) => (
              <button key={x.q} type="button" className={cx('prompt', i === pi && 'on')} onClick={() => play(i)}>
                <span className={cx('tyi')} />
                <span>{x.q}</span>
              </button>
            ))}
          </div>
        </div>
        <div className={cx('route rv')}>
          <div className={cx('msg')}>
            <span className={cx('av me')}>You</span>
            <div className={cx('bub me')}>{p.q}</div>
          </div>
          <div className={cx('who')}>
            <span className={cx('av')}>{T ? T.gav : 'SA'}</span>
            <span className={cx('mono')}>{T ? T.guide : 'SAARTHI'} → {p.to} · {p.team}</span>
          </div>
          <div className={cx('stepl')}>
            {p.s.map((s, i) => (
              <div key={s} className={cx(i < tick && 'on', anim && i === tick - 1 && 'new')}>
                <Ic n={i < tick ? 'check' : 'dot'} s={16} />
                <span style={i < tick ? undefined : { color: 'var(--faint)' }}>{s}</span>
              </div>
            ))}
          </div>
          {tick >= p.s.length && (
            <div className={cx('approve')}>
              <span><Ic n="shield" s={16} /> {p.ask}</span>
              <span style={{ display: 'flex', gap: 8 }}>
                <button type="button" className={cx('btn sm')} onClick={() => toast(`Sent back to ${p.to}`)}><Ic n="undo" s={14} />Not yet</button>
                <button type="button" className={cx('btn sm pri')} onClick={() => toast(`Approved · ${p.to} is on it`)}><Ic n="check" s={14} />Approve</button>
              </span>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
