import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { PATHS } from '@/constant/routes'
import { cx, asset } from './util'
import { useMkt } from './ctx'

const DEMO = 'https://claude.ai/artifact/YFmqnGyYdpGWTnrU7FcmDf'

/** On tablet and phone the footer columns stack and fade up one by one as they scroll into view. */
function useStackReveal(ref) {
  useEffect(() => {
    const mq = window.matchMedia('(max-width:900px)')
    const reduce = window.matchMedia('(prefers-reduced-motion:reduce)').matches
    let io
    const go = () => {
      io?.disconnect()
      const cols = [...ref.current.children].filter((c) => c.tagName === 'DIV')
      if (!mq.matches || reduce || !('IntersectionObserver' in window)) {
        cols.forEach((c) => {
          c.classList.remove('mk-fd-r')
          c.classList.add('mk-in')
        })
        return
      }
      io = new IntersectionObserver(
        (es) =>
          es.forEach((e) => {
            if (e.isIntersecting) {
              e.target.classList.add('mk-in')
              io.unobserve(e.target)
            }
          }),
        { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
      )
      cols.forEach((c, i) => {
        c.classList.add('mk-fd-r')
        c.classList.remove('mk-in')
        c.style.setProperty('--d', `${i * 0.06}s`)
        io.observe(c)
      })
    }
    go()
    mq.addEventListener('change', go)
    return () => {
      mq.removeEventListener('change', go)
      io?.disconnect()
    }
  }, [ref])
}

export default function Footer() {
  const { T } = useMkt()
  const grid = useRef(null)
  useStackReveal(grid)
  return (
    <footer>
      <span className={cx('fline')} />
      <span className={cx('forb a')} />
      <span className={cx('forb b')} />
      <div className={cx('wrap fgrid')} ref={grid}>
        <div className={cx('fbrand')}>
          <div className={cx('lg')}>
            {T ? (
              <>
                <span className={cx('tbadge')}>{T.av}</span>
                <span className={cx('tname')}><b>{T.name}</b><small>by Digitner</small></span>
              </>
            ) : (
              <img className={cx('logo-dark')} src={asset('img/logo-footer.png')} alt="Digitner" style={{ height: 28 }} />
            )}
            <span className={cx('tagl')}>AI Marketplace</span>
          </div>
          {T ? (
            <p style={{ margin: 0 }}>{T.name} · {T.sub}<br />Powered by Digitner AI Marketplace.</p>
          ) : (
            <p style={{ margin: 0 }}>Ideas at the core.<br />Technology built around them.</p>
          )}
          <span className={cx('live')}><i />Agents live · India · Malaysia · Mexico</span>
        </div>
        <div>
          <b>Marketplace</b>
          <a href="#agents">Agents</a>
          <a href="#how">How it works</a>
          <a href={DEMO} target="_blank" rel="noopener noreferrer">Live demo</a>
        </div>
        {T ? (
          <div>
            <b>{T.name}</b>
            <a href={T.ws}>Workspace</a>
            <a href="#agents">Agents</a>
            <a href="#examples/forex">FX example</a>
          </div>
        ) : (
          <div>
            <b>Ecosystem</b>
            <Link to={PATHS.home}>Digitner</Link>
            <Link to={PATHS.academy}>AI Academy</Link>
            <a href="#playbook">Playbook Marketplace</a>
            <a href="#fx">FX Marketplace</a>
            <a href="#blueprint">Growth Blueprint Marketplace</a>
            <a href="#examples/governance">AI Governance &amp; Sovereignty</a>
            <a href="#examples">Agent examples</a>
          </div>
        )}
        <div>
          <b>Company</b>
          <a href="#fh">Freedom Holidays workspace</a>
          <a href="#gd">Global Delight workspace</a>
          <a href="#terms">Terms &amp; Conditions</a>
        </div>
        <div>
          <b>Offices</b>
          <div>Vellore 632007</div>
          <div>Bengaluru 560100</div>
          <div>Mexico · Malaysia</div>
        </div>
      </div>
      <div className={cx('wrap fbot')} style={{ marginTop: 20, display: 'flex', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap', fontSize: 14 }}>
        <span>© {new Date().getFullYear()} Digitner Tech Solutions</span>
        <span className={cx('flegal')}>
          <Link to={PATHS.terms}>Terms &amp; Conditions</Link>
          <a href="#examples/governance">AI Governance &amp; Sovereignty</a>
        </span>
      </div>
    </footer>
  )
}
