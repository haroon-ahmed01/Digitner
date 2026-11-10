import { Outlet } from 'react-router-dom'

/**
 * Shell for the AI Academy pages (inside the normal site Header and Footer). Everything inside `.acad` is
 * styled by styles/academy.css, so it cannot affect the rest of the site. The pages are reached from the
 * footer's "AI Academy" column and from the buttons inside the pages.
 */
export default function AcademyLayout() {
  return (
    <div className="acad">
      <Outlet />
    </div>
  )
}
