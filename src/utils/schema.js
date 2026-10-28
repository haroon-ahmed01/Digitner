import { absoluteUrl } from '@/config/ConfigSEO'

/** Builders for schema.org JSON-LD. Pass the result to <Seo jsonLd={...} />. */

export const breadcrumbSchema = (items) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: item.name,
    item: absoluteUrl(item.path),
  })),
})

export const serviceSchema = ({ name, description, path }) => ({
  '@context': 'https://schema.org',
  '@type': 'Service',
  name,
  description,
  url: absoluteUrl(path),
  provider: { '@type': 'Organization', name: 'Digitner' },
})

export const softwareSchema = ({ name, description, path }) => ({
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name,
  description,
  url: absoluteUrl(path),
  applicationCategory: 'BusinessApplication',
  publisher: { '@type': 'Organization', name: 'Digitner' },
})
