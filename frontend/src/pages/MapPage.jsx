<<<<<<< HEAD
import Map from "../components/Map"

const MapPage = () =>{
    return <Map/>
=======
import React from 'react';
import MapComponent from '../components/MapComponent';

const MapPage = () =>{
    return <>
    <div style={{ width: '100%', height: '500px' }}>
    <MapComponent
    googleMapURL={`https://maps.googleapis.com/maps/api/js?key=AIzaSyBrFMgR4t1NCeA8wQ-LPbVGc7VFLzOYSjM&libraries=geometry,drawing,places`}
    loadingElement={<div style={{ height: '100%' }} />}
    containerElement={<div style={{ height: '100%' }} />}
    mapElement={<div style={{ height: '100%' }} />}/>
    </div>
    </>
>>>>>>> 235a2fa1f1d21d99d4d4e4eca017068f6a8e9a5d
}

export default MapPage