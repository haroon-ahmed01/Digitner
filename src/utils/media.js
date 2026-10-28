/**
 * Media lookup. Files live in src/assets/{images,videos,logos/clients}.
 * Vite hashes the files at build time, so we look the real URL up by file name.
 *   image('crm.jpg')   video('crm.mp4')   logo('fathima')
 */
const toMap = (files) =>
  Object.fromEntries(Object.entries(files).map(([path, url]) => [path.split('/').pop(), url]))

const IMAGES = toMap(import.meta.glob('/src/assets/images/*', { eager: true, import: 'default', query: '?url' }))
const VIDEOS = toMap(import.meta.glob('/src/assets/videos/*', { eager: true, import: 'default', query: '?url' }))
const LOGOS = toMap(import.meta.glob('/src/assets/logos/clients/*', { eager: true, import: 'default', query: '?url' }))
const BRAND = toMap(import.meta.glob('/src/assets/logos/*.png', { eager: true, import: 'default', query: '?url' }))

export const image = (name) => IMAGES[name] || ''
export const video = (name) => VIDEOS[name] || ''
export const brandLogo = (name = 'logo.png') => BRAND[name] || ''

/** Client logo by key ("fathima"), whatever its extension (.png / .webp). */
export const logo = (key) => {
  const file = Object.keys(LOGOS).find((f) => f.replace(/\.[a-z]+$/, '') === key)
  return file ? LOGOS[file] : ''
}

/** Poster image + video source for a media base name ("crm" -> crm.jpg + crm.mp4). */
export const clip = (base) => ({ poster: image(`${base}.jpg`), src: video(`${base}.mp4`) })
