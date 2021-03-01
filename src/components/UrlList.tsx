import React from 'react';
import type { Url } from '../types';
import styles from './UrlList.module.scss';
import { UrlListItem } from './UrlListItem';

interface Props {
  urls: Url[] | undefined;
}

export const UrlList: React.FC<Props> = ({ urls = [] }) => {
  return (
    <div className={styles.container}>
      {urls.map((url) => (
        <UrlListItem key={url.id} url={url} />
      ))}
    </div>
  );
};
