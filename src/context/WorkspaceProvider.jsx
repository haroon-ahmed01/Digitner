import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { AGENTS } from '@/data/marketplace'
import { Ctx } from './workspace'

const KEY = 'dai-ws'
const load = () => {
  try {
    return JSON.parse(localStorage.getItem(KEY)) || []
  } catch {
    return []
  }
}

/** Marketplace waitlist + the slide-in drawer + the little toast. Shared by header, marketplace and pages. */
export function WorkspaceProvider({ children }) {
  const [ids, setIds] = useState(load)
  const [open, setOpen] = useState(false)
  const [toastMsg, setToastMsg] = useState('')
  const [toastOn, setToastOn] = useState(false)
  const timer = useRef()

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(ids))
    } catch {
      /* ignore */
    }
  }, [ids])

  const toast = useCallback((msg) => {
    setToastMsg(msg)
    setToastOn(true)
    clearTimeout(timer.current)
    timer.current = setTimeout(() => setToastOn(false), 1800)
  }, [])

  const toggle = useCallback(
    (id) => {
      const agent = AGENTS.find((a) => a.id === id)
      if (!agent) return
      setIds((cur) => {
        const has = cur.includes(id)
        toast(has ? `${agent.n} removed from waitlist` : `You’re on the waitlist for ${agent.n}`)
        return has ? cur.filter((x) => x !== id) : [...cur, id]
      })
    },
    [toast],
  )

  const remove = useCallback((id) => setIds((cur) => cur.filter((x) => x !== id)), [])
  const value = useMemo(
    () => ({ ids, has: (id) => ids.includes(id), toggle, remove, open, setOpen, toast, toastMsg, toastOn }),
    [ids, toggle, remove, open, toast, toastMsg, toastOn],
  )
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}
