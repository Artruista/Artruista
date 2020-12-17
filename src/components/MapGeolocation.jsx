import React from 'react';


const MapGeolocation = ({panTo}) => {
  return (
    <button onClick={() => {
      // we have two cb funcs, one if error and one if success, which we replace to check position
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // position gives you lat and long, so want to pass that to panTo
          console.log(position)
          panTo({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
      () => null);
    }}
    > Go to your location!</button>
  );
};




export default MapGeolocation;
