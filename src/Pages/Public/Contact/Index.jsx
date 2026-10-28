import { useState } from 'react'
import Seo from '@/components/seo/Seo'
import Icon from '@/components/ui/Icon'
import { View } from '@/components/blocks'
import { useContactForm } from '@/hooks/useContactForm'
import { SITE } from '@/data/site'
import AText from '@/components/motion/AText'

const OFFICES = [
  ['pin', 'Head office', '408/A2B, Ragavendra, Kilithampattrai, Vellore 632007'],
  ['pin', 'Branch', 'Bengaluru 560100'],
  ['globe', 'Also in', 'Mexico · Malaysia'],
]

export default function Contact() {
  const { values, errors, status, onChange, onSubmit } = useContactForm()
  const [copied, setCopied] = useState('Copy')

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(SITE.email)
      setCopied('Copied')
    } catch {
      setCopied('Select it')
    }
    setTimeout(() => setCopied('Copy'), 1600)
  }

  return (
    <View>
      <Seo
        title="Contact"
        description="Tell us what you want to build. We'll come back with a working prototype. Offices in Vellore and Bengaluru, delivery in Mexico and Malaysia."
        path="/contact"
      />
      <div className="contact">
        <div>
          <h2><AText>Let&apos;s build your AI-ready business.</AText></h2>
          <AText as="p" sub className="sub">Tell us what you want to build. We'll come back with a working prototype.</AText>

          {status === 'success' ? (
            <div className="ok" role="status">
              Thanks! We got your request and will reply with next steps shortly. You can also email {SITE.email}.
            </div>
          ) : (
            <form onSubmit={onSubmit} noValidate>
              <div>
                <label htmlFor="cName">Your name</label>
                <input className="inp" id="cName" name="name" value={values.name} onChange={onChange} placeholder="Full name" autoComplete="name" aria-invalid={!!errors.name} />
                {errors.name && <small className="ferr">{errors.name}</small>}
              </div>
              <div>
                <label htmlFor="cEmail">Email</label>
                <input className="inp" id="cEmail" name="email" type="email" value={values.email} onChange={onChange} placeholder="you@company.com" autoComplete="email" aria-invalid={!!errors.email} />
                {errors.email && <small className="ferr">{errors.email}</small>}
              </div>
              <div>
                <label htmlFor="cCo">Company</label>
                <input className="inp" id="cCo" name="company" value={values.company} onChange={onChange} placeholder="Company name" autoComplete="organization" />
              </div>
              <div>
                <label htmlFor="cWhat">What do you want to build?</label>
                <textarea className="inp" id="cWhat" name="message" rows={3} value={values.message} onChange={onChange} placeholder="A CRM for our clinics, a WhatsApp ordering flow…" aria-invalid={!!errors.message} />
                {errors.message && <small className="ferr">{errors.message}</small>}
              </div>
              {/* honeypot: hidden from people, bots fill it */}
              <input className="hp" name="website" value={values.website} onChange={onChange} tabIndex={-1} autoComplete="off" aria-hidden="true" />
              <button className="btn primary" type="submit" disabled={status === 'sending'}>
                {status === 'sending' ? 'Sending…' : 'Request a prototype'}
              </button>
              {status === 'error' && (
                <small className="ferr" role="alert">
                  Something went wrong. Please email {SITE.email} instead.
                </small>
              )}
            </form>
          )}
        </div>

        <div className="offices">
          <div>
            <p className="eyebrow"><Icon name="mail" /> Email</p>
            <div className="mail">
              <code>{SITE.email}</code>
              <button className="copy" type="button" onClick={copy}>{copied}</button>
            </div>
          </div>
          {OFFICES.map(([ic, label, text]) => (
            <div key={label}>
              <p className="eyebrow"><Icon name={ic} /> {label}</p>
              <p>{text}</p>
            </div>
          ))}
        </div>
      </div>
    </View>
  )
}
