import React from 'react';
import styles from './Header.scss';
import FaSearch from 'react-icons/fa';

const Header = () => {
  return (
    <div className={styles.header}>
      <div className={styles.header__logo}>
        Com<span>Vel</span>
      </div>
      <div className={styles.header__menu}>
        <a href="/sign-in">Sign In</a>
        <a href="/sign-up">Sign Up</a>
        <a className=""><FaSearch/></a>
        <a ></a>
      </div>
    </div>
  )
}

export default Header