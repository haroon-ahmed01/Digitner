import { useLocation } from 'react-router-dom'
import { image } from '@/utils/media'
import { heroPicFor } from '@/data/heroPics'

/** Hero picture for the current page (see data/heroPics.js). Returns null when the page has none. */
export default function HeroPic({ caption, onError }) {
  const { pathname } = useLocation()
  const src = image(heroPicFor(pathname))
  if (!src) return null
  return (
    <div className="scene">
      <div className="hpic hpic-img">
        <span className="hp-glow" aria-hidden="true" />
        <img src={src} alt="" onError={onError} />
        <i className="hp-spark s1" aria-hidden="true" />
        <i className="hp-spark s2" aria-hidden="true" />
        <i className="hp-spark s3" aria-hidden="true" />
      </div>
      {caption && <p className="cap">{caption}</p>}
    </div>
  )
}