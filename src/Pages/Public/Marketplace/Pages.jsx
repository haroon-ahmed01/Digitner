import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { PATHS } from '@/constant/routes'
import { Ic } from './icons'
import W from './Words'
import { useAutoplay } from './AutoVideo'
import { HUB, MK, PAGES, PN } from './data'
import { cx, asset } from './util'
import { useMkt } from './ctx'

/** Page title block: breadcrumb, eyebrow, big headline and one line under it. */
export function PHead({ crumb, icon, eyebrow, children, lede }) {
  return (
    <div className={cx('dots phead')}>
      <div className={cx('wrap')}>
        <div className={cx('crumb')}>
          <a href="#home">Home</a>
          <span>/</span>
          <span>{crumb}</span>
        </div>
        <span className={cx('eyebrow')}><span><Ic n={icon} s={15} /></span>{eyebrow}</span>
        <h1 style={{ marginTop: 16 }}>{children}</h1>
        <p className={cx('lede')}>{lede}</p>
      </div>
    </div>
  )
}

const dot = <span className={cx('d')}>.</span>

export function AgentsHead() {
  const { T } = useMkt()
  return T ? (
    <PHead crumb="Agents" icon="store" eyebrow={`${T.name} · AI Marketplace`} lede="Active in your workspace, or one tap to add.">
      Your agents{dot} <span className={cx('grad')}>Ready to work.</span>
    </PHead>
  ) : (
    <PHead crumb="Agents" icon="store" eyebrow="Digitner AI Marketplace · Agents" lede="Each one does one job well, priced in credits. Add only what you need.">
      Every agent{dot} <span className={cx('grad')}>Ready to hire.</span>
    </PHead>
  )
}
export const ProductHead = () => (
  <PHead crumb="Product" icon="layout" eyebrow="Digitner AI Marketplace · Product" lede="Team rooms, an inbox for approvals, agent cockpits and results.">
    The workspace{dot} <span className={cx('grad')}>Real screens.</span>
  </PHead>
)
export const HowHead = () => (
  <PHead crumb="How it works" icon="chat" eyebrow="Digitner AI Marketplace · How it works" lede="Talk to SAARTHI, approve what matters, and let agents earn more freedom.">
    Ask. Approve{dot} <span className={cx('grad')}>Trust grows.</span>
  </PHead>
)

/** Three short screen recordings. */
function Clip({ n, label, title, text }) {
  const ref = useRef(null)
  useAutoplay(ref)
  return (
    <div className={cx('clip rv')}>
      <video ref={ref} src={asset(`clips/clip${n}.mp4`)} autoPlay muted loop playsInline aria-label={label} />
      <div className={cx('cb')}>
        <span className={cx('cn')}>{n}</span>
        <div>
          <h3>{title}</h3>
          <p>{text}</p>
        </div>
      </div>
    </div>
  )
}
export function Moves() {
  return (
    <section id="moves">
      <div className={cx('wrap')}>
        <div className={cx('sh')}>
          <span className={cx('eyebrow')}><span><Ic n="play" s={15} /></span>Three moves</span>
          <W>Ask<span className={cx('d')}>.</span> Approve<span className={cx('d')}>.</span> <span className={cx('soft')}>See results.</span></W>
        </div>
        <div className={cx('clips')}>
          <Clip n={1} label="Asking KHOJ for leads in the team room" title="Ask the team" text="Type what you need. The lead agent plans it." />
          <Clip n={2} label="Approving a draft in the Inbox" title="Approve in one tap" text="Sends, posts and spends wait for your yes." />
          <Clip n={3} label="Campaign results appearing" title="See what it brought in" text="Every result, down to bookings and revenue." />
        </div>
      </div>
    </section>
  )
}

/** Names that scroll under the video band. */
export function NameRow() {
  const { T, D } = useMkt()
  const names = T ? D.AG.map((a) => a.p) : ['SAARTHI', 'KHOJ', 'ABHI', 'CHITRA', 'DRISHYA', 'INAAM', 'NIDHI', 'MUDRA', 'RATNA', 'KEERTI', 'GURU', 'MITRA', 'DHRUV', 'RAKSHA']
  const all = Array.from({ length: T ? 3 : 2 }, () => names).flat()
  return (
    <div className={cx('amq')} aria-hidden="true">
      <div className={cx('amq-in')}>
        <div>{all.map((n, i) => <span key={i}>{n}</span>)}</div>
      </div>
    </div>
  )
}

