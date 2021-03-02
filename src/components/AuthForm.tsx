import React from 'react';
import styles from './AuthForm.module.scss';

interface Props {
  isLogin?: boolean;
}

export const AuthForm: React.FC<Props> = ({ isLogin = false }) => {
  return (
    <div className={styles.formWrapper}>
      <h2>bytly</h2>
      <form className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="email">이메일</label>
          <input id="email" type="text" name="email" placeholder="이메일" />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="password">비밀번호</label>
          <input
            id="password"
            type="password"
            name="password"
            placeholder={isLogin ? '비밀번호' : '비밀번호(6자 이상)'}
          />
        </div>

        {!isLogin && (
          <div className={styles.formGroup}>
            <label htmlFor="confirmPassword">비밀번호 확인</label>
            <input
              id="confirmPassword"
              type="password"
              name="confirmPassword"
              placeholder="비밀번호 확인"
            />
          </div>
        )}

        <button className={styles.formButton}>
          {isLogin ? '로그인' : '회원가입'}
        </button>
      </form>
    </div>
  );
};
