import { IC } from './data'

/** Inline SVG icon from the path table in data.js. */
export function Ic({ n, s = 16 }) {
  return (
    <svg className="mk-i" viewBox="0 0 24 24" width={s} height={s} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={IC[n] || IC.dot} />
    </svg>
  )
}
