import React, { useState } from "react";
import { MapContainer, Marker, Popup, Polyline, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import './CollegeMap.css';

// Custom Building Icon (Use a real building icon)
const buildingIcon = L.icon({
  iconUrl: process.env.PUBLIC_URL + "/image.png", // Updated building icon URL
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: [0, -40],
});

const userIcon = L.icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/149/149071.png", // User emoji
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: [0, -40],
});

const CollegeMap = () => {
  const userPosition = [12.9740, 77.5935]; // Static user position
  const [selectedBuilding, setSelectedBuilding] = useState(null); // State for selected building
  const [searchTerm, setSearchTerm] = useState(""); // State for search term

  // Static building locations
  const buildings = [
    { id: 1, name: "Library", coords: [12.9750, 77.5940] },
    { id: 2, name: "Cafeteria", coords: [12.9690, 77.5945] },
    { id: 3, name: "Gym", coords: [12.9720, 77.5980] },
    { id: 4, name: "Auditorium", coords: [12.9725, 77.5905] },
  ];

  // Static routes (paths between buildings)
  const routes = [
    { id: 1, path: [[12.9750, 77.5940], [12.9740, 77.5935], [12.9725, 77.5905]] }, // Library → Auditorium
    { id: 2, path: [[12.9750, 77.5940], [12.9740, 77.5950], [12.9720, 77.5980]] }, // Library → Gym
    { id: 3, path: [[12.9690, 77.5945], [12.9705, 77.5930], [12.9725, 77.5905]] }, // Cafeteria → Auditorium
    { id: 4, path: [[12.9690, 77.5945], [12.9705, 77.5955], [12.9720, 77.5980]] }, // Cafeteria → Gym (Route 1)
    { id: 5, path: [[12.9690, 77.5945], [12.9680, 77.5960], [12.9700, 77.5975], [12.9720, 77.5980]] }, // Cafeteria → Gym (Route 2)
  ];

  const handleBuildingClick = (building) => {
    setSelectedBuilding(building); // Set the selected building
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value); // Update search term
  };

  const filteredBuildings = buildings.filter(building =>
    building.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Function to find the route from the user to the selected building
  const getRouteToBuilding = (building) => {
    const buildingCoords = building.coords;
    return routes.find(route => 
      route.path.some(point => 
        point[0] === buildingCoords[0] && point[1] === buildingCoords[1]
      ) && 
      route.path.some(point => 
        point[0] === userPosition[0] && point[1] === userPosition[1]
      )
    );
  };

  return (
    <div className="w-full h-screen">
      <input 
        type="text" 
        placeholder="Search for a building..." 
        className="search-bar" // Apply the CSS class
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <MapContainer center={userPosition} zoom={16} style={{ height: "100vh", width: "100%" }}>
        {/* User Marker */}
        <Marker position={userPosition} icon={userIcon}>
          <Popup>You are here</Popup>
        </Marker>
        
        {/* Buildings Markers with Custom Icons */}
        {buildings.map((building) => (
          <Marker key={building.id} position={building.coords} icon={buildingIcon} onClick={() => handleBuildingClick(building)}>
            <Popup>{building.name}</Popup>
          </Marker>
        ))}

        {/* Display Routes as Roads */}
        {routes.map((route) => (
          <Polyline 
            key={route.id} 
            positions={route.path} 
            color="#f0864a" // Dark brown color for road
            weight={5} // Increased weight for visibility
            // dashArray="10, 5" // Removed for solid line
          />
        ))}

        {/* Highlight the route from the user to the selected building */}
        {selectedBuilding && (
          <Polyline 
            positions={getRouteToBuilding(selectedBuilding)?.path || []} 
            color="green" // Highlight color
            weight={6} 
            dashArray="10, 5" 
          />
        )}

      </MapContainer>
    </div>
  );
};

export default CollegeMap;
