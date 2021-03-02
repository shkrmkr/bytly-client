import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import styles from './Navbar.module.scss';

interface Props {
  routes: { path: string; name: string }[];
}

export const Navbar: React.FC<Props> = ({ routes }) => {
  return (
    <header className={styles.container}>
      <div>
        <Link to="/" className={styles.brand}>
          <h2>bytly</h2>
        </Link>

        <nav>
          {routes.map(({ path, name }) => (
            <NavLink key={path} to={path} className={styles.navLink}>
              {name}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
};
