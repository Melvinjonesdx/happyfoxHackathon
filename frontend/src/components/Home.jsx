import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Home.module.css';

const Home = () => {
  return (
    <div className={styles.container}>
      {/* Hero Section */}
      <div className={styles.heroSection}>
        <h1 className={styles.heroTitle}>Welcome to the College Management System</h1>
        <p className={styles.heroDescription}>
          Your one-stop solution for managing and navigating through college resources.
        </p>
        <Link to="/availability" className={styles.ctaButton}>Get Started</Link>
      </div>

      {/* Features Section */}
      <div className={styles.featuresContainer}>
        <h2 className={styles.featuresTitle}>Features</h2>
        <div className={styles.featuresGrid}>
          <div className={styles.featureBox}>
            <div className={styles.iconContainer}>
              <img src="https://cdn-icons-png.flaticon.com/512/2991/2991231.png" alt="Room Availability" className={styles.icon} />
            </div>
            <h3>Room Availability</h3>
            <p>Check the availability of rooms in real-time.</p>
          </div>
          <div className={styles.featureBox}>
            <div className={styles.iconContainer}>
              <img src="https://cdn-icons-png.flaticon.com/512/854/854878.png" alt="Campus Map" className={styles.icon} />
            </div>
            <h3>Campus Map</h3>
            <p>Navigate through the campus with ease using our interactive map.</p>
          </div>
          <div className={styles.featureBox}>
            <div className={styles.iconContainer}>
              <img src="https://cdn-icons-png.flaticon.com/512/1055/1055644.png" alt="Event Management" className={styles.icon} />
            </div>
            <h3>Event Management</h3>
            <p>Stay updated with the latest events happening on campus.</p>
          </div>
        </div>
      </div>

      {/* Testimonial Section */}
      <div className={styles.testimonialContainer}>
        <h2 className={styles.testimonialTitle}>What Our Users Say</h2>
        <div className={styles.testimonialCard}>
          <blockquote className={styles.testimonial}>
            "This system has made managing my college life so much easier! Highly recommend!"
          </blockquote>
          <footer className={styles.testimonialAuthor}>— Student Name</footer>
        </div>
      </div>
    </div>
  );
};

export default Home;