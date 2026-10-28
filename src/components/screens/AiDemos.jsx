import { useCallback, useEffect, useRef, useState } from 'react'
import Icon from '@/components/ui/Icon'
import { ADOPTION_STAGES } from '@/data/marketplace'

const TOOLS = [['DocuMint', 'Invoice & receipt extraction', 'Finance'], ['LedgerLens', 'AP automation with approvals', 'Finance'], ['ScribeOps', 'Meeting notes to tasks', 'Productivity'], ['LeadLoom', 'B2B lead enrichment', 'Sales'], ['ShipSense', 'Freight document parsing', 'Logistics'], ['PixPost', 'Social poster generation', 'Marketing'], ['ClipForge', 'Short video from a script', 'Marketing'], ['HireHound', 'Resume screening', 'HR'], ['DeskPilot', 'Support ticket triage', 'Support'], ['TaxTrail', 'GST and tax filing assistant', 'Finance']]

function results(text) {
  const w = text.toLowerCase().split(/\W+/).filter((x) => x.length > 2)
  let r = TOOLS.map((t) => [t, w.filter((x) => t.join(' ').toLowerCase().includes(x.replace(/ing$/, ''))).length]).filter((x) => x[1]).sort((a, b) => b[1] - a[1]).slice(0, 4)
  if (!r.length) r = TOOLS.slice(0, 4).map((t) => [t, 0])
  return r
}

const Bar = () => <div className="bar"><span /><span /><span /></div>

/** Veloque: live "search AI tools" demo. */
export function VeloqueScreen() {
  const [q, setQ] = useState('AI for invoice processing')
  return (
    <div className="screen wide">
      <Bar />
      <label className="search" htmlFor="vq">
        <Icon name="search" />
        <input id="vq" value={q} onChange={(e) => setQ(e.target.value)} aria-label="Search AI tools" />
      </label>
      <div style={{ marginTop: 6 }}>
        {results(q).map(([t]) => (
          <div className="tool" key={t[0]}>
            <span>{t[0]}<small>{t[1]}</small></span>
            <span className="chip">{t[2]}</span>
          </div>
        ))}
      </div>
      <p className="note">Example results</p>
    </div>
  )
}

/** BuySei: tap an adoption stage to see score and best opening. */
export function BuySeiScreen() {
  const [i, setI] = useState(2)
  const [, score, open] = ADOPTION_STAGES[i]
  return (
    <div className="screen wide">
      <Bar />
      <p className="eyebrow">Example profile</p>
      <div className="bprof">
        <span className="bav">AM</span>
        <div>
          <p style={{ fontFamily: 'var(--display)', fontWeight: 700, fontSize: 22 }}>Arjun Mehta</p>
          <p className="muted" style={{ fontSize: 14 }}>VP Operations · mid-size logistics company</p>
        </div>
      </div>
      <div className="bsig"><span><Icon name="spark" />Trialled 2 AI tools</span></div>
      <p className="eyebrow" style={{ marginTop: 16 }}>AI adoption stage · tap to explore</p>
      <div className="stages">
        {ADOPTION_STAGES.map((s, j) => (
          <button type="button" key={s[0]} className={`stage${j === i ? ' on' : ''}`} onClick={() => setI(j)}>{s[0]}</button>
        ))}
      </div>
      <div className="kv"><span>Readiness score</span><b>{score} / 100</b></div>
      <div className="meter"><span style={{ width: `${score}%` }} /></div>
      <div className="kv"><span>Best opening</span><b>{open}</b></div>
    </div>
  )
}

/** SmileView: canvas before/after slider (drawn, not a photo). */
export function SmileScreen() {
  const cv = useRef(null)
  const sl = useRef(null)

  const draw = useCallback(() => {
    const canvas = cv.current
    const slider = sl.current
    if (!canvas || !slider) return
    const c = canvas.getContext('2d')
    const W = canvas.width
    const H = canvas.height
    const css = getComputedStyle(document.documentElement)
    const lip = css.getPropertyValue('--s').trim()
    const split = (W * slider.value) / 100
    c.fillStyle = css.getPropertyValue('--sunk').trim()
    c.fillRect(0, 0, W, H)
    ;[[0, split, false], [split, W, true]].forEach(([x0, x1, after]) => {
      c.save()
      c.beginPath()
      c.rect(x0, 0, x1 - x0, H)
      c.clip()
      c.fillStyle = '#3a1a24'
      c.beginPath()
      c.ellipse(W / 2, H / 2, 220, 70, 0, 0, Math.PI * 2)
      c.fill()
      const n = 10
      const tw = 36
      for (let i = 0; i < n; i++) {
        const x = W / 2 - (n * tw) / 2 + i * tw
        const jit = after ? 0 : [6, -4, 8, -7, 3, -5, 9, -3, 5, -8][i]
        const tilt = after ? 0 : [0.12, -0.1, 0.08, -0.14, 0.05, -0.06, 0.13, -0.09, 0.1, -0.12][i]
        c.save()
        c.translate(x + tw / 2, H / 2 - 20 + jit)
        c.rotate(tilt)
        c.fillStyle = after ? '#FBF8F0' : '#E4D6AE'
        c.beginPath()
        c.roundRect(-tw / 2 + 2, -26, tw - 4, 52, [4, 4, 12, 12])
        c.fill()
        c.restore()
      }
      c.strokeStyle = lip
      c.lineWidth = 14
      c.beginPath()
      c.ellipse(W / 2, H / 2, 224, 74, 0, 0, Math.PI * 2)
      c.stroke()
      c.restore()
    })
    c.fillStyle = css.getPropertyValue('--ink').trim()
    c.fillRect(split - 1.5, 0, 3, H)
  }, [])

  useEffect(() => {
    draw()
    const mo = new MutationObserver(draw)
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })
    return () => mo.disconnect()
  }, [draw])

  return (
    <div className="screen wide">
      <Bar />
      <div className="smile">
        <canvas ref={cv} width="560" height="220" aria-label="Before and after smile illustration" />
        <span className="lab" style={{ left: 10 }}>Before</span>
        <span className="lab" style={{ right: 10 }}>After</span>
      </div>
      <label htmlFor="sl" className="eyebrow" style={{ display: 'block', marginTop: 14 }}>Drag to compare</label>
      <input className="slider" id="sl" ref={sl} type="range" min="0" max="100" defaultValue="50" onInput={draw} />
      <p className="note">Illustration</p>
    </div>
  )
}
