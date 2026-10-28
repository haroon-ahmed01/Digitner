import { Link } from 'react-router-dom'
import { floatsFor } from '@/utils/floats'
import Seo from '@/components/seo/Seo'
import Icon from '@/components/ui/Icon'
import Reveal from '@/components/motion/Reveal'
import { Band, PageHero, RouteOrbit, Showcase, VideoPanel, View } from '@/components/blocks'
import { PATHS } from '@/constant/routes'
import { SERVICE_GROUPS, SERVICES } from '@/data/services'
import AText from '@/components/motion/AText'

export default function Services() {
  return (
    <View>
      <Seo
        title="Digital Services"
        description="Consulting to plan it, applications to run it, and sales and marketing to grow it. Websites, e-commerce, WhatsApp automation, CRM and mobile apps."
        path="/services"
      />
      <PageHero
        eyebrow="Digital Services"
        title={<h1><AText>Everything you need to </AText><em><AText delay={0.5}>go digital.</AText></em></h1>}
        lede="Consulting to plan it, applications to run it, and sales and marketing to grow it. Pick one service or let us run the whole journey."
        floats={floatsFor('services')}
        art={<RouteOrbit route="services" />}
      />
      <Showcase>
        <VideoPanel label="Digital Services" title="Plan it. Build it. Grow it." base="strategy2" />
      </Showcase>

      {SERVICE_GROUPS.map((g, gi) => (
        <section key={g.id} style={gi ? { paddingTop: 0 } : undefined}>
          <div className="sechead">
            <span className="n">0{gi + 1}</span>
            <h2>
              <Link to={PATHS.serviceGroup(g.id)} className="hlink">{g.n} <Icon name="arrow" /></Link>
            </h2>
            <p>{g.d}</p>
          </div>
          <div className="cards">
            {SERVICES.filter((s) => s.g === g.id).map((s) => (
              <Reveal as={Link} className="card" to={PATHS.service(s.id)} key={s.id}>
                <div className="ico"><Icon name={s.ic} /></div>
                <h3>{s.n}</h3>
                <p>{s.lede}</p>
                <span className="go">Explore <Icon name="arrow" /></span>
              </Reveal>
            ))}
          </div>
        </section>
      ))}

      <Band title="Not sure where to start?" text="Book a free consulting call." to={PATHS.contact} label="Talk to us" />
    </View>
  )
}
