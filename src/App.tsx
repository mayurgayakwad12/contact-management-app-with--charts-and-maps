import React from 'react';
import './App.css';
import Contacts from './Page/Contacts';

function App() {
  return (
    <div className="App">
      <div className="bg-blue-500 text-white text-center p-5">
        <h1 className="text-3xl">Page - Based On Routes</h1>
      </div>
      <Contacts />
    </div>
  );
}

export default App;
