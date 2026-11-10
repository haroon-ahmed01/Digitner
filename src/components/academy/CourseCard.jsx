import { Link } from 'react-router-dom'
import { PATHS } from '@/constant/routes'
import { image } from '@/utils/media'

/** One programme in the catalogue. `c` is an entry of COURSES in data/academy.js. */
export default function CourseCard({ c }) {
  return (
    <article className={`ac-course-card${c.feature ? ' ac-feature' : ''}`}>
      <div className="ac-thumb">
        <div className="ac-illus">
          <img src={image(c.img)} alt={c.alt} loading="lazy" decoding="async" />
        </div>
        <span className="ac-badge ac-live">{c.st}</span>
      </div>
      <div className="ac-cbody">
        <div className="ac-provider">
          <img className="ac-pmark" src={image('academy-mark.png')} alt="" width="20" height="20" />
          Digitner AI Academy
        </div>
        <h3>{c.t}</h3>
        <p className="ac-skills">Skills: {c.s}</p>
        <div className="ac-cmeta">
          <span>{c.lv}</span>
          <span>{c.d}</span>
          <span>Certificate</span>
        </div>
        <div className="ac-cactions">
          <span className="ac-cprice">{c.st}</span>
          <span className="ac-cbtns">
            <Link className="ac-btn ac-ghost" to={c.to}>
              Details
            </Link>
            <Link className="ac-btn" to={PATHS.academyRegister}>
              Register
            </Link>
          </span>
        </div>
      </div>
    </article>
  )
}
