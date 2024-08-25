import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import Contacts from './Page/Contacts';
import Sidebar from './Components/Sidebar';
import ChartsAndMaps from './Page/ChartsAndMaps'; // Create this component for charts

const Header = () => {
  const location = useLocation();

  // Determine the title based on the current route
  const getPageTitle = () => {
    switch (location.pathname) {
      case '/contacts':
        return 'Contact Page';
      case '/charts':
        return 'Charts and Maps';
      default:
        return 'Contact Page'; // Default or homepage title
    }
  };

  return (
    <div className="bg-blue-500 text-white text-center p-5">
      <h1 className="text-3xl">{getPageTitle()}</h1>
    </div>
  );
};

function App() {
  return (
    <Router>
      <div className="App">
        {/* Header stays fixed at the top */}
        <Header />
        {/* Main layout with Sidebar and page content */}
        <div className="flex flex-row max-lg:flex-col">
          <Sidebar /> {/* Sidebar remains fixed */}
          {/* Content area */}
          <div className="flex-1 p-4">
            <Routes>
              <Route path="/" element={<Contacts />} /> {/* Default to Contacts */}
              <Route path="/contacts" element={<Contacts />} />
              <Route path="/charts" element={<ChartsAndMaps />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
