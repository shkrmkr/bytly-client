import React from 'react';
import { AiFillGithub } from 'react-icons/ai';
import styles from './Footer.module.scss';

export const Footer: React.FC = () => {
  return (
    <footer className={styles.container}>
      <p className={styles.title}>bytly</p>
      <p>2021 Sanghyun Park</p>
      <a href="https://github.com/shkrmkr">
        <AiFillGithub color="#42b883" size={30} />
      </a>
    </footer>
  );
};
