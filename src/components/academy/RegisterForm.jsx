import { useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import Select from '@/components/academy/Select'
import { contactAPI } from '@/services/api'
import { ACADEMY, MANUAL_FORMAT, REGISTER } from '@/data/academy'

/** Copy text to the clipboard; if that is blocked, select it so the visitor can press copy themselves. */
async function copyText(text, selectEl) {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    if (selectEl) {
      const range = document.createRange()
      range.selectNodeContents(selectEl)
      const sel = window.getSelection()
      sel.removeAllRanges()
      sel.addRange(range)
    }
    return false
  }
}

/** A button that shows "Copied" for a moment after copying. */
function CopyButton({ label, text, selectRef, className }) {
  const [state, setState] = useState(label)
  const onClick = async () => {
    const ok = await copyText(text(), selectRef?.current)
    setState(ok ? 'Copied' : 'Selected, press copy')
    setTimeout(() => setState(label), 1600)
  }
  return (
    <button className={className} type="button" onClick={onClick}>
      {state}
    </button>
  )
}

/** The email shown next to a copy button. */
export function MailLine() {
  const ref = useRef(null)
  return (
    <div className="ac-line">
      <code ref={ref}>{ACADEMY.email}</code>
      <CopyButton className="ac-btn ac-ghost ac-mini" label="Copy email" text={() => ACADEMY.email} selectRef={ref} />
    </div>
  )
}

/**
 * Registration form. "Send request" goes through the same contact service as the Contact page (EmailJS or your
 * API, chosen by VITE_CONTACT_PROVIDER), so it reaches the team's inbox. If sending fails, the request text is
 * shown with a copy button so the visitor can email or WhatsApp it instead. "Request the manual" on the Playbook
 * page opens this form with the manual preselected (router state `format`).
 */
export default function RegisterForm() {
  const { state } = useLocation()
  const initial = {
    name: '',
    biz: '',
    phone: '',
    email: '',
    city: '',
    format: state?.format && REGISTER.formats.includes(state.format) ? state.format : REGISTER.formats[0],
    size: REGISTER.sizes[0],
    note: '',
    website: '', // honeypot: real visitors never fill this hidden field
  }
  const [v, setV] = useState(initial)
  const [err, setErr] = useState('')
  const [status, setStatus] = useState('idle') // idle | sending | success | error
  const [msg, setMsg] = useState('')
  const msgRef = useRef(null)

  const set = (key) => (e) => {
    setV((cur) => ({ ...cur, [key]: e.target.value }))
    if (['name', 'biz', 'phone', 'email'].includes(key)) setErr('')
    if (status === 'success') setStatus('idle')
  }

  const submit = async (e) => {
    e.preventDefault()
    if (v.website || status === 'sending') return
    const t = (s) => s.trim()
    if (!t(v.name) || !t(v.biz) || !t(v.phone) || !t(v.email)) {
      setErr('Add your name, business, phone and email so we can reach you.')
      return
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(t(v.email))) {
      setErr('Enter a valid email address.')
      return
    }
    const digits = v.phone.replace(/\D/g, '')
    if (digits.length < 7 || digits.length > 15) {
      setErr('Enter a valid phone number.')
      return
    }
    const request = v.format === MANUAL_FORMAT ? 'AI Business Playbook manual (PDF)' : v.format
    const text = `AI Academy request: ${request}\nName: ${t(v.name)}\nBusiness: ${t(v.biz)}\nPhone: ${t(v.phone)}\nEmail: ${t(v.email)}\nCity: ${t(v.city) || '-'}\nFormat: ${v.format}\nParticipants: ${v.size}\nNotes: ${t(v.note) || '-'}`
    setMsg(text)
    setStatus('sending')
    try {
      await contactAPI.submit({
        name: t(v.name),
        email: t(v.email),
        company: t(v.biz),
        phone: t(v.phone),
        message: text,
        page: window.location.href,
      })
      setV({ ...initial, format: v.format })
      setStatus('success')
    } catch (error) {
      console.error(error)
      setStatus('error')
    }
  }

  return (
    <form onSubmit={submit} noValidate>
      <div className="ac-two">
        <label htmlFor="ac-name">
          Your name
          <input id="ac-name" autoComplete="name" value={v.name} onChange={set('name')} />
        </label>
        <label htmlFor="ac-biz">
          Business or association
          <input id="ac-biz" value={v.biz} onChange={set('biz')} />
        </label>
      </div>
      <div className="ac-two">
        <label htmlFor="ac-phone">
          Phone / WhatsApp
          <input id="ac-phone" inputMode="tel" autoComplete="tel" value={v.phone} onChange={set('phone')} />
        </label>
        <label htmlFor="ac-email">
          Email
          <input id="ac-email" type="email" inputMode="email" autoComplete="email" value={v.email} onChange={set('email')} />
        </label>
      </div>
      <div className="ac-two">
        <label htmlFor="ac-city">
          City
          <input id="ac-city" value={v.city} onChange={set('city')} />
        </label>
        <Select id="ac-size" label="Participants" value={v.size} options={REGISTER.sizes} onChange={(x) => setV((c) => ({ ...c, size: x }))} />
      </div>
      <Select id="ac-format" label="Format" value={v.format} options={REGISTER.formats} onChange={(x) => setV((c) => ({ ...c, format: x }))} />
      <label htmlFor="ac-note">
        Your industry or anything we should know
        <textarea id="ac-note" rows="3" value={v.note} onChange={set('note')} />
      </label>
      <input
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        value={v.website}
        onChange={set('website')}
        style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, opacity: 0 }}
      />
      <p className="ac-err" role="alert">
        {err}
      </p>
      <button className="ac-btn" type="submit" disabled={status === 'sending'}>
        {status === 'sending' ? 'Sending…' : 'Send request'}
      </button>
      {status === 'success' && (
        <p className="ac-ok" role="status">
          Thank you. Your request has been sent to the Digitner AI Academy team. We will contact you shortly.
        </p>
      )}
      {status === 'error' && (
        <div className="ac-result">
          <p className="ac-err" role="alert">
            We could not send it just now. Please copy the request below and email it to {ACADEMY.email} or send it on WhatsApp.
          </p>
          <pre ref={msgRef}>{msg}</pre>
          <div className="ac-line">
            <CopyButton className="ac-btn ac-mini" label="Copy request" text={() => msg} selectRef={msgRef} />
          </div>
        </div>
      )}
    </form>
  )
}
