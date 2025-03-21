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
import Footer from './components/Footer';
import Tracks from './components/Tracks';

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
    localStorage.clear();
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
      <div className={`container mt-0 pt-5 ${darkMode ? 'dark-mode' : ''}`}>
        <Routes>
          <Route path="/" element={<LandingPage darkMode={darkMode} />} />
          <Route path="/login" element={<Auth isLogin={true} setIsLoggedIn={setIsLoggedIn} darkMode={darkMode} />} />
          <Route path="/register" element={<Auth isLogin={false} darkMode={darkMode} />} />
          <Route path="/problems" element={<ProblemList darkMode={darkMode} isLoggedIn={isLoggedIn} />} />
          <Route path="/problems/:id" element={<Problem darkMode={darkMode} />} />
          <Route path="/attempt/:id" element={<Attempt isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} darkMode={darkMode} />} />
          <Route path="/contact-me" element={<ContactMe darkMode={darkMode} />} />
          <Route path="/profile" element={<MyProfile darkMode={darkMode} />} />
          <Route path='/tracks' element={<Tracks darkMode={darkMode} />} />
          <Route path="/tracks/:trackName" element={<ProblemList darkMode={darkMode} isLoggedIn={isLoggedIn} />} />
        </Routes>
      </div>
      <Footer darkMode={darkMode} />
    </Router>
  );
}

export default App;
