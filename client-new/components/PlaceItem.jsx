import { Dimensions, Image, Pressable, Text, View } from "react-native";


export default function PlaceItem({ place, navigation }) {

  return (
    <View style={{ width: Dimensions.get('screen').width * 0.9, backgroundColor: 'white', margin: 5, borderRadius: 10 }}>
      <Image source={{ uri: place.imageUrl[1] }} style={{ width: '100%', borderRadius: 10, height: 130 }} />
      <View style={{ padding: 15 }}>
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{place.name}</Text>
        <Text style={{ fontSize: 15, color: 'grey' }}>{place.address}</Text>
        {/* <Text style={{ fontSize: 15, color: 'grey' }}>Category: {place?.Category.name}</Text> */}

        <Pressable
          onPress={() =>
            navigation.navigate("ListCoach", {Coachs: place?.Coachs})
          }
          style={{    backgroundColor: "#20488f",
          borderRadius: 20,
          paddingVertical: 10,
          paddingHorizontal: 10,
          marginTop: 10,
          }}
        >
          <Text style={{
             color: "#fff",
             fontWeight: "bold",
             fontSize: 18,
             textAlign: 'center'
          }}>Check Trainers</Text>
        </Pressable>


      </View>
    </View>
  )
}
