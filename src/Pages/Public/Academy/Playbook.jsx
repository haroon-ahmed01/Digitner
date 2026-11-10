import { Link, useNavigate } from 'react-router-dom'
import Seo from '@/components/seo/Seo'
import { View } from '@/components/blocks/Hero'
import Ms from '@/components/academy/Ms'
import { FormatPicker } from '@/components/academy/Agendas'
import { AgentDiagram } from '@/components/academy/Diagrams'
import { PATHS } from '@/constant/routes'
import { AGENT, FUNCTIONS, MANUAL, MANUAL_FORMAT, PLAYBOOK, TOOLS } from '@/data/academy'

const Back = () => (
  <Link className="ac-backlink" to={PATHS.academyProgrammes}>
    <Ms name="arrow_back" className="ac-sm" />
    All programmes
  </Link>
)

export default function AcademyPlaybook() {
  const navigate = useNavigate()
  const requestManual = () => navigate(PATHS.academyRegister, { state: { format: MANUAL_FORMAT } })

  return (
    <View>
      <Seo
        title="AI Business Playbook"
        description="A hands-on AI workshop for owners and managers of shops, workshops, clinics and service firms. Put AI to work across operations, sales, marketing, service, finance and HR, and build your own AI assistant."
        path={PATHS.academyPlaybook}
      />

      <section id="course">
        <div className="ac-wrap ac-course">
          <div className="ac-head" style={{ margin: 0 }}>
            <Back />
            <span className="ac-label">{PLAYBOOK.label}</span>
            <h2>{PLAYBOOK.title}</h2>
            <p className="ac-lede">{PLAYBOOK.lede}</p>
            <dl className="ac-meta">
              {PLAYBOOK.meta.map(([k, v]) => (
                <div className="ac-metarow" key={k}>
                  <dt>{k}</dt>
                  <dd>{v}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div>
            <h3 style={{ marginBottom: 16 }}>{PLAYBOOK.outcomesTitle}</h3>
            <ul className="ac-outcomes">
              {PLAYBOOK.outcomes.map(([ic, text]) => (
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
      </section>

      <section id="functions">
        <div className="ac-wrap">
          <div className="ac-head">
            <span className="ac-label">{FUNCTIONS.label}</span>
            <h2>{FUNCTIONS.title}</h2>
            <p className="ac-lede">{FUNCTIONS.lede}</p>
          </div>
          <div className="ac-ledger">
            {FUNCTIONS.rows.map((r) => (
              <div className={`ac-row${r.core ? ' ac-core' : ''}`} key={r.n}>
                <div className="ac-fn">
                  <span className="ac-order">{r.m}</span>
                  <h3>
                    <Ms name={r.ic} className="ac-fnic" />
                    {r.n}
                  </h3>
                </div>
                <div className="ac-chips">
                  {r.chips.map((c) => (
                    <span className="ac-chip" key={c}>
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="formats">
        <div className="ac-wrap">
          <div className="ac-head">
            <span className="ac-label">Formats</span>
            <h2>Pick the session that fits your day.</h2>
          </div>
          <FormatPicker />
        </div>
      </section>

      <section id="manual">
        <div className="ac-wrap ac-manual">
          <div className="ac-bookwrap">
            <div className="ac-book" aria-hidden="true" style={{ position: 'relative' }}>
              <span className="ac-lock">
                <svg viewBox="0 0 24 24">
                  <rect x="5" y="11" width="14" height="10" rx="2" />
                  <path d="M8 11V8a4 4 0 018 0v3" />
                </svg>
                {MANUAL.lock}
              </span>
              <span className="ac-small">{MANUAL.cover[0]}</span>
              <div style={{ display: 'grid', gap: 14 }}>
                <span className="ac-bookband" />
                <span className="ac-t">{MANUAL.cover[1]}</span>
                <span className="ac-small">{MANUAL.cover[2]}</span>
              </div>
              <span className="ac-small">{MANUAL.cover[3]}</span>
            </div>
            <button className="ac-btn" type="button" onClick={requestManual}>
              {MANUAL.cta}
            </button>
          </div>
          <div>
            <div className="ac-head">
              <span className="ac-label">{MANUAL.label}</span>
              <h2>{MANUAL.title}</h2>
              <p className="ac-lede">{MANUAL.lede}</p>
            </div>
            <ol className="ac-toc">
              {MANUAL.toc.map(([b, s]) => (
                <li key={b}>
                  <div>
                    <b>{b}</b>
                    <span>{s}</span>
                  </div>
                </li>
              ))}
            </ol>
            <div className="ac-access">
              <b>{MANUAL.accessTitle}</b>
              <ul>
                {MANUAL.access.map((a) => (
                  <li key={a}>{a}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section id="agent">
        <div className="ac-wrap ac-agent">
          <div>
            <div className="ac-head">
              <span className="ac-label">{AGENT.label}</span>
              <h2>{AGENT.title}</h2>
              <p className="ac-lede">{AGENT.lede}</p>
            </div>
            <ol className="ac-steps">
              {AGENT.steps.map(([b, s]) => (
                <li key={b}>
                  <div>
                    <b>{b}</b>
                    <span>{s}</span>
                  </div>
                </li>
              ))}
            </ol>
          </div>
          <AgentDiagram />
        </div>
      </section>

      <section id="tools">
        <div className="ac-wrap">
          <div className="ac-head">
            <span className="ac-label">{TOOLS.label}</span>
            <h2>{TOOLS.title}</h2>
          </div>
          <div className="ac-tools">
            {TOOLS.list.map(([ic, tier, name, text]) => (
              <div className="ac-tool" key={name}>
                <Ms name={ic} className="ac-toolic" />
                <span className={`ac-tier${tier === 'Free' ? '' : ' ac-paid'}`}>{tier}</span>
                <b>{name}</b>
                <span>{text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </View>
  )
}
