import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Auth from './components/Auth';
import ProblemList from './components/ProblemList';
import Problem from './components/Problem';
import LandingPage from './components/LandingPage';
import Attempt from './components/Attempt';
import ContactMe from './components/ContactMe';
import MyProfile from './components/MyProfile';
import "../src/styles/theme.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [darkMode, setDarkMode] = useState(true);

  // Add dark mode class to body
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode');
      document.body.classList.remove('light-mode');
    } else {
      document.body.classList.add('light-mode');
      document.body.classList.remove('dark-mode');
    }
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  // Check if the user is logged in when the component mounts
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    alert('Logout Successful');
  };

  return (
    <Router>
      <Navbar
        isLoggedIn={isLoggedIn}
        handleLogout={handleLogout}
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
      />
      <div className={`container mt-5 pt-5 ${darkMode ? 'dark-mode' : ''}`}>
        <Routes>
          <Route path="/" element={<LandingPage darkMode={darkMode} />} />
          <Route path="/login" element={<Auth isLogin={true} setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/register" element={<Auth isLogin={false} />} />
          <Route path="/problems" element={<ProblemList darkMode={darkMode} />} />
          <Route path="/problems/:id" element={<Problem darkMode={darkMode} />} />
          <Route path="/attempt/:id" element={<Attempt darkMode={darkMode} />} />
          <Route path="/contact-me" element={<ContactMe darkMode={darkMode} />} />
          <Route path="/profile" element={<MyProfile darkMode={darkMode} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
