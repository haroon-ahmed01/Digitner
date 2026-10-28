import Icon from '@/components/ui/Icon'
import Reveal from '@/components/motion/Reveal'
import { CASES } from '@/data/cases'
import { image } from '@/utils/media'

const SUCCESS = ['cyber', 'gynec', 'leadgen']

export function CaseCard({ id, big }) {
  const c = CASES[id]
  if (!c) return null
  return (
    <Reveal as="article" className={`cs${big ? ' cs-big' : ''}`}>
      <div className="csimg" style={{ backgroundImage: `url(${image(`${c.img}.jpg`)})` }}>
        <span className="csic"><Icon name={c.ic} /></span>
        <div className="cstags">
          {c.tags.map((t) => (
            <span key={t}>{t}</span>
          ))}
        </div>
      </div>
      <div className="csb">
        <p className="eyebrow">{SUCCESS.includes(id) ? 'Success story' : 'Case study'}</p>
        <h3>{c.t}</h3>
        <div className="csx">
          <div><h4><Icon name="alert" /> Challenge</h4><p>{c.ch}</p></div>
          <div><h4><Icon name="compass" /> Approach</h4><p>{c.ap}</p></div>
          <div><h4><Icon name="check" /> Outcome</h4><p>{c.re}</p></div>
        </div>
        {big && (
          <ol className="csph">
            {c.ph.map(([a, b]) => (
              <li key={a}><b>{a}</b><small>{b}</small></li>
            ))}
          </ol>
        )}
      </div>
    </Reveal>
  )
}

export function CaseSet({ ids }) {
  return (
    <div className="csgrid">
      {ids.map((i) => (
        <CaseCard key={i} id={i} big />
      ))}
    </div>
  )
}
