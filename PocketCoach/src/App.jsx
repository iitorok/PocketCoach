/*import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { useRef, useEffect } from 'react'
import mapboxgl from 'mapbox-gl'
import * as turf from "@turf/turf";*/

//import 'mapbox-gl/dist/mapbox-gl.css';
import './App.css'
import { HashRouter as Router, Routes, Route } from 'react-router-dom'

//import all the pages
import { Home } from './home'
import { MapRoute } from './maproute'

//to navigate paths, /#/pathname

function App() {

  return(
    <Router>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/maproute" element={<MapRoute/>}/> 
      </Routes>
    </Router>
  )
}

export default App
