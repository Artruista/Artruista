import React, { useState, useCallback, useRef } from 'react'; 
import { useSelector } from 'react-redux';
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow
} from '@react-google-maps/api';


import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';


import MapSearch from './MapSearch.jsx';
import MapGeolocation from './MapGeolocation.jsx';



const useStyles = makeStyles((theme) => ({
  cardGrid: {
    paddingTop: theme.spacing(6),
    paddingBottom: theme.spacing(6),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    // boxShadow: '0 3px 5px 2px rgba(45, 29, 32, .3)'
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 0,
  }, 

  button: {
    alignItems: 'center',
    justifyContent: 'center'
  }
}));


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

  const classes = useStyles();
  // getting coordinates from userData to put markers on map
  const coors = useSelector(state => state.userCard);


  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries
  });

  // array to iterate through based on user interaction with map, if markers are to be placed
  // const [markers, setMarkers] = useState([]);

  // get location when click on marker
  const [selected, setSelected] = useState(null);

  
  const mapRef = useRef();
  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []); 

  const panTo = useCallback(({lat,lng}) => {
    // pan to that marker
    mapRef.current.panTo({lat, lng});
    // and want map to zoom to hat location
    mapRef.current.setZoom(8);
  }, []);

  if (loadError) return 'Error loading maps';
  if (!isLoaded) return 'Loading Maps';


  return (
    <div>
      <MapSearch panTo={panTo}/>
      <MapGeolocation panTo={panTo} />


      <GoogleMap 
      mapContainerStyle={mapContainerStyle} 
      zoom={8}
      center={center}
      options={options}
      // onClick={handleMarker}
      onLoad={onMapLoad}
      >
        {coors.map((coordinates,i) => 
        <Marker 
          key={i}
          position={{ lat: coordinates.lat, lng: coordinates.lng }}
          onClick={() => {
            // when user picks a specific pin, a pop up will appear with some info and chance to open up their specific card
            setSelected(coordinates);
          }}
        />)}
      
      {selected ? (<InfoWindow position={{ lat: selected.lat, lng: selected.lng }} onCloseClick={() => {setSelected(null)}}>
        <React.Fragment>
              <CssBaseline />
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.cardMedia}
                    image="https://source.unsplash.com/random"
                    title="Image title"
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {selected.firstName} 
                    </Typography>
                    <Typography>
                      {selected.story}
                    </Typography>
                    <Typography>
                      {selected.help}
                    </Typography>
                  </CardContent>
                  <CardActions className={classes.button}>
                  <Button size="small" color="primary">
                      View
                    </Button>
                  </CardActions>
                </Card>
    </React.Fragment>
      </InfoWindow>) : null}
      </GoogleMap>
    </div>
  )
}

