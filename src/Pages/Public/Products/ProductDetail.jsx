import { useMemo, useRef } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import Seo from '@/components/seo/Seo'
import Icon from '@/components/ui/Icon'
import Reveal from '@/components/motion/Reveal'
import CounterBand from '@/components/motion/CounterBand'
import OrbitArt from '@/components/art/OrbitArt'
import { View, PageHero, PageTyper, Showcase } from '@/components/blocks/Hero'
import { Clip, StoryStrip, VideoPanel } from '@/components/blocks/Media'
import { CaseBlock, FaqBlock, Journey, WhoBlock } from '@/components/blocks/Content'
import { Collage, Shots } from '@/components/blocks/Screens'
import { useLiven } from '@/components/viz/useLiven'
import { Crumbs, NextBand, Sec, ShineTitle, TitleRow } from '@/components/screens/Shared'
import { counter } from '@/utils/counter'
import { PATHS } from '@/constant/routes'
import { PRODUCTS, PRODUCT_DETAILS, PRODUCT_EXTRAS, PRODUCT_IMAGES, PRODUCT_APP_IMAGES, PRODUCT_VIDEOS, CLIENT_STORIES } from '@/data/products'
import { image } from '@/utils/media'
import { iconFor, productTypes } from '@/utils/text'
import { productFloats, productOrbit } from '@/utils/orbit'

const EMPTY = {}

const Check = ({ list }) => (
  <ul className="deliver">
    {list.map((t) => <li key={t}><Icon name="check" /><span>{t}</span></li>)}
  </ul>
)

