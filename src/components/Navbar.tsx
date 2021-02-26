import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Navbar.module.scss';

interface Props {
  routes: { path: string; name: string }[];
}

export const Navbar: React.FC<Props> = ({ routes }) => {
  return (
    <header className={styles.container}>
      <div>
        <h2>bytly</h2>

        <nav>
          {routes.map(({ path, name }) => (
            <NavLink key={path} to={path}>
              {name}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
};
