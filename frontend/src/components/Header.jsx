import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.css';

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.brand}>Campus Navigation</div>
      <nav className={styles.nav}>
        <Link to="/" className={styles.link}>Home</Link>
        <Link to="/map" className={styles.link}>Current Map</Link>
        <Link to="/availability" className={styles.link}>Availability Rooms</Link>
      </nav>
    </header>
  );
};

export default Header;