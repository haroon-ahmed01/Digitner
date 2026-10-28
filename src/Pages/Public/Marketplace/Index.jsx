import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import Seo from '@/components/seo/Seo'
import Icon from '@/components/ui/Icon'
import CounterBand from '@/components/motion/CounterBand'
import HeroDots from '@/components/motion/HeroDots'
import Reveal from '@/components/motion/Reveal'
import { CaseBlock, FaqBlock, Feats, Flow, SecHead, Shots, View } from '@/components/blocks'
import { PATHS } from '@/constant/routes'
import { AGENTS, AGENT_GRADIENTS, CONSOLE_LOG } from '@/data/marketplace'
import { CASE_SUMMARIES } from '@/data/cases'
import { PRODUCT_EXTRAS } from '@/data/products'
import { useWorkspace } from '@/context/workspace'
import { prefersReducedMotion } from '@/hooks/useReducedMotion'
import AText from '@/components/motion/AText'

const FILTERS = ['All', 'Sales', 'Marketing', 'Content', 'Growth']
const STATS = [['5', 'Agents at launch'], ['4', 'Categories'], ['1', 'Credit wallet for all agents'], ['24/7', 'Agents run on demand']]
const FEATS = [
  ['grid', 'Pick your agents', 'Choose only the agents you need, by job or category.'],
  ['layers', 'One workspace', 'Run every agent from a single dashboard.'],
  ['wallet', 'Pay with credits', 'One credit balance across all agents, no subscriptions per tool.'],
  ['users', 'Partner agents', 'Agents from Veloque founders join the marketplace over time.'],
  ['shield', 'Your data stays yours', 'Agents work on your inputs and keep results in your workspace.'],
  ['chart', 'Usage at a glance', 'See runs, results and credits spent per agent.'],
]
const FLOW = [
  ['search', 'Browse', 'Find agents by job, category or search.'],
  ['bot', 'Add', 'Add the agents you need to your workspace.'],
  ['play', 'Run', 'Give a brief and run on demand.'],
  ['wallet', 'Pay with credits', 'One balance across every agent.'],
]
const BUILD_STEPS = [
  ['Apply', 'Tell us what your agent does.'],
  ['Review', 'We test quality and safety.'],
  ['Go live', 'Your agent appears in the marketplace.'],
  ['Earn', 'Revenue share on every run.'],
]

/** Typed "terminal" that replays CONSOLE_LOG forever. */
function AgentConsole() {
  const [lines, setLines] = useState(() => (prefersReducedMotion() ? CONSOLE_LOG : []))
  useEffect(() => {
    if (prefersReducedMotion()) return
    let i = 0
    let timer
    const step = () => {
      if (i < CONSOLE_LOG.length) {
        const next = CONSOLE_LOG[i++]
        setLines((cur) => [...cur, next])
        timer = setTimeout(step, 650)
      } else {
        timer = setTimeout(() => {
          i = 0
          setLines([])
          timer = setTimeout(step, 400)
        }, 3000)
      }
    }
    timer = setTimeout(step, 400)
    return () => clearTimeout(timer)
  }, [])
  return (
    <div className="console" aria-label="Example agent run">
      <div className="cbar"><i /><i /><i /><span>workspace · preview</span></div>
      <div className="clog">
        {lines.map((l, k) => (
          <div className={l[0]} key={k}>{l[1]}</div>
        ))}
      </div>
    </div>
  )
}

