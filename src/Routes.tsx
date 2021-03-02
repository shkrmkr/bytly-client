import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Footer } from './components/Footer';
import { Navbar } from './components/Navbar';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { NotFound } from './pages/NotFound';
import { Register } from './pages/Register';
import type { TRoute } from './types';

const routes: TRoute[] = [
  {
    exact: true,
    path: '/',
    component: Home,
    name: 'Home',
  },
  {
    path: '/login',
    component: Login,
    name: '로그인',
  },
  {
    path: '/register',
    component: Register,
    name: '회원가입',
  },
];

export const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <Navbar routes={routes.map(({ path, name }) => ({ path, name }))} />

      <Switch>
        {routes.map(({ exact, component, path }) => (
          <Route key={path} exact={exact} path={path} component={component} />
        ))}
        <Route exact path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route component={NotFound} />
      </Switch>

      <Footer />
    </BrowserRouter>
  );
};
