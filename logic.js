import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import ReactDOM from 'react-dom/client';


import 'mapbox-gl/dist/mapbox-gl.css';

const MapboxExample = () => {
  const mapContainerRef = useRef();
  const mapRef = useRef();

  useEffect(() => {
    
    mapboxgl.accessToken = 'pk.eyJ1IjoiaXRvcmt5aSIsImEiOiJjbTIyNnhyOHkwNDZxMmlweDVxaWd2cGhkIn0.VAohZ0eWaG6Sx3-WK_y_HA';

    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      center: [-74.5, 40], // starting position [lng, lat]
      zoom: 9 // starting zoom
    });
  });

  return (
    <div
      style = {{height: '100%'}}
      ref = {mapContainerRef}
      className = "map-container"
    />
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<MapboxExample />);

export default MapboxExample;