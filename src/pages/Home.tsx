import type { AxiosError } from 'axios';
import React, { useState } from 'react';
import { IoRocketOutline } from 'react-icons/io5';
import Loader from 'react-loader-spinner';
import { useMutation } from 'react-query';
import api from '../api';
import heroImage from '../assets/hero-image.svg';
import { UrlList } from '../components/UrlList';
import type { Url } from '../types';
import styles from './Home.module.scss';

export const Home: React.FC = () => {
  const [originalUrl, setOriginalUrl] = useState('');

  const [shortUrls, setShortUrls] = useState<Url[]>(() => {
    const local = localStorage.getItem('shortUrls');
    return local ? JSON.parse(local) : [];
  });

  // const { data, isLoading, isError } = useQuery<Url[], ApiError>(
  //   ['local_urls', { shortUrlIds }],
  //   () => api.getDataForLocalStorage(shortUrlIds),
  //   {
  //     enabled: shortUrlIds.length > 0,
  //   },
  // );

  const { mutate, isLoading: isMutating } = useMutation(api.makeUrl, {
    onSuccess: (data) => {
      if (shortUrls.some((url) => url.id === data.id)) {
        return;
      }

      setShortUrls((prev) => {
        const newList = [data, ...prev];
        localStorage.setItem('shortUrls', JSON.stringify(newList));
        return newList;
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
    setOriginalUrl('');
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
            <Loader type="ThreeDots" height="100%" color="#fff" />
          ) : (
            <>
              <span>let&apos;s gooo</span>
              <IoRocketOutline size={18} />
            </>
          )}
        </button>
      </form>

      <div>
        <UrlList urls={shortUrls} />
      </div>
    </main>
  );
};
