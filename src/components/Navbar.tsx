import type { AxiosError } from 'axios';
import React, { useCallback } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { Link, NavLink, useHistory } from 'react-router-dom';
import { logout } from '../api';
import styles from './Navbar.module.scss';

export const Navbar: React.FC = () => {
  const history = useHistory();
  const queryClient = useQueryClient();
  const isLoggedIn = queryClient.getQueryData('isLoggedIn');

  const { mutate } = useMutation<void, AxiosError, void>(logout, {
    onSuccess: () => {
      history.push('/');
      queryClient.setQueryData('isLoggedIn', false);
    },
  });

  const handleLogout = useCallback(() => mutate(), []);

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
