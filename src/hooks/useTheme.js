import { useCallback, useState } from 'react'

const KEY = 'digitner-theme'
const DEFAULT_THEME = 'light'

/** Read the theme that index.html already applied before first paint. */
const current = () =>
  typeof document === 'undefined' ? DEFAULT_THEME : document.documentElement.dataset.theme || DEFAULT_THEME

const apply = (t) => {
  document.documentElement.dataset.theme = t
  document.documentElement.style.colorScheme = t
  try {
    localStorage.setItem(KEY, t)
  } catch {
    /* private mode: ignore */
  }
}

/** Light is the default. The user can switch to dark; the choice is remembered. */
export function useTheme() {
  const [theme, setTheme] = useState(current)

  // The DOM is updated right here (not in an effect) so a view transition can snapshot the new look.
  const toggle = useCallback(() => {
    const next = (document.documentElement.dataset.theme || DEFAULT_THEME) === 'dark' ? 'light' : 'dark'
    apply(next)
    setTheme(next)
  }, [])

  return { theme, toggle }
}
