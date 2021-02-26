import React from 'react';
import type { Url } from '../types';

interface Props {
  urls: Url[] | undefined;
}

export const Urls: React.FC<Props> = ({ urls = [] }) => {
  return (
    <div>
      {urls.map((url) => (
        <div key={url.id}>{url.original_url}</div>
      ))}
    </div>
  );
};
