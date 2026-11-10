import { NavLink } from 'react-router-dom'
import { ACADEMY_TABS } from '@/data/academy'

/** Sub-menu under the site header, shared by every AI Academy page. Uses the site's `.subtabs` / `.st` styles. */
export default function AcademyTabs() {
  return (
    <nav className="subtabs" aria-label="AI Academy">
      <div className="wrap">
        {ACADEMY_TABS.map((t) => (
          <NavLink key={t.to} to={t.to} end={t.exact} className="st">
            {t.label}
          </NavLink>
        ))}
      </div>
    </nav>
  )
}
