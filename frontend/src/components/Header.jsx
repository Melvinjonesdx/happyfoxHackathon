import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header style={headerStyle}>
      <div style={brandStyle}>Campus Navigation</div>
      <nav style={navStyle}>
        <Link to="/" style={linkStyle}>Home</Link>
        <Link to="/map" style={linkStyle}>Current Map</Link>
        <Link to="/availability" style={linkStyle}>Availability Rooms</Link>
      </nav>
    </header>
  );
};

const headerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '10px 20px',
  backgroundColor: '#007bff',
  color: 'white',
};

const brandStyle = {
  fontSize: '24px',
  fontWeight: 'bold',
};

const navStyle = {
  display: 'flex',
  gap: '20px',
};

const linkStyle = {
  color: 'white',
  textDecoration: 'none',
  fontSize: '18px',
};

export default Header; 