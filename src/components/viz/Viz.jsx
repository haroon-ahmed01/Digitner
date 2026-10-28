import Reveal from '@/components/motion/Reveal'

/** Framed illustrative visual: title bar + live tag + caption. */
export function VizFrame({ title, tag, caption, children }) {
  return (
    <>
      <Reveal className="viz">
        <div className="vzh">
          <b>{title}</b>
          <span className="live"><i />{tag}</span>
        </div>
        <div className="vzb">{children}</div>
      </Reveal>
      <div className="shotcap">
        <span>{caption}</span>
        <span>Illustrative example</span>
      </div>
    </>
  )
}

function Roadmap() {
  const rows = [['Quick wins', 'WhatsApp reminders', 0, 2], ['Quick wins', 'CRM pipeline', 0, 3], ['Optimisation', 'Executive dashboards', 2, 6], ['Optimisation', 'Process automation', 3, 7], ['Scale-up', 'AI support agent', 5, 9], ['Scale-up', 'New market launch', 7, 12]]
  return (
    <VizFrame title="Transformation roadmap · 12 months" tag="Phase plan" caption="Roadmap with phases, timelines and owners">
      <div className="gantt">
        <div className="gm"><span />{Array.from({ length: 12 }, (_, i) => <span key={i}>M{i + 1}</span>)}</div>
        {rows.map((r, i) => (
          <div className="gr" key={r[1]}>
            <span className="gl"><small>{r[0]}</small>{r[1]}</span>
            <div className="gt"><i className={`gb p${r[0][0]}`} style={{ left: `${(r[2] / 12) * 100}%`, width: `${((r[3] - r[2]) / 12) * 100}%`, animationDelay: `${i * 0.12}s` }} /></div>
          </div>
        ))}
        <div className="glegend"><span><i className="pQ" />Quick wins</span><span><i className="pO" />Optimisation</span><span><i className="pS" />Scale-up</span></div>
      </div>
    </VizFrame>
  )
}

function Radar() {
  const ax = ['Presence', 'Process', 'Automation', 'Analytics', 'People', 'Performance']
  const you = [78, 58, 34, 52, 66, 62]
  const peer = [64, 60, 52, 55, 58, 60]
  const pt = (v, i, r = 120) => {
    const a = -Math.PI / 2 + (i * Math.PI) / 3
    return [150 + (Math.cos(a) * r * v) / 100, 150 + (Math.sin(a) * r * v) / 100]
  }
  const poly = (a) => a.map((v, i) => pt(v, i).join(',')).join(' ')
  return (
    <VizFrame title="Digital Fitness Report" tag="Score 62 / 100" caption="Six-area maturity score benchmarked against peers">
      <div className="radarw">
        <svg viewBox="0 0 300 300" className="radar" role="img" aria-label="Maturity radar chart">
          {[25, 50, 75, 100].map((l) => <polygon key={l} points={poly(Array(6).fill(l))} className="rg" />)}
          {ax.map((a, i) => {
            const [x, y] = pt(100, i)
            const [lx, ly] = pt(118, i)
            return (
              <g key={a}>
                <line x1="150" y1="150" x2={x} y2={y} className="rg" />
                <text x={lx} y={ly} textAnchor="middle" dominantBaseline="middle" className="rt">{a}</text>
              </g>
            )
          })}
          <polygon points={poly(peer)} className="rpeer" />
          <polygon points={poly(you)} className="ryou" />
        </svg>
        <div className="rlist">
          {ax.map((a, i) => (
            <div key={a}><span>{a}</span><div className="rb"><i style={{ width: `${you[i]}%` }} /></div><b>{you[i]}</b></div>
          ))}
          <p className="rkey"><i className="ky" />Your business <i className="kp" />Sector peers</p>
        </div>
      </div>
    </VizFrame>
  )
}

