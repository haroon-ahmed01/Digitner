export const HERO_PICS = {
  '/about': '2.png',
  '/services': '3.png',
  '/services/*': '4.png',
  '/products': '5.png',
  '/products/*': '6.png',
  '/ai-solutions': '7.png',
  '/ai-solutions/*': '10.png',
  '/ai-marketplace': '8.png',
  '/contact': '9.png',
  '/terms': '2.png',
}

export function heroPicFor(pathname) {
  const p = pathname.replace(/\/+$/, '') || '/'
  if (HERO_PICS[p]) return HERO_PICS[p]
  const section = '/' + p.split('/')[1]
  return HERO_PICS[`${section}/*`] || ''
}