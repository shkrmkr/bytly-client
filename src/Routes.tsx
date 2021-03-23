import React, { useEffect, useState } from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';
import { api } from './api';
import { Footer } from './components/Footer';
import { Navbar } from './components/Navbar';
import { PageSpinner } from './components/PageSpinner';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Toast } from './components/Toast';
import { useAuthContext } from './contexts/AuthContext';
import { Dashboard } from './pages/Dashboard';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { NotFound } from './pages/NotFound';
import { Register } from './pages/Register';

export const Routes: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const { setIsLoggedIn } = useAuthContext();
  const location = useLocation();

  useEffect(() => {
    (async () => {
      try {
        await api.refreshToken();
        setIsLoggedIn(true);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <>
      <Toast interval={3000} />
      {location.pathname !== '/login' && location.pathname !== '/register' && (
        <Navbar />
      )}
      {loading ? (
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
