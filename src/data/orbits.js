// Orbit art for the hero of every inner page (same visual language as the home logo mark).

/** route -> [centre icon, [[chip label, chip icon]], caption] */
export const ORBIT_CHIPS = {
  about: ['flag', [['Prototype', 'layers'], ['Build', 'code'], ['Grow', 'growth'], ['Clients', 'users'], ['Global', 'globe'], ['Partners', 'link']], '100+ customers · 4 locations'],
  services: ['compass', [['Strategy', 'compass'], ['Apps', 'code'], ['Sales', 'target'], ['Data', 'chart'], ['Cloud', 'layers'], ['Agents', 'bot']], 'Plan it. Build it. Grow it.'],
  products: ['grid', [['DentExa', 'tooth'], ['InsurExa', 'shield'], ['PayExa', 'wallet'], ['InteriorExa', 'sofa'], ['LeadExa', 'target'], ['EventExa', 'ticket']], 'Ready platforms for every industry'],
  ai: ['spark', [['VeloqueAI', 'compass'], ['BuySei AI', 'chart'], ['SmileView AI', 'tooth'], ['Agents', 'bot'], ['Data', 'layers'], ['Marketplace', 'grid']], 'AI built into how you work'],
  veloque: ['compass', [['News', 'doc'], ['Tools', 'search'], ['Newsletter', 'mail'], ['Communities', 'users'], ['Apps', 'phone'], ['Verified', 'shield']], 'The AI operating layer'],
  buysei: ['chart', [['Curious', 'search'], ['Explorer', 'compass'], ['Practitioner', 'layers'], ['Native', 'spark'], ['Chrome', 'chrome'], ['Signals', 'target']], 'Know who’s ready to buy AI'],
  smileview: ['tooth', [['Photo', 'phone'], ['Detect', 'search'], ['Preview', 'spark'], ['Aligners', 'layers'], ['Share', 'chat'], ['DentExa', 'link']], 'A new smile, before treatment'],
  terms: ['shield', [['Privacy', 'shield'], ['IP', 'doc'], ['Payments', 'wallet'], ['Data', 'layers'], ['Access', 'users'], ['Law', 'flag']], 'Clear terms, fair partnership'],
  consulting: ['compass', [['ICP', 'users'], ['Journeys', 'compass'], ['Roadmap', 'flag'], ['Benchmark', 'chart'], ['AI readiness', 'spark'], ['KPIs', 'target']], 'Clarity before investment'],
  apps: ['code', [['Web', 'globe'], ['Mobile', 'phone'], ['CRM', 'crm'], ['WhatsApp', 'chat'], ['Dashboards', 'chart'], ['Agents', 'bot']], 'Prototype first, then production'],
  sales: ['target', [['Decks', 'present'], ['RFQ', 'doc'], ['Leads', 'target'], ['Brand', 'image'], ['SEO', 'search'], ['Ads', 'growth']], 'Stories, bids and pipeline that win'],
}

/** route -> {shape, nodes, metric, pct, max?} */
export const ORBIT_STYLE = {
  about: { shape: 'squircle', nodes: 8, metric: '100+ clients', pct: 80 },
  services: { shape: 'octagon', nodes: 17, metric: '17 services', pct: 85 },
  products: { shape: 'squircle', nodes: 8, metric: '8 platforms', pct: 90 },
  ai: { shape: 'circle', nodes: 12, metric: '3 AI products', pct: 75 },
  veloque: { shape: 'circle', nodes: 16, metric: '13,598+ tools', pct: 92, max: 6 },
  buysei: { shape: 'hex', nodes: 8, metric: '4 stages', pct: 68 },
  smileview: { shape: 'oval', nodes: 14, metric: '1 photo', pct: 60 },
  terms: { shape: 'shield', nodes: 12, metric: '12 sections', pct: 100 },
  consulting: { shape: 'hex', nodes: 10, metric: '5 services', pct: 70 },
  apps: { shape: 'squircle', nodes: 16, metric: '8 services', pct: 88 },
  sales: { shape: 'circle', nodes: 8, metric: '4 services', pct: 64 },
}

/** group id -> orbit shape for its services */
export const GROUP_SHAPE = { consulting: 'hex', apps: 'squircle', sales: 'circle' }

/** product id -> orbit shape */
export const PRODUCT_SHAPE = { dentexa: 'circle', insurexa: 'shield', payexa: 'hex', interiorexa: 'diamond', leadexa: 'funnel', eventexa: 'ticket', itravel: 'globe', rewardexa: 'octagon' }
