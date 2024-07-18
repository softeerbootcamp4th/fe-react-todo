export const BASE_URL = "http://localhost:5173";

export const http = {
  get: async function <T>(url: string) {
    const response = await fetch(`${BASE_URL}${url}`, { method: "GET" });

    if (!response.ok) {
      throw new Error("request failed.");
    }

    try {
      const data = await response.json();

      return data as T;
    } catch (error) {
      console.error("json parse error.");

      return null;
    }
  },

  post: async function (url: string, body?: BodyInit) {
    const response = await fetch(`${BASE_URL}${url}`, { method: "POST", body });

    if (!response.ok) {
      throw new Error("request failed.");
    }

    return null;
  },

  patch: async function (url: string, body?: BodyInit) {
    const response = await fetch(`${BASE_URL}${url}`, { method: "PATCH", body });

    if (!response.ok) {
      throw new Error("request failed.");
    }

    return null;
  },

  delete: async function (url: string) {
    const response = await fetch(`${BASE_URL}${url}`, { method: "DELETE" });

    if (!response.ok) {
      throw new Error("request failed.");
    }

    return null;
  },
};
