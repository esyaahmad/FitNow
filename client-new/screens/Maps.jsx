import { View, StyleSheet, Image, Text } from "react-native";
// import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useContext, useEffect, useState } from "react";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import MapViewStyle from "../utils/MapViewStyle.json";
import { UserLocationContext } from "../contexts/UserLocationContext";
import SearchBarMaps from "../components/SearchBar";
import MarkerList from "../components/MarkerList";
import PlaceListFitNow from "../components/PlaceList";
import { SelectMarkerContext } from "../contexts/SelectMarkerContext";
import { useQuery } from "@apollo/client";
import { GET_ALL_LOCATION, GET_ALL_LOCATION_BY_CATEGORY } from "../queries";

const Maps = ({ route, navigation }) => {
  const { categoryId } = route.params
  // console.log(categoryId, 'ini category Id di Maps');
  const [selectedMarker, setSelectedMarker] = useState([])
  const { location, setLocation } = useContext(UserLocationContext);
  // const places = require('../data.json')

  const { data, error, loading } = useQuery(GET_ALL_LOCATION_BY_CATEGORY, {
    variables: { categoryId }
  })
  // console.log(data, 'ini data');
  const [placeList, setPlaceList] = useState([])

  const GetNearbyPlace = () => {
    const newPlace = data?.getLocationByCategory
    // console.log(newPlace, 'ini places');
    setPlaceList(newPlace)
    // console.log(placeList, 'ini placeList');
  }

  useEffect(() => {
    if (location) {
      GetNearbyPlace();
    }
  }, [location]);

  // console.log(places, 'ini places' );

  // console.log(placeList, "ini placelist");

  // return <></>
  return (
    location?.latitude && (
      <>
        <SelectMarkerContext.Provider value={{ selectedMarker, setSelectedMarker }}>

            <View>
              <View style={{ position: "absolute", zIndex: 10, padding: 10, width: "100%", paddingHorizontal: 20 }}>

                <SearchBarMaps searchedLocation={(location) => console.log(location)} />
              </View>
              <MapView
                style={styles.map}
                provider={PROVIDER_GOOGLE}
                showsUserLocation={true}
                customMapStyle={MapViewStyle}
                region={{ latitude: location?.latitude, longitude: location?.longitude, latitudeDelta: 0.0422, longitudeDelta: 0.421 }}
              >
                <Marker coordinate={{ latitude: location?.latitude, longitude: location?.longitude }}>
                  {/* <Image source={require("../assets/person-mark.png")} style={{ width: 60, height: 60 }} /> */}
                </Marker>
                {placeList?.map((item, index) => (
                  <MarkerList key={index} places={item} index={index} />
                ))}
              </MapView>
            </View>
            <View style={styles.placeList}>
              {/* <Text>{JSON.stringify(placeList)}</Text> */}
              {placeList?.length > 0 && <PlaceListFitNow places={placeList} navigation={navigation} />}
            </View>
          
        </SelectMarkerContext.Provider>

      </>
    )
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
  placeList: {
    position: "absolute",
    bottom: 0,
    zIndex: 10,
    width: "100%",
  },
});

export default Maps;
