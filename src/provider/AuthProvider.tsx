import axios from "axios";
import React, {createContext, ReactNode, useContext, useEffect, useMemo, useState} from "react";

interface AuthContextProps {

  setToken: (newToken: string) => void;
}
const AuthContext = createContext<AuthContextProps|string |null>(null);
const AuthProvider: React.FC<{ children: ReactNode }> = ({children}) => {
    // State to hold the authentication token
    const [token, setToken_] = useState(localStorage.getItem("token"));

    // Function to set the authentication token
    const setToken = (newToken: string) => {
        setToken_(newToken);
    };

    useEffect(() => {
        if (token) {
            axios.defaults.headers.common["authorization"] = "Bearer " + token;
            localStorage.setItem('token', token);
        } else {
            delete axios.defaults.headers.common["authorization"];
            localStorage.removeItem('token')
        }
    }, [token]);

    // Memoized value of the authentication context
    const contextValue = useMemo(() => ({
        token, setToken,
    }), [token]);

    // Provide the authentication context to the children components
    return (<AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>);
};

export const useAuth = () => {
   const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};

export default AuthProvider;