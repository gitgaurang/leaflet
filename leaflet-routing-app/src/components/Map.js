// Map.js
import React, { useRef, useEffect } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import L from 'leaflet';
import 'leaflet-routing-machine';
import 'leaflet/dist/leaflet.css';

function Map({ waypoints }) {
  const mapRef = useRef(null);

  useEffect(() => {
    if (!mapRef.current) {
      const map = L.map('map').setView([51.505, -0.09], 13);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      // Update routing control with waypoints
      const routingControl = L.Routing.control({
        waypoints: waypoints,
        routeWhileDragging: true,
      }).addTo(map);

      mapRef.current = map;
    }
  }, [waypoints]);

  return <div id="map" style={{ height: '400px' }}></div>;
}

export default Map;
