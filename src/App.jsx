// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Auth from './components/Auth';
import ProblemList from './components/ProblemList';
import Problem from './components/Problem';

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/login" element={<Auth isLogin={true} />} />
          <Route path="/register" element={<Auth isLogin={false} />} />
          <Route path="/problems" element={<ProblemList />} />
          <Route path="/problems/:id" element={<Problem />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
