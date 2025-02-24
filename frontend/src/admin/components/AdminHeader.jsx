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
    <div>
      {/* Buttons for Start, Stop & Send */}
      <div className={styles.controls}>
        <button onClick={startTracking} disabled={tracking} className={styles.startBtn}>Start</button>
        <button onClick={stopTracking} disabled={!tracking} className={styles.stopBtn}>Stop</button>
        <button onClick={sendData} disabled={!isStopped} className={styles.sendBtn}>Send</button>
      </div>

      <MapContainer 
        center={userLocation || [defaultLatitude, defaultLongitude]}
        zoom={15}
        style={{ height: "100vh", width: "100%" }}
      >
        <TileLayer url="" />

        {/* Move map to user location smoothly */}
        {userLocation && <MoveToUserLocation userLocation={userLocation} />}

        {/* Show Buildings */}
        {mapData?.buildings.map((building) => (
          <Marker key={building.name} position={[building.lat, building.lng]}>
            <Popup>{building.name}</Popup>
          </Marker>
        ))}

        {/* Show User Location */}
        {userLocation && (
          <Marker position={userLocation} icon={userIcon}>
            <Popup>You are here</Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
};

export default AdminHeader;
