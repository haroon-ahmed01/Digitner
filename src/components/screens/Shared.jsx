import { Link } from 'react-router-dom'
import Icon from '@/components/ui/Icon'
import AText from '@/components/motion/AText'

/** Breadcrumb: items = [[label, to?]] – the last one has no link. */
export function Crumbs({ items }) {
  return (
    <div className="crumbs">
      {items.map(([label, to], i) => (
        <span key={label} style={{ display: 'contents' }}>
          {i > 0 && <span>/</span>}
          {to ? <Link to={to}>{label}</Link> : <span>{label}</span>}
        </span>
      ))}
    </div>
  )
}

/** Big icon square + small tag line (and optional pill) under the breadcrumb. */
export function TitleRow({ icon, tag, children, wrap }) {
  return (
    <div style={{ display: 'flex', gap: 14, alignItems: 'center', marginTop: 18, flexWrap: wrap ? 'wrap' : undefined }}>
      <div className="ico solid" style={{ width: 56, height: 56 }}><Icon name={icon} /></div>
      <span className="tagline">{tag}</span>
      {children}
    </div>
  )
}

/** "Digitner <shining name>." – each letter gets a stagger index for the shine animation. */
export function ShineTitle({ name }) {
  return (
    <h1 className="ptitle">
      <span className="pw">Digitner</span>{' '}
      <em className="shine">
        {name.split('').map((ch, k) => (
          <span key={k} style={{ '--k': k }}>{ch === ' ' ? ' ' : ch}</span>
        ))}
      </em>
      <span className="pdot">.</span>
    </h1>
  )
}

/** Purple "Next …" band. */
export function NextBand({ label, title, to, cta }) {
  return (
    <div className="band">
      <div>
        <p style={{ opacity: 0.8, fontSize: 14 }}>{label}</p>
        <h2><AText>{title}</AText></h2>
      </div>
      <Link className="btn" to={to}>{cta} <Icon name="arrow" /></Link>
    </div>
  )
}

/** Numbered section: <Sec n="01" title="…" first>…</Sec> */
export function Sec({ n, title, desc, first, children, style }) {
  return (
    <section style={first ? style : { paddingTop: 0, ...style }}>
      <div className="sechead">
        {n && <span className="n">{n}</span>}
        <h2><AText>{title}</AText></h2>
        {desc ? <p><AText sub>{desc}</AText></p> : null}
      </div>
      {children}
    </section>
  )
}
