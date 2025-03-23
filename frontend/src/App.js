import React, { useState, useEffect } from 'react';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import MainContent from './components/MainContent'; // your current front page




function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Simple check if an access token exists.
  useEffect(() => {
    const token = localStorage.getItem('access');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleAuthSuccess = () => {
    setIsAuthenticated(true);
  };

  // You could combine sign-up and sign-in or route them differently.
  // For this example, we'll show SignIn if not authenticated.
  return (
    <div>
      {isAuthenticated ? (
        <MainContent />
      ) : (
        <div>
          <h1>Welcome! Please Sign In or Sign Up</h1>
          <SignIn onAuthSuccess={handleAuthSuccess} />
          <hr />
          <SignUp onAuthSuccess={handleAuthSuccess} />
        </div>
      )}
    </div>
  );
}

export default App;
