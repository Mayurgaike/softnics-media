import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { fetchMe, logoutApi } from "../api/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [admin, setAdmin] = useState(() => {
    try {
      const saved = localStorage.getItem("admin");
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const login = (newToken, adminData) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);
    if (adminData) {
      localStorage.setItem("admin", JSON.stringify(adminData));
      setAdmin(adminData);
    }
  };

  const logout = useCallback(() => {
    logoutApi(); // non-blocking server notification
    localStorage.removeItem("token");
    localStorage.removeItem("admin");
    setToken(null);
    setAdmin(null);
  }, []);

  // Listen for 401 logout events from authFetch
  useEffect(() => {
    const handleAuthLogout = () => {
      logout();
    };
    window.addEventListener("auth:logout", handleAuthLogout);
    return () => window.removeEventListener("auth:logout", handleAuthLogout);
  }, [logout]);

  // Fetch admin profile if we have a token but no admin info cached
  useEffect(() => {
    if (token && !admin) {
      fetchMe()
        .then((res) => {
          if (res?.admin) {
            setAdmin(res.admin);
            localStorage.setItem("admin", JSON.stringify(res.admin));
          }
        })
        .catch(() => {
          // fetchMe error handled by authFetch if 401
        });
    }
  }, [token, admin]);

  return (
    <AuthContext.Provider
      value={{
        token,
        admin,
        login,
        logout,
        isAuthenticated: !!token,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
