import { SERVICES, SERVICE_GROUPS } from '@/data/services'
import { PRODUCTS, PRODUCT_DETAILS } from '@/data/products'
import { GROUP_SHAPE, PRODUCT_SHAPE, ORBIT_CHIPS, ORBIT_STYLE } from '@/data/orbits'
import { iconFor, productTypeText, shortLabel } from '@/utils/text'

/** Props for <OrbitArt/> on a service page. */
export function serviceOrbit(s) {
  return {
    icon: s.ic,
    chips: s.f.map((f) => [shortLabel(f[1]), f[0]]),
    caption: s.out[0],
    shape: GROUP_SHAPE[s.g],
    nodes: s.f.length * 2,
    seed: SERVICES.indexOf(s),
    metric: `${s.out.length} deliverables`,
    pct: 50 + s.f.length * 7,
  }
}

/** Props for <OrbitArt/> on a service group page. */
export function groupOrbit(id) {
  const [icon, chips, caption] = ORBIT_CHIPS[id]
  return { icon, chips, caption, ...ORBIT_STYLE[id] }
}

/** Props for <OrbitArt/> on a product page. */
export function productOrbit(p) {
  const d = PRODUCT_DETAILS[p.id]
  const chips = d?.mods ? d.mods.map((m) => [shortLabel(m[0]), iconFor(`${m[0]} ${m[1]}`)]) : p.f.map((f) => [shortLabel(f[1]), f[0]])
  const n = d?.mods ? d.mods.length : p.f.length * 2
  const metric = d?.stats ? `${d.stats[0][0]} ${d.stats[0][1].split(' ').slice(-1)[0].toLowerCase()}` : `${p.f.length} features`
  return {
    icon: p.ic,
    chips,
    caption: productTypeText(p.id).replace(' · ', ' + '),
    shape: PRODUCT_SHAPE[p.id],
    nodes: n,
    seed: PRODUCTS.indexOf(p),
    metric,
    pct: 40 + n * 4,
    max: Math.min(8, chips.length),
  }
}

/** Floating hero icons. */
export const serviceFloats = (s) => [s.ic, ...s.f.map((f) => f[0])]
export const groupFloats = (id) => SERVICES.filter((s) => s.g === id).map((s) => s.ic)
export const productFloats = (p) => {
  const d = PRODUCT_DETAILS[p.id]
  return d?.mods ? [...new Set(d.mods.map((m) => iconFor(`${m[0]} ${m[1]}`)))] : p.f.map((f) => f[0])
}
export { SERVICE_GROUPS }
