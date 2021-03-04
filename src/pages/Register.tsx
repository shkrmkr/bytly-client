import hookFormResolver from '@hookform/resolvers/yup';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import styles from './AuthPage.module.scss';

interface RegisterFormData {
  email: string;
  password: string;
  confirmPassword: string;
}

const registerSchema: yup.SchemaOf<RegisterFormData> = yup.object().shape({
  email: yup
    .string()
    .email('올바른 이메일 주소를 입력해주세요')
    .required('이메일 주소를 입력해주세요'),
  password: yup
    .string()
    .min(6, '6자 이상의 비밀번호를 입력해주세요')
    .required('비밀번호를 입력해주세요'),
  confirmPassword: yup
    .string()
    .test({
      name: 'confirmPassword',
      message: '비밀번호가 일치하지 않습니다',
      test(value) {
        return this.parent.password === value;
      },
    })
    .required('비밀번호를 다시 한 번 입력해주세요'),
});

export const Register: React.FC = () => {
  const { register, handleSubmit, errors } = useForm<RegisterFormData>({
    resolver: hookFormResolver.yupResolver(registerSchema),
    mode: 'onBlur',
  });

  const onSubmit = handleSubmit(({ email, password, confirmPassword }) => {
    console.log(email, password, confirmPassword);
  });

  return (
    <main className={styles.container}>
      <div className={styles.formWrapper}>
        <h2>REGISTER</h2>
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
              placeholder="비밀번호(6자 이상)"
              ref={register}
              className={errors.password ? styles.error : ''}
            />
            <span>{errors.password?.message}</span>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="confirmPassword">비밀번호 확인</label>
            <input
              id="confirmPassword"
              type="password"
              name="confirmPassword"
              placeholder="비밀번호 확인"
              ref={register}
              className={errors.confirmPassword ? styles.error : ''}
            />
            <span>{errors.confirmPassword?.message}</span>
          </div>

          <button className={styles.formButton}>회원가입</button>
        </form>
      </div>
    </main>
  );
};
