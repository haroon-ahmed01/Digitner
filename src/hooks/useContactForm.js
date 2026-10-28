import { useState } from 'react'
import { contactAPI } from '@/services/api'
import { validateContact } from '@/utils/validators'

const INITIAL = { name: '', email: '', company: '', phone: '', message: '', website: '' }

/** Holds form state, errors and submit status. The UI component stays dumb. */
export function useContactForm() {
  const [values, setValues] = useState(INITIAL)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | sending | success | error

  const onChange = (e) => {
    const { name, value } = e.target
    setValues((v) => ({ ...v, [name]: value }))
    if (errors[name]) setErrors((er) => ({ ...er, [name]: undefined }))
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    if (values.website) return // honeypot: real users never fill this hidden field

    const found = validateContact(values)
    if (Object.keys(found).length) {
      setErrors(found)
      return
    }

    setStatus('sending')
    try {
      await contactAPI.submit({
        name: values.name.trim(),
        email: values.email.trim(),
        company: values.company.trim(),
        phone: values.phone.trim(),
        message: values.message.trim(),
        page: window.location.href,
      })
      setValues(INITIAL)
      setStatus('success')
    } catch (err) {
      console.error(err)
      setStatus('error')
    }
  }

  return { values, errors, status, onChange, onSubmit }
}
