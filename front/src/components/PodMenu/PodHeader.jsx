import React from 'react';
import styles from './PodHeader.module.scss'

const PodHeader = () => {
  return (
    <div className={styles.podHeader}>
      <div className={styles.podHeader__menu}>
        <a href="">Instagram</a>
        <a href="">You Tube</a>
        <a href="">Facebook</a>
      </div>
      <div className={styles.podHeader__menu}>
        <a href="">Privace Politics</a>
        <a href="">Help</a>
        <a href="">Follow Us</a>
      </div>
    </div>
  )
}

export default PodHeader