import { useEffect, useRef, useState } from 'react'
import { SC } from './data'
import { useAutoplay } from './AutoVideo'
import { cx, asset } from './util'

/** Full-width video with a caption that follows the scenes of the clip. */
export default function VideoBand() {
  const vid = useRef(null)
  const bar = useRef(null)
  const [idx, setIdx] = useState(0) // scene being played
  const [shown, setShown] = useState(0) // scene whose title is on screen (lags a little so the old one can fade out)
  const [out, setOut] = useState(false)
  useAutoplay(vid)

  useEffect(() => {
    const vd = vid.current
    let raf
    let cur = 0
    const tick = () => {
      const t = vd.currentTime
      let i = 0
      SC.forEach((s, j) => {
        if (t >= s[0]) i = j
      })
      if (i !== cur) {
        cur = i
        setIdx(i)
      }
      const end = SC[i + 1] ? SC[i + 1][0] : vd.duration || 27
      if (bar.current) bar.current.style.width = Math.min(100, ((t - SC[i][0]) / (end - SC[i][0])) * 100) + '%'
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  // fade the old title out, then show the new one
  useEffect(() => {
    if (idx === shown) return undefined
    const a = setTimeout(() => setOut(true), 0)
    const b = setTimeout(() => {
      setShown(idx)
      setOut(false)
    }, 300)
    return () => {
      clearTimeout(a)
      clearTimeout(b)
    }
  }, [idx, shown])

  const seek = (t) => {
    const vd = vid.current
    vd.currentTime = t
    vd.play().catch(() => {})
  }
  let k = 0
  return (
    <section id="video" className={cx('bleed')} aria-label="Digitner AI Marketplace in action">
      <video ref={vid} id="vid" src={asset('marketplace.mp4')} poster={asset('img/poster.jpg')} autoPlay muted loop playsInline preload="auto" aria-hidden="true" />
      <div className={cx('bshade')} />
      <div className={cx('bgrid')} />
      <div className={cx('wrap bcopy')}>
        <div className={cx('bglass')}>
          <span className={cx('eyebrow')}><span className={cx('ping')} />Digitner AI Marketplace in action</span>
          <div className={cx('bstep')}>
            <span className={cx('bn')}>{String(idx + 1).padStart(2, '0')}</span>
            <span className={cx('bline')}><i ref={bar} /></span>
            <span className={cx('mono')}>/ 06</span>
          </div>
          <h2 className={cx('bh', out && 'out')} key={shown}>
            {SC[shown][2].split(' ').map((w, wi) => (
              <span key={wi}>
                {wi > 0 && ' '}
                <span style={{ whiteSpace: 'nowrap' }}>
                  {[...w].map((c, ci) => (
                    <span key={ci} className={cx('ch', c === '.' && 'd')} style={{ animationDelay: `${k++ * 0.022}s` }}>{c}</span>
                  ))}
                </span>
              </span>
            ))}
          </h2>
          <p className={cx('bp')} key={'p' + shown}>{SC[shown][3]}</p>
          <div className={cx('bdots')}>
            {SC.map((s, i) => (
              <button key={s[1]} type="button" className={cx(i === idx && 'on')} onClick={() => seek(s[0] + 0.05)}>{s[1]}</button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
