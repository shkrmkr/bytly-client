import React from 'react';
import { useQueryClient } from 'react-query';
import { Redirect, Route } from 'react-router';

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
  const isLoggedIn = useQueryClient().getQueryData('isLoggedIn');

  if (isLoggedIn) {
    return <Route exact={exact} path={path} component={component} />;
  }

  return <Redirect to="login" />;
};
