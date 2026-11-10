import { Link } from 'react-router-dom'
import Seo from '@/components/seo/Seo'
import { View } from '@/components/blocks/Hero'
import Ms from '@/components/academy/Ms'
import { BlueprintAgenda } from '@/components/academy/Agendas'
import { NorthStarViz } from '@/components/academy/Diagrams'
import { PATHS } from '@/constant/routes'
import { BLUEPRINT as B } from '@/data/academy'

export default function AcademyBlueprint() {
  return (
    <View>
      <Seo
        title="AI Growth Blueprint"
        description="A hands-on strategy workshop for owners and leadership teams. Use AI on your own data to find your best customers, pick your North Star metric and leave with a 90-day action plan your team commits to."
        path={PATHS.academyBlueprint}
      />

      <section id="blueprint">
        <div className="ac-wrap ac-course">
          <div className="ac-head" style={{ margin: 0 }}>
            <Link className="ac-backlink" to={PATHS.academyProgrammes}>
              <Ms name="arrow_back" className="ac-sm" />
              All programmes
            </Link>
            <span className="ac-label">{B.label}</span>
            <h2>{B.title}</h2>
            <p className="ac-lede">{B.lede}</p>
            <dl className="ac-meta">
              {B.meta.map(([k, v]) => (
                <div className="ac-metarow" key={k}>
                  <dt>{k}</dt>
                  <dd>{v}</dd>
                </div>
              ))}
            </dl>
            <div className="ac-ctas">
              <Link className="ac-btn" to={PATHS.academyRegister}>
                Register <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
          <div>
            <h3 style={{ marginBottom: 16 }}>{B.outcomesTitle}</h3>
            <ul className="ac-outcomes">
              {B.outcomes.map(([ic, text]) => (
                <li key={text}>
                  <span className="ac-tick">
                    <Ms name={ic} />
                  </span>
                  <span>{text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="ac-wrap" style={{ marginTop: 56 }}>
          <div className="ac-head">
            <span className="ac-label">{B.coverLabel}</span>
            <h3 style={{ fontSize: '1.6rem' }}>{B.coverTitle}</h3>
          </div>
          <div className="ac-bpcover">
            {B.cover.map(([ic, title, text]) => (
              <div className="ac-bpc" key={title}>
                <Ms name={ic} />
                <b>{title}</b>
                <span>{text}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="ac-wrap ac-nsgrid">
          <div>
            <span className="ac-label">{B.star.label}</span>
            <h3 style={{ fontSize: '1.9rem', marginTop: 10 }}>{B.star.title}</h3>
            <p className="ac-lede" style={{ marginTop: 12 }}>
              {B.star.lede}
            </p>
            <div className="ac-tablewrap">
              <table className="ac-nstable">
                <thead>
                  <tr>
                    {B.star.head.map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {B.star.rows.map(([a, b]) => (
                    <tr key={a}>
                      <td>{a}</td>
                      <td>{b}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <NorthStarViz />
        </div>

        <div className="ac-wrap" style={{ marginTop: 56 }}>
          <div className="ac-head">
            <span className="ac-label">{B.agendaLabel}</span>
            <h3 style={{ fontSize: '1.6rem' }}>{B.agendaTitle}</h3>
          </div>
          <BlueprintAgenda />
        </div>

        <div className="ac-wrap ac-detail2">
          <div className="ac-notes" style={{ gridColumn: '1/-1' }}>
            <h3>
              <Ms name="sticky_note_2" />
              {B.notesTitle}
            </h3>
            <ul>
              {B.notes.map((n) => (
                <li key={n}>{n}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </View>
  )
}
