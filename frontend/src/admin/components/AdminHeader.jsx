import styles from "./AdminHeader.module.css";
import React, { useEffect, useState, useRef } from "react";
import { MapContainer, Marker, Popup, TileLayer, Polyline, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const userIcon = L.icon({
  iconUrl: "https://upload.wikimedia.org/wikipedia/commons/e/ec/RedDot.svg",
  iconSize: [20, 20],
});

const MoveToUserLocation = ({ userLocation }) => {
  const map = useMap();
  useEffect(() => {
    if (userLocation) {
      map.flyTo(userLocation, 18, { animate: true, duration: 1.5 });
    }
  }, [userLocation, map]);
  return null;
};

const AdminHeader = () => {
  const [mapData, setMapData] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [tracking, setTracking] = useState(false);
  const [locationHistory, setLocationHistory] = useState([]); // Tracks locations
  const trackingInterval = useRef(null);
  const [isStopped, setIsStopped] = useState(false);
  const [centreName, setCentreName] = useState(""); // New state for centre name
  const [entranceName, setEntranceName] = useState(""); // New state for entrance name

  const defaultLatitude = 0;
  const defaultLongitude = 0;

  useEffect(() => {
    fetch("http://localhost:5000/api/college-map")
      .then((res) => res.json())
      .then((data) => setMapData(data));

    if (navigator.geolocation) {
      const watchId = navigator.geolocation.watchPosition(
        (position) => {
          const newLocation = [position.coords.latitude, position.coords.longitude];
          setUserLocation(newLocation);
        },
        (error) => console.error("Error getting location:", error.message),
        { enableHighAccuracy: true, timeout: 20000, maximumAge: 0 }
      );

      return () => navigator.geolocation.clearWatch(watchId);
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

  // Start tracking user location every 2 seconds & update route
  const startTracking = () => {
    setTracking(true);
    setIsStopped(false);

    trackingInterval.current = setInterval(() => {
      navigator.geolocation.getCurrentPosition((position) => {
        const newLocation = [position.coords.latitude, position.coords.longitude];

        // Update locationHistory only if the new location is different
        setLocationHistory((prev) => {
          const lastLocation = prev[prev.length - 1];
          if (!lastLocation || (lastLocation[0] !== newLocation[0] || lastLocation[1] !== newLocation[1])) {
            return [...prev, newLocation]; // Add only if different
          }
          return prev; // Ignore if same
        });
        console.log("Tracking:", newLocation);
      });
    }, 4000);
  };

  // Stop tracking user location
  const stopTracking = () => {
    setTracking(false);
    setIsStopped(true);
    if (trackingInterval.current) { // Ensure interval exists before clearing
      clearInterval(trackingInterval.current);
      trackingInterval.current = null; // Reset the interval reference
    }
  };

  // Send location history to backend
  const sendData = () => {
    setLocationHistory((prevHistory) => {
      if (prevHistory.length === 0) {
        alert("No location data to send.");
        return prevHistory; // Return unchanged state if no data
      }

      // Send the latest locationHistory to the backend
      fetch("http://localhost:5000/api/send-location", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ locations: prevHistory }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("Response:", data);
          alert("Location data sent successfully!");
        })
        .catch((error) => console.error("Error sending data:", error));

      return []; // Clear locationHistory after sending
    });
  };

  // Function to add a centre
  const addCentre = () => {
    if (!userLocation) {
      alert("User location is not available.");
      return;
    }
    if (!centreName) {
      alert("Please enter a centre name.");
      return;
    }

    const centreData = {
      name: centreName,
      location: userLocation,
      ntype: "center",
    };

    fetch("http://localhost:5000/api/add-centre", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(centreData),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Centre added:", data);
        alert("Centre added successfully!");
        setCentreName(""); // Clear input after submission
      })
      .catch((error) => console.error("Error adding centre:", error));
  };

  // Function to add an entrance
  const addEntrance = () => {
    if (!userLocation) {
      alert("User location is not available.");
      return;
    }
    if (!entranceName) {
      alert("Please enter an entrance name.");
      return;
    }

    const entranceData = {
      name: entranceName,
      location: userLocation,
      ntype: "entrance",
    };

    fetch("http://localhost:5000/api/add-entrance", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(entranceData),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Entrance added:", data);
        alert("Entrance added successfully!");
        setEntranceName(""); // Clear input after submission
      })
      .catch((error) => console.error("Error adding entrance:", error));
  };

  return (
    <div>
      {/* Buttons for Start, Stop, Send & Add Centre */}
      <div className={styles.controls}>
        <button onClick={startTracking} disabled={tracking} className={styles.startBtn}>Start</button>
        <button onClick={stopTracking} disabled={!tracking} className={styles.stopBtn}>Stop</button>
        <button onClick={sendData} disabled={!isStopped} className={styles.sendBtn}>Send</button>
        
        {/* New Add Centre Button and Input */}
        <input 
          type="text" 
          value={centreName} 
          onChange={(e) => setCentreName(e.target.value)} 
          placeholder="Centre Name" 
          className={styles.centreInput} // Add your CSS class if needed
        />
        <button onClick={addCentre} className={styles.addCentreBtn}>Add Centre</button>

        {/* New Add Entrance Button and Input */}
        <input 
          type="text" 
          value={entranceName} 
          onChange={(e) => setEntranceName(e.target.value)} 
          placeholder="Entrance Name" 
          className={styles.entranceInput} // Add your CSS class if needed
        />
        <button onClick={addEntrance} className={styles.addEntranceBtn}>Add Entrance</button>
      </div>

      <MapContainer
        center={userLocation || [defaultLatitude, defaultLongitude]}
        zoom={15}
        style={{ height: "100vh", width: "100%" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

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

        {/* Draw real-time route using Polyline */}
        {locationHistory.length > 1 && (
          <Polyline positions={locationHistory} color="blue" weight={4} />
        )}
      </MapContainer>
    </div>
  );
};

export default AdminHeader;