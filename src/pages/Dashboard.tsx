import React, { useEffect } from 'react';
import { useQuery } from 'react-query';
import { api } from '../api';
import type { IUrl } from '../types';

export const Dashboard: React.FC = () => {
  const { data } = useQuery('check', () => api.check());

  useEffect(() => {
    const localUrlsStr = localStorage.getItem('shortUrls');
    let localUrls: IUrl[];
    if (localUrlsStr) {
      localUrls = JSON.parse(localUrlsStr);
    }
  }, []);

  return <div>{data}</div>;
};
