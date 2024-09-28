import { useState, useEffect, useContext, createContext } from "react";
import AuthService from '../services/auth.service';import { usePersonnelContext } from "../context/PersonnelContext";
import Swal from "sweetalert2";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(getUser);
 

  const login = (user) => {
    setUser(user);
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Login successfully!",
      showConfirmButton: false,
      timer: 1500,
    });
  };

  const logout = () => {
    AuthService.logout();
    setUser(null);
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Logout successfully!",
      showConfirmButton: false,
      timer: 1500,
    });
  };

  function getUser() {
    const temp = localStorage.getItem("user");
    const savedUser = JSON.parse(temp);
    return savedUser || null;
  }

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
