/** Every URL in the site lives here. Never hard-code a path in a component. */
export const PATHS = {
  home: '/',
  about: '/about',
  services: '/services',
  serviceGroup: (id = ':slug') => `/services/${id}`,
  service: (id = ':slug') => `/services/${id}`,
  products: '/products',
  product: (id = ':productId') => `/products/${id}`,
  ai: '/ai-solutions',
  aiProduct: (id = ':aiId') => `/ai-solutions/${id}`,
  marketplace: '/ai-marketplace',
  contact: '/contact',
  terms: '/terms',
}
