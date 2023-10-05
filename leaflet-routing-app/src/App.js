// App.js
import React, { useState } from 'react';
import './App.css';
import Map from './components/Map';
import RoutingForm from './components/RoutingForm';

function App() {
  const [waypoints, setWaypoints] = useState([]);

  const updateWaypoints = (newWaypoints) => {
    setWaypoints(newWaypoints);
  };

  return (
    <div className="App">
      <Map waypoints={waypoints} />
      <RoutingForm updateWaypoints={updateWaypoints} />
    </div>
  );
}

export default App;
