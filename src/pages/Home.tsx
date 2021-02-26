import type { AxiosError } from 'axios';
import React, { useState } from 'react';
import { IoRocketOutline } from 'react-icons/io5';
import Loader from 'react-loader-spinner';
import { useMutation, useQuery } from 'react-query';
import api from '../api';
import heroImage from '../assets/hero-image.svg';
import { Urls } from '../components/Urls';
import type { ApiError, Url } from '../types';
import styles from './Home.module.scss';

export const Home: React.FC = () => {
  const [originalUrl, setOriginalUrl] = useState('');

  const [shortUrlIds, setShortUrlIds] = useState<number[]>(() => {
    const local = localStorage.getItem('shortUrlIds');
    return local ? JSON.parse(local) : [];
  });

  const { data, isLoading, isError } = useQuery<Url[], ApiError>(
    ['local_urls', { shortUrlIds }],
    () => api.getDataForLocalStorage(shortUrlIds),
    {
      enabled: shortUrlIds.length > 0,
    },
  );

  const { mutate, isLoading: isMutating } = useMutation(api.makeUrl, {
    onSuccess: (data) => {
      setShortUrlIds((prev) => {
        const newIds = [data.id, ...prev];

        localStorage.setItem('shortUrlIds', JSON.stringify(newIds));
        return newIds;
      });
    },
    onError: (error: AxiosError) => {
      console.error(error.response?.data.message);
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (originalUrl.trim() === '') return;
    mutate(originalUrl);
  };

  return (
    <main className={styles.container}>
      <div className={styles.hero}>
        <div className={styles.left}>
          <h1>긴 url을 짧게 줄여보세요.</h1>
          <p>아래에 url을 입력하여 짧게 줄여보세요.</p>
          <p>
            로그인하면 url을 카테고리별로 관리하고 QR 코드를 생성할 수 있어요.
          </p>
        </div>
        <div className={styles.right}>
          <img src={heroImage} alt="computer and man" />
        </div>
      </div>

      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="url을 입력해주세요"
          value={originalUrl}
          name="originalUrl"
          onChange={(e) => setOriginalUrl(e.target.value)}
        />
        <button type="submit" disabled={isMutating}>
          {isMutating ? (
            <Loader type="ThreeDots" />
          ) : (
            <>
              <span>let&apos;s gooo</span>
              <IoRocketOutline size={18} />
            </>
          )}
        </button>
      </form>

      <div>
        {isLoading ? (
          <h2>loading...</h2>
        ) : isError ? (
          <h2>error</h2>
        ) : (
          <Urls urls={data} />
        )}
      </div>
    </main>
  );
};
