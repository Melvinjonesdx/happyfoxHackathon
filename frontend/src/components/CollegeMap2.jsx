import React, { useEffect, useState } from "react";
import { MapContainer, Marker, Popup, Polyline, TileLayer, useMap } from "react-leaflet";
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

const CollegeMap = () => {
  const [mapData, setMapData] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [position, setPosition] = useState(null);
  const [searchTerm, setSearchTerm] = useState(""); // State for search term
  const defaultLatitude = 0;
  const defaultLongitude = 0;

  useEffect(() => {
    // Fetch buildings & roads data
    fetch("http://localhost:5000/api/college-map") // Replace localhost with your laptop IP
      .then((res) => res.json())
      .then((data) => setMapData(data))
      .catch((error) => console.error("Error fetching map data:", error));

    // Watch User's Current Location
    if (navigator.geolocation) {
      const watchId = navigator.geolocation.watchPosition(
        (position) => {
          console.log(`Updated Latitude: ${position.coords.latitude}, Longitude: ${position.coords.longitude}`);
          const newLocation = [position.coords.latitude, position.coords.longitude];
          setUserLocation(newLocation);
          setPosition(newLocation);
        },
        (error) => console.error("Error getting location:", error.message),
        {
          enableHighAccuracy: true,
          timeout: 20000,
          maximumAge: 0,
        }
      );

      // Cleanup function to stop watching position
      return () => navigator.geolocation.clearWatch(watchId);
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

  // Filter buildings based on search term
  const filteredBuildings = mapData?.buildings?.filter(building =>
    building.name.toLowerCase().includes(searchTerm.toLowerCase())
  ) || []; // Default to an empty array if mapData or buildings is undefined

  return (
    <div style={{ position: "relative", height: "100vh", width: "100%" }}>
      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search for a building..."
        className="search-bar" // Add your CSS class for styling
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          padding: "10px",
          borderRadius: "5px",
          border: "1px solid #ccc",
          width: "250px",
          zIndex: 1000, // Ensure it appears above the map
        }}
      />

      <MapContainer 
        center={position || [defaultLatitude, defaultLongitude]}
        zoom={15}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {/* Move map to user location smoothly */}
        {userLocation && <MoveToUserLocation userLocation={userLocation} />}

        {/* Show Filtered Buildings */}
        {filteredBuildings.map((building) => (
          <Marker key={building.name} position={[building.lat, building.lng]}>
            <Popup>{building.name}</Popup>
          </Marker>
        ))}

        {/* Show Roads if mapData is defined */}
        {mapData?.roads?.map((road, index) => (
          <Polyline key={index} positions={road.path} color="blue" weight={6} />
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

export default CollegeMap;
