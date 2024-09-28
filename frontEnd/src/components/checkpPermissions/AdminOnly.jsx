import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
function AdminOnly({ children }) {
  const { user } = useAuthContext();
  if (!user) {
    return <Navigate to="/" />;
  }
  if (
    user.roles.includes("ROLE_ADMIN") 
  ) { return children  }
  return <Navigate to="/notAllow"/>;
}

export default AdminOnly;