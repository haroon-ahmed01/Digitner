import { useEffect, useId, useRef, useState } from 'react'

/**
 * A themed dropdown (the browser's own list cannot be styled). Works with mouse, touch and keyboard:
 * Enter / Space / ↓ open it, ↑ ↓ Home End move, Enter picks, Esc closes, typing a letter jumps to a match.
 */
export default function Select({ id, label, value, options, onChange }) {
  const uid = useId()
  const listId = `${uid}-list`
  const labelId = `${uid}-label`
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState(0)
  const root = useRef(null)
  const list = useRef(null)
  const selected = Math.max(0, options.indexOf(value))

  const openList = () => {
    setActive(selected)
    setOpen(true)
  }
  const pick = (i) => {
    onChange(options[i])
    setOpen(false)
    root.current?.querySelector('button')?.focus()
  }

  // close on outside click / touch
  useEffect(() => {
    if (!open) return
    const away = (e) => {
      if (root.current && !root.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('pointerdown', away)
    return () => document.removeEventListener('pointerdown', away)
  }, [open])

  // keep the active option in view
  useEffect(() => {
    if (open) list.current?.children[active]?.scrollIntoView({ block: 'nearest' })
  }, [open, active])

  const onKeyDown = (e) => {
    const last = options.length - 1
    if (!open) {
      if (['Enter', ' ', 'ArrowDown', 'ArrowUp'].includes(e.key)) {
        e.preventDefault()
        openList()
      }
      return
    }
    if (e.key === 'ArrowDown') (e.preventDefault(), setActive((a) => Math.min(last, a + 1)))
    else if (e.key === 'ArrowUp') (e.preventDefault(), setActive((a) => Math.max(0, a - 1)))
    else if (e.key === 'Home') (e.preventDefault(), setActive(0))
    else if (e.key === 'End') (e.preventDefault(), setActive(last))
    else if (e.key === 'Enter' || e.key === ' ') (e.preventDefault(), pick(active))
    else if (e.key === 'Escape') (e.preventDefault(), setOpen(false))
    else if (e.key === 'Tab') setOpen(false)
    else if (e.key.length === 1) {
      const n = options.findIndex((o, i) => i > active && o.toLowerCase().startsWith(e.key.toLowerCase()))
      const m = n >= 0 ? n : options.findIndex((o) => o.toLowerCase().startsWith(e.key.toLowerCase()))
      if (m >= 0) setActive(m)
    }
  }

  return (
    <div className="ac-field">
      <span className="ac-fl" id={labelId}>
        {label}
      </span>
      <div className={`ac-select${open ? ' ac-open' : ''}`} ref={root}>
        <button
          type="button"
          id={id}
          className="ac-sel-btn"
          role="combobox"
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-controls={listId}
          aria-labelledby={`${labelId} ${id}`}
          onClick={() => (open ? setOpen(false) : openList())}
          onKeyDown={onKeyDown}
        >
          <span>{value}</span>
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M6 9l6 6 6-6" />
          </svg>
        </button>
        {open && (
          <ul className="ac-sel-list" id={listId} role="listbox" aria-labelledby={labelId} ref={list}>
            {options.map((o, i) => (
              <li
                key={o}
                role="option"
                aria-selected={o === value}
                className={`${i === active ? 'ac-act' : ''}${o === value ? ' ac-on' : ''}`.trim()}
                onMouseEnter={() => setActive(i)}
                onClick={() => pick(i)}
              >
                <span>{o}</span>
                {o === value && (
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M5 12.5l4.5 4.5L19 7.5" />
                  </svg>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
