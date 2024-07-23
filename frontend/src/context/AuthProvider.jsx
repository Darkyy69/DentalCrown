import { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { ACCESS_TOKEN } from "/src/constants";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  useEffect(() => {
    const accessToken = localStorage.getItem(ACCESS_TOKEN);

    if (accessToken) {
      const user = jwtDecode(accessToken);
      setAuth({ user });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
