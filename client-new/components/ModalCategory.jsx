import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import {
  Modal,
  SafeAreaView,
  View,
  Text,
  Dimensions,
  Image,
  StyleSheet,
  Pressable,
  ScrollView,
} from "react-native";
import { GET_ALL_LOCATION } from "../queries";

const { width, height } = Dimensions.get("screen");
export default function ModalCategory({
  handleShowModal,
  categories,
  navigation,
}) {
  return (
    <Modal transparent={true}>
      <SafeAreaView>
        <View
          style={{
            backgroundColor: "#fff",
            width: width,
            height: 0.75 * height,
            top: 0.3 * height,
            position: "relative",
            borderRadius: 10,
            shadowOpacity: 0.3,
            shadowColor: "gray",
            // paddingTop: 100,
          }}
        >
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={styles.textSubTitle}>Sports Category</Text>
            <Pressable onPress={handleShowModal}>
              <Text style={{ alignSelf: "flex-end", padding: 10 }}>X</Text>
            </Pressable>
          </View>
          <ScrollView>
            {categories?.map((el, idx) => {
              return (
                <Pressable
                  key={el.name + idx}
                  onPress={() => {
                    navigation.navigate("Maps", { categoryId: el._id })
                    handleShowModal()
                  }
                  }
                >
                  <View
                    style={{
                      borderWidth: 1,
                      height: 90,
                      borderColor: "gray",
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 10,
                    }}
                    key={idx}
                  >
                    <Image
                      source={{
                        uri: `${el.logo}`,
                      }}
                      style={styles.categoryImage}
                    />
                    <Text style={styles.textCategory}>{el.name}</Text>
                  </View>
                </Pressable>
              );
            })}
            <Pressable
              onPress={() => navigation.navigate("Maps")}
            >
              <View
                style={{
                  borderWidth: 1,
                  height: 90,
                  borderColor: "gray",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 10,
                }}
              >
                <Image
                  source={{
                    uri: `https://drive.google.com/uc?id=1JAFi-y3JnK5KD8aJdUDHR2JocjrptYqV`,
                  }}
                  style={styles.categoryImage}
                />
                <Text style={styles.textCategory}></Text>
              </View>
            </Pressable>

          </ScrollView>
        </View>
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  categoryImage: {
    width: 60,
    height: 60,
    borderRadius: 50,
    marginLeft: 7,
  },
  textSubTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 10,
    marginVertical: 20,
  },
  textCategory: {
    fontSize: 20,
  },
});
