import { useState } from 'react'
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
import { useRef, useEffect } from 'react'
//import mapboxgl from 'mapbox-gl'
//import * as turf from "@turf/turf";
import { Link } from 'react-router-dom'

export function Home(){
    return(
        <>
            <h3 class="title">Pocket Coach</h3>
            <Link to="/maproute">
                <button id="tomapbutton"> Map a Route</button>
            </Link>
        </>
    )
}