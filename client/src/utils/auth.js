// Utility functions for handling authentication, including login, logout, and token management.
const Auth = {

  // Logs in the user by storing the authentication token and user ID in local storage.
  login(token, currentUserId) {
    localStorage.setItem("id_token", token);
    localStorage.setItem(
      "currentUserId",
      currentUserId
    );
    localStorage.setItem(
      "loggedIn",
      "true"
    );
  },

  // Logs out the user by removing the authentication token and user ID from local storage.
  logout() {
    localStorage.removeItem("id_token");
    localStorage.removeItem(
      "currentUserId"
    );
    localStorage.setItem(
      "loggedIn",
      "false"
    );
  },

  // Retrieves the authentication token from local storage.
  getToken() {
    return localStorage.getItem(
      "id_token"
    );
  },

  // Retrieves the current user's ID from local storage.
  getCurrentUserId() {
    return localStorage.getItem(
      "currentUserId"
    );
  },

  // Checks if the user is logged in by verifying the presence of an authentication token in local storage.
  loggedIn() {
    return Boolean(
      localStorage.getItem("id_token")
    );
  },
};

export default Auth;