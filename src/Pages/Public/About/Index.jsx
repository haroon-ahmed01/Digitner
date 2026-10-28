import { floatsFor } from '@/utils/floats'
import Seo from '@/components/seo/Seo'
import Icon from '@/components/ui/Icon'
import CounterBand from '@/components/motion/CounterBand'
import Reveal from '@/components/motion/Reveal'
import { PageHero, RouteOrbit, View } from '@/components/blocks'
import { image, logo } from '@/utils/media'
import { SITE } from '@/data/site'
import AText from '@/components/motion/AText'

const VALUES = [
  ['layers', 'Prototype first', 'See it working before you sign.'],
  ['shield', 'Integrity', 'Clear scope, honest timelines, your data stays yours.'],
  ['users', 'Partnership', 'We measure success by your outcomes.'],
  ['growth', 'Continuous innovation', 'Always improving, always learning.'],
]
const MISSION = [
  ['Prove before we propose:', 'a working prototype before any commitment.'],
  ['Build to last:', 'secure, scalable platforms that our clients own outright.'],
  ['Make AI practical:', 'embed AI only where it delivers measurable results.'],
  ['Stay accountable:', 'support, improve and grow every solution after launch.'],
]
const STEPS = [
  ['compass', 'Learn', 'We study your business and the problem to solve.'],
  ['layers', 'Prototype', 'We build a working demo you can click through.'],
  ['code', 'Build', 'We take it to production on a secure cloud stack.'],
  ['growth', 'Grow', 'We add AI, automation and features as you scale.'],
]
const PARTNERS = [
  ['dentall3', 'DentALL3', 'Your complete dental platform'],
  ['skylax', 'SKYLAX.AI', 'Operational intelligence for interiors'],
]
const STATS = [['2025', 'Founded'], ['50+', 'Customers served'], ['3', 'AI products'], ['4', 'Locations']]
const LOC_ICON = ['pin', 'pin', 'globe', 'globe']

export default function About() {
  return (
    <View>
      <Seo
        title="About Us"
        description="Digitner started in 2025 with one rule: show the client a working product before asking for a contract. 50+ customers across 4 locations."
        path="/about"
      />
      <PageHero
        eyebrow="About Us"
        title={<h1><AText>We build first, </AText><em><AText delay={0.5}>then</AText></em> <AText delay={0.7}>we talk.</AText></h1>}
        lede="Digitner started in 2025 with one rule: show the client a working product before asking for a contract. Since then we've served more than 50 businesses across healthcare, interiors, insurance, logistics, retail and travel."
        floats={floatsFor('about')}
        art={<RouteOrbit route="about" />}
      />

      <section className="abwho">
        <div className="whog">
          <Reveal className="whot">
            <p className="eyebrow">Who we are</p>
            <h2><AText>A product-first technology partner.</AText></h2>
            <p>Digitner Tech Solutions designs, builds and runs digital platforms, applications and AI for businesses of every size. Our consultants, engineers and marketers work as one team, from strategy to go-live and beyond.</p>
            <p>Every engagement starts with a working prototype, so decisions are made on something real rather than on slides.</p>
            <div className="locs">
              {SITE.locations.map((l, i) => (
                <span key={l.city}>
                  <Icon name={LOC_ICON[i]} />
                  {l.city} {i === 0 && <small>HQ</small>}
                </span>
              ))}
            </div>
          </Reveal>
          <Reveal as="figure" className="whoimg">
            <img src={image('team1.webp')} alt="Digitner team collaborating" />
            <img className="inset" src={image('team2.webp')} alt="Team reviewing a project" />
            <figcaption><b>50+</b> customers served</figcaption>
          </Reveal>
        </div>
      </section>

      <section className="vm" style={{ paddingTop: 0 }}>
        <div className="sechead"><h2><AText>Vision &amp; Mission</AText></h2><p><AText sub>Why we exist and how we work towards it.</AText></p></div>
        <div className="vmg">
          <Reveal as="article" className="vmc vis">
            <span className="vmi"><Icon name="spark" /></span>
            <p className="eyebrow">Our vision</p>
            <h3>To be the most trusted partner for turning ideas into intelligent businesses.</h3>
            <p>A world where every organisation, whatever its size or location, runs on technology built around its best ideas and strengthened by AI.</p>
          </Reveal>
          <Reveal as="article" className="vmc mis">
            <span className="vmi"><Icon name="flag" /></span>
            <p className="eyebrow">Our mission</p>
            <h3>Put ideas at the core, and build the technology around them.</h3>
            <ul>
              {MISSION.map(([b, t]) => (
                <li key={b}><Icon name="check" /><span><b>{b}</b> {t}</span></li>
              ))}
            </ul>
          </Reveal>
        </div>
        <div className="vals">
          {VALUES.map(([ic, b, s]) => (
            <Reveal className="val" key={b}>
              <span><Icon name={ic} /></span>
              <b>{b}</b>
              <small>{s}</small>
            </Reveal>
          ))}
        </div>
      </section>

      <section style={{ paddingTop: 8 }}>
        <div className="head"><h2><AText>How we work</AText></h2><p><AText sub>Four steps. You see progress at every one.</AText></p></div>
        <div className="steps">
          {STEPS.map(([ic, t, d], i) => (
            <Reveal className="step" key={t}>
              <div className="ico"><Icon name={ic} /></div>
              <span className="num">Step {i + 1}</span>
              <h3>{t}</h3>
              <p>{d}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section style={{ paddingTop: 8 }}>
        <div className="head"><h2><AText>Our partners</AText></h2><p><AText sub>We grow together with platforms that share our customers.</AText></p></div>
        <div className="partners">
          {PARTNERS.map(([k, name, sub]) => (
            <Reveal className="partner" key={k}>
              <div className="pl"><img src={logo(k)} alt={`${name} logo`} /></div>
              <div><b>{name}</b><small>{sub}</small></div>
            </Reveal>
          ))}
        </div>
      </section>

      <CounterBand stats={STATS} icons={['flag', 'users', 'spark', 'pin']} />
    </View>
  )
}
