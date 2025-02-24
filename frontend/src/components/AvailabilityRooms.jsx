import React, { useState } from 'react';
import styles from './AvailabilityRooms.module.css';

const AvailabilityRooms = () => {
  const [selectedType, setSelectedType] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState('');
  const [selectedBuilding, setSelectedBuilding] = useState(null);
  
  const buildings = [
    { 
      id: 1, 
      name: 'Library', 
      description: 'A place with a vast collection of books and resources.', 
      rooms: [
        { number: '101', status: 'available', event: 'None' }, 
        { number: '102', status: 'in use', event: 'Study Group' }
      ] 
    },
    { 
      id: 2, 
      name: 'Cafeteria', 
      description: 'A dining area serving meals and snacks.', 
      rooms: [
        { number: '201', status: 'available', event: 'None' }, 
        { number: '202', status: 'in use', event: 'Lunch' }
      ] 
    },
    { 
      id: 3, 
      name: 'Gym', 
      description: 'A facility for physical exercise and sports.', 
      rooms: [
        { number: '301', status: 'available', event: 'None' }, 
        { number: '302', status: 'in use', event: 'Yoga Class' }
      ] 
    },
    { 
      id: 4, 
      name: 'Auditorium', 
      description: 'A large room for events and presentations.', 
      rooms: [
        { number: '401', status: 'in use', event: 'Conference' }
      ] 
    },
    { 
      id: 5, 
      name: 'Science Block', 
      description: 'A building dedicated to science classes and labs.', 
      rooms: [
        { number: '501', status: 'available', event: 'None' }
      ] 
    },
  ];

  const handleSearch = () => {
    if (!selectedType) {
      setError('Please select either "Room" or "Building" before searching.');
      return;
    }
    setError('');
    // Implement search logic here based on selectedType and searchTerm
    console.log(`Searching for ${searchTerm} in ${selectedType}`);
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
          <button 
            onClick={handleSearch}
            className={styles.searchButton}
          >
            Search
          </button>
        </div>
        {error && <div className={styles.error}>{error}</div>}
      </div>

      <div className={styles.buildingsGrid}>
        {buildings.map(building => (
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

      {selectedBuilding && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <div className={styles.modalHeader}>
              <h2 className={styles.modalTitle}>{selectedBuilding.name} Rooms</h2>
              <button 
                onClick={closePopup}
                className={styles.closeButton}
              >
                &times;
              </button>
            </div>
            <div className={styles.roomsList}>
              {selectedBuilding.rooms.map((room, index) => (
                <div key={index} className={styles.roomCard}>
                  <div className={styles.roomNumber}>#{room.number}</div>
                  <div className={`${styles.status} ${room.status === 'in use' ? styles.inUse : styles.available}`}>
                    {room.status.toUpperCase()}
                  </div>
                  <div className={styles.eventInfo}>
                    {room.event !== 'None' && (
                      <span className={styles.eventBadge}>{room.event}</span>
                    )}
                  </div>
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