import React, { useState, useCallback, useRef } from 'react'; 
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow
} from '@react-google-maps/api';


import MapSearch from './MapSearch.jsx';
import MapGeolocation from './MapGeolocation.jsx';

const libraries = ['places'];
const mapContainerStyle = {
  // width: '100vw',
  width: '100%',
  height: '100vh',
};

// hardcoding where center of map is, need to go back and get this from geolocation
const center = {
  lat: 33.684566,
  lng: -117.826508,
};

// styling for map, only allowing zoomControl @10:45
const options = {
  disableDefaultUI: true,
  zoomControl: true,
};

export default function Map() {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries
  });

  // array to iterate through based on user interaction with map, if markers are to be placed
  const [markers, setMarkers] = useState([]);

  // get location when click on marker
  const [selected, setSelected] = useState(null);

/*   // useCallback will make it so function will change on input change only 

  NEED TO LOOK INTO THIS AND WHY ITS NOT STORING STATE

  const onMapClick = useCallback((e) => {
    // synthetic e gives location of click aka where to place markers
    console.log(e);

    // gives coordinates on map which is where markers can be placed
    setMarkers((current) => [
      ...current,
      {
        lat: e.latLng.lat(),
        lng: e.latLng.lng()
      }
    ]);
    console.log(markers);
  }, []);
  */

  const mapRef = useRef();
  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []); 

  const panTo = useCallback(({lat,lng}) => {
    // pan to that marker
    mapRef.current.panTo({lat, lng});
    // and want map to zoom to hat location
    mapRef.current.setZoom(14);
  }, []);

  if (loadError) return 'Error loading maps';
  if (!isLoaded) return 'Loading Maps';

  // func to place markers on map
  const handleMarker = (e) => {
    // synthetic e gives location of click aka where to place markers
    // console.log(e);

    // gives coordinates on map which is where markers can be placed
    setMarkers((current) => [
      ...current,
      {
        lat: e.latLng.lat(),
        lng: e.latLng.lng()
      }
    ]);
    console.log(markers);
  };


  return (
    <div>
      <MapSearch panTo={panTo}/>
      <MapGeolocation panTo={panTo} />
      <GoogleMap 
      mapContainerStyle={mapContainerStyle} 
      zoom={8}
      center={center}
      options={options}
      onClick={handleMarker}
      onLoad={onMapLoad}
      >
        {markers.map((marker,i) => 
        <Marker 
          key={i}
          position={{ lat: marker.lat, lng: marker.lng }}
          onClick={() => {
            setSelected(marker);
          }}
        />)}

      {selected ? (<InfoWindow position={{ lat: selected.lat, lng: selected.lng }} onCloseClick={() => {setSelected(null)}}>
        <div>
          <h2>This will show persons name or whatevs</h2>
        </div>
      </InfoWindow>) : null}
      </GoogleMap>
    </div>
  )
}

