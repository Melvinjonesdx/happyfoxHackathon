import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import CollegeMap from './components/CollegeMap';
import Home from './components/Home';
import AvailabilityRooms from './components/AvailabilityRooms';
import Header from './components/Header';

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/map" element={<CollegeMap />} />
        <Route path="/availability" element={<AvailabilityRooms />} />
      </Routes>
    </Router>
  );
};

export default App;
