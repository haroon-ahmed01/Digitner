import { useEffect, useRef, useState } from 'react'
import { Ic } from './icons'
import W from './Words'
import { GAL } from './data'
import { cx } from './util'

/** "Inside the workspace": screenshot tabs that advance by themselves and pause while the pointer is on them. */
export default function Gallery() {
  const [gi, setGi] = useState(0)
  const [paused, setPaused] = useState(false)
  const hold = useRef(false)

  // restart the 4.5 s timer whenever the picture changes (by the timer or by a click)
  useEffect(() => {
    const t = setInterval(() => {
      if (!hold.current) setGi((g) => (g + 1) % GAL.length)
    }, 4500)
    return () => clearInterval(t)
  }, [gi])

  const pause = (v) => {
    hold.current = v
    setPaused(v)
  }
  return (
    <section id="inside" style={{ paddingTop: 0 }}>
      <div className={cx('wrap')}>
        <div className={cx('sh')}>
          <span className={cx('eyebrow')}><span><Ic n="layout" s={15} /></span>Inside the workspace</span>
          <W>Real screens<span className={cx('d')}>.</span> <span className={cx('soft')}>Not mock-ups.</span></W>
        </div>
        <div className={cx('gal', paused && 'paused')} onMouseEnter={() => pause(true)} onMouseLeave={() => pause(false)}>
          <div className={cx('gtabs')}>
            {GAL.map(([t, ic, c], i) => (
              <button key={t} type="button" className={cx('gtab', i === gi && 'on')} onClick={() => setGi(i)}>
                <span className={cx('gi')}><Ic n={ic} s={20} /></span>
                <span><b>{t}</b><span className={cx('c')}>{c}</span></span>
                <span className={cx('prog')} />
              </button>
            ))}
          </div>
          <div className={cx('frame rv')}>
            <div className={cx('fb')}>
              <i /><i /><i />
              <span>marketplace.digitner.com/{GAL[gi][4]}</span>
            </div>
            <div className={cx('stack')}>
              {GAL.map(([t, , , src], i) => (
                <img key={t} src={src} alt={`${t} screen`} className={cx(i === gi && 'on')} loading={i ? 'lazy' : 'eager'} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
