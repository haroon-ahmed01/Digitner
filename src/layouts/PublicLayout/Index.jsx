import { Outlet } from 'react-router-dom'
import { WorkspaceProvider } from '@/context/WorkspaceProvider'
import ScrollToTop from '@/components/common/ScrollToTop'
import Header from './Header'
import Footer from './Footer'
import WorkspaceDrawer from './WorkspaceDrawer'

/** Shell for every public page: header, page, footer, waitlist drawer. */
export default function PublicLayout({ children }) {
  return (
    <WorkspaceProvider>
      <ScrollToTop />
      <Header />
      <main className="wrap">{children ?? <Outlet />}</main>
      <Footer />
      <WorkspaceDrawer />
    </WorkspaceProvider>
  )
}
