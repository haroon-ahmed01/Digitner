import { Link } from 'react-router-dom'
import Icon from '@/components/ui/Icon'
import Reveal from '@/components/motion/Reveal'
import { PATHS } from '@/constant/routes'
import { image, video } from '@/utils/media'

function Tile({ media, label, to, icon, clip }) {
  return (
    <Reveal as={Link} className="mt" to={to}>
      {clip ? (
        <video autoPlay muted loop playsInline preload="metadata" poster={image(`${media}.jpg`)}>
          <source src={video(`${media}.mp4`)} type="video/mp4" />
        </video>
      ) : (
        <img src={image(`${media}.jpg`)} alt="" loading="lazy" />
      )}
      <span className="mtl"><span className="mti"><Icon name={icon} /></span>{label}<Icon name="arrow" /></span>
    </Reveal>
  )
}

/** Photo/video mosaic for the Applications group page. */
export default function Mosaic() {
  return (
    <div className="mosaic">
      <Tile media="crm2" label="Websites & E-commerce" to={PATHS.service('ecommerce')} icon="globe" clip />
      <Tile media="mobile" label="Mobile Apps" to={PATHS.service('mobile')} icon="phone" clip />
      <Tile media="crm" label="CRM / SaaS" to={PATHS.service('crm')} icon="crm" />
      <Tile media="home" label="Dashboards & Analytics" to={PATHS.service('dashboards')} icon="chart" clip />
      <Tile media="agents" label="AI Agents & Automation" to={PATHS.service('ai-agents')} icon="bot" />
    </div>
  )
}
