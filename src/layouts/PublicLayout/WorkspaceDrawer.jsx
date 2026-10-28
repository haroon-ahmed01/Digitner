import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { PATHS } from '@/constant/routes'
import { AGENTS } from '@/data/marketplace'
import { useWorkspace } from '@/context/workspace'

/** Slide-in waitlist + the toast. Lives once in the layout. */
export default function WorkspaceDrawer() {
  const { ids, remove, open, setOpen, toastMsg, toastOn } = useWorkspace()
  const list = AGENTS.filter((a) => ids.includes(a.id))
  const total = list.reduce((s, a) => s + a.cr, 0)

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [setOpen])

  return (
    <>
      <aside data-lenis-prevent className={`drawer${open ? ' open' : ''}`} id="drawer" aria-label="Your workspace" aria-hidden={!open}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2>Your waitlist</h2>
          <button className="x" type="button" onClick={() => setOpen(false)}>
            Close
          </button>
        </div>
        <p className="muted" style={{ marginTop: 6, fontSize: 14 }}>
          Agents you want early access to when the Digitner AI Marketplace launches.
        </p>
        <ul>
          {list.map((a) => (
            <li key={a.id}>
              <span>
                <b>{a.n}</b>
                <br />
                <small className="muted">
                  {a.cr} credits {a.u}
                </small>
              </span>
              <button className="x" type="button" onClick={() => remove(a.id)}>
                Remove
              </button>
            </li>
          ))}
        </ul>
        {!list.length && (
          <p className="muted" style={{ fontSize: 14 }}>
            No agents yet. Join the waitlist for any agent.
          </p>
        )}
        <div style={{ marginTop: 'auto', display: 'grid', gap: 10 }}>
          <div className="kv" style={{ margin: 0 }}>
            <span>Planned credits per run</span>
            <b>{total}</b>
          </div>
          <Link className="btn ghost" to={PATHS.marketplace} onClick={() => setOpen(false)}>
            Browse agents
          </Link>
          <Link className="btn primary" to={PATHS.contact} onClick={() => setOpen(false)}>
            Confirm early access
          </Link>
        </div>
      </aside>
      <div className={`toast${toastOn ? ' show' : ''}`} role="status">
        {toastMsg}
      </div>
    </>
  )
}
