import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Auth from './components/Auth';
import ProblemList from './components/ProblemList';
import Problem from './components/Problem';
import LandingPage from './components/LandingPage';
import Attempt from './components/Attempt';
import ContactMe from './components/ContactMe';
import MyProfile from './components/Myprofile';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check if the user is logged in when the component mounts
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  // Handle logout by removing the token and updating the state
  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    alert('Logout Successful');
  };

  return (
    <Router>
      <Navbar isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
      <div className="container">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Auth isLogin={true} setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/register" element={<Auth isLogin={false} />} />
          <Route path="/problems" element={<ProblemList />} />
          <Route path="/problems/:id" element={<Problem />} />
          <Route path="/attempt/:id" element={<Attempt />} />
          <Route path="/contact-me" element={<ContactMe />} />
          <Route path="/profile" element={<MyProfile />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
