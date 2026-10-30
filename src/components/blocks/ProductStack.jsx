import '@/styles/scrollstack.css'
import { Link } from 'react-router-dom'
import Icon from '@/components/ui/Icon'
import ScrollStack, { ScrollStackItem } from '@/components/motion/ScrollStack'
import { PATHS } from '@/constant/routes'
import { PRODUCT_IMAGES, PRODUCT_VIDEOS } from '@/data/products'
import { image } from '@/utils/media'
import { productTypes } from '@/utils/text'


const thumbOf = (p) => (PRODUCT_IMAGES[p.id] ? image(`p_${p.id}.webp`) : image(`${(PRODUCT_VIDEOS[p.id] || ['crm'])[0]}.jpg`))

/**
 * Product cards that pin and stack as the page scrolls (ScrollStack).
 * Works with the window scroll; spacing follows the screen size.
 */
export function ProductStack({ products }) {
  const small = typeof window !== 'undefined' && window.innerWidth < 700
  return (
    <ScrollStack
      useWindowScroll
      smoothScroll={false}
      stackPosition={small ? 84 : 112}
      itemDistance={small ? 70 : 100}
      itemStackDistance={small ? 18 : 26}
      itemScale={0.04}
      baseScale={0.84}
      dimAmount={0.16}
      holdDistance={small ? 80 : 160}
    >
      {products.map((p) => (
        <ScrollStackItem key={p.id} itemClassName="pst">
          <div className="pst-body">
            <div className="ctop">
              <div className="ico"><Icon name={p.ic} /></div>
              <span className={`pill${p.st === 'Live' ? ' live' : ''}`}>{p.st}</span>
            </div>
            <h3>Digitner {p.n}</h3>
            <p>{p.d}</p>
            <div className="crmapp" style={{ marginTop: 0 }}>
              {productTypes(p.id).map(([ic, label]) => (
                <span key={label}><Icon name={ic} />{label}</span>
              ))}
            </div>
            <Link className="btn primary" to={PATHS.product(p.id)}>Explore {p.n} <Icon name="arrow" /></Link>
          </div>
          <div className="pst-art"><img src={thumbOf(p)} alt="" loading="lazy" /></div>
        </ScrollStackItem>
      ))}
    </ScrollStack>
  )
}
