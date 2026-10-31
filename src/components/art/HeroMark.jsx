import Icon from '@/components/ui/Icon'
import NetSvg from './NetSvg'

/** Chips that orbit the logo mark: [label, icon, start angle in degrees]. */
const CHIPS = [['Cloud', 'layers', 0], ['Agents', 'bot', 60], ['Apps', 'phone', 120], ['CRM', 'crm', 180], ['Data', 'chart', 240], ['Web', 'globe', 300]]

/** Home hero art: the Digitner logo mark inside an animated neural web, with topic chips orbiting it. */
export default function HeroMark({ caption, bare = false }) {
  const mark = (
      <div className={`big${bare ? ' sm' : ''}`} aria-hidden="true">
        <NetSvg nodes={10} />
        <span className="orbit" />
        <span className="sq" />
        <span className="ring" />
        <span className="dt" />
        {!bare && <span className="aib"><Icon name="spark" />AI</span>}
        {!bare && <div className="orbs">
          {CHIPS.map(([label, icon, a]) => (
            <span className="och" style={{ '--a': `${a}deg` }} key={label}>
              <span className="cw"><span className="cin"><Icon name={icon} />{label}</span></span>
            </span>
          ))}
        </div>}
      </div>
  )
  if (bare) return mark
  return (
    <div className="dotmark">
      {mark}
      {caption && <p className="cap">{caption}</p>}
    </div>
  )
}
