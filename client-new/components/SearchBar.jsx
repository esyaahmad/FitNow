import { View } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

export default function SearchBarMaps({searchedLocation}) {
    
  return (
    <View>
      <GooglePlacesAutocomplete
        placeholder="Search Nearby FitNow"
        enablePoweredByContainer={false}
        fetchDetails={true}
        onPress={(data, details = null) => {
          // 'details' is provided when fetchDetails = true
          searchedLocation(details?.geometry?.location)
        }}
        query={{
          key: "AIzaSyBNgovQiqo1x10YO3JM0ysIa6iMR_uqSy4",
          language: "en",
        }}
      />
    </View>
  );
}
