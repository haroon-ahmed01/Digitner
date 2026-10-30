class ConfigAPIURL {
  // Base URL for your own backend (leave empty if you only use EmailJS)
  static baseUrl =
    (import.meta.env.VITE_API_BASE_URL || "").trim() || window.location.origin;

  // Public (website) APIs
    static contactSubmit = this.baseUrl + "/user/contact/website"; // POST
      static waitlistSubmit = this.baseUrl + "/user/waitlist/website"; // POST
}

export default ConfigAPIURL;
