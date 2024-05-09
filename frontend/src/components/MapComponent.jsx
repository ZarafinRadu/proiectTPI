"use client";

import React, { useEffect, useState } from 'react';
import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
  InfoWindow,
} from "@vis.gl/react-google-maps";
const MapComponent = () => {
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/vehicle/locations');
        if (!response.ok) {
          throw new Error('Failed to fetch vehicle locations');
        }
        const data = await response.json();
        setVehicles(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  
  return (
    <APIProvider apiKey={'AIzaSyBrFMgR4t1NCeA8wQ-LPbVGc7VFLzOYSjM'}>
    <div style={{ width: '100%', height: '100vh' }}>
      <Map defaultZoom={10} defaultCenter={{ lat: 44.43514609777859, lng: 26.088649117049073 }} mapId={'4412112dff90156f'}>
      {vehicles.map(vehicle => (
          <AdvancedMarker
            key={vehicle.id}
            position={{ lat: vehicle.latitude, lng: vehicle.longitude }}
            title={`${vehicle.make} ${vehicle.model}`}
          />
        ))}
      </Map>
    </div>
    </APIProvider>
  );

};

export default MapComponent;

/*
const Map = withScriptjs(
    withGoogleMap(() => (
      <GoogleMap defaultZoom={10} defaultCenter={{ lat: 44.43514609777859, lng: 26.088649117049073 }}>
        {vehicles.map(vehicle => (
          <Marker
            key={vehicle.id}
            position={{ lat: vehicle.latitude, lng: vehicle.longitude }}
            title={`${vehicle.make} ${vehicle.model}`}
          />
        ))}
      </GoogleMap>
    ))
    
  );

googleMapURL={`https://maps.googleapis.com/maps/api/js?key=AIzaSyBrFMgR4t1NCeA8wQ-LPbVGc7VFLzOYSjM&libraries=geometry,drawing,places`}
        loadingElement={<div style={{ height: '100%' }} />}
        containerElement={<div style={{ height: '100%' }} />}
        mapElement={<div style={{ height: '100%' }} />}
        */