import Icon from '@/components/ui/Icon'
import NetSvg from './NetSvg'

/**
 * Hero art for every inner page: the Digitner mark inside an animated neural web, with a progress ring,
 * a metric badge and topic chips orbiting it. The mark's shape changes per page (shape prop).
 *   icon     centre icon          chips   [[label, icon]] orbiting tags      caption  line under the mark
 *   metric   badge text           shape   squircle | circle | oval | hex | octagon | diamond | shield | funnel | ticket | globe
 *   nodes    network density      seed    changes the web's rhythm            pct      progress ring fill (0-100)
 *   max      how many chips to show (default 6)
 */
export default function OrbitArt({ icon = 'spark', chips = [], caption, metric = 'AI', shape = 'squircle', nodes = 10, seed = 0, pct = 72, max = 6 }) {
  const list = chips.slice(0, max)
  const step = 360 / Math.max(list.length, 1)
  return (
    <div className={`dotmark ob shp-${shape}`}>
      <div className="big sm" aria-hidden="true">
        <NetSvg nodes={nodes} seed={seed} />
        <svg className="pring" viewBox="0 0 120 120">
          <circle cx="60" cy="60" r="56" className="prt" />
          <circle cx="60" cy="60" r="56" className="prv" style={{ strokeDashoffset: (352 * (1 - pct / 100)).toFixed(1) }} />
        </svg>
        <span className="orbit" />
        <span className="sq" />
        <span className="cic"><Icon name={icon} /></span>
        <span className="aib"><Icon name="spark" />{metric}</span>
        <div className="orbs">
          {list.map(([label, ic], i) => (
            <span className="och" style={{ '--a': `${(i * step).toFixed(1)}deg` }} key={label + i}>
              <span className="cw"><span className="cin"><Icon name={ic} />{label}</span></span>
            </span>
          ))}
        </div>
      </div>
      {caption && <p className="cap">{caption}</p>}
    </div>
  )
}
