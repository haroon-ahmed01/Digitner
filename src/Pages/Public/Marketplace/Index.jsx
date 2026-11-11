import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import './mkt.css'
import Header from './Header'
import Footer from './Footer'
import Hero from './Hero'
import VideoBand from './VideoBand'
import Agents from './Agents'
import Gallery from './Gallery'
import RouteDemo from './RouteDemo'
import Trust from './Trust'
import { AgentsHead, ProductHead, HowHead, Moves, NameRow, Terms, Hub, MkPage, Drawer, Embed, PageNext, Contact } from './Pages'
import { MktCtx } from './ctx'
import { cx } from './util'
import { AG, AGO, CATS, WORDS, PROMPTS, FEED, TENANTS, PAGES, PN, XP } from './data'

const EMBED_PAGES = ['examples', 'fh', 'gd']
// sections that live on a page other than the home page
const ID_PAGE = { 's-agents': 'agents', inside: 'product', moves: 'product', 's-how': 'how', trust: 'how', 's-terms': 'terms', 's-marketplaces': 'marketplaces', 'mk-playbook': 'playbook', 'mk-blueprint': 'blueprint', 'mk-fx': 'fx', video: 'home' }

/** "#examples/jewel" -> which page to show, which workspace sub-page, and what to scroll to. */
function resolve(hash, current) {
  const [h = '', sub] = hash.slice(1).split('/')
  const isPage = PAGES.includes(h) || XP.includes(h)
  const pg = isPage ? h : (h && ID_PAGE[h]) || (h === 'contact' ? current : 'home')
  return { h, sub, isPage, pg }
}

const savedTenant = () => {
  try {
    const t = localStorage.getItem('dg-tenant') || ''
    return TENANTS[t] ? t : ''
  } catch {
    return ''
  }
}

/**
 * AI Marketplace. It has its own header and footer (it is mounted outside the site layout) and its own
 * hash pages: /ai-marketplace#agents, #product, #how, #terms, #marketplaces, #playbook ... Everything inside
 * carries an `mk-` class prefix and lives under `.mk-root`, so its styles cannot touch the rest of the site.
 */
export default function MarketplacePage() {
  const { hash } = useLocation()
  const root = useRef(null)
  const [tenant, setTenantId] = useState(savedTenant)
  const [msg, setMsg] = useState('')
  const [drawer, setDrawer] = useState(null)
  const [page, setPage] = useState(() => resolve(hash, 'home').pg)
  const [seen, setSeen] = useState(hash)
  const route = resolve(hash, page)
  if (hash !== seen) {
    setSeen(hash)
    setPage(route.pg)
  }

  const T = TENANTS[tenant] || null
  const D = useMemo(
    () => (T ? { AG: T.agents, AGO: T.agents.slice(0, 7), CATS: T.cats, WORDS: T.words, PROMPTS: T.prompts, FEED: T.feed } : { AG, AGO, CATS, WORDS, PROMPTS, FEED }),
    [T],
  )

  const toastTimer = useRef(0)
  const toast = useCallback((m) => {
    setMsg(m)
    clearTimeout(toastTimer.current)
    toastTimer.current = setTimeout(() => setMsg(''), 2200)
  }, [])
  const setTenant = useCallback((t) => {
    try {
      if (t) localStorage.setItem('dg-tenant', t)
      else localStorage.removeItem('dg-tenant')
    } catch {
      /* private mode: the choice just lasts until reload */
    }
    setTenantId(t)
    setDrawer(null)
    window.location.hash = '#home'
  }, [])
  const openDrawer = useCallback((k, i) => setDrawer({ k, i }), [])

  // scroll: pages start at the top, #section links scroll to that section
  useEffect(() => {
    if (route.isPage || !route.h) {
      window.scrollTo({ top: 0 })
      return undefined
    }
    const t = setTimeout(() => root.current?.querySelector(`#${CSS.escape(route.h)}`)?.scrollIntoView({ behavior: 'smooth' }), 30)
    return () => clearTimeout(t)
  }, [route.h, route.isPage, page])

  // browser tab title
  useEffect(() => {
    const prev = document.title
    const base = T ? `${T.name} AI Marketplace` : 'Digitner AI Marketplace'
    document.title = (page === 'home' ? '' : `${PN[page]} · `) + base
    return () => {
      document.title = prev
    }
  }, [page, T])

  // the site frames its pages with side padding on <body>; the marketplace runs edge to edge
  useEffect(() => {
    document.body.classList.add('mk-page')
    return () => document.body.classList.remove('mk-page')
  }, [])

  // workspace pages fill the screen: stop the page behind from scrolling
  const full = EMBED_PAGES.includes(page)
  useEffect(() => {
    if (!full) return undefined
    const h = document.documentElement
    const prev = h.style.overflow
    h.style.overflow = 'hidden'
    return () => {
      h.style.overflow = prev
    }
  }, [full])

  // Escape closes the agent drawer
  useEffect(() => {
    if (!drawer) return undefined
    const esc = (e) => e.key === 'Escape' && setDrawer(null)
    window.addEventListener('keydown', esc)
    return () => window.removeEventListener('keydown', esc)
  }, [drawer])

  const ctx = useMemo(() => ({ T, D, page, toast, setTenant, openDrawer }), [T, D, page, toast, setTenant, openDrawer])

  return (
    <MktCtx.Provider value={ctx}>
      <div className={cx('root')} ref={root} data-tenant={T ? tenant : undefined}>
        <Header />
        <main id="top" key={tenant}>
          {page === 'agents' && <AgentsHead />}
          {page === 'product' && <ProductHead />}
          {page === 'how' && <HowHead />}
          {page === 'home' && (
            <>
              <Hero />
              <VideoBand />
              <NameRow />
            </>
          )}
          {page === 'agents' && <Agents />}
          {page === 'product' && (
            <>
              <Gallery />
              <Moves />
            </>
          )}
          {page === 'how' && (
            <>
              <RouteDemo />
              <Trust />
            </>
          )}
          {page === 'terms' && <Terms />}
          {page === 'marketplaces' && <Hub />}
          {['playbook', 'blueprint', 'fx'].includes(page) && <MkPage k={page} />}
          {full && <Embed page={page} sub={route.sub} />}
          {!XP.includes(page) && <PageNext page={page} />}
          <Contact />
        </main>
        <Footer />
        <div className={cx('toast')} hidden={!msg}>{msg}</div>
        {drawer && <Drawer k={drawer.k} i={drawer.i} onClose={() => setDrawer(null)} />}
      </div>
    </MktCtx.Provider>
  )
}