function Icp() {
  const seg = [['Multi-branch clinics', 88, 72, 34], ['Interior firms', 80, 55, 28], ['Insurance agencies', 66, 40, 22], ['Retail chains', 48, 80, 30], ['Logistics SMEs', 38, 35, 18]]
  return (
    <VizFrame title="Ideal Customer Profile" tag="v2 · validated" caption="Persona and segment priority matrix">
      <div className="icpw">
        <div className="persona">
          <div className="pav">CO</div>
          <div><b>Clinic owner, 3–10 branches</b><small>Primary buyer · decision-maker</small></div>
          <dl>
            <dt>Goals</dt><dd>More repeat patients, one view of all branches</dd>
            <dt>Pains</dt><dd>Paper records, missed follow-ups, staff turnover</dd>
            <dt>Triggers</dt><dd>Opening a new branch, hiring front-desk staff</dd>
            <dt>Channels</dt><dd>WhatsApp, LinkedIn, dental associations</dd>
          </dl>
        </div>
        <div className="bub">
          <div className="bax"><span>Market size →</span><span>↑ Fit with your offer</span></div>
          {seg.map((s, i) => (
            <div className="bb" key={s[0]} style={{ left: `${s[2]}%`, bottom: `${s[1]}%`, width: s[3] * 2, height: s[3] * 2, animationDelay: `${i * 0.15}s` }}><span>{s[0]}</span></div>
          ))}
        </div>
      </div>
    </VizFrame>
  )
}

function JourneyMap() {
  const st = ['Discover', 'Consider', 'Book', 'Visit', 'Follow-up', 'Return']
  const tp = ['Google · Instagram', 'Website · reviews', 'Phone call', 'Front desk · chair', 'None', 'WhatsApp offer']
  const emo = [60, 52, 22, 74, 30, 82]
  const xs = st.map((_, i) => 30 + i * 108)
  const pts = emo.map((e, i) => `${xs[i]},${150 - e * 1.2}`).join(' ')
  return (
    <VizFrame title="Customer journey map · clinic patient" tag="Current state" caption="Stages, touchpoints, emotion curve and pain points">
      <div className="jw">
        <div className="jst">{st.map((s, i) => <div key={s}><b>{s}</b><small>{tp[i]}</small></div>)}</div>
        <svg viewBox="0 0 600 160" className="jcurve" preserveAspectRatio="none" role="img" aria-label="Customer emotion curve">
          <line x1="0" y1="90" x2="600" y2="90" className="jmid" />
          <polyline points={pts} className="jline" />
          {emo.map((e, i) => <circle key={i} cx={xs[i]} cy={150 - e * 1.2} r="7" className={e < 40 ? 'jpain' : 'jok'} />)}
        </svg>
        <div className="jpp"><span className="bad">Pain: booking only by phone, 40% drop-off</span><span className="bad">Pain: no follow-up after treatment</span><span className="good">Moment that matters: the first visit</span></div>
      </div>
    </VizFrame>
  )
}

function Matrix() {
  const uc = [['Invoice extraction', 78, 26], ['WhatsApp support agent', 84, 38], ['Demand forecasting', 70, 70], ['Churn prediction', 56, 58], ['Meeting notes', 30, 18], ['Custom LLM', 38, 88]]
  return (
    <VizFrame title="AI use-case portfolio" tag="12 ideas scored" caption="Use cases ranked by business value and effort">
      <div className="mx">
        <div className="mq"><span>Quick wins</span><span>Big bets</span><span>Fill-ins</span><span>Deprioritise</span></div>
        {uc.map((u, i) => (
          <div className="md" key={u[0]} style={{ left: `${u[2]}%`, bottom: `${u[1]}%`, animationDelay: `${i * 0.15}s` }}><i /><span>{u[0]}</span></div>
        ))}
        <span className="mxl">Effort →</span><span className="myl">Value →</span>
      </div>
    </VizFrame>
  )
}