const TERMS = [
  ['The service', 'Digitner AI Marketplace gives you AI agents that work inside your workspace. Digitner Tech Solutions runs the platform.'],
  ['Accounts', 'You keep your login safe and are responsible for activity on your workspace. Admins control who joins.'],
  ['Credits & billing', 'Plans include monthly credits. Agents use credits per task. Unused credits do not roll over unless your plan says so. Prices exclude GST.'],
  ['Your data', 'Your data stays yours. We use it only to run your agents, never to train shared models. You can export or delete it anytime.'],
  ['Human approval', 'Agents draft; you approve. You are responsible for content you approve and send, and for following the rules of each channel you use.'],
  ['Acceptable use', 'No spam, unlawful, misleading or harmful content. We may pause an agent that breaks these rules.'],
  ['Third-party tools', 'Connected apps (email, WhatsApp, Google and others) have their own terms, which also apply.'],
  ['Confidentiality', "Each side keeps the other's non-public information private."],
  ['Liability', 'The service is provided as is. Our total liability is limited to fees paid in the previous 12 months.'],
  ['Ending the service', "Cancel anytime from Billing. We give 30 days' notice before ending a plan and help you export your data."],
  ['Governing law', 'These terms follow the laws of India.'],
  ['Contact', 'Questions about these terms: priya@digitner.com'],
]
export function Terms() {
  return (
    <>
      <PHead crumb="Terms" icon="file" eyebrow="Legal" lede="Plain-words summary. Last updated 10 Nov 2026 · draft for review by counsel.">
        Terms &amp; Conditions{dot}
      </PHead>
      <section id="s-terms" style={{ paddingTop: 0 }}>
        <div className={cx('wrap')}>
          <div className={cx('terms')}>
            {TERMS.map(([t, p], i) => (
              <details key={t} open={i === 0}>
                <summary><span className={cx('tn')}>{String(i + 1).padStart(2, '0')}</span>{t}</summary>
                <p>{p}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

/** Marketplaces overview. */
export function Hub() {
  const { setTenant } = useMkt()
  return (
    <>
      <PHead crumb="Marketplaces" icon="store" eyebrow="Digitner AI Marketplace · Marketplaces" lede="Customer marketplaces and working examples.">
        Every marketplace{dot} <span className={cx('grad')}>One place.</span>
      </PHead>
      <section id="s-marketplaces" style={{ paddingTop: 'clamp(40px,5vw,64px)' }}>
        <div className={cx('wrap')}>
          <div className={cx('hubg')}>
            {HUB.map(([k, ic, t, d, faces, ex]) => {
              const tenant = k.startsWith('t:')
              return (
                <div className={cx('hub rv')} key={k}>
                  <span className={cx('hi')}><Ic n={ic} s={26} /></span>
                  <h3>{t}</h3>
                  <p>{d}</p>
                  <div className={cx('faces')}>
                    {faces.slice(0, 7).map((x) => <span key={x}>{x}</span>)}
                    {faces.length > 7 && <span>+{faces.length - 7}</span>}
                  </div>
                  <div className={cx('hb')}>
                    {tenant ? (
                      <button type="button" className={cx('btn sm pri')} onClick={() => setTenant(k.slice(2))}>Open</button>
                    ) : (
                      <a className={cx('btn sm pri')} href={`#${k}`}>Open</a>
                    )}
                    {ex && <a className={cx('btn sm')} href={ex}>{tenant ? 'Workspace' : 'Example'}</a>}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>
    </>
  )
}

/** One customer marketplace (Playbook, Growth Blueprint, FX): filter, agent cards, and a side drawer with a sample run. */
export function MkPage({ k }) {
  const C = MK[k]
  const { openDrawer } = useMkt()
  const [F, setF] = useState('All')
  const list = C.agents.filter((a) => F === 'All' || a.m === F)
  const example = (HUB.find((h) => h[0] === k) || [])[5] || '#examples'
  return (
    <section className={cx('mkpage')} id={`mk-${k}`}>
      <div className={cx('wrap')}>
        <div className={cx('crumb')} style={{ fontFamily: 'var(--f-m)', fontSize: 13, color: 'var(--muted)', display: 'flex', gap: 8, marginBottom: 18 }}>
          <a href="#home">Home</a>
          <span>/</span>
          <a href="#marketplaces">Marketplaces</a>
          <span>/</span>
          <span>{C.course}</span>
        </div>
        <div className={cx('sh')}>
          <span className={cx('eyebrow')}><span className={cx('ping')} />{C.eyebrow}</span>
          <h2 style={{ fontSize: 'clamp(36px,5vw,72px)' }}>
            {C.course}{dot} <span className={cx('grad')}>{k === 'fx' ? 'Rates to rupees.' : 'Marketplace.'}</span>
          </h2>
          <p className={cx('lede')}>{C.agLede}</p>
        </div>
        <div className={cx('filters')} style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 22 }}>
          {['All', ...C.mods.map((m) => m[0])].map((m) => (
            <button key={m} type="button" className={cx('chip', F === m && 'on')} onClick={() => setF(m)}>{m}</button>
          ))}
        </div>
        <div className={cx('agents')}>
          {list.map((a, i) => (
            <button key={F + a.n} type="button" className={cx('ag')} onClick={() => openDrawer(k, C.agents.indexOf(a))} style={{ animation: `mk-fadeup2 .5s ${i * 0.04}s both` }}>
              <div className={cx('top')}>
                <span className={cx('ic')}><Ic n={a.ic} s={22} /></span>
                <span className={cx('tag')}>{a.m}</span>
              </div>
              <div>
                <h3>{a.n}</h3>
                <span className={cx('persona')}>{a.r}</span>
              </div>
              <p>{a.d}</p>
              <div className={cx('foot')}>
                <span className={cx('mono')}>{a.c ? a.c + ' credits' : 'Included'}</span>
                <span className={cx('mono')}>{a.lab}</span>
              </div>
            </button>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 28 }}>
          <a className={cx('btn')} href="#marketplaces"><span><Ic n="undo" /></span>All marketplaces</a>
          <a className={cx('btn pri')} href={example}><span><Ic n="play" /></span>See the example</a>
        </div>
      </div>
    </section>
  )
}

/** Side drawer with a sample run of one agent. */
export function Drawer({ k, i, onClose }) {
  const { toast } = useMkt()
  const a = MK[k].agents[i]
  return (
    <div className={cx('mkov')} onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className={cx('mkdr')} role="dialog" aria-label={a.n}>
        <button type="button" className={cx('x')} aria-label="Close" onClick={onClose}><Ic n="x" s={18} /></button>
        <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
          <span className={cx('ic')} style={{ width: 60, height: 60, borderRadius: 18, display: 'grid', placeItems: 'center', color: '#fff', background: 'linear-gradient(150deg,#8f88ff,#4C3ABE)' }}>
            <Ic n={a.ic} s={28} />
          </span>
          <div>
            <span className={cx('tag')}>{a.m} · {a.lab}</span>
            <h3 style={{ marginTop: 6, fontSize: 30 }}>{a.n}</h3>
            <span style={{ color: 'var(--muted)' }}>{a.r}</span>
          </div>
        </div>
        <p className={cx('lede')} style={{ fontSize: 16, margin: 0 }}>{a.d}</p>
        <div className={cx('mkask')}>
          <span className={cx('tyi')} style={{ width: 22, height: 22, margin: 0 }} />
          <span>{a.q}</span>
        </div>
        <div className={cx('mkout')}>
          {a.o.map((x, j) => (
            <div key={x} style={{ animationDelay: `${0.15 + j * 0.12}s` }}>
              <Ic n="sparkles" s={16} />
              <span>{x}</span>
            </div>
          ))}
        </div>
        <b>How it works</b>
        <div className={cx('mksteps')}>{a.s.map((x) => <div key={x}>{x}</div>)}</div>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 'auto', paddingTop: 10 }}>
          <button type="button" className={cx('btn pri')} onClick={() => { onClose(); toast(`${a.n} added to your workspace`) }}><Ic n="plus" s={18} />Hire {a.n}</button>
          <a className={cx('btn')} href="https://claude.ai/artifact/YFmqnGyYdpGWTnrU7FcmDf" target="_blank" rel="noopener noreferrer"><Ic n="play" s={18} />Live demo</a>
        </div>
        <span className={cx('mono')}>Sample output</span>
      </div>
    </div>
  )
}

/** Full-screen workspace apps (Agent examples, Global Delight, Freedom Holidays). */
const EMBED_TITLE = { examples: 'Agent examples', gd: 'Global Delight workspace', fh: 'Freedom Holidays campaign workspace' }
export function Embed({ page, sub }) {
  const src = asset(`apps/${page}.html`) + (sub ? '#' + sub : page === 'examples' ? '#home' : '')
  return (
    <section className={cx('embpage')}>
      <div className={cx('wrap')}>
        <div className={cx('embf')}>
          <iframe title={EMBED_TITLE[page]} src={src} />
        </div>
      </div>
    </section>
  )
}

/** Previous / next page links at the bottom of the main pages. */
export function PageNext({ page }) {
  const i = PAGES.indexOf(page)
  const pv = PAGES[i - 1]
  const nx = PAGES[i + 1]
  if (i < 0) return null
  return (
    <div className={cx('wrap')}>
      <div className={cx('pnext')}>
        {pv ? <a href={`#${pv}`}><small>← Previous</small><b>{PN[pv]}</b></a> : <span />}
        {nx && <a href={`#${nx}`} style={{ textAlign: 'right', alignItems: 'flex-end' }}><small>Next →</small><b>{PN[nx]}</b></a>}
      </div>
    </div>
  )
}

/** Closing call-to-action. */
export function Contact() {
  return (
    <section id="contact" style={{ paddingTop: 0 }}>
      <div className={cx('wrap')}>
        <div className={cx('cta rv')}>
          <div className={cx('dots')} />
          <span className={cx('eyebrow')} style={{ color: '#e4e1ff' }}><span className={cx('ping')} />Live demo</span>
          <W>Ideas at the core<span className={cx('soft')}>.</span><br />Agents built around them<span className={cx('soft')}>.</span></W>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}>
            <a className={cx('btn')} href="https://claude.ai/artifact/YFmqnGyYdpGWTnrU7FcmDf" target="_blank" rel="noopener noreferrer"><span><Ic n="play" /></span>Try the live demo</a>
            <Link className={cx('btn ghost')} to={PATHS.home}><span><Ic n="globe" /></span>digitner.com</Link>
          </div>
        </div>
      </div>
    </section>
  )
}
