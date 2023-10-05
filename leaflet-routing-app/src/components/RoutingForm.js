// RoutingForm.js
import React, { useState } from 'react';
import axios from 'axios';

function RoutingForm({ updateWaypoints }) {
  const [startLocation, setStartLocation] = useState('');
  const [endLocation, setEndLocation] = useState('');

  const handleRoute = () => {
    // Use a geocoding API to convert startLocation to coordinates
    axios
      .get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(startLocation)}.json?access_token=pk.eyJ1IjoiZ2F1cmFuZzEyIiwiYSI6ImNsbmNzbHdqazBxZXcycW9heTI3ZDFubGwifQ.lL6YUAY2SYEfNNM10pIntQ`)
      .then((startResponse) => {
        const startCoordinates = startResponse.data.features[0].geometry.coordinates;
        console.log('Start Coordinates:', startCoordinates);

        // Perform geocoding for the end location as well
        axios
          .get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(endLocation)}.json?access_token=pk.eyJ1IjoiZ2F1cmFuZzEyIiwiYSI6ImNsbmNzbHdqazBxZXcycW9heTI3ZDFubGwifQ.lL6YUAY2SYEfNNM10pIntQ`)
          .then((endResponse) => {
            const endCoordinates = endResponse.data.features[0].geometry.coordinates;
            console.log('End Coordinates:', endCoordinates);

            // Update the waypoints and trigger routing
            updateWaypoints([startCoordinates, endCoordinates]);
          })
          .catch((endError) => {
            console.error('Geocoding error for end location:', endError);
          });
      })
      .catch((startError) => {
        console.error('Geocoding error for start location:', startError);
      });
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter start location"
        value={startLocation}
        onChange={(e) => setStartLocation(e.target.value)}
      />
      <input
        type="text"
        placeholder="Enter end location"
        value={endLocation}
        onChange={(e) => setEndLocation(e.target.value)}
      />
      <button onClick={handleRoute}>Find Route</button>
    </div>
  );
}

export default RoutingForm;