function AgentModal({ agent, onClose }) {
  const { has, toggle } = useWorkspace()
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [onClose])
  const on = has(agent.id)
  return (
    <div className="modal" role="dialog" aria-modal="true" aria-labelledby="amTitle" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="mbox" data-lenis-prevent>
        <button className="x mclose" type="button" onClick={onClose}>Close</button>
        <div style={{ display: 'flex', gap: 14, alignItems: 'center', paddingRight: 70 }}>
          <div className="ico solid" style={{ width: 56, height: 56 }}><Icon name={agent.ic} /></div>
          <div>
            <p className="eyebrow">{agent.c} agent · coming soon</p>
            <h3 id="amTitle" style={{ fontSize: 28 }}>{agent.n}</h3>
          </div>
        </div>
        <p className="muted" style={{ marginTop: 14, fontSize: 16 }}>{agent.d}</p>
        <div className="am-grid">
          <div><h4>You give it</h4><ul>{agent.inp.map((x) => <li key={x}>{x}</li>)}</ul></div>
          <div><h4>You get</h4><ul>{agent.outp.map((x) => <li key={x}>{x}</li>)}</ul></div>
        </div>
        <div className="sample"><b>Sample output</b><pre>{agent.sample}</pre></div>
        <div style={{ marginTop: 18, display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
          <span className="price" style={{ fontSize: 15 }}><b>{agent.cr} credits</b> {agent.u} · planned pricing</span>
          <button type="button" className={`btn ${on ? 'ghost' : 'primary'}`} onClick={() => toggle(agent.id)}>{on ? 'Leave waitlist' : 'Join waitlist'}</button>
        </div>
      </div>
    </div>
  )
}

export default function Marketplace() {
  const { has, toggle } = useWorkspace()
  const [filter, setFilter] = useState('All')
  const [query, setQuery] = useState('')
  const [openId, setOpenId] = useState(null)

  const list = useMemo(() => {
    const q = query.trim().toLowerCase()
    return AGENTS.filter((a) => (filter === 'All' || a.c === filter) && (!q || `${a.n} ${a.d} ${a.c}`.toLowerCase().includes(q)))
  }, [filter, query])
  const open = AGENTS.find((a) => a.id === openId)

  return (
    <View>
      <Seo
        title="AI Marketplace"
        description="Coming soon: ready AI agents for leads, content and growth in one workspace with one credit balance. Join the waitlist for early access."
        path="/ai-marketplace"
      />
      <div className="mhero">
        <HeroDots />
        <div className="wrap">
          <div>
            <span className="since" style={{ background: 'rgba(255,255,255,.08)', borderColor: 'rgba(255,255,255,.18)', color: '#FFFFFF' }}><i />Digitner AI Marketplace · Launching soon</span>
            <h1><AText>Hire AI agents that </AText><em><AText delay={1.6}>do the work.</AText></em></h1>
            <AText as="p" sub className="lede" delay={0.6}>Coming soon: ready agents for leads, content and growth, in one workspace with one credit balance. Join the waitlist to get early access.</AText>
            <div className="cdown" aria-label="Upcoming launch">
              <span><b>5</b>agents at launch</span>
              <span><b>4</b>categories</span>
              <span><b>1</b>credit wallet</span>
              <Link className="btn" to={PATHS.contact}>Join the waitlist</Link>
            </div>
            <label className="msearch" htmlFor="aq">
              <Icon name="search" />
              <input id="aq" placeholder="Search agents: leads, video, posters…" aria-label="Search agents" value={query} onChange={(e) => setQuery(e.target.value)} />
            </label>
            <div className="filters" style={{ marginTop: 14 }}>
              {FILTERS.map((f) => (
                <button key={f} className="f" type="button" aria-pressed={filter === f} onClick={() => setFilter(f)}>
                  {f === 'All' ? 'All agents' : f}
                </button>
              ))}
            </div>
          </div>
          <AgentConsole />
        </div>
      </div>

      <CounterBand stats={STATS} icons={['bot', 'grid', 'wallet', 'calendar']} />

      <section>
        <SecHead n="01" title="Agents">Open an agent to see what it needs, what it delivers and what it costs.</SecHead>
        <div className="agents">
          {list.length ? (
            list.map((a, i) => {
              const [a1, a2] = AGENT_GRADIENTS[a.id] || AGENT_GRADIENTS.lead
              const on = has(a.id)
              return (
                <Reveal as="article" className="agc" style={{ '--d': `${i * 0.08}s`, '--a1': a1, '--a2': a2 }} key={a.id}>
                  <div
                    className="agt"
                    role="button"
                    tabIndex={0}
                    aria-label={`Open ${a.n}`}
                    onClick={() => setOpenId(a.id)}
                    onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && (e.preventDefault(), setOpenId(a.id))}
                  >
                    <span className="agsoon">Coming soon</span>
                    <span className="agcat">{a.c}</span>
                    <span className="agi"><Icon name={a.ic} /></span>
                    <span className="agr r1" />
                    <span className="agr r2" />
                  </div>
                  <div className="agb">
                    <h3>{a.n}</h3>
                    <p>{a.d}</p>
                    <div className="agio">
                      <div><small>You give</small><b>{a.inp.slice(0, 2).join(' · ')}</b></div>
                      <div><small>You get</small><b>{a.outp.slice(0, 2).join(' · ')}</b></div>
                    </div>
                    <p className="agbest"><Icon name="users" />Best for {a.best}</p>
                    <div className="agf">
                      <span className="agp"><small>Planned pricing</small><b>{a.cr} credits</b> {a.u}</span>
                      <button type="button" className={`wl${on ? ' on' : ''}`} onClick={() => toggle(a.id)}>
                        <Icon name={on ? 'check' : 'bell'} />{on ? 'On waitlist' : 'Join waitlist'}
                      </button>
                    </div>
                    <button type="button" className="agmore" onClick={() => setOpenId(a.id)}>See details <Icon name="arrow" /></button>
                  </div>
                </Reveal>
              )
            })
          ) : (
            <p className="muted">No agents match “{query}”. Try leads, video or posters.</p>
          )}
        </div>
        <p className="note">The Digitner AI Marketplace is launching soon. Planned pricing may change at launch.</p>
      </section>

      <section style={{ paddingTop: 0 }}>
        <SecHead n="02" title="Why the marketplace" />
        <div className="feats"><Feats items={FEATS} /></div>
      </section>
      <section style={{ paddingTop: 0 }}>
        <SecHead n="03" title="How it works" />
        <div className="flow"><Flow items={FLOW} /></div>
      </section>
      <section style={{ paddingTop: 0 }}>
        <SecHead n="04" title="Your workspace (preview)">Every agent, every run and your credits in one dashboard.</SecHead>
        <Shots id="marketplace" app="Digitner AI Marketplace" />
      </section>
      <section style={{ paddingTop: 0 }}>
        <Reveal className="builders">
          <div>
            <span className="n2">05 · For builders</span>
            <h2><AText>Build AI agents? List yours.</AText></h2>
            <p>Reach businesses worldwide and earn every time your agent runs. Founders from the Veloque AI community are first in line.</p>
            <Link className="btn" to={PATHS.contact}>Apply to list your agent</Link>
          </div>
          <ol className="bsteps">
            {BUILD_STEPS.map(([b, s]) => (
              <li key={b}><b>{b}</b><span>{s}</span></li>
            ))}
          </ol>
        </Reveal>
      </section>
      <section style={{ paddingTop: 0 }}>
        <SecHead n="06" title="Case study" />
        <CaseBlock c={CASE_SUMMARIES.marketplace} icon="bot" />
      </section>
      <section style={{ paddingTop: 0 }}>
        <SecHead n="07" title="FAQ" />
        <FaqBlock faq={PRODUCT_EXTRAS.marketplace.faq} />
      </section>

      {open && <AgentModal agent={open} onClose={() => setOpenId(null)} />}
    </View>
  )
}
