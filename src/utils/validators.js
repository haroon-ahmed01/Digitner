const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

/** Returns an object of field errors. Empty object = valid. */
export function validateContact({ name, email, message }) {
  const errors = {}
  if (!name?.trim()) errors.name = 'Please enter your name.'
  if (!EMAIL_RE.test(email?.trim() || '')) errors.email = 'Please enter a valid email address.'
  if (!message?.trim() || message.trim().length < 10)
    errors.message = 'Tell us a little more (at least 10 characters).'
  return errors
}
