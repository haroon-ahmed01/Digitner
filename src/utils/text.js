import { ICON_KEYWORDS } from '@/data/products'

/** Pick an icon name from free text, e.g. "Doctor Management" -> "users". */
export const iconFor = (text = '') => {
  const t = text.toLowerCase()
  for (const [pattern, icon] of ICON_KEYWORDS) if (new RegExp(pattern).test(t)) return icon
  return 'spark'
}

/** "Digital Strategy & Roadmap" -> "Digital Strategy" (short chip label). */
export const shortLabel = (title) => {
  const words = title.replace(/\s*(&| and ).*$/, '').split(' ').slice(0, 2)
  while (words.length > 1 && /^(by|for|of|to|with|the|a|per)$/i.test(words[words.length - 1])) words.pop()
  return words.join(' ')
}

import { PRODUCT_TYPES } from '@/data/products'

/** Product type chips: [[icon,label]]. Default is CRM/SaaS + Mobile App. */
export const productTypes = (id) =>
  PRODUCT_TYPES[id] || [['crm', 'CRM / SaaS'], ['phone', 'Mobile App']]

/** "CRM / SaaS + Mobile App" */
export const productTypeText = (id) => productTypes(id).map((t) => t[1]).join(' · ')
