import { createContext, useContext, useMemo, useState } from "react";
import { loginApi, signupApi } from "../api/auth.api";
import { getToken, setToken, removeToken } from "../utils/token";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [tokenState, setTokenState] = useState(() => getToken());
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState(null);

  const isAuthenticated = Boolean(tokenState);

  const login = async (email, password) => {
    setAuthLoading(true);
    setAuthError(null);
    try {
      const data = await loginApi(email, password);
      if (data?.token) {
        setToken(data.token);
        setTokenState(data.token);
      }
      return data;
    } catch (err) {
      setAuthError(err.message || "Login failed");
      throw err;
    } finally {
      setAuthLoading(false);
    }
  };

  const signup = async (name, email, password) => {
    setAuthLoading(true);
    setAuthError(null);
    try {
      const data = await signupApi(name, email, password);
      return data;
    } catch (err) {
      setAuthError(err.message || "Signup failed");
      throw err;
    } finally {
      setAuthLoading(false);
    }
  };

  const logout = () => {
    removeToken();
    setTokenState(null);
  };

  const value = useMemo(
    () => ({
      token: tokenState,
      isAuthenticated,
      authLoading,
      authError,
      login,
      signup,
      logout,
    }),
    [tokenState, isAuthenticated, authLoading, authError]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuthContext() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuthContext must be used within AuthProvider");
  }
  return ctx;
}
