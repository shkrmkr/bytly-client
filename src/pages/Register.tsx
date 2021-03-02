import React from 'react';
import { AuthForm } from '../components/AuthForm';
import styles from './AuthPage.module.scss';

export const Register: React.FC = () => {
  return (
    <main className={styles.container}>
      <AuthForm />
    </main>
  );
};
