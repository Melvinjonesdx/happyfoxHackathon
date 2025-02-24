import React from 'react';
import styles from './AdminHeader.module.css';
import React, { useEffect, useState, useRef } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const userIcon = L.icon({
  iconUrl: "https://upload.wikimedia.org/wikipedia/commons/e/ec/RedDot.svg",
  iconSize: [20, 20],
});

// Component to move the map to the user's location smoothly
const MoveToUserLocation = ({ userLocation }) => {
  const map = useMap();
  useEffect(() => {
    if (userLocation) {
      map.flyTo(userLocation, 18, { animate: true, duration: 1.5 }); // Smooth movement
    }
  }, [userLocation, map]);
  return null;
};

const AdminHeader = () => {
  const [mapData, setMapData] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [tracking, setTracking] = useState(false);
  const [locationHistory, setLocationHistory] = useState([]); // Stores recorded locations
  const trackingInterval = useRef(null); // Reference for tracking interval
  const [isStopped, setIsStopped] = useState(false); // Track if tracking has been stopped

  const defaultLatitude = 0;
  const defaultLongitude = 0;

  useEffect(() => {
    // Fetch buildings & roads data
    fetch("http://localhost:5000/api/college-map") // Replace localhost with your laptop IP
      .then((res) => res.json())
      .then((data) => setMapData(data));

    // Watch User's Current Location
    if (navigator.geolocation) {
      const watchId = navigator.geolocation.watchPosition(
        (position) => {
          const newLocation = [position.coords.latitude, position.coords.longitude];
          setUserLocation(newLocation);
        },
        (error) => console.error("Error getting location:", error.message),
        { enableHighAccuracy: true, timeout: 20000, maximumAge: 0 }
      );

      // Cleanup function
      return () => navigator.geolocation.clearWatch(watchId);
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

  // Start tracking user location every 3 seconds
  const startTracking = () => {
    setTracking(true);
    trackingInterval.current = setInterval(() => {
      if (userLocation) {
        setLocationHistory((prev) => [...prev, userLocation]);
        console.log("Tracking:", userLocation);
      }
    }, 2000);
  };

  // Stop tracking user location
  const stopTracking = () => {
    setTracking(false);
    setIsStopped(true); // Set isStopped to true when tracking is stopped
    clearInterval(trackingInterval.current);
  };

  // Send location history to backend
  const sendData = () => {
    if (locationHistory.length === 0) {
      alert("No location data to send.");
      return;
    }

    fetch("http://localhost:5000/api/send-location", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ locations: locationHistory }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Response:", data);
        alert("Location data sent successfully!");
        setLocationHistory([]); // Clear history after sending
      })
      .catch((error) => console.error("Error sending data:", error));
  };

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
