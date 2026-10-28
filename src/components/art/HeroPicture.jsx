import { image } from '@/utils/media'

/**
 * Hero picture with a light and a dark version (src/assets/images/hero-<name>-light.webp / -dark.webp).
 * CSS shows the one for the current theme. caption sits underneath.
 */
export default function HeroPicture({ name, alt = '', caption }) {
  return (
    <div className="scene">
      <div className="hpic">
        <img className="hp-light" src={image(`hero-${name}-light.webp`)} alt={alt} />
        <img className="hp-dark" src={image(`hero-${name}-dark.webp`)} alt={alt} />
      </div>
      {caption && <p className="cap">{caption}</p>}
    </div>
  )
}
