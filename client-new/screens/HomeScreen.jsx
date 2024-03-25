import { MouseEventHandler, useState } from "react";
import {
  View,
  Text,
  Pressable,
  Image,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import ModalCategory from "../components/ModalCategory";
import { NavigationProp } from "@react-navigation/native";
import Carousel from "../components/Carousel";
import { useQuery } from "@apollo/client";
import { GET_ALL_CATEGORY } from "../queries";

const { width, height } = Dimensions.get("screen");
const HomeScreen = ({ navigation }) => {
  const { data, error, loading } = useQuery(GET_ALL_CATEGORY, {
    fetchPolicy: "no-cache",
  });
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => {
    setShowModal(!showModal);
  };

  const categories = data?.getAllCategory;
  const event = [1, 2, 3];
  return (
    <SafeAreaView style={styles.container}>
      <Carousel />
      {/* <View style={styles.descriptionContainer}>
        <Text style={styles.title}>FitNow</Text>
        <Text style={styles.descriptionText}>
          "Experience the convenience of training anytime, anywhere. Our app
          allows you to follow your training courses at your own pace, fitting
          seamlessly into your busy schedule."
        </Text>
      </View> */}

      <Text style={styles.textSubTitle}>Sports Category</Text>
      <View style={styles.categoryContainer}>
        {categories?.slice(0, 3).map((el, idx) => {
          return (
            <Pressable
              key={idx}
              onPress={() =>
                navigation.navigate("Maps", {
                  // NANTI BASKETBALL NYA DIGANTI DENGAN VALUE CATEGORY DARI DATABASE
                  categoryId: el._id,
                })
                // console.log(el._id)

                // navigation.navigate("Maps", {
                //   // NANTI BASKETBALL NYA DIGANTI DENGAN VALUE CATEGORY DARI DATABASE
                //   CategoryId: "basketball",
                // })
                // navigation.navigate("Maps")
              }
            >
              <Image
                source={{
                  uri: `${el.logo}`,
                }}
                style={styles.categoryImage}
              />
              <Text>{el.name}</Text>
            </Pressable>
          );
        })}
        <Pressable onPress={handleShowModal}>
          <Image
            source={{
              uri: "https://cdn.iconscout.com/icon/premium/png-256-thumb/more-9467911-7688655.png",
            }}
            style={styles.seeAllIcon}
          />

          <Text style={{ alignSelf: "center" }}>See All</Text>
        </Pressable>
      </View>
      {showModal && (
        <ModalCategory
          handleShowModal={handleShowModal}
          categories={categories}
          navigation={navigation}
        />
      )}

      <Text style={styles.textSubTitle}>Events</Text>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        {event?.map((el, idx) => {
          return (
            <View
              key={idx}
              style={{
                backgroundColor: "gray",
                marginTop: 10,
                // marginBottom: 70,
                // paddingVertical: 20,
                marginHorizontal: 10,
                borderRadius: 5,
                height: 150,
                width: 250,
                shadowOpacity: 0.2,
                shadowRadius: 3,
              }}
            >
              {idx % 2 == 0 ? (
                <>
                  <Image
                    source={{
                      uri: "https://i.pinimg.com/736x/bd/64/da/bd64da8db9c199161033473dc3fb834a.jpg",
                    }}
                    style={styles.advertisingImage}
                  />
                </>
              ) : (
                <>
                  <Image
                    source={{
                      uri: "https://static.vecteezy.com/system/resources/previews/005/753/722/original/tennis-tournament-background-abstract-sport-symbol-template-design-banner-for-sport-event-illustrations-vector.jpg",
                    }}
                    style={styles.advertisingImage}
                  />
                </>
              )}
            </View>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
  },
  title: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#fff",
    alignSelf: "center",
  },
  categoryContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 20,
    marginBottom: 20,
    rowGap: 50,
    columnGap: 5,
    // backgroundColor: "#20488f",
  },
  categoryImage: {
    width: 80,
    height: 80,
    borderRadius: 50,
    marginBottom: 5,
  },
  seeAllIcon: {
    width: 80,
    height: 80,
    borderRadius: 50,
    marginBottom: 5,
  },
  advertisingImage: {
    width: 250,
    height: 150,
  },
  descriptionContainer: {
    marginTop: 20,
    alignItems: "center",
    backgroundColor: "#20488f",
    paddingVertical: 40,
    marginHorizontal: 10,
    borderRadius: 20,
  },
  descriptionText: {
    marginTop: 10,
    fontSize: 20,
    textAlign: "center",
    color: "#fff",
    marginHorizontal: 18,
    fontStyle: "italic",
  },
  textSubTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 10,
    marginBottom: 20,
    marginTop: 35,
  },
});
