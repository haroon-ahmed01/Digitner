import { PATHS } from '@/constant/routes'
import { SERVICE_GROUPS } from '@/data/services'
import { PRODUCTS } from '@/data/products'
import { AI_PRODUCTS } from '@/data/aiProducts'

/** Header menu. `match` is the path prefix that marks the item as the current page. */
export const MAIN_NAV = [
  { label: 'Home', to: PATHS.home, match: '/', exact: true },
  { label: 'About Us', to: PATHS.about, match: '/about' },
  { label: 'Digital Services', to: PATHS.services, match: '/services', menu: 'services' },
  { label: 'Products', to: PATHS.products, match: '/products', menu: 'products' },
  { label: 'AI Solutions', to: PATHS.ai, match: '/ai-solutions', menu: 'ai' },
  { label: 'AI Marketplace', to: PATHS.marketplace, match: '/ai-marketplace', badge: 'Soon', market: true },
  { label: 'Contact', to: PATHS.contact, match: '/contact' },
]

/** Footer link columns. */
export const FOOTER_NAV = [
  {
    title: 'Company',
    links: [
      { label: 'Home', to: PATHS.home },
      { label: 'About Us', to: PATHS.about },
      { label: 'Contact', to: PATHS.contact },
      { label: 'Book a demo', to: PATHS.contact },
      { label: 'Terms & Conditions', to: PATHS.terms },
    ],
  },
  { title: 'Digital Services', links: SERVICE_GROUPS.map((g) => ({ label: g.n, to: PATHS.serviceGroup(g.id) })) },
  { title: 'Products', links: PRODUCTS.map((p) => ({ label: `Digitner ${p.n}`, to: PATHS.product(p.id) })) },
  {
    title: 'AI Solutions',
    links: [
      ...AI_PRODUCTS.map((a) => ({ label: a.n, to: PATHS.aiProduct(a.id) })),
      { label: 'Digitner AI Marketplace', to: PATHS.marketplace },
    ],
  },
]
