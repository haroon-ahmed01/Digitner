import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { scrollToTop, scrollToY, startSmoothScroll, stopSmoothScroll } from '@/utils/smoothScroll'

/** Starts smooth scrolling once, and scrolls to the top (or the #hash) on every route change. */
export default function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    startSmoothScroll()
    return stopSmoothScroll
  }, [])

  useEffect(() => {
    const el = hash ? document.getElementById(hash.slice(1)) : null
    if (el) scrollToY(el.getBoundingClientRect().top + window.scrollY - 90)
    else scrollToTop()
  }, [pathname, hash])

  return null
}
