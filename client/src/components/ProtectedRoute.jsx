import { useEffect, useState } from "react";
import { useApolloClient } from "@apollo/client/react";
import { Navigate, useLocation } from "react-router-dom";

import Auth from "../utils/auth.js";

// Redirects users when their authentication token is missing or expired.
function ProtectedRoute({ children }) {
  const client = useApolloClient();
  const { pathname } = useLocation();

  const [loggedIn, setLoggedIn] = useState(() => Auth.loggedIn());

  useEffect(() => {
    let expirationTimer;
    const initialToken = Auth.getToken();

    const checkSession = () => {
      window.clearTimeout(expirationTimer);

      if (!Auth.loggedIn()) {
        Auth.logout();
        setLoggedIn(false);
        void client.clearStore().catch(console.error);
        return;
      }

      // Reloads if another tab changes accounts, clearing cached account data.
      if (Auth.getToken() !== initialToken) {
        window.location.reload();
        return;
      }

      // Checks the session again when the token expires.
      const expiresAt = Auth.getTokenPayload().exp * 1000;

      expirationTimer = window.setTimeout(
        checkSession,
        Math.min(Math.max(expiresAt - Date.now(), 0), 2147483647)
      );
    };

    checkSession();

    window.addEventListener("storage", checkSession);
    window.addEventListener("focus", checkSession);
    document.addEventListener("visibilitychange", checkSession);

    return () => {
      window.clearTimeout(expirationTimer);
      window.removeEventListener("storage", checkSession);
      window.removeEventListener("focus", checkSession);
      document.removeEventListener("visibilitychange", checkSession);
    };
  }, [client, pathname]);

  if (!loggedIn || !Auth.loggedIn()) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;