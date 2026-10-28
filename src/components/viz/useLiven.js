import { useEffect } from 'react'
import { prefersReducedMotion } from '@/hooks/useReducedMotion'

const MSGS = ['New booking confirmed', 'Payment received', 'Reminder sent', 'Report ready', 'New lead assigned', 'Invoice shared']
const retrigger = (el, cls) => {
  el.classList.remove(cls)
  void el.offsetWidth
  el.classList.add(cls)
}

/** Makes the illustrative app screens inside `ref` feel live (row flashes, KPI ticks, phone notifications). */
export function useLiven(ref) {
  useEffect(() => {
    const root = ref.current
    if (!root || prefersReducedMotion()) return
    const timer = setInterval(() => {
      root.querySelectorAll('.desk').forEach((d) => {
        const ems = d.querySelectorAll('.rows em')
        if (ems.length) retrigger(ems[Math.floor(Math.random() * ems.length)], 'flash')
        const k = d.querySelector('.kpi b')
        if (k) {
          const m = k.textContent.match(/^([^\d]*)([\d,]+)(.*)$/)
          if (m && !m[3].includes('/')) {
            k.textContent = m[1] + (parseInt(m[2].replace(/,/g, ''), 10) + 1).toLocaleString('en-IN') + m[3]
            retrigger(k, 'tick')
          }
        }
        const bars = d.querySelectorAll('.bars i')
        if (bars.length) bars[bars.length - 1].style.height = `${55 + Math.random() * 45}%`
      })
      root.querySelectorAll('.phone').forEach((p) => {
        let n = p.querySelector('.notif')
        if (!n) {
          n = document.createElement('div')
          n.className = 'notif'
          p.appendChild(n)
        }
        n.textContent = MSGS[Math.floor(Math.random() * MSGS.length)]
        retrigger(n, 'show')
      })
    }, 2600)
    return () => clearInterval(timer)
  }, [ref])
}
