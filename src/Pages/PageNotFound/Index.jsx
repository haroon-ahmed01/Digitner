import { Link } from 'react-router-dom'
import Seo from '@/components/seo/Seo'
import { PATHS } from '@/constant/routes'
import Header from '@/layouts/PublicLayout/Header'
import { WorkspaceProvider } from '@/context/WorkspaceProvider'

export default function PageNotFound() {
  return (
    <WorkspaceProvider>
      <Seo title="Page not found" path="/404" noIndex />
      <Header />
      <main className="wrap">
        <div className="view enter" style={{ padding: '96px 0', textAlign: 'center' }}>
          <p className="eyebrow">Error 404</p>
          <h1 style={{ fontSize: 'clamp(40px,7vw,80px)' }}>This page <em>moved.</em></h1>
          <p className="lede" style={{ margin: '16px auto 28px', color: 'var(--muted)', maxWidth: '48ch' }}>The link may be old or mistyped. Head back home and pick up from there.</p>
          <Link className="btn primary" to={PATHS.home}>Back to home</Link>
        </div>
      </main>
    </WorkspaceProvider>
  )
}
