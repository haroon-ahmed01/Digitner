import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Icon from '@/components/ui/Icon'
import { PATHS } from '@/constant/routes'
import { MAIN_NAV } from '@/constant/navigation'
import { brandLogo } from '@/utils/media'
import { useWorkspace } from '@/context/workspace'
import ThemeToggle from './ThemeToggle'
import { AiMenu, ProductsMenu, ServicesMenu } from './MegaMenus'

const MENUS = { services: ServicesMenu, products: ProductsMenu, ai: AiMenu }
const MARKET = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="4" y="8" width="16" height="12" rx="3" />
    <path d="M12 4v4M9 13v1M15 13v1M9 17h6" />
  </svg>
)

const isCurrent = (item, pathname) =>
  item.exact ? pathname === item.match : pathname === item.match || pathname.startsWith(`${item.match}/`)

export default function Header() {
  const { pathname } = useLocation()
  const { ids, setOpen } = useWorkspace()
  const [menuOpen, setMenuOpen] = useState(false)
  const [openDd, setOpenDd] = useState(null)
  const navRef = useRef(null)

  const closeAll = () => {
    setMenuOpen(false)
    setOpenDd(null)
  }

  // click outside / Esc closes dropdowns
  useEffect(() => {
    const onDown = (e) => {
      if (!e.target.closest?.('.has-dd')) setOpenDd(null)
    }
    const onKey = (e) => e.key === 'Escape' && setOpenDd(null)
    document.addEventListener('click', onDown)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('click', onDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [])

  return (
    <header className="nav" ref={navRef}>
      <div className="wrap">
        <Link className="brand" to={PATHS.home} aria-label="Digitner home" onClick={closeAll}>
          <img src={brandLogo('logo.png')} alt="Digitner™" width="120" height="42" />
        </Link>

        <ul data-lenis-prevent className={`menu-list${menuOpen ? ' open' : ''}`} id="menu">
          {MAIN_NAV.map((item) => {
            const current = isCurrent(item, pathname) ? 'page' : undefined
            if (item.menu) {
              const Menu = MENUS[item.menu]
              const open = openDd === item.menu
              return (
                <li className={`has-dd${item.menu === 'services' ? ' mega-li' : ''}${open ? ' open' : ''}`} key={item.label}>
                  <div className="mlw">
                    <Link className="ml" to={item.to} aria-current={current} onClick={closeAll}>
                      {item.label}
                    </Link>
                    <button
                      className="chevb"
                      type="button"
                      aria-expanded={open}
                      aria-label={`Show ${item.label} menu`}
                      onClick={(e) => {
                        e.stopPropagation()
                        setOpenDd(open ? null : item.menu)
                      }}
                    >
                      <Icon name="chev" />
                    </button>
                  </div>
                  <Menu onGo={closeAll} />
                </li>
              )
            }
            return (
              <li key={item.label}>
                <Link className={`ml${item.market ? ' mkt' : ''}`} to={item.to} aria-current={current} onClick={closeAll}>
                  {item.market && MARKET}
                  {item.label}
                  {item.badge && <span className="new">{item.badge}</span>}
                </Link>
              </li>
            )
          })}
        </ul>

        <div className="nav-cta">
          <ThemeToggle />
          <button className="btn ghost sm ws" type="button" aria-label="Open workspace" onClick={() => setOpen(true)}>
            {MARKET}
            <span>Workspace</span>
            {ids.length > 0 && <span className="count">{ids.length}</span>}
          </button>
          <Link className="btn primary sm" to={PATHS.contact} onClick={closeAll}>
            Book a demo
          </Link>
          <button className="burger" type="button" aria-expanded={menuOpen} aria-controls="menu" onClick={() => setMenuOpen((o) => !o)}>
            Menu
          </button>
        </div>
      </div>
    </header>
  )
}
