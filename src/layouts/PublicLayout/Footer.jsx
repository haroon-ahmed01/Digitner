import { Link } from 'react-router-dom'
import { useReveal } from '@/hooks/useReveal'
import Icon from '@/components/ui/Icon'
import { PATHS } from '@/constant/routes'
import { FOOTER_NAV } from '@/constant/navigation'
import { SITE } from '@/data/site'
import { brandLogo } from '@/utils/media'

/** Footer block that fades up when scrolled into view. */
function Ft({ as: Tag = 'div', delay = 0, className = '', children }) {
  const [ref, shown] = useReveal()
  return (
    <Tag ref={ref} className={`${className} ft${shown ? ' in' : ''}`.trim()} style={{ '--d': `${delay}s` }}>
      {children}
    </Tag>
  )
}

export default function Footer() {
  return (
    <footer className="foot">
      <div className="wrap">
        <div className="fgrid">
          <Ft className="fbrand">
            <span className="fl2">
              <img src={brandLogo('logo-footer.png') || brandLogo('logo.png')} alt="Digitner™" />
            </span>
            <p>Digital transformation and AI solutions for businesses worldwide. Learn. Build. Grow.</p>
            <code>{SITE.email}</code>
          </Ft>
          {FOOTER_NAV.map((col, ci) => (
            <Ft className="fcol" key={col.title} delay={0.08 * (ci + 1)}>
              <h4>{col.title}</h4>
              {col.links.map((l) => (
                <Link key={l.label} to={l.to}>
                  {col.title === 'Digital Services' ? <b>{l.label}</b> : l.label}
                </Link>
              ))}
            </Ft>
          ))}
        </div>

        <Ft className="gpres" delay={0.1}>
          <div className="gph">
            <p className="eyebrow">
              <Icon name="globe" /> Global presence
            </p>
            <h4>4 locations · 3 continents · clients worldwide</h4>
          </div>
          <div className="gpt">
            {SITE.locations.map((l, i) => (
              <div className={`gp${i === 0 ? ' hq' : ''}`} key={l.city}>
                <span className="gpd" />
                <b>{l.city}</b>
                <small>{l.region}</small>
                <em>{l.role}</em>
              </div>
            ))}
          </div>
        </Ft>

        <Ft className="fbot" delay={0.1}>
          <span>
            © {new Date().getFullYear()} {SITE.legalName} Digitner™ is a trademark of Digitner Tech Solutions. ·{' '}
            <Link to={PATHS.terms} className="flegal">
              Terms &amp; Conditions
            </Link>
          </span>
          <span className="fmade">Built in India · Delivered worldwide</span>
        </Ft>
      </div>
    </footer>
  )
}
