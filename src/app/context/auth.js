import { createContext } from "react";
import { useNavigate } from "react-router-dom";
import store from "../store";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const navigate = useNavigate();

  const login = (token) => {
    const currentUser = store.getState().currentUser;
    localStorage.setItem("access_token", token);
    navigate(`/${currentUser.role.code}/dashboard`);
  };

  const logout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("user");
    navigate("/");
  };

  const verify = (withLogin = false) => {
    const token = localStorage.getItem("access_token");
    if (token) {
      const payload = JSON.parse(atob(token.split(".")[1]));
      const now = new Date();
      const exp = new Date(payload.eat * 1000);
      if (exp.getTime() < now.getTime()) {
        logout();
      } else if (withLogin) {
        login(token);
      }
    } else {
      logout();
    }
  };

  return (
    <AuthContext.Provider value={{ login, logout, verify }}>
      {children}
    </AuthContext.Provider>
  );
}
