import React from 'react';
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from '@reach/combobox';
// import '@reach/combobox/styles.css';




const MapSearch = ({panTo}) => {


  const { ready, value, suggestions: { status, data }, setValue, clearSuggestions } = usePlacesAutocomplete({
    requestOptions: {
      location: { lat: () => 33.684566, lng: () => -117.826508 },
      radius: 200 * 1000,
    },
  });




  return (
    <Combobox
      onSelect={async (address) => {
        // doing these to clear search suggestions
        // we already know what value the user selected so we don't need to go to google API for another query
        setValue(address, false);
        // so we no longer show suggestions to user
        clearSuggestions();


        // convert address to a lat and long in order to reposition map to this location
        // console.log(address);
        try {
          // want pass address into getGeoCode func and await for its results
          const results = await getGeocode({address});
          // we get many results, but want first result returned from google and using getLatLng we get the lat and long
          const {lat, lng } = await getLatLng(results[0]);
          // sending these coordinates to map to pan to this location after user selects location
          panTo({lat, lng});
        }
        catch(err){
          conosle.log(err);
        }

      }}
    >
    <ComboboxInput
      value={value}
      onChange={(e) => {
        setValue(e.target.value);
      }}
      disabled={!ready}
      placeholder='Where do you want to help?'
    />
    <ComboboxPopover>
      <ComboboxList>
      {status === 'OK' && data.map((id, description) => {
        <ComboboxOption 
          key={id}
          value={description}
        />
      })}
      </ComboboxList>
    </ComboboxPopover>
    </Combobox>
  );
};




export default MapSearch;
