import React, { useEffect, useState } from "react";
import { MapContainer, Marker, Popup, Polyline, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet"; // Import Leaflet for custom icon

const userIcon = L.icon({
  iconUrl: "https://upload.wikimedia.org/wikipedia/commons/e/ec/RedDot.svg",
  iconSize: [20, 20],
});

// Component to move the map to the user's location
const MoveToUserLocation = ({ userLocation }) => {
  const map = useMap();
  useEffect(() => {
    if (userLocation) {
      map.setView(userLocation, 18); // Zoom in on user
    }
  }, [userLocation, map]);
  return null;
};

const CollegeMap = () => {
  const [mapData, setMapData] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [position, setPosition] = useState(null);
  const defaultLatitude = 0;
  const defaultLongitude = 0;

  useEffect(() => {
    // Fetch buildings & roads data
    fetch("http://localhost:5000/api/college-map") // Replace localhost with your laptop IP
    .then((res) => res.json())
      .then((data) => setMapData(data));

    // Get User's Current Location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log("Latitude:", position.coords.latitude);
          console.log("Longitude:", position.coords.longitude);
          console.log("Accuracy:", position.coords.accuracy, "meters");
          setUserLocation([position.coords.latitude, position.coords.longitude]);
          setPosition([position.coords.latitude, position.coords.longitude]);
        },
        (error) => {
          console.error("Error getting location:", error);
          // Consider handling specific error codes for better user feedback
        },
        {
          enableHighAccuracy: true, // Forces GPS usage
          timeout: 20000, // Wait 20s for best location
          maximumAge: 0, // No cached location
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

  return (
    <MapContainer 
      center={position || [defaultLatitude, defaultLongitude]}
      zoom={15}
      style={{ height: "100vh", width: "100%" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {/* Move map to user location */}
      {userLocation && <MoveToUserLocation userLocation={userLocation} />}

      {/* Show Buildings */}
      {mapData?.buildings.map((building) => (
        <Marker key={building.name} position={[building.lat, building.lng]}>
          <Popup>{building.name}</Popup>
        </Marker>
      ))}

      {/* Show Roads */}
      {mapData?.roads.map((road, index) => (
        <Polyline key={index} positions={road.path} color="blue" weight={6} />
      ))}

      {/* Show User Location */}
      {userLocation && (
        <Marker position={userLocation} icon={userIcon}>
          <Popup>You are here</Popup>
        </Marker>
      )}
    </MapContainer>
  );
};

export default CollegeMap;
