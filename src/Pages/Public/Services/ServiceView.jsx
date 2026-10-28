import { useRef } from 'react'
import { Link } from 'react-router-dom'
import Seo from '@/components/seo/Seo'
import Reveal from '@/components/motion/Reveal'
import Icon from '@/components/ui/Icon'
import OrbitArt from '@/components/art/OrbitArt'
import { View, PageHero, Showcase } from '@/components/blocks/Hero'
import { VideoPanel } from '@/components/blocks/Media'
import { Timeline, Deliverables, Callouts, WhoBlock, FaqBlock } from '@/components/blocks/Content'
import { Shots } from '@/components/blocks/Screens'
import { CaseSet } from '@/components/blocks/Cases'
import Viz from '@/components/viz/Viz'
import { useLiven } from '@/components/viz/useLiven'
import { Crumbs, TitleRow, NextBand, Sec } from '@/components/screens/Shared'
import { counter } from '@/utils/counter'
import { PATHS } from '@/constant/routes'
import { SERVICE_GROUPS, SERVICES, SERVICE_VIDEO, GROUP_INTRO, GROUP_CTA, SERVICE_CASE_IDS, SERVICE_VISUAL } from '@/data/services'
import { serviceFloats, serviceOrbit } from '@/utils/orbit'
import AText from '@/components/motion/AText'

const Feats = ({ f }) => (
  <div className="feats">
    {f.map(([ic, t, d]) => (
      <Reveal className="feat" key={t}>
        <div className="ico"><Icon name={ic} /></div>
        <h3>{t}</h3>
        <p>{d}</p>
      </Reveal>
    ))}
  </div>
)

/** Single service page. Layout differs per group (consulting / apps / sales). */
export default function ServiceDetail({ service: s }) {
  const g = SERVICE_GROUPS.find((x) => x.id === s.g)
  const sib = SERVICES.filter((x) => x.g === s.g)
  const next = sib[(sib.indexOf(s) + 1) % sib.length]
  const cta = GROUP_CTA[s.g]
  const N = counter()
  const ref = useRef(null)
  useLiven(ref)
  const cases = SERVICE_CASE_IDS[s.id] || []
  const vis = SERVICE_VISUAL[s.id]

  let body
  if (s.g === 'consulting')
    body = (
      <>
        <Sec n={N()} title="Our approach" desc="A structured engagement with clear milestones and outputs." first><Timeline group={s.g} how={s.how} out={s.out} /></Sec>
        <Sec n={N()} title="What’s included"><Feats f={s.f} /></Sec>
        <Sec n={N()} title="The framework in practice"><Viz name={vis} /></Sec>
        <Sec n={N()} title="Deliverables"><Deliverables list={s.out} group="consulting" /></Sec>
        <Sec n={N()} title="Case studies" desc="Recent consulting engagements."><CaseSet ids={cases} /></Sec>
        <Sec n={N()} title="FAQ"><FaqBlock faq={s.faq} /></Sec>
      </>
    )
  else if (s.g === 'apps')
    body = (
      <>
        <Sec n={N()} title="Features" first><Feats f={s.f} /></Sec>
        <Sec n={N()} title="How we build" desc="From prototype to production, step by step."><Timeline group={s.g} how={s.how} out={s.out} /></Sec>
        <Sec n={N()} title="Live product screens"><Shots id={s.mk} app={s.n} /></Sec>
        <Sec n={N()} title="What you get"><Deliverables list={s.out} group="apps" /></Sec>
        <Sec n={N()} title="Case studies" desc="Platforms we have delivered."><CaseSet ids={cases} /></Sec>
        <Sec n={N()} title="FAQ"><FaqBlock faq={s.faq} /></Sec>
      </>
    )
  else
    body = (
      <>
        <Sec n={N()} title="Our process" first><Timeline group={s.g} how={s.how} out={s.out} /></Sec>
        <Sec n={N()} title="Key features" desc="What sets this service apart."><Callouts list={s.f.slice(0, 5)} /></Sec>
        <Sec n={N()} title="Sample work"><Viz name={vis} /></Sec>
        <Sec n={N()} title="Deliverables"><Deliverables list={s.out} group="sales" /></Sec>
        <Sec n={N()} title="Success stories" desc="Recent work for our clients."><CaseSet ids={cases} /></Sec>
        <Sec n={N()} title="FAQ"><FaqBlock faq={s.faq} /></Sec>
      </>
    )

  return (
    <View>
      <Seo title={`${s.n} | ${g.n}`} description={s.lede} path={PATHS.service(s.id)} />
      <PageHero
        floats={serviceFloats(s)}
        art={<OrbitArt {...serviceOrbit(s)} />}
        title={
          <>
            <Crumbs items={[['Digital Services', PATHS.services], [g.n, PATHS.serviceGroup(g.id)]]} />
            <TitleRow icon={s.ic} tag={g.n} />
            <h1><AText>{s.n}</AText></h1>
          </>
        }
        lede={s.lede}
      >
        <div className="row">
          <Link className="btn primary" to={PATHS.contact}>{cta[0]}</Link>
          <Link className="btn ghost" to={PATHS.contact}>{cta[1]}</Link>
        </div>
      </PageHero>
      <Showcase><VideoPanel label={g.n} title={s.n} base={SERVICE_VIDEO[s.id]} /></Showcase>
      <div ref={ref}>
        <section style={{ paddingBottom: 0 }}><WhoBlock who={s.who} intro={GROUP_INTRO[s.g]} /></section>
        {body}
      </div>
      <NextBand label={`Next in ${g.n}`} title={next.n} to={PATHS.service(next.id)} cta="Explore" />
    </View>
  )
}
