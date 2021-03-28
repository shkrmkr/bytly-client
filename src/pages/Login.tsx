import hookFormResolver from '@hookform/resolvers/yup';
import type { AxiosError } from 'axios';
import React from 'react';
import { useForm } from 'react-hook-form';
import Loader from 'react-loader-spinner';
import { useMutation, useQueryClient } from 'react-query';
import { Redirect } from 'react-router';
import * as yup from 'yup';
import { login } from '../api';
import type { IAuthFormData } from '../types';
import styles from './AuthPage.module.scss';

const loginSchema: yup.SchemaOf<IAuthFormData> = yup.object().shape({
  email: yup
    .string()
    .email('올바른 이메일 주소를 입력해주세요')
    .required('이메일 주소를 입력해주세요'),
  password: yup.string().required('비밀번호를 입력해주세요'),
});

export const Login: React.FC = () => {
  const { register, handleSubmit, errors } = useForm<IAuthFormData>({
    resolver: hookFormResolver.yupResolver(loginSchema),
  });
  const queryClient = useQueryClient();
  // const { isLoading, error, login, isLoggedIn } = useAuthContext();

  const { mutate, error, isLoading } = useMutation<
    void,
    AxiosError,
    IAuthFormData
  >(login, {
    onSuccess: () => {
      queryClient.setQueryData('isLoggedIn', true);
    },
  });

  const onSubmit = handleSubmit((data) => mutate(data));

  if (queryClient.getQueryData('isLoggedIn')) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <main className={styles.container}>
      <div className={styles.formWrapper}>
        <h2>LOGIN</h2>
        <form className={styles.form} onSubmit={onSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="email">이메일</label>
            <input
              id="email"
              type="text"
              name="email"
              placeholder="이메일"
              ref={register}
              className={errors.email ? styles.error : ''}
            />
            <span>{errors.email?.message}</span>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="password">비밀번호</label>
            <input
              id="password"
              type="password"
              name="password"
              placeholder="비밀번호"
              ref={register}
              className={errors.password ? styles.error : ''}
            />
            <span>{errors.password?.message}</span>
          </div>

          <button className={styles.formButton} disabled={isLoading}>
            {isLoading ? (
              <Loader type="ThreeDots" height="100%" color="#fff" />
            ) : (
              '로그인'
            )}
          </button>
          <span className={error ? styles.error : ''}>
            {error?.response?.data.message}
          </span>
        </form>
      </div>
    </main>
  );
};
