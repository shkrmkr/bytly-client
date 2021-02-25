import React from 'react'
import { IoRocketOutline } from 'react-icons/io5'
import heroImage from '../assets/hero-image.svg'
import styles from './Home.module.scss'

export const Home: React.FC = () => {
  return (
    <main className={styles.container}>
      <div className={styles.hero}>
        <div className={styles.left}>
          <h1>긴 url을 짧게 줄여보세요.</h1>
        </div>
        <div className={styles.right}>
          <img src={heroImage} alt="computer and man" />
        </div>
      </div>

      <form className={styles.form}>
        <input type="text" placeholder="url을 입력해주세요" />
        <button type="submit">
          <span>let&apos;s gooo</span>
          <IoRocketOutline size={18} />
        </button>
      </form>
    </main>
  )
}
