import Icon from '@/components/ui/Icon'
import { image, logo, video } from '@/utils/media'
import { LOGO_NAMES } from '@/data/products'
import { useToast } from '@/context/workspace'

/** Autoplaying looped clip (muted, inline). base = "crm" -> crm.mp4 + crm.jpg poster. */
export function Clip({ base, className }) {
  return (
    <video className={className} autoPlay muted loop playsInline preload="metadata" poster={image(`${base}.jpg`)}>
      <source src={video(`${base}.mp4`)} type="video/mp4" />
    </video>
  )
}

/** Framed video panel with label + caption. Without `base` it shows the "coming soon" play button. */
export function VideoPanel({ label, title, base }) {
  const toast = useToast()
  if (base)
    return (
      <div className="video real">
        <Clip base={base} />
        <span className="vt">{label}</span>
        <div className="vl">
          <b>{title}</b>
          <span>Digitner</span>
        </div>
      </div>
    )
  return (
    <div className="video">
      <span className="vt">{label}</span>
      <button className="play" type="button" aria-label="Play video (coming soon)" onClick={() => toast('Video coming soon')}>
        <Icon name="play" />
      </button>
      <div className="vl">
        <b>{title}</b>
        <span>Video coming soon</span>
      </div>
    </div>
  )
}

/** <Photo name="team1" alt="…" badge="…" /> -> src/assets/images/team1.webp */
export function Photo({ name, alt, badge }) {
  return (
    <figure className="photo">
      <img src={image(`${name}.webp`)} alt={alt} loading="lazy" />
      {badge && <figcaption>{badge}</figcaption>}
    </figure>
  )
}

/** One client logo tile. */
export function LogoTile({ k, name, dup }) {
  return (
    <div className={`logo${dup ? ' dup' : ''}`} aria-hidden={dup || undefined}>
      <img src={logo(k)} alt={dup ? '' : name || LOGO_NAMES[k] || ''} loading="lazy" />
    </div>
  )
}

/** Two copies of the row so the CSS marquee loops seamlessly. rows: [[logoKey, name]] */
export function LogoRow({ rows }) {
  return (
    <>
      {rows.map(([k, n]) => (
        <LogoTile key={k} k={k} name={n} />
      ))}
      {rows.map(([k, n]) => (
        <LogoTile key={`${k}-d`} k={k} name={n} dup />
      ))}
    </>
  )
}

/** Success-story logos: marquee when more than 3, plain row otherwise. keys: [logoKey] */
export function StoryStrip({ keys }) {
  if (!keys?.length) return null
  if (keys.length > 3)
    return (
      <div className="marquee" aria-label="Success stories">
        <div className="track">
          <LogoRow rows={keys.map((k) => [k, LOGO_NAMES[k]])} />
        </div>
      </div>
    )
  return (
    <div className="slogos">
      {keys.map((k) => (
        <LogoTile key={k} k={k} />
      ))}
    </div>
  )
}
