import { useContext } from "react";
import { Image, View } from "react-native";
import { Marker } from "react-native-maps";
import { SelectMarkerContext } from "../contexts/SelectMarkerContext";


export default function MarkerList({places, index}){
    // console.log(places, 'ini marker');
    const {selectedMarker,setSelectedMarker} = useContext(SelectMarkerContext)
    
    return places&& (
        <Marker coordinate={{
            latitude: places.latitude,
            longitude: places.longitude
        }}
        // onPress={()=> console.log('marker', index)  
        onPress={()=> setSelectedMarker(index)

        }>
            <Image source={{uri: places?.Category?.marker}} style={{ width: 40, height: 50, resizeMode: 'stretch' }}/>
        </Marker>
    )
}