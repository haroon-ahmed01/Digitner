import { ACADEMY_ICONS } from '@/data/academyIcons'

/**
 * Material Symbols icon drawn as inline SVG (no icon font to load): <Ms name="checklist" />.
 * Size follows the surrounding font-size, colour follows `color` (see .ac-ms in styles/academy.css).
 */
export default function Ms({ name, className = '', ...props }) {
  const d = ACADEMY_ICONS[name]
  return (
    <svg
      className={`ac-ms${className ? ` ${className}` : ''}`}
      viewBox="0 -960 960 960"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      {d && <path d={d} />}
    </svg>
  )
}
