import { Link } from 'react-router-dom'
import Icon from '@/components/ui/Icon'
import { PATHS } from '@/constant/routes'
import { SERVICE_GROUPS, SERVICES, SERVICE_HINTS } from '@/data/services'
import { PRODUCTS, PRODUCT_DOMAIN } from '@/data/products'
import { AI_PRODUCTS } from '@/data/aiProducts'
import { productTypes } from '@/utils/text'

/** Dropdown bodies. `onGo` closes the menu after a click. */
export function ServicesMenu({ onGo }) {
  return (
    <div className="dd mega" id="dd-services">
      {SERVICE_GROUPS.map((g, k) => {
        const items = SERVICES.filter((s) => s.g === g.id)
        return (
          <div className="ddcol" style={{ '--k': k }} key={g.id}>
            <Link className="ddh" to={PATHS.serviceGroup(g.id)} onClick={onGo}>
              <span className="gi">
                <Icon name={g.ic} />
              </span>
              <b>{g.n}</b>
            </Link>
            <div className={`ddl${items.length > 5 ? ' two' : ''}`}>
              {items.map((s) => (
                <Link className="dl" key={s.id} to={PATHS.service(s.id)} onClick={onGo}>
                  <span className="si">
                    <Icon name={s.ic} />
                  </span>
                  <b>{s.n}</b>
                  <small>{SERVICE_HINTS[s.id]}</small>
                </Link>
              ))}
            </div>
          </div>
        )
      })}
      <div className="ddfoot">
        <p>
          <b>Not sure where to start?</b> Book a free 30-minute discovery call with our consultants.
        </p>
        <div className="stats">
          <span><b>100+</b>customers</span>
          <span><b>17</b>services</span>
          <span><b>4</b>locations</span>
        </div>
        <Link className="btn primary" to={PATHS.contact} onClick={onGo}>
          Talk to us <Icon name="arrow" />
        </Link>
      </div>
    </div>
  )
}

export function ProductsMenu({ onGo }) {
  return (
    <div className="dd wide" id="dd-products">
      {PRODUCTS.map((p) => (
        <Link className="di" key={p.id} to={PATHS.product(p.id)} onClick={onGo}>
          <span className="dic">
            <Icon name={p.ic} />
          </span>
          <span>
            <b>Digitner {p.n}</b>
            <small>{PRODUCT_DOMAIN[p.id]}</small>
            <span className="dtags">
              {productTypes(p.id).map(([, label]) => (
                <i key={label}>{label}</i>
              ))}
            </span>
          </span>
        </Link>
      ))}
    </div>
  )
}

export function AiMenu({ onGo }) {
  return (
    <div className="dd" id="dd-ai">
      {AI_PRODUCTS.map((a) => (
        <Link className="di" key={a.id} to={PATHS.aiProduct(a.id)} onClick={onGo}>
          <span className="dic">
            <Icon name={a.ic} />
          </span>
          <span>
            <b>{a.n}</b>
            <small>{a.t}</small>
          </span>
        </Link>
      ))}
    </div>
  )
}
