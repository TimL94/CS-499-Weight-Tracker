// Handles login, logout, and token management.
const Auth = {
  // Stores the authentication token and user ID.
  login(token, currentUserId) {
    localStorage.setItem("id_token", token);
    localStorage.setItem("currentUserId", currentUserId);
    localStorage.removeItem("loggedIn");
  },

  // Removes authentication information.
  logout() {
    localStorage.removeItem("id_token");
    localStorage.removeItem("currentUserId");
    localStorage.removeItem("loggedIn");
  },

  // Retrieves the authentication token.
  getToken() {
    return localStorage.getItem("id_token");
  },

  // Retrieves the current user's ID.
  getCurrentUserId() {
    return localStorage.getItem("currentUserId");
  },

  // Decodes token claims for UI checks.
  // The server remains responsible for verifying the signature.
  getTokenPayload(token = this.getToken()) {
    try {
      const parts = token.split(".");

      if (
        parts.length !== 3 ||
        parts.some((part) => !/^[A-Za-z0-9_-]+$/.test(part))
      ) {
        return null;
      }

      const payload = parts[1]
        .replace(/-/g, "+")
        .replace(/_/g, "/");

      return JSON.parse(atob(payload));
    } catch {
      return null;
    }
  },

  // Treats missing, malformed, and expired tokens as signed out.
  isTokenExpired(token) {
    const payload = this.getTokenPayload(token);

    return (
      !Number.isFinite(payload?.exp) ||
      payload.exp <= Date.now() / 1000
    );
  },

  // Checks token expiration before displaying authenticated pages.
  loggedIn() {
    const token = this.getToken();

    return Boolean(token) && !this.isTokenExpired(token);
  },
};

export default Auth;