function Deck() {
  const sl = [['Q3 Board Review', 'Growth, priorities and the ask', 't'], ['Revenue up 34%', 'Year on year, all regions', 'c'], ['Three priorities', 'Expand · Automate · Retain', 'l'], ['The ask', 'Approve phase 2 budget', 'a']]
  return (
    <VizFrame title="Board deck · 18 slides" tag="Auto-play" caption="Storyline, charts and the ask">
      <div className="deck">
        <div className="dstage">
          {sl.map((s, i) => (
            <div className={`slide sv-${s[2]}`} key={s[0]} style={{ animationDelay: `${i * 3}s` }}>
              <small>Digitner · Board</small>
              <h4>{s[0]}</h4>
              <p>{s[1]}</p>
              {s[2] === 'c' && <div className="sbars"><i style={{ height: '40%' }} /><i style={{ height: '55%' }} /><i style={{ height: '62%' }} /><i style={{ height: '84%' }} /></div>}
              {s[2] === 'l' && <ol><li>Expand to 2 new cities</li><li>Automate collections</li><li>Retain top accounts</li></ol>}
            </div>
          ))}
        </div>
        <div className="thumbs">{sl.map((s, i) => <span key={s[0]} style={{ animationDelay: `${i * 3}s` }}>{i + 1}</span>)}</div>
      </div>
    </VizFrame>
  )
}

function Rfq() {
  const r = [['Functional requirements', '64 / 64', 100], ['Technical requirements', '40 / 42', 95], ['Security & compliance', '22 / 22', 100], ['Commercials', '16 / 18', 89], ['Annexures & forms', '18 / 18', 100]]
  return (
    <VizFrame title="RFP response · smart city portal" tag="Due Friday" caption="Requirement tracking and compliance matrix">
      <div className="rfq">
        <div className="cring">
          <svg viewBox="0 0 120 120"><circle cx="60" cy="60" r="50" className="rtrack" /><circle cx="60" cy="60" r="50" className="rval" /></svg>
          <div><b>96%</b><small>Compliance</small></div>
        </div>
        <div className="rtab">
          {r.map((x, i) => (
            <div className="rrow" key={x[0]}><span>{x[0]}</span><div className="rb"><i style={{ width: `${x[2]}%`, animationDelay: `${i * 0.12}s` }} /></div><b>{x[1]}</b></div>
          ))}
          <p className="note">Compliance matrix, executive summary and answer library delivered with every bid.</p>
        </div>
      </div>
    </VizFrame>
  )
}

function Funnel() {
  const f = [['Researched accounts', '1,200', 100], ['Qualified (ICP fit)', '480', 74], ['Contacted', '360', 60], ['Replied', '64', 36], ['Meetings booked', '18', 22]]
  return (
    <VizFrame title="Lead generation pipeline · this quarter" tag="Live" caption="From researched accounts to booked meetings">
      <div className="fun">
        {f.map((x, i) => (
          <div className="fr" key={x[0]}><div className="fb" style={{ width: `${x[2]}%`, animationDelay: `${i * 0.15}s` }}><span>{x[0]}</span><b>{x[1]}</b></div></div>
        ))}
      </div>
      <div className="feed" aria-hidden="true">
        <div>New reply · Studio Linea, Dubai</div><div>Meeting booked · Casa Forma, Madrid</div><div>New reply · Nordhaus, Oslo</div><div>Qualified · Arka Interiors, Pune</div>
      </div>
    </VizFrame>
  )
}

function Campaign() {
  return (
    <VizFrame title="Campaign performance · October" tag="Live" caption="Brand creative, channels and lead results">
      <div className="camp">
        <div className="posts">
          <div className="post p1"><small>Instagram</small><b>Diwali offer</b><span>20% off</span></div>
          <div className="post p2"><small>LinkedIn</small><b>Case study</b><span>Read more</span></div>
          <div className="post p3"><small>Google Ads</small><b>Book a demo</b><span>Search</span></div>
        </div>
        <div className="cm">
          <div className="cmk"><div><small>Reach</small><b>1.2M</b></div><div><small>Leads</small><b>640</b></div><div><small>Cost / lead</small><b>₹82</b></div></div>
          <svg viewBox="0 0 300 100" className="cline" preserveAspectRatio="none" role="img" aria-label="Leads trend"><polyline points="0,85 40,78 80,70 120,62 160,50 200,44 240,30 300,16" className="cl" /></svg>
        </div>
      </div>
    </VizFrame>
  )
}

const VIZ = { roadmap: Roadmap, radar: Radar, icp: Icp, journey: JourneyMap, matrix: Matrix, deck: Deck, rfq: Rfq, funnel: Funnel, campaign: Campaign }

/** <Viz name="radar" /> */
export default function Viz({ name }) {
  const C = VIZ[name]
  return C ? <C /> : null
}
export { Funnel, Radar }
