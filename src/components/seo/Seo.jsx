import { useEffect } from 'react'
import { SEO, absoluteUrl, buildTitle } from '@/config/ConfigSEO'
import { setJsonLd, upsertLink, upsertMeta } from '@/utils/seo'

/**
 * Per-page SEO. Render once at the top of every page:
 *   <Seo title="About Us" description="..." path="/about" />
 * Sets <title>, description, canonical, Open Graph, Twitter and optional JSON-LD.
 */
export default function Seo({
  title,
  description = SEO.defaultDescription,
  path = '/',
  image = SEO.defaultImage,
  type = 'website',
  noIndex = false,
  jsonLd,
}) {
  const fullTitle = buildTitle(title)
  const url = absoluteUrl(path)
  const imageUrl = absoluteUrl(image)
  const jsonLdString = jsonLd ? JSON.stringify(jsonLd) : ''

  useEffect(() => {
    document.title = fullTitle
    upsertMeta('name', 'description', description)
    upsertMeta('name', 'robots', noIndex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large')
    upsertLink('canonical', url)

    upsertMeta('property', 'og:title', fullTitle)
    upsertMeta('property', 'og:description', description)
    upsertMeta('property', 'og:url', url)
    upsertMeta('property', 'og:type', type)
    upsertMeta('property', 'og:image', imageUrl)
    upsertMeta('property', 'og:locale', SEO.locale)

    upsertMeta('name', 'twitter:title', fullTitle)
    upsertMeta('name', 'twitter:description', description)
    upsertMeta('name', 'twitter:image', imageUrl)
    if (SEO.twitterHandle) upsertMeta('name', 'twitter:site', SEO.twitterHandle)

    setJsonLd(jsonLdString ? JSON.parse(jsonLdString) : null)
  }, [fullTitle, description, url, imageUrl, type, noIndex, jsonLdString])

  return null
}
