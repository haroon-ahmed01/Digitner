/**
 * Single place that reads environment variables (.env.development / .env.production).
 * Import ENV from here instead of touching import.meta.env anywhere else.
 * Remember: VITE_* values are public (bundled into the browser). No secrets here.
 */
const env = import.meta.env

export const ENV = {
  isProd: env.PROD,
  siteUrl: (env.VITE_SITE_URL || 'https://digitner.com').replace(/\/$/, ''),
  contactProvider: env.VITE_CONTACT_PROVIDER || 'emailjs', // 'emailjs' | 'api'
  emailjs: {
    serviceId: env.VITE_EMAILJS_SERVICE_ID,
    templateId: env.VITE_EMAILJS_TEMPLATE_ID,
    publicKey: env.VITE_EMAILJS_PUBLIC_KEY,
  },
}
