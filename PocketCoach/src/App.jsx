import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { useRef, useEffect } from 'react'
import mapboxgl from 'mapbox-gl'

import 'mapbox-gl/dist/mapbox-gl.css';
import './App.css'

function App() {

  const mapRef = useRef()
  const mapContainerRef = useRef()

  useEffect(() => {
    mapboxgl.accessToken = 'pk.eyJ1IjoiaXRvcmt5aSIsImEiOiJjbWdwaDcxbWEyYXNnMmpuMmpjOTN2eHFnIn0.LqEr4aEUZgaTRyTtb48Wuw'
    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
    });

    return () => {
      mapRef.current.remove()
    }
  }, [])

  return (
    <>
      <h1> Map a Run </h1>
      <div id='map-container' ref={mapContainerRef}/>
      <button id='save-button'> 
        Save Route 
      </button>
      <label class="switch">
        <input type="checkbox"/>
        <span class="slider"></span>
      </label>
    </>
  )
}

export default App
