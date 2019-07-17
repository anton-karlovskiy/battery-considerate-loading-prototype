import React from 'react';

import BatteryConsiderateMedia from './components/BatteryConsiderateMedia';
import BatteryStatus from './components/BatteryStatus';
import './App.css';

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <BatteryStatus />
        <BatteryConsiderateMedia />
      </header>
    </div>
  );
};

export default App;
