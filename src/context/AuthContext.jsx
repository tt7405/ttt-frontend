import { createContext, useState, useContext } from 'react';

// Create a context to hold authentication info
const AuthContext = createContext();

// Provider component to wrap your app
export const AuthProvider = ({ children }) => {
  // Initialize token from localStorage if it exists
  const [token, setToken] = useState(localStorage.getItem('token'));

  // Log in the user by saving token
  const login = (newToken) => {
    localStorage.setItem('token', newToken);
    setToken(newToken);
  };

  // Log out the user by removing token
  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for consuming authentication context
export const useAuth = () => useContext(AuthContext);