import Icon from '@/components/ui/Icon'
import Reveal from '@/components/motion/Reveal'
import { iconFor } from '@/utils/text'
import { logo } from '@/utils/media'
import { PHASE_DURATIONS, PHASE_ICONS, DELIVERABLE_TYPES, DELIVERABLE_ICONS } from '@/data/services'
import AText from '@/components/motion/AText'

/** Section heading with optional number: 01 · Title · description */
export function SecHead({ n, title, children }) {
  return (
    <div className="sechead">
      {n && <span className="n">{n}</span>}
      <h2><AText>{title}</AText></h2>
      {children && <p><AText sub>{children}</AText></p>}
    </div>
  )
}

/** Big centred section heading used on home/about. */
export function Head({ title, children, style }) {
  return (
    <div className="head" style={style}>
      <h2><AText>{title}</AText></h2>
      {children && <p><AText sub>{children}</AText></p>}
    </div>
  )
}

/** Feature cards. items: [[icon,title,text]] */
export const Feats = ({ items }) =>
  items.map(([ic, t, d]) => (
    <Reveal className="feat" key={t}>
      <div className="ico"><Icon name={ic} /></div>
      <h3>{t}</h3>
      <p>{d}</p>
    </Reveal>
  ))

/** "How it works" cards. items: [[icon,title,text]] */
export const Flow = ({ items }) =>
  items.map(([ic, t, d]) => (
    <Reveal className="fl" key={t}>
      <div className="ico"><Icon name={ic} /></div>
      <h3>{t}</h3>
      <p>{d}</p>
    </Reveal>
  ))

/** Numbered steps. how: [[title,text]] */
export function HowBlock({ how }) {
  return (
    <div className="flow">
      {how.map(([t, d], i) => (
        <Reveal className="fl" key={t}>
          <div className="ico"><b style={{ fontFamily: 'var(--display)', fontSize: 20 }}>{i + 1}</b></div>
          <h3>{t}</h3>
          <p>{d}</p>
        </Reveal>
      ))}
    </div>
  )
}

export function WhoBlock({ intro, who }) {
  return (
    <Reveal className="who">
      <div>
        <p className="eyebrow">Who it&apos;s for</p>
        <h3>{intro}</h3>
      </div>
      <div className="chips">
        {who.map((w) => (
          <span key={w}><Icon name="check" />{w}</span>
        ))}
      </div>
    </Reveal>
  )
}

export function FaqBlock({ faq }) {
  return (
    <div className="faq">
      {faq.map(([q, a], i) => (
        <details key={q} open={i === 0}>
          <summary>{q}</summary>
          <p>{a}</p>
        </details>
      ))}
    </div>
  )
}

/** Single case study box (sample or success story). */
export function CaseBlock({ c, icon }) {
  return (
    <Reveal className="biz2">
      <div className="bzh">
        <span className="bzi"><Icon name={icon} /></span>
        <div>
          <p className="eyebrow">{c.lab || (c.sample ? 'Sample case study' : 'Success story')}</p>
          <h3>{c.ind}</h3>
        </div>
      </div>
      <div className="three">
        <div><h4><Icon name="alert" /> Challenge</h4><p>{c.ch}</p></div>
        <div><h4><Icon name="spark" /> Solution</h4><p>{c.so}</p></div>
        <div><h4><Icon name="check" /> Outcome</h4><p>{c.re}</p></div>
      </div>
    </Reveal>
  )
}

/** Four-phase timeline for a service. group = group id, how = [[title,text]], out = deliverables */
export function Timeline({ group, how, out }) {
  const dur = PHASE_DURATIONS[group]
  const icons = PHASE_ICONS[group]
  return (
    <Reveal className="tl">
      <div className="tltrack"><i /></div>
      {how.map(([t, d], k) => (
        <div className="tls" style={{ '--d': `${k * 0.35}s` }} key={t}>
          <span className="tln"><Icon name={icons[k]} /></span>
          <small className="tlw">{dur[k]}</small>
          <h3>{t}</h3>
          <p>{d}</p>
          <span className="tlo">{out[k] || ''}</span>
        </div>
      ))}
    </Reveal>
  )
}

export function Deliverables({ list, group }) {
  return (
    <div className="dlv">
      {list.map((o, k) => (
        <Reveal className="dlt" style={{ '--d': `${k * 0.1}s` }} key={o}>
          <span className="dli"><Icon name={DELIVERABLE_ICONS[group][k % 4]} /></span>
          <span className="dln">{String(k + 1).padStart(2, '0')}</span>
          <h3>{o}</h3>
          <small>{DELIVERABLE_TYPES[group][k % 4]}</small>
        </Reveal>
      ))}
    </div>
  )
}

export function Callouts({ list }) {
  return (
    <div className="callouts">
      {list.map(([ic, t, d], k) => (
        <Reveal className={`co${k === 0 ? ' co-hero' : ''}`} key={t}>
          <span className="coi"><Icon name={ic} /></span>
          <h3>{t}</h3>
          <p>{d}</p>
        </Reveal>
      ))}
    </div>
  )
}

/** Horizontal journey line. steps: [string] */
export function Journey({ steps }) {
  return (
    <Reveal className={`jr${steps.length > 9 ? ' many' : ''}`}>
      <div className="jrtrack"><i className="jrfill" /><span className="jrdot" /></div>
      <ol className="jrs">
        {steps.map((s, i) => (
          <li style={{ '--d': `${i * 0.18}s` }} key={s}>
            <span className="jri"><Icon name={iconFor(s)} /></span>
            <small>{String(i + 1).padStart(2, '0')}</small>
            <b>{s}</b>
          </li>
        ))}
      </ol>
    </Reveal>
  )
}

/** Business-case strip on product pages. */
export function BCase({ cs }) {
  return cs.logo ? (
    <div className="bcase">
      <div className="bl"><LogoImg k={cs.logo} alt={`${cs.c} logo`} /></div>
      <div><b>Business case · {cs.c}</b><small>{cs.re}</small></div>
    </div>
  ) : (
    <div className="bcase">
      <div className="bi"><Icon name="book" /></div>
      <div><b>Business case · Sample use case</b><small>{cs.re}</small></div>
    </div>
  )
}

function LogoImg({ k, alt }) {
  return <img src={logo(k)} alt={alt} />
}
