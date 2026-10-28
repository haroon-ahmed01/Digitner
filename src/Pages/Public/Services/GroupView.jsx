import { Link } from 'react-router-dom'
import Seo from '@/components/seo/Seo'
import Icon from '@/components/ui/Icon'
import Reveal from '@/components/motion/Reveal'
import OrbitArt from '@/components/art/OrbitArt'
import { View, PageHero, Showcase } from '@/components/blocks/Hero'
import { VideoPanel } from '@/components/blocks/Media'
import { Timeline, Deliverables, Callouts } from '@/components/blocks/Content'
import { CaseSet } from '@/components/blocks/Cases'
import Viz from '@/components/viz/Viz'
import Mosaic from '@/components/screens/Mosaic'
import { Crumbs, TitleRow, NextBand, Sec } from '@/components/screens/Shared'
import { counter } from '@/utils/counter'
import { PATHS } from '@/constant/routes'
import { SERVICE_GROUPS, SERVICES, GROUP_VIDEO, GROUP_OUTCOMES, GROUP_STEPS, GROUP_INTRO, GROUP_CTA, GROUP_CASE_IDS } from '@/data/services'
import { groupFloats, groupOrbit } from '@/utils/orbit'
import AText from '@/components/motion/AText'

const GROUP_VIS = { consulting: <Viz name="radar" />, apps: <Mosaic />, sales: <Viz name="funnel" /> }

/** Service group page (Consulting / Applications / Sales & Marketing). */
export default function GroupDetail({ group: g }) {
  const list = SERVICES.filter((s) => s.g === g.id)
  const next = SERVICE_GROUPS[(SERVICE_GROUPS.indexOf(g) + 1) % SERVICE_GROUPS.length]
  const N = counter()
  const cases = GROUP_CASE_IDS[g.id]

  return (
    <View>
      <Seo title={g.n} description={GROUP_INTRO[g.id]} path={PATHS.serviceGroup(g.id)} />
      <PageHero
        floats={groupFloats(g.id)}
        art={<OrbitArt {...groupOrbit(g.id)} />}
        title={
          <>
            <Crumbs items={[['Digital Services', PATHS.services], [g.n]]} />
            <TitleRow icon={g.ic} tag={`${list.length} services`} />
            <h1><AText>{g.n}</AText></h1>
          </>
        }
        lede={GROUP_INTRO[g.id]}
      >
        <div className="row">
          <Link className="btn primary" to={PATHS.contact}>{GROUP_CTA[g.id][0]}</Link>
          <Link className="btn ghost" to={PATHS.service(list[0].id)}>Explore services</Link>
        </div>
      </PageHero>
      <Showcase><VideoPanel label={g.n} title={g.d} base={GROUP_VIDEO[g.id]} /></Showcase>

      <Sec n={N()} title="Services" desc="Choose a service to see the approach, deliverables and examples." first>
        <div className="cards">
          {list.map((s) => (
            <Reveal as={Link} className="card" to={PATHS.service(s.id)} key={s.id}>
              <div className="ico"><Icon name={s.ic} /></div>
              <h3>{s.n}</h3>
              <p>{s.lede}</p>
              <ul className="deliver" style={{ marginTop: 6 }}>
                {s.f.slice(0, 3).map((f) => (
                  <li key={f[1]}><Icon name="check" /><span>{f[1]}</span></li>
                ))}
              </ul>
              <span className="go">Explore <Icon name="arrow" /></span>
            </Reveal>
          ))}
        </div>
      </Sec>

      <Sec n={N()} title="Our framework" desc="How every engagement runs, with clear milestones.">
        <Timeline group={g.id} how={GROUP_STEPS[g.id]} out={GROUP_OUTCOMES[g.id]} />
      </Sec>

      {g.id === 'sales' && (
        <Sec n={N()} title="Key features" desc="Highlights from every Sales & Marketing service.">
          <Callouts list={list.flatMap((s) => s.f.slice(0, 2))} />
        </Sec>
      )}

      <Sec n={N()} title="In practice">{GROUP_VIS[g.id]}</Sec>
      <Sec n={N()} title="What you get"><Deliverables list={GROUP_OUTCOMES[g.id]} group={g.id} /></Sec>
      {cases && (
        <Sec n={N()} title={g.id === 'sales' ? 'Success stories' : 'Case studies'} desc="Selected engagements.">
          <CaseSet ids={cases} />
        </Sec>
      )}
      <NextBand label="Next" title={next.n} to={PATHS.serviceGroup(next.id)} cta="Explore" />
    </View>
  )
}
