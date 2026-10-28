import { ENV } from './ConfigEnv'

export const SEO = {
  siteName: 'Digitner',
  titleTemplate: '%s | Digitner',
  defaultTitle: 'Digitner | Digital transformation and AI solutions',
  defaultDescription:
    'Digitner builds websites, mobile apps, CRMs, WhatsApp automation and AI agents. See a working prototype before you sign. Learn. Build. Grow. Now with AI.',
  defaultImage: '/og-image.png', // put a 1200x630 image at public/og-image.png
  locale: 'en_IN',
  twitterHandle: '', // e.g. '@digitner'
}

/** Turn a path ("/about") into an absolute URL ("https://digitner.com/about"). */
export const absoluteUrl = (path = '/') =>
  /^https?:\/\//.test(path) ? path : `${ENV.siteUrl}${path.startsWith('/') ? path : `/${path}`}`

/** "About Us" -> "About Us | Digitner". Empty title -> default title. */
export const buildTitle = (title) =>
  title ? SEO.titleTemplate.replace('%s', title) : SEO.defaultTitle
