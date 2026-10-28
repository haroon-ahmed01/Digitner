import { ICON_PATHS } from './iconPaths'

/** <Icon name="compass" /> Size and colour come from the surrounding CSS (e.g. `.ico svg`). */
export default function Icon({ name, ...props }) {
  const paths = ICON_PATHS[name] ?? ICON_PATHS.spark
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      dangerouslySetInnerHTML={{ __html: paths }}
      {...props}
    />
  )
}
