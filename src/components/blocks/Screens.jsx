import Icon from '@/components/ui/Icon'
import Reveal from '@/components/motion/Reveal'
import { MOCKUPS } from '@/data/mockups'

/** Illustrative desktop dashboard. m = mockup data + app name. */
export function Desk({ m }) {
  return (
    <div className="desk">
      <div className="tb"><i /><i /><i /><span>{m.u}</span></div>
      <div className="body">
        <div className="side">
          <b>{m.app}</b>
          {m.nav.map((n, i) => (
            <span className={i ? '' : 'on'} key={n}>{n}</span>
          ))}
        </div>
        <div className="main">
          <div className="mh"><b>{m.h}</b><span>{m.tag}</span></div>
          <div className="kpis">
            {m.k.map(([a, b]) => (
              <div className="kpi" key={a}><small>{a}</small><b>{b}</b></div>
            ))}
          </div>
          <div className="mrow">
            <div className="rows">
              {m.rows.map((r) => (
                <div className="r" key={r[0]}><span>{r[0]}</span><em>{r[2]}</em></div>
              ))}
            </div>
            <div className="bars">
              {m.bars.map((h, i) => (
                <i key={i} style={{ height: `${h}%` }} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/** Illustrative phone screen. */
export function Phone({ p, bars = [40, 60, 50, 80, 70, 90, 65] }) {
  return (
    <div className="phone">
      <div className="ph"><small>{p.s}</small><b>{p.t}</b><div className="bigv">{p.v}</div></div>
      <div className="pb">
        {p.it.map(([a, b]) => (
          <div className="it" key={a}><i><Icon name="check" /></i><span>{a}<small>{b}</small></span></div>
        ))}
        <div className="pchart">
          <small>This week</small>
          <div className="pbars">
            {bars.map((h, i) => (
              <i key={i} style={{ height: `${h}%` }} />
            ))}
          </div>
        </div>
        {p.cta && <div className="cta">{p.cta}</div>}
      </div>
      <div className="tabbar"><i /><i /><i /><i /></div>
    </div>
  )
}

/** Desktop + two phones with caption. id = mockup id, app = product/service name. */
export function Shots({ id, app }) {
  const m = { ...MOCKUPS[id], app }
  return (
    <>
      <Reveal className="shots">
        <Desk m={m} />
        <Phone p={m.p1} bars={m.bars} />
        <Phone p={m.p2} bars={m.bars} />
      </Reveal>
      <div className="shotcap">
        <span>{app} · web dashboard and mobile app</span>
        <span>Illustrative screens with sample data</span>
      </div>
    </>
  )
}

/** Desktop + one phone, used as the hero showcase. */
export function Collage({ id, app }) {
  const m = { ...MOCKUPS[id], app }
  return (
    <div className="collage">
      <Desk m={m} />
      <Phone p={m.p1} bars={m.bars} />
    </div>
  )
}
