import { useState, useEffect, useContext, createContext } from "react";
import axios from "axios";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    user: null,
    accessToken: "",
  });

  //default axios
  axios.defaults.headers.common["Authorization"] = auth?.accessToken;

  useEffect(() => {
    const data = localStorage.getItem("auth");
    if (data) {
      const parsedData = JSON.parse(data);
      setAuth({
        ...auth,
        user: parsedData.user,
        accessToken: parsedData.accessToken,
      });
    }
    // eslint disable-next-line
  }, []);
  return (
    <AuthContext.Provider value={[auth, setAuth]}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook useAuth
const useAuth = () => {
  return useContext(AuthContext);
};

export { useAuth, AuthProvider };
