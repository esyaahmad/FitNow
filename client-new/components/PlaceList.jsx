import { FlatList, View, Text, Dimensions } from "react-native";
import PlaceItem from "./PlaceItem";
import { useContext, useEffect, useRef } from "react";
import { SelectMarkerContext } from "../contexts/SelectMarkerContext";

export default function PlaceListFitNow({ places, navigation, category }) {
  //   console.log(places);
  const flatListRef = useRef(null);
  const { selectedMarker, setSelectedMarker } = useContext(SelectMarkerContext);

  useEffect(() => {
    selectedMarker && scrollToIndex(selectedMarker);
  }, [selectedMarker]);

  const scrollToIndex = (index) => {
    flatListRef.current?.scrollToIndex({ animated: true, index });
  };
  const getItemLayout = (_, index) => ({
    length: Dimensions.get("window").width,
    offset: Dimensions.get("window").width * index,
    index,
  });
  return (
    <View>
      {/* <Text>{JSON.stringify(places)}</Text> */}
      <FlatList
        data={places}
        horizontal={true}
        pagingEnabled
        ref={flatListRef}
        getItemLayout={getItemLayout}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <View key={index} style={{ marginLeft: 20 }}>
            {/* <Text>{JSON.stringify(item)}</Text> */}
            <PlaceItem
              place={item}
              navigation={navigation}
              category={category}
            />
          </View>
        )}
      />
    </View>
  );
}
