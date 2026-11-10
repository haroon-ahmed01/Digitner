import { Link } from 'react-router-dom'
import { COURSES, PROMPTS } from '@/data/academy'
import { image } from '@/utils/media'

/** Scrolling strip of sample prompts (pauses on hover; wraps instead of scrolling for reduced motion). */
export function PromptBand() {
  return (
    <div className="ac-band" aria-label="Sample prompts from the manual">
      <div className="ac-track">
        {[...PROMPTS, ...PROMPTS].map(([fn, text], i) => (
          <span className="ac-pchip" key={i} aria-hidden={i >= PROMPTS.length ? 'true' : undefined}>
            <b>{fn}</b>
            {text}
          </span>
        ))}
      </div>
    </div>
  )
}

const COPIES = 8 // enough repeats that the loop never shows a gap, even on very wide screens

/** "Running now": the live programmes as a slow marquee of cards. */
export function RunningTrack() {
  const cards = Array.from({ length: COPIES }, () => COURSES).flat()
  return (
    <div className="ac-rtrack-wrap">
      <div className="ac-rtrack">
        {cards.map((c, i) => {
          const dup = i >= COURSES.length
          return (
            <Link className="ac-rcard" to={c.to} key={i} aria-hidden={dup ? 'true' : undefined} tabIndex={dup ? -1 : undefined}>
              <div className="ac-rthumb">
                <div className="ac-illus">
                  <img src={image(c.img)} alt={dup ? '' : c.alt} loading="lazy" decoding="async" />
                </div>
                <span className="ac-live-dot">
                  <i />
                  Running · {c.st}
                </span>
              </div>
              <div className="ac-rbody">
                <b>{c.t}</b>
                <span className="ac-m">
                  {c.lv} · {c.d}
                </span>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
