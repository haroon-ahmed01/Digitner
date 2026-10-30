import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { PATHS } from '@/constant/routes'
import { AGENTS } from '@/data/marketplace'
import { useWorkspace } from '@/context/workspace'
import { waitlistAPI } from '@/services/api'

const EMPTY = { name: '', email: '', phone: '' }

/** Slide-in waitlist + the toast. Lives once in the layout. */
export default function WorkspaceDrawer() {
  const { ids, remove, open, setOpen, toastMsg, toastOn } = useWorkspace()
  const [step, setStep] = useState('list') // list | form | done
  const [values, setValues] = useState(EMPTY)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | sending | error
  const list = AGENTS.filter((a) => ids.includes(a.id))
  const total = list.reduce((s, a) => s + a.cr, 0)

  useEffect(() => {
    const onKey = (e) => {
      if (e.key !== 'Escape') return
      setOpen(false)
      setStep((s) => (s === 'done' ? 'list' : s))
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [setOpen])

  const close = () => {
    setOpen(false)
    if (step === 'done') setStep('list')
  }

  const onChange = (e) => {
    const { name, value } = e.target
    setValues((v) => ({ ...v, [name]: value }))
    if (errors[name]) setErrors((er) => ({ ...er, [name]: undefined }))
  }

  const submit = async (e) => {
    e.preventDefault()
    const found = {}
    if (!values.name.trim()) found.name = 'Enter your name'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) found.email = 'Enter a valid email'
    const digits = values.phone.replace(/\D/g, '')
    if (digits.length < 7 || digits.length > 15) found.phone = 'Enter a valid phone number'
    if (Object.keys(found).length) {
      setErrors(found)
      return
    }
    setStatus('sending')
    try {
      await waitlistAPI.submit({
        name: values.name.trim(),
        email: values.email.trim(),
        phone: values.phone.trim(),
        agents: list.map((a) => ({ name: a.n, credits: a.cr, unit: a.u })),
        totalCredits: total,
        page: window.location.href,
      })
      list.forEach((a) => remove(a.id))
      setValues(EMPTY)
      setStatus('idle')
      setStep('done')
    } catch (err) {
      console.error(err)
      setStatus('error')
    }
  }

  return (
    <>
      <aside data-lenis-prevent className={`drawer${open ? ' open' : ''}`} id="drawer" aria-label="Your workspace" aria-hidden={!open}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2>Your waitlist</h2>
          <button className="x" type="button" onClick={close}>
            Close
          </button>
        </div>

        {step === 'done' && (
          <>
            <p style={{ marginTop: 14, fontWeight: 600 }}>You&apos;re on the waitlist.</p>
            <p className="muted" style={{ marginTop: 6, fontSize: 14 }}>
              Thanks! We&apos;ll email you as soon as these agents launch.
            </p>
            <div style={{ marginTop: 'auto', display: 'grid', gap: 10 }}>
              <Link className="btn primary" to={PATHS.marketplace} onClick={close}>
                Browse more agents
              </Link>
            </div>
          </>
        )}

        {step !== 'done' && (
          <>
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
                  {step === 'list' && (
                    <button className="x" type="button" onClick={() => remove(a.id)}>
                      Remove
                    </button>
                  )}
                </li>
              ))}
            </ul>
            {!list.length && (
              <p className="muted" style={{ fontSize: 14 }}>
                No agents yet. Join the waitlist for any agent.
              </p>
            )}
          </>
        )}

        {step === 'list' && (
          <div style={{ marginTop: 'auto', display: 'grid', gap: 10 }}>
            <div className="kv" style={{ margin: 0 }}>
              <span>Planned credits per run</span>
              <b>{total}</b>
            </div>
            <Link className="btn ghost" to={PATHS.marketplace} onClick={close}>
              Browse agents
            </Link>
            <button className="btn primary" type="button" disabled={!list.length} onClick={() => setStep('form')}>
              Confirm early access
            </button>
          </div>
        )}

        {step === 'form' && (
          <form onSubmit={submit} noValidate style={{ marginTop: 'auto', display: 'grid', gap: 10 }}>
            <div className="kv" style={{ margin: 0 }}>
              <span>Planned credits per run</span>
              <b>{total}</b>
            </div>
            <div>
              <input className="inp" name="name" value={values.name} onChange={onChange} placeholder="Your name" autoComplete="name" aria-invalid={!!errors.name} />
              {errors.name && <small className="ferr">{errors.name}</small>}
            </div>
            <div>
              <input className="inp" name="email" type="email" value={values.email} onChange={onChange} placeholder="you@company.com" autoComplete="email" aria-invalid={!!errors.email} />
              {errors.email && <small className="ferr">{errors.email}</small>}
            </div>
            <div>
              <input className="inp" name="phone" type="tel" value={values.phone} onChange={onChange} placeholder="Phone / WhatsApp" autoComplete="tel" aria-invalid={!!errors.phone} />
              {errors.phone && <small className="ferr">{errors.phone}</small>}
            </div>
            <button className="btn primary" type="submit" disabled={status === 'sending' || !list.length}>
              {status === 'sending' ? 'Sending…' : 'Join the waitlist'}
            </button>
            <button className="btn ghost" type="button" onClick={() => setStep('list')}>
              Back
            </button>
            {status === 'error' && (
              <small className="ferr" role="alert">
                Something went wrong. Please try again or email us.
              </small>
            )}
          </form>
        )}
      </aside>
      <div className={`toast${toastOn ? ' show' : ''}`} role="status">
        {toastMsg}
      </div>
    </>
  )
}