function Product({ p }) {
  const d = PRODUCT_DETAILS[p.id] || EMPTY
  const x = PRODUCT_EXTRAS[p.id]
  const c = p.cs
  const next = PRODUCTS[(PRODUCTS.indexOf(p) + 1) % PRODUCTS.length]
  const vids = PRODUCT_VIDEOS[p.id] || ['crm', 'home']
  const stories = CLIENT_STORIES[p.id]
  const N = counter()
  const ref = useRef(null)
  useLiven(ref)
  const words = useMemo(() => (d.mods ? d.mods.map((m) => m[0]) : p.f.map((f) => f[1])).slice(0, 6), [d, p])
  const art = useMemo(() => productOrbit(p), [p])
  const hasImg = PRODUCT_IMAGES[p.id]

  return (
    <View>
      <Seo title={`Digitner ${p.n}: ${p.t}`} description={d.lede || p.d} path={PATHS.product(p.id)} />
      <PageHero
        floats={productFloats(p)}
        art={<OrbitArt {...art} />}
        title={
          <>
            <Crumbs items={[['Products', PATHS.products], [`Digitner ${p.n}`]]} />
            <TitleRow icon={p.ic} tag={d.tag || p.t} wrap>
              <span className={`pill${p.st === 'Live' ? ' live' : ''}`}>{p.st}</span>
            </TitleRow>
            <ShineTitle name={p.n} />
            <PageTyper prefix="Manage" words={words} keep={false} />
            <div className="crmapp">
              {productTypes(p.id).map(([ic, label]) => <span key={label}><Icon name={ic} />{label}</span>)}
              <span><Icon name="layers" />Cloud or on-premise</span>
            </div>
          </>
        }
        lede={d.lede || p.d}
      >
        <div className="row">
          <Link className="btn primary" to={PATHS.contact}>Book a demo</Link>
          {p.url && <a className="btn ghost" href={p.url} target="_blank" rel="noopener noreferrer">{p.site} <Icon name="ext" /></a>}
        </div>
      </PageHero>
      {d.stats && <CounterBand stats={d.stats} />}
      <Showcase title="Product preview">
        {hasImg ? (
          <figure className="pimg"><img src={image(`p_${p.id}.webp`)} alt={`Digitner ${p.n} dashboard`} /></figure>
        ) : (
          <Collage id={p.id} app={`Digitner ${p.n}`} />
        )}
      </Showcase>

      <div ref={ref}>
        <section style={{ paddingBottom: 0 }}><WhoBlock who={x.who} intro={x.intro} /></section>
        <Sec n={N()} title={d.mods ? `${d.mods.length} modules, one system` : 'Features'} desc="Everything your team needs, ready on day one and shaped to how you work." first>
          {d.mods ? (
            <div className="mods">
              {d.mods.map((m) => (
                <Reveal className="mod" key={m[0]}>
                  <span><Icon name={iconFor(`${m[0]} ${m[1]}`)} /></span>
                  <h3>{m[0]}</h3>
                  <p>{m[1]}</p>
                </Reveal>
              ))}
            </div>
          ) : (
            <div className="feats">
              {p.f.map(([ic, t, tx]) => (
                <Reveal className="feat" key={t}>
                  <div className="ico"><Icon name={ic} /></div>
                  <h3>{t}</h3>
                  <p>{tx}</p>
                </Reveal>
              ))}
            </div>
          )}
        </Sec>
        <Sec n={N()} title="How it works" desc={d.flow ? 'One continuous, connected flow.' : ''}>
          <Journey steps={d.flow || x.how.map((h) => h[0])} />
        </Sec>
        <Sec n={N()} title="Inside the platform" desc={`Real screens and walkthroughs from Digitner ${p.n}.`}>
          <div className="pgal">
            <Reveal as="figure" className="pga">
              {PRODUCT_APP_IMAGES[p.id] ? (
                <>
                  <img src={image(`a_${p.id}.webp`)} alt={`Digitner ${p.n} apps`} loading="lazy" />
                  <figcaption><Icon name="phone" />Web and mobile apps</figcaption>
                </>
              ) : (
                <>
                  <img src={hasImg ? image(`p_${p.id}.webp`) : image(`${vids[1] || ''}.jpg`)} alt="" loading="lazy" />
                  <figcaption><Icon name="grid" />Platform overview</figcaption>
                </>
              )}
            </Reveal>
            {vids.map((k, i) => (
              <Reveal className="pgv" key={k + i}>
                <Clip base={k} />
                <span><Icon name="play" />{i ? 'Dashboards & insights' : 'On every device'}</span>
              </Reveal>
            ))}
          </div>
        </Sec>
        {d.roles && (
          <Sec n={N()} title="Role-based access" desc="Each user sees and does exactly what they should.">
            <div className="roles">
              {d.roles.map(([name, tag, list]) => (
                <Reveal className="role" key={name}>
                  <p className="eyebrow">{tag}</p>
                  <h3>{name}</h3>
                  <Check list={list} />
                </Reveal>
              ))}
            </div>
          </Sec>
        )}
        <Sec n={N()} title="App screens" desc="Web dashboard for your team, mobile app for customers and staff.">
          <Shots id={p.id} app={`Digitner ${p.n}`} />
          {d.apps && (
            <div className="appcards">
              {d.apps.map(([tag, name, list]) => (
                <Reveal className="appcard" key={name}>
                  <p className="eyebrow">{tag}</p>
                  <h3>{name}</h3>
                  <Check list={list} />
                </Reveal>
              ))}
            </div>
          )}
        </Sec>
        <section style={{ paddingTop: 0 }}>
          <Reveal style={{ maxWidth: 980, margin: '0 auto' }}>
            <VideoPanel label={`Digitner ${p.n}`} title={`${p.t} in 2 minutes`} />
          </Reveal>
        </section>
        <Sec n={N()} title={stories ? 'Success stories' : 'Case study'} desc={c.sample ? 'How a typical business would use it.' : `Businesses running on Digitner ${p.n} today.`}>
          <StoryStrip keys={stories} />
          {stories && <div style={{ height: 22 }} />}
          <CaseBlock c={c.sample ? { ...c, c: 'Typical customer', lab: 'Sample case study' } : { ...c, lab: 'Success story' }} icon={p.ic} />
        </Sec>
        {d.why && (
          <Sec n={N()} title={`Why choose Digitner ${p.n}`}>
            <div className="feats">
              {d.why.map(([t, tx]) => (
                <Reveal className="feat" key={t}>
                  <div className="ico"><Icon name="check" /></div>
                  <h3>{t}</h3>
                  <p>{tx}</p>
                </Reveal>
              ))}
            </div>
          </Sec>
        )}
        <Sec n={N()} title="FAQ"><FaqBlock faq={x.faq} /></Sec>
      </div>
      <NextBand label="Next product" title={`Digitner ${next.n}`} to={PATHS.product(next.id)} cta={`View ${next.n}`} />
    </View>
  )
}

export default function ProductDetail() {
  const { productId } = useParams()
  const p = PRODUCTS.find((x) => x.id === productId)
  if (!p) return <Navigate to={PATHS.products} replace />
  return <Product key={p.id} p={p} />
}
