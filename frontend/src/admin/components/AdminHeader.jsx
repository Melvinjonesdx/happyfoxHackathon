import React from 'react';
import { Link } from 'react-router-dom';
import styles from './AdminHeader.module.css';

const AdminHeader = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>Admin Panel</div>
      <nav className={styles.nav}>
        <Link to="/admin/dashboard" className={styles.navLink}>Dashboard</Link>
        <Link to="/admin/buildings" className={styles.navLink}>Buildings</Link>
        <Link to="/admin/rooms" className={styles.navLink}>Rooms</Link>
      </nav>
    </header>
  );
};

export default AdminHeader;