import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { Navbar } from './components/Navbar'
import { Home } from './pages/Home'
import { Login } from './pages/Login'
import { Register } from './pages/Register'

interface IRoute {
  exact?: boolean
  path: string
  component: React.ComponentClass | React.FC
  name: string
}

const routes: IRoute[] = [
  {
    exact: true,
    path: '/',
    component: Home,
    name: 'Home',
  },
  {
    path: '/login',
    component: Login,
    name: 'Login',
  },
  {
    path: '/register',
    component: Register,
    name: 'Register',
  },
]

export const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <Navbar paths={routes.map(({ path, name }) => ({ path, name }))} />

      <Switch>
        {routes.map(({ exact, component, path }) => (
          <Route key={path} exact={exact} path={path} component={component} />
        ))}
        <Route exact path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
      </Switch>
    </BrowserRouter>
  )
}
