import React, { useState, useEffect } from "react";
import { MapContainer, Marker, Popup, Polyline, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Use placeholder images for icons
const buildingIcon = "https://via.placeholder.com/40/007bff/ffffff?text=B"; // Placeholder for buildings
const greeneryIcon = "https://via.placeholder.com/30/28a745/ffffff?text=G"; // Placeholder for greenery

const CollegeMap = () => {
  const [buildings, setBuildings] = useState([]);
  const [greenery, setGreenery] = useState([]);
  const [highlightedRoute, setHighlightedRoute] = useState(null);
  const userPosition = [12.9716, 77.5946]; // Static user position

  useEffect(() => {
    // Generate custom building data
    const generateBuildings = () => {
      const customBuildings = [
        { id: 1, name: "Library", coords: [12.9720, 77.5940] },
        { id: 2, name: "Cafeteria", coords: [12.9730, 77.5950] },
        { id: 3, name: "Gym", coords: [12.9740, 77.5960] },
        { id: 4, name: "Auditorium", coords: [12.9750, 77.5970] },
        { id: 5, name: "Green Park", coords: [12.9760, 77.5980] },
        { id: 6, name: "Science Block", coords: [12.9770, 77.5990] },
        { id: 7, name: "Arts Building", coords: [12.9780, 77.5900] },
        { id: 8, name: "Sports Complex", coords: [12.9790, 77.5910] },
      ];
      setBuildings(customBuildings);
    };

    // Generate custom greenery data
    const generateGreenery = () => {
      const customGreenery = [
        { id: 1, name: "Botanical Garden", coords: [12.9765, 77.5945] },
        { id: 2, name: "Flower Bed", coords: [12.9775, 77.5955] },
      ];
      setGreenery(customGreenery);
    };

    generateBuildings();
    generateGreenery();
  }, []);

  const handleBuildingClick = (building) => {
    const path = [userPosition, building.coords];
    setHighlightedRoute(path);
  };

  const SetMapBounds = () => {
    const map = useMap();
    const bounds = [userPosition, ...buildings.map(b => b.coords), ...greenery.map(g => g.coords)];
    map.fitBounds(bounds);
    return null;
  };

  return (
    <div className="w-full h-screen">
      <MapContainer center={userPosition} zoom={16} style={{ height: "100vh", width: "100%" }}>
        <SetMapBounds />
        
        {/* User Representation as a Marker */}
        <Marker position={userPosition} icon={L.divIcon({
          className: 'user-icon',
          html: '<div style="background-color: blue; width: 30px; height: 30px; border-radius: 50%; position: relative;"><div style="width: 10px; height: 10px; background-color: blue; position: absolute; top: -5px; left: 10px; transform: rotate(45deg); border-radius: 50%;"></div></div>',
          iconSize: [30, 30],
        })} />

        {/* Custom Map Area for Buildings */}
        {buildings.map((building) => (
          <Marker key={building.id} position={building.coords} icon={L.icon({ iconUrl: buildingIcon, iconSize: [40, 40] })}>
            <Popup>
              <button onClick={() => handleBuildingClick(building)}>
                {building.name}
              </button>
            </Popup>
          </Marker>
        ))}

        {/* Custom Map Area for Greenery */}
        {greenery.map((green) => (
          <Marker key={green.id} position={green.coords} icon={L.icon({ iconUrl: greeneryIcon, iconSize: [30, 30] })}>
            <Popup>
              <span>{green.name}</span>
            </Popup>
          </Marker>
        ))}

        {highlightedRoute && (
          <Polyline
            positions={highlightedRoute}
            color="red"
          />
        )}
      </MapContainer>
    </div>
  );
};

export default CollegeMap;
