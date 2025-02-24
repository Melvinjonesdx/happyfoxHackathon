import React, { useState, useEffect } from 'react';
import styles from './AvailabilityRooms.module.css';

const AvailabilityRooms = () => {
  const [selectedType, setSelectedType] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState('');
  const [selectedBuilding, setSelectedBuilding] = useState(null);
  const [buildings, setBuildings] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch buildings and rooms data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3001/details/alldetails');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setBuildings(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:3001/details/alldetails');
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      setBuildings(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchData();
  }, []);

  const handleSearch = async () => {
    if (!selectedType) {
      setError('Please select either "Room" or "Building" before searching.');
      return;
    }
    if (!searchTerm) {
      setError('Please enter a search term.');
      return;
    }

    setError('');

    try {
      let filteredBuildings = [];

      if (selectedType.toLowerCase() === 'building') {
        // Filter buildings by name
        filteredBuildings = buildings.filter(building =>
          building.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
      } else if (selectedType.toLowerCase() === 'room') {
        // Filter buildings that have the searched room
        filteredBuildings = buildings.filter(building =>
          building.rooms.some(room =>
            room.name.toLowerCase().includes(searchTerm.toLowerCase())
          )
        );
      }

      if (filteredBuildings.length === 0) {
        throw new Error(`No ${selectedType.toLowerCase()} found with the name "${searchTerm}"`);
      }

      // Update the buildings state with the filtered results
      setBuildings(filteredBuildings);
    } catch (error) {
      setError(error.message);
      console.error('Search error:', error);
    }
  };

  const handleBuildingClick = (building) => {
    setSelectedBuilding(building);
  };

  const closePopup = () => {
    setSelectedBuilding(null);
  };

  return (
    <div className={styles.container}>
      <div className={styles.controls}>
        <div className={styles.filterGroup}>
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className={styles.dropdown}
          >
            <option value="">Select Space Type</option>
            <option value="Building">Building</option>
            <option value="Room">Room</option>
          </select>
          <input
            type="text"
            placeholder="Search by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={styles.searchInput}
          />
          <button onClick={handleSearch} className={styles.searchButton}>
            Search
          </button>
          <button 
            onClick={() => {
              setSearchTerm('');
              setSelectedType('');
              fetchData(); // Reset to show all buildings
            }} 
            className={styles.clearButton}
          >
            Clear Search
          </button>
        </div>
        {error && <div className={styles.error}>{error}</div>}
      </div>

      {loading ? (
        <div className={styles.loading}>Loading...</div>
      ) : (
        <div className={styles.buildingsGrid}>
          {buildings.map((building) => (
            <div
              key={building.id}
              className={styles.buildingCard}
              onClick={() => handleBuildingClick(building)}
            >
              <h3 className={styles.buildingName}>{building.name}</h3>
              <p className={styles.buildingDescription}>{building.description}</p>
              <div className={styles.statusIndicator}>
                <span className={styles.roomsCount}>
                  {building.rooms.length} {building.rooms.length === 1 ? 'Room' : 'Rooms'}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedBuilding && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <div className={styles.modalHeader}>
              <h2 className={styles.modalTitle}>{selectedBuilding.name} Rooms</h2>
              <button onClick={closePopup} className={styles.closeButton}>
                &times;
              </button>
            </div>
            <div className={styles.roomsList}>
              {selectedBuilding.rooms.map((room) => (
                <div key={room.id} className={styles.roomCard}>
                  <div className={styles.roomNumber}>#{room.name}</div>
                  <div className={`${styles.status} ${room.availability ? styles.available : styles.inUse}`}>
                    {room.availability ? 'AVAILABLE' : 'IN USE'}
                  </div>
                  {!room.availability && (
                    <div className={styles.eventInfo}>
                      <div className={styles.eventName}>{room.event_name}</div>
                      <div className={styles.eventDescription}>{room.event_description}</div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AvailabilityRooms;