import React from 'react';
import { useHistory } from 'react-router-dom';
import styles from './NotFound.module.scss';

export const NotFound: React.FC = () => {
  const history = useHistory();

  return (
    <main className={styles.container}>
      <p>Page not found :(</p>
      <button onClick={() => history.goBack()}>Go Back</button>
    </main>
  );
};
