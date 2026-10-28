import { ENV } from "@/config/ConfigEnv";
import APIRequest from "@/utils/APIRequest";

const EMAILJS_URL = "https://api.emailjs.com/api/v1.0/email/send";

/** Sends the contact form through the EmailJS REST API. https://www.emailjs.com/docs/rest-api/send/ */
export async function sendWithEmailJS(payload) {
  const { serviceId, templateId, publicKey } = ENV.emailjs;
  if (!serviceId || !templateId || !publicKey) {
    throw new Error("EmailJS is not configured. Check .env.development / .env.production.");
  }
  const response = await APIRequest.request(
    "POST",
    EMAILJS_URL,
    JSON.stringify({
      service_id: serviceId,
      template_id: templateId,
      user_id: publicKey,
      // Keys below are the {{variables}} in your EmailJS template.
      template_params: {
        from_name: payload.name,
        from_email: payload.email,
        company: payload.company || "-",
        phone: payload.phone || "-",
        message: payload.message,
        page: payload.page,
      },
    }),
  );
  if (response.status !== 200) throw new Error("EmailJS request failed");
}
