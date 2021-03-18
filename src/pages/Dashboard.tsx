import React from 'react';
import { useQuery } from 'react-query';
import api from '../api';

export const Dashboard: React.FC = () => {
  const { data } = useQuery('check', () => api.check());

  return <div>{data}</div>;
};
