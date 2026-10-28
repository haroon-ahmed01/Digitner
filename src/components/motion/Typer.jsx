import { useEffect, useRef } from 'react'
import { prefersReducedMotion } from '@/hooks/useReducedMotion'

/**
 * Types a list of words one after another: <b ref> text. Used in the home hero and in page heroes.
 * timing = {add, del, hold, gap, delay}
 */
export function useTyper(wordList, { add = 70, del = 35, hold = 1500, gap = 250, delay = 0 } = {}) {
  const ref = useRef(null)
  // key by content so a new array with the same words does not restart the animation
  const key = wordList.join('\u0001')
  useEffect(() => {
    const words = key ? key.split('\u0001') : []
    const el = ref.current
    if (!el || !words.length) return
    if (prefersReducedMotion()) {
      el.textContent = words[0]
      return
    }
    let wi = 0
    let i = 0
    let timer
    const type = () => {
      const w = words[wi]
      i++
      el.textContent = w.slice(0, i)
      timer = setTimeout(i < w.length ? type : erase, i < w.length ? add : hold)
    }
    const erase = () => {
      const w = words[wi]
      i--
      el.textContent = w.slice(0, i)
      if (i > 0) timer = setTimeout(erase, del)
      else {
        wi = (wi + 1) % words.length
        timer = setTimeout(type, gap)
      }
    }
    timer = setTimeout(() => {
      i = 0
      el.textContent = ''
      type()
    }, delay)
    return () => clearTimeout(timer)
  }, [key, add, del, hold, gap, delay])
  return ref
}
