import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { useRef, useEffect } from 'react'
import mapboxgl from 'mapbox-gl'
import * as turf from "@turf/turf";

import 'mapbox-gl/dist/mapbox-gl.css';

export function MapRoute(){
  const mapRef = useRef()
  const mapContainerRef = useRef()
  const markersRef = useRef([])
  const [points, setPoints] = useState([]);
  //const [routecoords, setRouteCoords] = useState([]);
  //adding a state variable for distance to later display it
  const [distance, setDistance] = useState(0);
  //GeoJSON object for line
  /*const route = {
  type: "Feature",
  geometry: {
    type: "LineString",
    coordinates: points
    }
  };*/


  //React state to hold user's position
  const [userLocation, setUserLocation] = useState(null);

  const handleUndo = () => {
    const lastMarker = markersRef.current[markersRef.current.length - 1];

    //remove the marker obj
    if(lastMarker){
      lastMarker.remove();
      markersRef.current.pop(); 
    }
    
    
    //remove the path obj
    setPoints(prev => {
    
    const updated = prev.slice(0, -1);

    //If there are 2+ points left, update the route line
      if (updated.length > 1) {
        const route = {
          type: "Feature",
          geometry: {
          type: "LineString",
          coordinates: updated
        }
      };

      if (mapRef.current.getSource("route")) {
        mapRef.current.getSource("route").setData(route);
      }

      //recalculate distance
      const newDistance = turf.length(route, { units: "miles" });
      setDistance(newDistance);
    } 
    else {
      //if not enough points to draw a line → remove it
      if (mapRef.current.getLayer("route-line")) {
        mapRef.current.removeLayer("route-line");
      }
      if (mapRef.current.getSource("route")) {
        mapRef.current.removeSource("route");
      }

      //reset distance
      setDistance(0);
    }

    return updated;
  });
      
    
  };



    useEffect(() => {
    //ask the browser for the user's current position
    console.log("Asking for geolocation...");
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          //store the coordinates in state
          const { latitude, longitude } = position.coords;
          console.log("setting!")
          setUserLocation([longitude, latitude]);
        },
        (error) => {
          console.warn("Error getting location:", error);
          //fall back to a default (San Francisco)
          setUserLocation([-122.4376, 37.7577]);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0
        }
      );
    } else {
      console.warn("Geolocation not supported by this browser.");
      setUserLocation([-122.4376, 37.7577]);
    }
  }, []); //run only once on mount


//initialize the map and add the click handler
  useEffect(() => {

    if (!userLocation){
      console.log("didn't load!")
      return;
    } 

    mapboxgl.accessToken = 'pk.eyJ1IjoiaXRvcmt5aSIsImEiOiJjbWdwaDcxbWEyYXNnMmpuMmpjOTN2eHFnIn0.LqEr4aEUZgaTRyTtb48Wuw'
    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      center: userLocation,
      zoom: 14
    });


    function handleMapClick(event) {
      //event.lngLat is a Mapbox object containing { lng, lat }
      const lng = event.lngLat.lng;
      const lat = event.lngLat.lat;

      //Create a new DOM marker and add it to the map
      const marker = new mapboxgl.Marker({color: "orange"})
        .setLngLat([lng, lat]) //Mapbox expects [lng, lat]
        .addTo(mapRef.current);

      //Store the marker object so we can remove it later if needed
      markersRef.current.push(marker);

      //Update React state so the UI (React) can show the list of points
      setPoints(prev => { const updated = [...prev, [lng, lat]];
        if(updated.length > 1){

          const route = {
          type: "Feature",
          geometry: {
            type: "LineString",
            coordinates: updated
            }
          };

      if(mapRef.current.getSource("route")) {
      mapRef.current.getSource("route").setData(route);

      }else{
        mapRef.current.addSource("route", { type: "geojson", data: route });
        mapRef.current.addLayer({
          id: "route-line",
          type: "line",
          source: "route",
          paint: {
            "line-color": "#FF8800",
            "line-width": 4
          }
        });
      }
      
      //computing the distance
      const new_distance = turf.length(route, { units: "miles" });
      setDistance(new_distance);
      //console.log("Total distance (miles):", distance.toFixed(2));
      
    }

    return updated;

    });
  }
  



    //attach the click listener
    mapRef.current.on("click", handleMapClick);



    return () => {

      //remove click listener
      if (mapRef.current) {
        mapRef.current.off("click", handleMapClick);
      }

      //remove all marker objects from the map
      markersRef.current.forEach(m => m.remove());
      markersRef.current = [];
      
      mapRef.current.remove()

    }
  }, [userLocation]);

  return (
    <>
      <div id='header-container'/>
      <h1> Map a Run </h1>
      <button id='undo-button' onClick={handleUndo}>
        Undo
      </button>
      <h2> Distance: {distance.toFixed(2)}</h2>
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