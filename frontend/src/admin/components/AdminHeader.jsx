import React from 'react';
import styles from './AdminHeader.module.css';

const AdminHeader = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>Admin Panel</div>
      <nav className={styles.nav}>
        <a href="/admin/dashboard" className={styles.navLink}>Dashboard</a>
        <a href="/admin/buildings" className={styles.navLink}>Buildings</a>
        <a href="/admin/rooms" className={styles.navLink}>Rooms</a>
      </nav>
    </header>
  );
};

export default AdminHeader;