import React from 'react';
import { AuthForm } from '../components/AuthForm';
import styles from './AuthPage.module.scss';

export const Login: React.FC = () => {
  return (
    <main className={styles.container}>
      <AuthForm isLogin />
    </main>
  );
};
