/* eslint-disable @typescript-eslint/no-empty-function */
import React, { createContext, useContext, useState } from 'react';
import { setAccessToken } from '../accessToken';
import api from '../api';
import type { ILoginFormData } from '../types';

interface AuthContextValue {
  isLoggedIn: boolean;
  isLoading: boolean;
  error: string | null;
  login: (data: ILoginFormData) => Promise<void>;
  logout: () => Promise<void>;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

const AuthContext = createContext<AuthContextValue>({
  isLoggedIn: false,
  isLoading: false,
  error: null,
  login: async () => {},
  logout: async () => {},
  setIsLoggedIn: () => {},
});

export const useAuthContext = () => useContext(AuthContext);

export const AuthProvider: React.FC = ({ children }) => {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = async ({ email, password }: ILoginFormData) => {
    setIsLoading(true);
    setError(null);
    try {
      const { accessToken } = await api.login({ email, password });
      setAccessToken(accessToken);
      setIsLoggedIn(true);
    } catch (error) {
      setError(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    await api.logout();
    setAccessToken('');
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, login, logout, isLoading, error, setIsLoggedIn }}
    >
      {children}
    </AuthContext.Provider>
  );
};
