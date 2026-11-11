import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import ThemeToggle from '@/layouts/PublicLayout/ThemeToggle'
import { PATHS } from '@/constant/routes'
import { Ic } from './icons'
import { cx, asset } from './util'
import { useMkt } from './ctx'

/** The marketplace's own header: logo, page links, marketplaces menu, demo button, mobile menu and the theme button (last). */
export default function Header() {
  const { T, page, setTenant } = useMkt()
  const [menu, setMenu] = useState(false)
  const [dd, setDd] = useState(false)

  // close the mobile menu / marketplaces dropdown on Escape, outside click, page change or a wide screen
  useEffect(() => {
    const away = (e) => {
      if (!e.target.closest('.mk-mnav,.mk-mnu')) setMenu(false)
      if (!e.target.closest('.mk-mkdd')) setDd(false)
    }
    const esc = (e) => {
      if (e.key === 'Escape') {
        setMenu(false)
        setDd(false)
      }
    }
    const wide = () => {
      if (window.innerWidth > 1180) setMenu(false)
    }
    document.addEventListener('click', away)
    window.addEventListener('keydown', esc)
    window.addEventListener('resize', wide)
    return () => {
      document.removeEventListener('click', away)
      window.removeEventListener('keydown', esc)
      window.removeEventListener('resize', wide)
    }
  }, [])

  const [seen, setSeen] = useState(page)
  if (seen !== page) {
    setSeen(page)
    setMenu(false)
    setDd(false)
  }

  const link = (href, label) => (
    <a href={href} className={cx(href === '#' + page && 'on')}>
      {label}
    </a>
  )
  const swap = (v) => {
    setDd(false)
    setTenant(v)
  }

  return (
    <header>
      <div className={cx('wrap nav')}>
        <a className={cx('logo')} href="#home" aria-label="Digitner home">
          {T ? (
            <>
              <span className={cx('tbadge')}>{T.av}</span>
              <span className={cx('tname')}>
                <b>{T.name}</b>
                <small>by Digitner</small>
              </span>
            </>
          ) : (
            <>
              <img className={cx('logo-light')} src={asset('img/logo-light.png')} alt="Digitner" />
              <img className={cx('logo-dark')} src={asset('img/logo-dark.png')} alt="Digitner" />
            </>
          )}
          <span className={cx('tagl')}>AI Marketplace</span>
        </a>
        <nav className={cx('links')}>
          <Link to={PATHS.home}>Home</Link>
          {link('#agents', 'Agents')}
          {T ? <a href={T.ws}>Workspace</a> : link('#product', 'Product')}
          {link('#how', 'How it works')}
        </nav>
        <div className={cx('end')}>
          <details className={cx('mkdd')} open={dd} onToggle={(e) => setDd(e.currentTarget.open)}>
            <summary className={cx('btn sm')}>
              <span><Ic n="store" s={15} /></span>
              <span className={cx('mkl')}>{T ? T.name : 'Marketplaces'}</span>
              <span className={cx('car')}>▾</span>
            </summary>
            <div className={cx('mkp')}>
              {T ? (
                <>
                  <span className={cx('eyebrow')} style={{ fontSize: 11 }}>Switch marketplace</span>
                  <div className={cx('mkit')}>
                    <span className={cx('mki tb')}>{T.av}</span>
                    <div className={cx('mkt')}><b>{T.name}</b><small>You&apos;re here</small></div>
                    <div className={cx('mka')}><a className={cx('btn sm')} href={T.ws}>Workspace</a></div>
                  </div>
                  <div className={cx('mkit')}>
                    <span className={cx('mki')}><Ic n="store" s={18} /></span>
                    <div className={cx('mkt')}><b>Digitner AI Marketplace</b><small>All agents and marketplaces</small></div>
                    <div className={cx('mka')}><button type="button" className={cx('btn sm pri')} onClick={() => swap('')}>Switch</button></div>
                  </div>
                </>
              ) : (
                <>
                  <a className={cx('eyebrow')} style={{ fontSize: 11 }} href="#marketplaces">All marketplaces &amp; examples →</a>
                  <div className={cx('mkit')}>
                    <span className={cx('mki')}><span><Ic n="briefcase" s={18} /></span></span>
                    <div className={cx('mkt')}><b>Global Delight</b><small>Their own AI marketplace</small></div>
                    <div className={cx('mka')}>
                      <button type="button" className={cx('btn sm pri')} onClick={() => swap('gd')}>Open</button>
                      <a className={cx('btn sm')} href="#gd">Workspace</a>
                    </div>
                  </div>
                  <div className={cx('mkit')}>
                    <span className={cx('mki')}><span><Ic n="gem" s={18} /></span></span>
                    <div className={cx('mkt')}><b>CK &amp; Sons</b><small>Jewel design · RATNA</small></div>
                    <div className={cx('mka')}><a className={cx('btn sm pri')} href="#examples/jewel">Open</a></div>
                  </div>
                  <div className={cx('mkit')}>
                    <span className={cx('mki')}><span><Ic n="megaphone" s={18} /></span></span>
                    <div className={cx('mkt')}><b>Freedom Holidays</b><small>Campaigns · ABHI</small></div>
                    <div className={cx('mka')}><a className={cx('btn sm pri')} href="#fh">Open</a></div>
                  </div>
                </>
              )}
            </div>
          </details>
          <a className={cx('btn sm')} href="#contact">Book a demo</a>
          <button className={cx('round mnu')} type="button" aria-label="Menu" aria-expanded={menu} aria-controls="mnav" onClick={() => setMenu((m) => !m)}>
            <span><Ic n={menu ? 'x' : 'menu'} s={18} /></span>
          </button>
          {!T && <ThemeToggle />}
        </div>
      </div>
      <nav className={cx('mnav')} id="mnav" hidden={!menu} aria-label="Menu" onClick={(e) => e.target.closest('a') && setMenu(false)}>
        <Link to={PATHS.home}>Home</Link>
        <a href="#agents">Agents</a>
        <a href="#product">Product</a>
        <a href="#how">How it works</a>
        <a className={cx('btn pri')} href="#contact">Book a demo</a>
      </nav>
    </header>
  )
}
