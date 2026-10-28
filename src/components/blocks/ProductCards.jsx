import { Link } from 'react-router-dom'
import Icon from '@/components/ui/Icon'
import Reveal from '@/components/motion/Reveal'
import { PATHS } from '@/constant/routes'
import { PRODUCT_IMAGES, PRODUCT_VIDEOS } from '@/data/products'
import { image } from '@/utils/media'
import { productTypes } from '@/utils/text'
import { BCase } from './Content'

const Pill = ({ p }) => <span className={`pill${p.st === 'Live' ? ' live' : ''}`}>{p.st}</span>

/** Compact card used in the home carousel. */
export function ProductCardSmall({ p }) {
  return (
    <Link className="card" to={PATHS.product(p.id)}>
      <div className="ctop">
        <div className="ico"><Icon name={p.ic} /></div>
        <Pill p={p} />
      </div>
      <h3>Digitner {p.n}</h3>
      <p>{p.t}</p>
      <BCase cs={p.cs} />
      <span className="go">Explore <Icon name="arrow" /></span>
    </Link>
  )
}

/** Full card with thumbnail, used on the Products page. */
export function ProductCard({ p }) {
  const thumb = PRODUCT_IMAGES[p.id] ? image(`p_${p.id}.webp`) : image(`${(PRODUCT_VIDEOS[p.id] || ['crm'])[0]}.jpg`)
  return (
    <Reveal as={Link} className="card" to={PATHS.product(p.id)}>
      <div className="pthumb"><img src={thumb} alt="" loading="lazy" /></div>
      <div className="ctop">
        <div className="ico"><Icon name={p.ic} /></div>
        <Pill p={p} />
      </div>
      <h3>Digitner {p.n}</h3>
      <p>{p.d}</p>
      <div className="crmapp" style={{ marginTop: 0 }}>
        {productTypes(p.id).map(([ic, label]) => (
          <span key={label}><Icon name={ic} />{label}</span>
        ))}
      </div>
      <BCase cs={p.cs} />
      <span className="go">View product &amp; business case <Icon name="arrow" /></span>
    </Reveal>
  )
}
