import Clipboard from 'clipboard';
import React, { useEffect, useMemo, useRef } from 'react';
import type { Url } from '../types';
import styles from './UrlListItem.module.scss';

interface Props {
  url: Url;
}

export const UrlListItem: React.FC<Props> = ({ url }) => {
  const btnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!btnRef.current) return;

    const clipboard = new Clipboard(btnRef.current);

    return () => clipboard.destroy();
  }, [btnRef]);

  const shortUrlWithoutProtocol = useMemo(
    () => `${import.meta.env.SNOWPACK_PUBLIC_API_URL_SHORT}/${url.hash}`,
    [url],
  );

  const shortUrl = useMemo(
    () => `${import.meta.env.SNOWPACK_PUBLIC_API_URL}/${url.hash}`,
    [url],
  );

  return (
    <div className={styles.container}>
      <h3>{url.original_url}</h3>
      <a href={shortUrl} target="_blank" rel="noreferrer">
        {shortUrlWithoutProtocol}
      </a>
      <div className={styles.control}>
        <button ref={btnRef} data-clipboard-text={shortUrlWithoutProtocol}>
          copy
        </button>
      </div>
    </div>
  );
};
