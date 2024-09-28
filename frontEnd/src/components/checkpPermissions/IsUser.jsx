import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
function IsUser({ children }) {
  const { user } = useAuthContext();
  if (!user) {
    return <Navigate to="/" />;
  }
  if (
    user.roles.includes("ROLE_ADMIN") ||
    user.roles.includes("ROLE_TEACHER") ||
    user.roles.includes("ROLE_STUDENT")
  ) { return children  }
  return <Navigate to="/notAllow"/>;
}

export default IsUser;