import React from 'react';
import { Link, NavLink, useHistory } from 'react-router-dom';
import { useAuthContext } from '../contexts/AuthContext';
import styles from './Navbar.module.scss';

export const Navbar: React.FC = () => {
  const { isLoggedIn, logout } = useAuthContext();
  const history = useHistory();

  const handleLogout = () => {
    logout();
    history.push('/');
  };

  return (
    <header className={styles.container}>
      <div>
        <Link to={isLoggedIn ? '/dashboard' : '/'} className={styles.brand}>
          <h2>bytly</h2>
        </Link>

        <nav>
          {isLoggedIn ? (
            <>
              <button onClick={handleLogout} className={styles.navItem}>
                로그아웃
              </button>
              <NavLink to="/dashboard" className={styles.navItem}>
                dashboard
              </NavLink>
            </>
          ) : (
            <>
              <NavLink to="/login" className={styles.navItem}>
                로그인
              </NavLink>
              <NavLink to="/register" className={styles.navItem}>
                회원가입
              </NavLink>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};
