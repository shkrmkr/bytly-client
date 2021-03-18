import React from 'react';
import { Redirect, Route } from 'react-router';
import { useAuthContext } from '../contexts/AuthContext';

interface Props {
  component: React.ComponentClass | React.FC;
  path: string;
  exact?: boolean;
}

export const ProtectedRoute: React.FC<Props> = ({
  component,
  exact = false,
  path,
}) => {
  const { isLoggedIn } = useAuthContext();

  if (isLoggedIn) {
    return <Route exact={exact} path={path} component={component} />;
  }

  return <Redirect to="login" />;
};
