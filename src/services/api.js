// API layer for the public website. One exported object per feature.
// Pages and hooks call these functions; they never call fetch/APIRequest directly.

import APIRequest from "@/utils/APIRequest";
import ConfigAPIURL from "@/config/ConfigAPIURL";
import { ENV } from "@/config/ConfigEnv";
import { sendWithEmailJS } from "./emailService";

const isOk = (response) =>
  response?.status === 200 ||
  response?.data?.responseCode === 109 ||
  response?.data?.responseCode === 100;

// ─── Contact / demo requests ────────────────────────────────────────
export const contactAPI = {
  /**
   * Sends a contact request. Provider is chosen with VITE_CONTACT_PROVIDER:
   *   "emailjs" -> EmailJS (no backend needed)
   *   "api"     -> your own backend endpoint (ConfigAPIURL.contactSubmit)
   */
  submit: async (payload) => {
    if (ENV.contactProvider === "emailjs") {
      await sendWithEmailJS(payload);
      return { ok: true };
    }
    const response = await APIRequest.request(
      "POST",
      ConfigAPIURL.contactSubmit,
      JSON.stringify(payload),
    );
    if (!isOk(response)) {
      throw new Error(response?.data?.message || "Contact request failed");
    }
    return { ok: true };
  },
};


// ─── AI Marketplace waitlist ────────────────────────────────────────
export const waitlistAPI = {
  submit: async (payload) => {
    const response = await APIRequest.request(
      "POST",
      ConfigAPIURL.waitlistSubmit,
      JSON.stringify(payload),
    );
    if (!isOk(response)) {
      throw new Error(response?.data?.message || "Waitlist request failed");
    }
    return { ok: true };
  },
};