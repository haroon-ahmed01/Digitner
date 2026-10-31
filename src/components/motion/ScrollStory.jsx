import { useLayoutEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { geoOrthographic, geoPath, geoGraticule10, geoDistance } from 'd3-geo'
import { feature } from 'topojson-client'
import land110 from 'world-atlas/land-110m.json'
import { PATHS } from '@/constant/routes'
import { scrollToY } from '@/utils/smoothScroll'

gsap.registerPlugin(ScrollTrigger)

const WORD = 'DIGITNER'
const SCENES = [
  { tag: 'Start', title: '100+ customers across 4 locations. Let’s see where we work.' },
  { tag: 'Learn', title: 'We learn your business first', text: 'ICP, journeys and goals mapped with 100+ customers across 4 locations.', stat: '100+', label: 'customers', place: 'Vellore', region: 'Tamil Nadu, India', role: 'Head office', at: [79.13, 12.92] },
  { tag: 'Build', title: 'Websites, apps, CRMs and automation', text: 'Seventeen services, plus eight ready Digitner platforms to launch faster.', stat: '17', label: 'services', place: 'Bengaluru', region: 'Karnataka, India', role: 'Branch', at: [77.59, 12.97] },
  { tag: 'Grow', title: 'Sales and marketing that keep growing', text: 'Leads, campaigns and pipeline handled by one team that built your product.', stat: '8', label: 'platforms', place: 'Mexico', region: 'Latin America', role: 'Delivery', at: [-99.13, 19.43] },
  { tag: 'Now with AI', title: 'AI that makes it all work harder', text: 'Veloque AI, BuySei AI, SmileView AI and the AI Marketplace of ready agents.', stat: '3', label: 'AI products', cta: true, place: 'Malaysia', region: 'Southeast Asia', role: 'Delivery', at: [101.69, 3.14] },
]
const LAND = feature(land110, land110.objects.land)
const GRID = geoGraticule10()
const ZOOM = 6 // zoom on a city: country and city both visible

/** Scroll story for the Home page: the section pins, and scrolling moves through 5 scenes while a globe turns to each location. */
export default function ScrollStory() {
  const root = useRef(null)

  useLayoutEffect(() => {
    const el = root.current
    const mm = gsap.matchMedia()
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const q = (s) => gsap.utils.toArray(s, el)
      const scenes = q('.sc')
      const dots = q('.tl-dot')
      const letters = q('.story-word i')
      const n = scenes.length
      const canvas = el.querySelector('.globe-canvas')
      const tag = el.querySelector('.globe-tag')
      const ctx = canvas.getContext('2d')
      const pins = SCENES.slice(1)
      const cam = { lon: 20, lat: 18, zl: Math.log(0.84), pin: -1, idle: 1, spin: 0 }
      let last = 0
      let size = 0
      let visible = false
      let land50 = null
      let baseKey = ''
      const base = document.createElement('canvas')
      const bctx = base.getContext('2d')

      const fit = () => {
        const r = canvas.getBoundingClientRect()
        const dpr = Math.min(2, window.devicePixelRatio || 1)
        size = r.width
        canvas.width = Math.round(r.width * dpr)
        canvas.height = Math.round(r.height * dpr)
        base.width = canvas.width
        base.height = canvas.height
        bctx.setTransform(dpr, 0, 0, dpr, 0, 0)
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
        baseKey = ''
      }
      const css = (name, fb) => getComputedStyle(el).getPropertyValue(name).trim() || fb

      const draw = (time = 0) => {
        if (!size) return
        const dark = document.documentElement.dataset.theme === 'dark'
        const accent = css('--accent', '#5B54C4')
        const R0 = size / 2 - 6
        const R = R0 * Math.exp(cam.zl)
        const c = size / 2
        const lonNow = cam.lon + (((cam.spin + 180) % 360) - 180) * cam.idle
        const proj = geoOrthographic().translate([c, c]).scale(R).rotate([-lonNow, -cam.lat]).clipAngle(90).clipExtent([[-4, -4], [size + 4, size + 4]])
        ctx.clearRect(0, 0, size, size)
        // globe, grid and land only change while scrolling or turning, so they are painted once and reused
        const land = land50 && R / R0 > 2.2 ? land50 : LAND
        const deep = R / R0 > 6
        const key = [size, lonNow.toFixed(2), cam.lat.toFixed(2), R.toFixed(1), dark, land === land50, deep, R / R0 < 2].join('|')
        if (key !== baseKey) {
          baseKey = key
          const path = geoPath(proj, bctx)
          bctx.clearRect(0, 0, size, size)
          bctx.save()
          bctx.beginPath(); bctx.arc(c, c, R0, 0, 6.283); bctx.clip()
          const g = bctx.createRadialGradient(c - R * 0.35, c - R * 0.4, R * 0.1, c, c, R)
          if (dark) { g.addColorStop(0, '#3b3190'); g.addColorStop(1, '#1b1646') } else { g.addColorStop(0, '#ffffff'); g.addColorStop(1, '#ddd6fb') }
          bctx.beginPath(); path({ type: 'Sphere' }); bctx.fillStyle = g; bctx.fill()
          if (!deep && R / R0 < 2) { bctx.beginPath(); path(GRID); bctx.strokeStyle = dark ? 'rgba(190,180,255,.14)' : 'rgba(91,84,196,.14)'; bctx.lineWidth = 0.7; bctx.stroke() }
          bctx.beginPath(); path(land); bctx.fillStyle = dark ? `rgba(170,160,255,${deep ? 0.3 : 0.5})` : `rgba(91,84,196,${deep ? 0.3 : 0.5})`; bctx.fill()
          bctx.strokeStyle = dark ? 'rgba(210,205,255,.5)' : 'rgba(255,255,255,.7)'; bctx.lineWidth = 0.6; bctx.stroke()
          bctx.restore()
        }
        ctx.drawImage(base, 0, 0, size, size)
        ctx.beginPath(); ctx.arc(c, c, Math.min(R, R0), 0, 6.283); ctx.strokeStyle = dark ? 'rgba(190,180,255,.35)' : 'rgba(91,84,196,.35)'; ctx.lineWidth = 1.5; ctx.stroke()

        let tagPos = null
        pins.forEach((p, i) => {
          const dist = geoDistance(p.at, [lonNow, cam.lat])
          if (dist > Math.PI / 2 - 0.05) return
          if (cam.idle < 0.5 && i !== cam.pin) return
          const [x, y] = proj(p.at)
          const on = i === cam.pin || cam.idle > 0.5
          const ph = ((time / 1.6) + i * 0.3) % 1
          ctx.globalAlpha = on ? 1 : 0.55
          if (on) {
            ctx.beginPath(); ctx.arc(x, y, 6 + ph * 20, 0, 6.283); ctx.fillStyle = accent; ctx.globalAlpha = 0.35 * (1 - ph); ctx.fill()
            ctx.globalAlpha = 1
          }
          ctx.beginPath(); ctx.arc(x, y, on ? 5.5 : 3.5, 0, 6.283); ctx.fillStyle = accent; ctx.fill()
          ctx.lineWidth = 2; ctx.strokeStyle = '#fff'; ctx.stroke()
          if (i === cam.pin) {
            tagPos = [x, y]
          }
          if (cam.idle > 0.05 && i !== 1 && dist < Math.PI / 2 - 0.3) {
            const text = i === 0 ? 'Vellore · Bengaluru' : p.place
            ctx.font = '700 12px Inter, system-ui, sans-serif'
            const w = ctx.measureText(text).width + 20
            let lx = x + 10, ly = y - 30
            if (i === 0) lx = x - w - 10
            if (i === 3) ly = y + 8
            lx = Math.max(4, Math.min(lx, size - w - 4))
            ctx.globalAlpha = Math.min(1, cam.idle * 1.4)
            ctx.beginPath(); ctx.roundRect(lx, ly, w, 24, 12); ctx.fillStyle = dark ? '#221d52' : '#ffffff'; ctx.shadowColor = 'rgba(40,30,120,.3)'; ctx.shadowBlur = 10; ctx.fill(); ctx.shadowBlur = 0
            ctx.fillStyle = dark ? '#f1f0fa' : '#15132a'; ctx.textBaseline = 'middle'; ctx.fillText(text, lx + 10, ly + 12.5)
          }
        })
        ctx.globalAlpha = 1
        if (tagPos) {
          const pn = pins[cam.pin]
          tag.innerHTML = `<b>${pn.place}, ${pn.region}</b><small>${pn.role}</small>`
          tag.style.transform = `translate(${Math.min(tagPos[0] + 12, size - tag.offsetWidth - 4)}px, ${Math.max(tagPos[1] - 38, 4)}px)`
          tag.style.opacity = '1'
        } else tag.style.opacity = '0'
      }
      const loop = (time) => {
        if (!visible) return
        cam.spin += Math.min(0.1, time - last) * 16 * cam.idle
        last = time
        draw(time)
      }
      gsap.ticker.add(loop)
      fit()
      draw()
      // sharper coastlines for the close-up views, loaded after the page is ready
      import('world-atlas/land-50m.json').then((m) => { land50 = feature(m.default, m.default.objects.land); baseKey = ''; draw() }).catch(() => {})
      const ro = new ResizeObserver(() => { fit(); draw() })
      ro.observe(canvas)

      gsap.set(scenes.slice(1), { autoAlpha: 0, y: 40 })
      gsap.from(q('.loc-chips li'), { y: 16, autoAlpha: 0, stagger: 0.12, duration: 0.6, ease: 'power2.out', delay: 0.7 })
      gsap.from(letters, { y: 60, autoAlpha: 0, rotate: 5, stagger: 0.06, duration: 0.8, ease: 'power3.out', delay: 0.1 })

      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: el.querySelector('.story-pin'),
          start: 'top top',
          end: () => `+=${window.innerHeight * (window.innerWidth < 900 ? 3.6 : 4.2)}`,
          pin: true,
          scrub: 0.7,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onToggle: (self) => { visible = self.isActive || self.progress > 0 && self.progress < 1 },
          snap: { snapTo: Array.from({ length: n }, (_, i) => (i + 0.4) / n), duration: { min: 0.2, max: 0.6 }, ease: 'power2.inOut' },
          onUpdate: (self) => {
            const idx = Math.min(n - 1, Math.floor(self.progress * n))
            dots.forEach((d, i) => d.classList.toggle('on', i <= idx))
            el.style.setProperty('--prog', String(self.progress))
            cam.pin = idx - 1
            cam.idle = Math.min(1, Math.max(0, 1 - (self.progress - 0.09) / 0.1))
          },
        },
      })
      ScrollTrigger.create({ trigger: el, start: 'top bottom', end: 'bottom top', onToggle: (s) => { visible = s.isActive } })

      tl.fromTo(el.querySelector('.story-pin'), { '--ang': '135deg' }, { '--ang': '215deg', duration: n }, 0)
      let lon = cam.lon
      pins.forEach((p, i) => {
        const target = lon + ((p.at[0] - lon + 540) % 360) - 180
        tl.to(cam, { lon: target, lat: p.at[1], duration: 0.8, ease: 'power2.inOut' }, i + 0.6)
        if (i > 0) tl.to(cam, { zl: Math.log(1.3), duration: 0.3, ease: 'power2.in' }, i + 0.6)
        tl.to(cam, { zl: Math.log(ZOOM), duration: i > 0 ? 0.5 : 0.85, ease: 'power2.inOut' }, i > 0 ? i + 0.9 : i + 0.6)
        lon = target
      })
      scenes.forEach((sc, i) => {
        if (i > 0) tl.to(sc, { autoAlpha: 1, y: 0, duration: 0.35, ease: 'power2.out' }, i - 0.05)
        if (i < n - 1) tl.to(sc, { autoAlpha: 0, y: -40, duration: 0.3, ease: 'power2.in' }, i + 0.72)
      })
      scenes[0].querySelectorAll('.story-word i').forEach((l, i) => tl.to(l, { y: -36 - i * 3, autoAlpha: 0, duration: 0.3 }, 0.72 + i * 0.012))

      const st = tl.scrollTrigger
      const go = (e) => {
        const i = Number(e.currentTarget.dataset.i)
        scrollToY(st.start + ((i + 0.4) / n) * (st.end - st.start))
      }
      dots.forEach((d) => d.addEventListener('click', go))
      return () => {
        dots.forEach((d) => d.removeEventListener('click', go))
        gsap.ticker.remove(loop)
        ro.disconnect()
      }
    })
    return () => mm.revert()
  }, [])

  return (
    <section className="story" ref={root} aria-label="How Digitner works">
      <div className="story-pin">
        <div className="story-stage">
          <div className="story-text">
            {SCENES.map((s, i) => (
              <div className="sc" key={s.tag}>
                {i === 0 ? (
                  <>
                    <h2 className="story-word" aria-label={WORD}>{[...WORD].map((c, k) => <i key={k} aria-hidden="true">{c}</i>)}</h2>
                    <p className="sc-sub">{s.title}</p>
                    <ul className="loc-chips">
                      {SCENES.slice(1).map((l) => <li key={l.place}><i />{l.place}<span>{l.role}</span></li>)}
                    </ul>
                  </>
                ) : (
                  <>
                    <span className="sc-tag">{s.tag}</span>
                    <h3>{s.title}</h3>
                    <p>{s.text}</p>
                    <div className="sc-stat"><b>{s.stat}</b><span>{s.label}</span></div>
                    {s.cta && <Link className="btn primary" to={PATHS.ai}>Explore AI Solutions</Link>}
                  </>
                )}
              </div>
            ))}
          </div>

          <div className="story-art" aria-hidden="true">
            <canvas className="globe-canvas" />
            <span className="globe-tag" />
          </div>
        </div>

        <div className="tl" aria-hidden="true">
          <span className="tl-line"><span className="tl-fill" /></span>
          {SCENES.map((s, i) => (
            <button type="button" key={s.tag} className={`tl-dot${i === 0 ? ' on' : ''}`} data-i={i} tabIndex={-1}>
              <i /><span>{s.tag}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
