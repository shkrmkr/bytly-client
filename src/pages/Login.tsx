import hookFormResolver from '@hookform/resolvers/yup';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import styles from './AuthPage.module.scss';

interface LoginFormData {
  email: string;
  password: string;
}

const loginSchema: yup.SchemaOf<LoginFormData> = yup.object().shape({
  email: yup
    .string()
    .email('올바른 이메일 주소를 입력해주세요')
    .required('이메일 주소를 입력해주세요'),
  password: yup.string().required('비밀번호를 입력해주세요'),
});

export const Login: React.FC = () => {
  const { register, handleSubmit, errors } = useForm<LoginFormData>({
    resolver: hookFormResolver.yupResolver(loginSchema),
  });

  const onSubmit = handleSubmit(({ email, password }) => {
    console.log(email, password);
  });

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

          <button className={styles.formButton}>로그인 </button>
        </form>
      </div>
    </main>
  );
};
