import React, { useState, useEffect } from 'react';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import MainContent from './components/MainContent'; // your current front page

const MainContent = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('access');
      const res = await fetch('http://localhost:8000/api/some_endpoint/', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
      const json = await res.json();
      setData(json);
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Main Content for Authenticated Users</h1>
      {data ? (
        <pre>{JSON.stringify(data, null, 2)}</pre>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
};

export default MainContent;

const buttons = [
  { id: 1, title: "Kitchen Management", color: "#e74c3c", route: "/page1" },
  { id: 2, title: "Housekeeping", color: "#3498db", route: "/page2" },
  { id: 3, title: "Entertaining", color: "#2ecc71", route: "/page3" },
  { id: 4, title: "Wardrobe Management", color: "#f1c40f", route: "/page4" },
  { id: 5, title: "Household Inventory", color: "#9b59b6", route: "/page5" },
  { id: 6, title: "Car Maintenence", color: "#1abc9c", route: "/page6" },
  { id: 7, title: "Budget", color: "#e67e22", route: "/page7" },
  { id: 8, title: "Travel & Adventure Management", color: "#34495e", route: "/page8" },
  { id: 9, title: "Dashboard", color: "#95a5a6", route: "/page9" },
  { id: 10, title: "MIGO", color: "#d35400", route: "/page10" },
];

function Home() {
  return (
    <div className="grid-container">
      {buttons.map((btn) => (
        <Link
          key={btn.id}
          to={btn.route}
          className="grid-button"
          style={{ backgroundColor: btn.color }}
        >
          <span className="button-title">{btn.title}</span>
        </Link>
      ))}
    </div>
  );
}

function Page({ title }) {
  return (
    <div className="page-container">
      <h1>{title}</h1>
      <Link to="/" className="back-link">Back to Home</Link>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        {buttons.map((btn) => (
          <Route key={btn.id} path={btn.route} element={<Page title={btn.title} />} />
        ))}
      </Routes>
    </Router>
  );
}

export default App;
