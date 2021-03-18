import React from 'react';
import Loader from 'react-loader-spinner';
import styles from './PageSpinner.module.scss';

export const PageSpinner: React.FC = () => {
  return (
    <main className={styles.container}>
      <Loader type="ThreeDots" height="100%" color="#000" />
    </main>
  );
};
