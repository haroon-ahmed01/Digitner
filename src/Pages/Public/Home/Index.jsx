import { useRef } from 'react'
import { Link } from 'react-router-dom'
import Seo from '@/components/seo/Seo'
import Icon from '@/components/ui/Icon'
import HeroDots from '@/components/motion/HeroDots'
import CounterBand from '@/components/motion/CounterBand'
import Reveal from '@/components/motion/Reveal'
import { useTyper } from '@/components/motion/Typer'
import HeroPicture from '@/components/art/HeroPicture'
import { Band, Clip, Head, LogoRow, ProductCardSmall, View } from '@/components/blocks'
import { PATHS } from '@/constant/routes'
import { PRODUCTS } from '@/data/products'
import { LOGO_ROW_1, LOGO_ROW_2 } from '@/data/home'
import { prefersReducedMotion } from '@/hooks/useReducedMotion'
import AText from '@/components/motion/AText'

const WORDS = ['websites', 'mobile apps', 'CRMs', 'WhatsApp automation', 'AI agents']
const STATS = [['50+', 'Customers served'], ['8', 'Industry products'], ['3', 'AI products'], ['4', 'Locations']]
const STAT_ICONS = ['users', 'grid', 'spark', 'pin']
const OFFER = [
  { to: PATHS.services, icon: 'code', title: 'Digital Services', text: 'Consulting, websites, e-commerce, WhatsApp automation, CRM and mobile apps, plus sales and marketing support.', go: 'See services' },
  { to: PATHS.products, icon: 'grid', title: 'Products', text: 'Eight ready Digitner platforms for dental, interiors, insurance, billing, leads, events, travel and rewards.', go: 'See products' },
  { to: PATHS.ai, icon: 'spark', title: 'AI Solutions', text: 'Veloque AI, BuySei AI and SmileView AI, plus the Digitner AI Marketplace of ready agents.', go: 'See AI Solutions' },
]

export default function Home() {
  const typed = useTyper(WORDS, { add: 70, del: 35, hold: 1500, gap: 250, delay: 1200 })
  const car = useRef(null)
  const scroll = (dir) =>
    car.current?.scrollBy({ left: dir * car.current.clientWidth * 0.8, behavior: prefersReducedMotion() ? 'auto' : 'smooth' })

  return (
    <View>
      <Seo
        description="Digitner builds websites, mobile apps, CRMs, WhatsApp automation and AI agents. See a working prototype before you sign. Learn. Build. Grow. Now with AI."
        path="/"
      />

      <div className="hero">
        <HeroDots />
        <div className="wrap">
          <div>
            <span className="since"><i />50+ customers served across 4 locations</span>
            <h1 style={{ marginTop: 20 }}>
              <AText>Learn Build Grow</AText>
              <br />
              <span className="ai"><AText delay={0.6}>Now with AI.</AText></span>
            </h1>
            <p className="typer" aria-label="We build websites, mobile apps, CRMs, WhatsApp automation and AI agents.">
              <span aria-hidden="true">We build</span>
              <b aria-hidden="true" ref={typed}>websites</b>
              <span className="caret" aria-hidden="true" />
            </p>
            <AText as="p" sub className="lede" delay={0.8}>
              Digitner is a digital transformation and AI solutions company. We build your website, apps and CRM, then add AI that makes them work harder. You see a working prototype before you sign.
            </AText>
            <div className="row">
              <Link className="btn primary" to={PATHS.ai}>Explore AI Solutions <Icon name="arrow" /></Link>
              <Link className="btn ghost" to={PATHS.products}>See our products</Link>
            </div>
          </div>

          <HeroPicture name="home" alt="A person presenting an AI assistant on a monitor" caption={<>Ideas at the <b>core</b>. Technology built around them.</>} />
        </div>
      </div>

      <CounterBand stats={STATS} icons={STAT_ICONS} images={['CustomerServed.jpeg', 'IndustryProduct.jpeg', 'AIProduct.jpeg', 'Location.jpeg']} />

      <section style={{ paddingBottom: 0 }}>
        <Reveal className="reel">
          <Clip base="home" />
          <div className="rt">
            <p className="eyebrow" style={{ color: '#C9C6FF' }}>Digitner in action</p>
            <h2><AText>Dashboards, apps and AI that run real businesses.</AText></h2>
            <p>From the first prototype to the platform your whole team uses every day.</p>
            <Link className="btn" to={PATHS.products}>See our products</Link>
          </div>
        </Reveal>
      </section>

      <section style={{ paddingBottom: 16 }}>
        <Head title="Trusted by 50+ businesses" style={{ marginBottom: 24 }}>
          Clinics, interior studios, insurers, logistics and retail teams run on platforms we built.
        </Head>
        <div className="marquee" aria-label="Customer logos">
          <div className="track"><LogoRow rows={LOGO_ROW_1} /></div>
        </div>
        <div className="marquee" aria-hidden="true" style={{ marginTop: 14 }}>
          <div className="track rev"><LogoRow rows={LOGO_ROW_2} /></div>
        </div>
      </section>

      <section>
        <Head title="One partner, from first idea to AI">Pick what you need today. Add more as you grow.</Head>
        <div className="cards">
          {OFFER.map((o) => (
            <Reveal as={Link} className="card" to={o.to} key={o.title}>
              <div className="ico solid"><Icon name={o.icon} /></div>
              <h3>{o.title}</h3>
              <p>{o.text}</p>
              <span className="go">{o.go} <Icon name="arrow" /></span>
            </Reveal>
          ))}
        </div>
      </section>

      <section style={{ paddingTop: 0 }}>
        <div className="head" style={{ marginBottom: 22 }}>
          <h2><AText>Our products</AText></h2>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', gap: 16, flexWrap: 'wrap' }}>
            <p>Ready Digitner platforms, each running real businesses.</p>
            <div className="parr">
              <button type="button" aria-label="Previous products" onClick={() => scroll(-1)}><Icon name="arrowl" /></button>
              <button type="button" aria-label="Next products" onClick={() => scroll(1)}><Icon name="arrow" /></button>
            </div>
          </div>
        </div>
        <div className="pscroll" ref={car}>
          {PRODUCTS.map((p) => (
            <ProductCardSmall key={p.id} p={p} />
          ))}
        </div>
      </section>

      <Band title="Have an idea? See it working first." text="Tell us the problem. We'll come back with a clickable prototype." to={PATHS.contact} label="Book a demo" />
    </View>
  )
}
