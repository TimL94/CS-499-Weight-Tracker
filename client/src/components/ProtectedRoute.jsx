import { Navigate } from "react-router-dom";

import Auth from "../utils/auth.js";

// Prevents unauthenticated users from opening protected pages.
function ProtectedRoute({ children }) {
  if (!Auth.loggedIn()) {
    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }

  return children;
}

export default ProtectedRoute;