import React, { createContext, useContext, useState } from 'react';
import api from '../api';

interface AuthContextValue {
  isLoggedIn: boolean;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextValue>({
  isLoggedIn: false,
  isLoading: false,
  error: null,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  login: async (email, password) => {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
  },
});

export const useAuthContext = () => useContext(AuthContext);

export const AuthProvider: React.FC = ({ children }) => {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    try {
      await api.login(email, password);
      setIsLoggedIn(true);
    } catch (error) {
      setError(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, isLoading, error }}>
      {children}
    </AuthContext.Provider>
  );
};
