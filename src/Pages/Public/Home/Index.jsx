import { Link } from 'react-router-dom'
import Seo from '@/components/seo/Seo'
import Icon from '@/components/ui/Icon'
import HeroDots from '@/components/motion/HeroDots'
import CounterBand from '@/components/motion/CounterBand'
import ScrollStory from '@/components/motion/ScrollStory'
import Reveal from '@/components/motion/Reveal'
import { useTyper } from '@/components/motion/Typer'
import HeroPicture from '@/components/art/HeroPicture'
import { Band, Clip, Head, ProductStack, View } from '@/components/blocks'
import { PATHS } from '@/constant/routes'
import { PRODUCTS } from '@/data/products'
import { LOGO_ROW_1, LOGO_ROW_2 } from '@/data/home'
import AText from '@/components/motion/AText'
import { useEffect, useRef } from 'react'
import OfferCards from '@/components/blocks/OfferCards'
import LogoOrbit from '@/components/blocks/LogoOrbit'
import SlideIn from '@/components/motion/SlideIn'

const WORDS = ['websites', 'mobile apps', 'CRMs', 'WhatsApp automation', 'AI agents']
const STATS = [['50+', 'Customers served'], ['8', 'Industry products'], ['3', 'AI products'], ['4', 'Locations']]
const STAT_ICONS = ['users', 'grid', 'spark', 'pin']
const OFFER = [
  { to: PATHS.services, icon: 'code', title: 'Digital Services', text: 'Consulting, websites, e-commerce, WhatsApp automation, CRM and mobile apps, plus sales and marketing support.', go: 'See services' },
  { to: PATHS.products, icon: 'grid', title: 'Products', text: 'Eight ready Digitner platforms for dental, interiors, insurance, billing, leads, events, travel and rewards.', go: 'See products' },
  { to: PATHS.ai, icon: 'spark', title: 'AI Solutions', text: 'Veloque AI, BuySei AI and SmileView AI, plus the Digitner AI Marketplace of ready agents.', go: 'See AI Solutions' },
]

export default function Home() {
    const heroRef = useRef(null)
  useEffect(() => {
    const el = heroRef.current
    if (!el || !('IntersectionObserver' in window)) return
    const io = new IntersectionObserver(([e]) => el.classList.toggle('go', e.isIntersecting), { threshold: 0.25 })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  const typed = useTyper(WORDS, { add: 70, del: 35, hold: 1500, gap: 250, delay: 1200 })

  return (
    <View>
      <Seo
        description="Digitner builds websites, mobile apps, CRMs, WhatsApp automation and AI agents. See a working prototype before you sign. Learn. Build. Grow. Now with AI."
        path="/"
      />

      <div className="hero go" ref={heroRef}>
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

          <HeroPicture name="home" videoName="hero-home.mp4" alt="A person presenting an AI assistant on a monitor" caption={<>Ideas at the <b>core</b>. Technology built around them.</>} />
        </div>
      </div>

      <ScrollStory />

      <CounterBand stats={STATS} icons={STAT_ICONS} images={['stat-customers.webp', 'stat-industry.webp', 'stat-ai.webp', 'stat-locations.webp']} />

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
        <LogoOrbit row1={LOGO_ROW_1} row2={LOGO_ROW_2} />
      </section>

      <section>
        <SlideIn from="right">
          <Head title="One partner, from first idea to AI">Pick what you need today. Add more as you grow.</Head>
          <OfferCards items={OFFER} />
        </SlideIn>
      </section>

      <section style={{ paddingTop: 0 }}>
        <SlideIn from="left" at={0.25}>
          <div className="head" style={{ marginBottom: 22 }}>
            <h2><AText>Our products</AText></h2>
            <p>Ready Digitner platforms, each running real businesses.</p>
          </div>
          <ProductStack products={PRODUCTS} />
        </SlideIn>
      </section>

      <Band title="Have an idea? See it working first." text="Tell us the problem. We'll come back with a clickable prototype." to={PATHS.contact} label="Book a demo" />
    </View>
  )
}
