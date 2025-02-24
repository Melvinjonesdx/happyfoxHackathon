import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div style={containerStyle}>
      <div style={heroSectionStyle}>
        <h1 style={heroTitleStyle}>Welcome to the College Management System</h1>
        <p style={heroDescriptionStyle}>
          Your one-stop solution for managing and navigating through college resources.
        </p>
        <Link to="/availability" style={ctaButtonStyle}>Get Started</Link>
      </div>

      <div style={featuresContainerStyle}>
        <h2 style={featuresTitleStyle}>Features</h2>
        <div style={featuresGridStyle}>
          <div style={featureBoxStyle}>
            <img src="https://via.placeholder.com/100" alt="Room Availability" style={iconStyle} />
            <h3>Room Availability</h3>
            <p>Check the availability of rooms in real-time.</p>
          </div>
          <div style={featureBoxStyle}>
            <img src="https://via.placeholder.com/100" alt="Campus Map" style={iconStyle} />
            <h3>Campus Map</h3>
            <p>Navigate through the campus with ease using our interactive map.</p>
          </div>
          <div style={featureBoxStyle}>
            <img src="https://via.placeholder.com/100" alt="Event Management" style={iconStyle} />
            <h3>Event Management</h3>
            <p>Stay updated with the latest events happening on campus.</p>
          </div>
        </div>
      </div>

      <div style={testimonialContainerStyle}>
        <h2 style={testimonialTitleStyle}>What Our Users Say</h2>
        <blockquote style={testimonialStyle}>
          "This system has made managing my college life so much easier! Highly recommend!"
          <footer style={testimonialAuthorStyle}>— Student Name</footer>
        </blockquote>
      </div>
    </div>
  );
};

const containerStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '20px',
  background: "url('https://source.unsplash.com/1600x900/?university,college') no-repeat center center/cover",
  minHeight: '100vh',
};


const heroSectionStyle = {
  backgroundImage: 'url("https://via.placeholder.com/1200x400")',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  color: 'white',
  textAlign: 'center',
  padding: '60px 20px',
  borderRadius: '10px',
  marginBottom: '40px',
};

const heroTitleStyle = {
  fontSize: '48px',
  margin: '0 0 20px 0',
};

const heroDescriptionStyle = {
  fontSize: '24px',
  margin: '0 0 30px 0',
};

const ctaButtonStyle = {
  padding: '15px 30px',
  fontSize: '18px',
  backgroundColor: '#007bff',
  color: 'white',
  textDecoration: 'none',
  borderRadius: '5px',
  transition: 'background-color 0.3s',
};

const featuresContainerStyle = {
  textAlign: 'center',
  marginBottom: '40px',
};

const featuresTitleStyle = {
  fontSize: '36px',
  marginBottom: '20px',
};

const featuresGridStyle = {
  display: 'flex',
  justifyContent: 'space-around',
  flexWrap: 'wrap',
  maxWidth: '1200px',
  margin: '0 auto',
};

const featureBoxStyle = {
  border: '1px solid #007bff',
  borderRadius: '5px',
  padding: '20px',
  width: '250px',
  margin: '10px',
  textAlign: 'center',
  backgroundColor: '#f0f0f0',
};

const iconStyle = {
  width: '100px',
  height: '100px',
  marginBottom: '10px',
};

const testimonialContainerStyle = {
  textAlign: 'center',
  marginTop: '40px',
  padding: '20px',
  backgroundColor: '#e9ecef',
  borderRadius: '5px',
  maxWidth: '600px',
};

const testimonialTitleStyle = {
  fontSize: '36px',
  marginBottom: '20px',
};

const testimonialStyle = {
  fontSize: '20px',
  fontStyle: 'italic',
  margin: '0',
};

const testimonialAuthorStyle = {
  marginTop: '10px',
  fontWeight: 'bold',
};

export default Home; 