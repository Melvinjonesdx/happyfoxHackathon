import React from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import CollegeMap from './components/CollegeMap';
import Home from './components/Home';
import AvailabilityRooms from './components/AvailabilityRooms';
import Header from './components/Header';
import CollegeMap2 from './components/CollegeMap2';

const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/map" element={<CollegeMap />} />
        <Route path="/availability" element={<AvailabilityRooms />} />
        <Route path="/collegemap" element={<CollegeMap2 />} />
      </Routes>
    </>
  );
};

export default App;