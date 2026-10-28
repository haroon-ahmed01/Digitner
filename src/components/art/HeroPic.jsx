import { useLocation } from 'react-router-dom'
import { image } from '@/utils/media'
import { heroPicFor } from '@/data/heroPics'

export default function HeroPic({ caption }) {
  const { pathname } = useLocation()
  const src = image(heroPicFor(pathname))
  if (!src) return null
  return (
    <div className="scene">
      <div className="hpic hpic-img">
        <img src={src} alt="" />
      </div>
      {caption && <p className="cap">{caption}</p>}
    </div>
  )
}