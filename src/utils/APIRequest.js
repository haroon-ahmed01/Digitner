/**
 * Thin fetch wrapper used by services/api.js.
 *   const res = await APIRequest.request("POST", url, JSON.stringify(body));
 *   res.status  -> HTTP status
 *   res.data    -> parsed JSON ({} if the body is empty)
 * Network errors / timeouts throw. Non-2xx responses do NOT throw: check res.status.
 */
class APIRequest {
  static async request(method = "GET", url, body = "", headers = {}, timeout = 15000) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeout);
    try {
      const hasBody = body && method !== "GET";
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json", ...headers },
        body: hasBody ? body : undefined,
        signal: controller.signal,
      });
      let data = {};
      try {
        data = await response.json();
      } catch {
        /* empty or non-JSON body */
      }
      return { status: response.status, data };
    } finally {
      clearTimeout(timer);
    }
  }
}

export default APIRequest;
