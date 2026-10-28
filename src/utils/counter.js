/** Hands out "01", "02"… in render order, for numbered section headings. */
export const counter = () => {
  let n = 0
  return () => String(++n).padStart(2, '0')
}
