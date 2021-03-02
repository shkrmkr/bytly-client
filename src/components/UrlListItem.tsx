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
    const timeouts: number[] = [];

    clipboard.on('success', () => {
      if (btnRef.current) {
        btnRef.current.textContent = 'copied!';
        btnRef.current.disabled = true;
        const timeout = window.setTimeout(() => {
          if (btnRef.current) {
            btnRef.current.textContent = 'copy';
            btnRef.current.disabled = false;
          }
        }, 2000);
        timeouts.push(timeout);
      }
    });

    return () => {
      clipboard.destroy();
      timeouts.forEach((timeout) => clearTimeout(timeout));
    };
  }, [btnRef]);

  const formattedUrls = useMemo(
    () => ({
      shortWithoutProtocol: `${import.meta.env.SNOWPACK_PUBLIC_API_URL_SHORT}/${
        url.hash
      }`,
      short: `${import.meta.env.SNOWPACK_PUBLIC_API_URL}/${url.hash}`,
      original: url.original_url.startsWith('http://')
        ? url.original_url.slice(7)
        : url.original_url.slice(8),
    }),
    [url],
  );

  return (
    <div className={styles.container}>
      <h3>{formattedUrls.original}</h3>

      <a href={formattedUrls.short} target="_blank" rel="noreferrer">
        {formattedUrls.shortWithoutProtocol}
      </a>

      <div className={styles.control}>
        <button
          ref={btnRef}
          data-clipboard-text={formattedUrls.shortWithoutProtocol}
        >
          copy
        </button>
      </div>
    </div>
  );
};
