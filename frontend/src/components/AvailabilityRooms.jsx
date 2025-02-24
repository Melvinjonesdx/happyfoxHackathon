import React, { useState } from 'react';

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
    <div style={containerStyle}>
      <div style={fieldsContainerStyle}>
        <select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
          style={dropdownStyle}
        >
          <option value="">Select Type</option>
          <option value="Building">Building</option>
          <option value="Room">Room</option>
        </select>
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={searchBarStyle}
        />
        <button onClick={handleSearch} style={searchButtonStyle}>Search</button>
      </div>
      {error && <div style={errorStyle}>{error}</div>}
      <div style={buildingsContainerStyle}>
        {buildings.map(building => (
          <div key={building.id} style={buildingBoxStyle} onClick={() => handleBuildingClick(building)}>
            <h3>{building.name}</h3>
            <p>{building.description}</p>
          </div>
        ))}
      </div>

      {/* Popup for Rooms */}
      {selectedBuilding && (
        <div style={popupStyle}>
          <div style={popupHeaderStyle}>
            <h2 style={popupTitleStyle}>{selectedBuilding.name} Rooms</h2>
            <button onClick={closePopup} style={closeButtonStyle}>Close</button>
          </div>
          <div style={roomsContainerStyle}>
            {selectedBuilding.rooms.map((room, index) => (
              <div key={index} style={roomBoxStyle}>
                <div>Room Number: {room.number}</div>
                <div style={{ color: room.status === 'in use' ? 'red' : 'green' }}>
                  Status: {room.status}
                </div>
                <div>Event: {room.event}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const containerStyle = {
  padding: '20px',
};

const fieldsContainerStyle = {
  display: 'flex',
  alignItems: 'center',
  marginBottom: '20px',
};

const dropdownStyle = {
  padding: '10px',
  marginRight: '10px',
  fontSize: '16px',
};

const searchBarStyle = {
  padding: '10px',
  fontSize: '16px',
  flexGrow: 1,
  marginRight: '10px',
};

const searchButtonStyle = {
  padding: '10px',
  fontSize: '16px',
  backgroundColor: '#007bff',
  color: 'white',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
};

const errorStyle = {
  color: 'red',
  marginTop: '10px',
};

const buildingsContainerStyle = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '20px',
};

const buildingBoxStyle = {
  border: '1px solid #007bff',
  borderRadius: '5px',
  padding: '20px',
  width: '250px',
  height: '180px',
  textAlign: 'center',
  backgroundColor: '#f0f0f0',
  cursor: 'pointer',
};

const popupStyle = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  backgroundColor: 'white',
  border: '1px solid #007bff',
  borderRadius: '5px',
  padding: '20px',
  zIndex: 1000,
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
  width: '500px',
  maxHeight: '500px',
  overflowY: 'auto',
};

const popupHeaderStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
};

const closeButtonStyle = {
  backgroundColor: '#ff4d4d',
  color: 'white',
  border: 'none',
  borderRadius: '5px',
  padding: '10px',
  cursor: 'pointer',
};

const popupTitleStyle = {
  margin: '0 0 10px 0',
};

const roomsContainerStyle = {
  marginTop: '10px',
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
  width: '96%',
};

const roomBoxStyle = {
  border: '1px solid #007bff',
  borderRadius: '5px',
  padding: '10px',
  margin: '5px 0',
  width: '100%',
};

export default AvailabilityRooms; 