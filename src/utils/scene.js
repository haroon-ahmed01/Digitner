/** Which monitor content a hero picture shows, picked from the page's centre icon. */
const BY_ICON = {
  spark: 'robot', bot: 'robot', compass: 'roadmap', flag: 'team', users: 'team', grid: 'web', globe: 'web', cart: 'web',
  code: 'code', layers: 'dashboard', chart: 'dashboard', crm: 'dashboard', wallet: 'dashboard', growth: 'dashboard',
  phone: 'phone', shield: 'shield', ticket: 'shield', tooth: 'tooth', target: 'funnel', chat: 'chat', mail: 'chat',
  doc: 'dashboard', present: 'funnel', sofa: 'web', plane: 'roadmap', gift: 'funnel', pin: 'team', calendar: 'dashboard',
}

export const sceneVariant = (icon) => BY_ICON[icon] || 'robot'
