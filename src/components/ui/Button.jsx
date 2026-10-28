import { Link } from 'react-router-dom'

/**
 * <Button to="/contact" variant="primary">Book a demo</Button>
 * variants: primary | ghost | plain (white button on coloured bands).  sizes: md | sm
 * Use `to` for internal links, `href` for external, otherwise it is a <button>.
 */
export default function Button({ to, href, variant = 'plain', size, className = '', children, ...props }) {
  const cls = ['btn', variant !== 'plain' && variant, size, className].filter(Boolean).join(' ')
  if (to)
    return (
      <Link to={to} className={cls} {...props}>
        {children}
      </Link>
    )
  if (href)
    return (
      <a href={href} className={cls} target="_blank" rel="noopener noreferrer" {...props}>
        {children}
      </a>
    )
  return (
    <button type="button" className={cls} {...props}>
      {children}
    </button>
  )
}
