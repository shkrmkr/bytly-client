import type { AxiosError } from 'axios';
import React, { useEffect } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { Route, Switch, useLocation } from 'react-router-dom';
import { refreshToken } from './api';
import { Footer } from './components/Footer';
import { Navbar } from './components/Navbar';
import { PageSpinner } from './components/PageSpinner';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Toast } from './components/Toast';
import { Dashboard } from './pages/Dashboard';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { NotFound } from './pages/NotFound';
import { Register } from './pages/Register';

export const Routes: React.FC = () => {
  const location = useLocation();
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation<void, AxiosError, void>(
    refreshToken,
    {
      onSuccess: () => {
        queryClient.setQueryData('isLoggedIn', true);
      },
    },
  );

  useEffect(() => {
    mutate();
  }, [mutate]);

  return (
    <>
      <Toast interval={5000} />
      {location.pathname !== '/login' && location.pathname !== '/register' && (
        <Navbar />
      )}
      {isLoading ? (
        <PageSpinner />
      ) : (
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <ProtectedRoute path="/dashboard" component={Dashboard} />
          <Route component={NotFound} />
        </Switch>
      )}
      {location.pathname !== '/login' && location.pathname !== '/register' && (
        <Footer />
      )}
    </>
  );
};
