import React from 'react'
import { NavLink } from 'react-router-dom'
import styles from './Navbar.module.scss'

interface Props {
  paths: { path: string; name: string }[]
}

export const Navbar: React.FC<Props> = ({ paths }) => {
  return (
    <header className={styles.container}>
      <div>
        <h2>bytly</h2>

        <nav>
          {paths.map(({ path, name }) => (
            <NavLink key={path} to={path}>
              {name}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  )
}
