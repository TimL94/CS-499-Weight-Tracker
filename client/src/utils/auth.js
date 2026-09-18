const Auth = {
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

  getToken() {
    return localStorage.getItem(
      "id_token"
    );
  },

  getCurrentUserId() {
    return localStorage.getItem(
      "currentUserId"
    );
  },

  loggedIn() {
    return Boolean(
      localStorage.getItem("id_token")
    );
  },
};

export default Auth;