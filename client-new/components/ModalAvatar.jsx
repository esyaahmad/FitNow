import { Dispatch, SetStateAction } from "react";
import {
  Modal,
  SafeAreaView,
  View,
  Dimensions,
  Pressable,
  Text,
  Image,
  StyleSheet,
} from "react-native";

const testdoang = [
  {
    id: 1,
    imageUrl:
      "https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs/21760012/original/d4c0c142f91f012c9a8a9c9aeef3bac28036f15b/create-your-cartoon-style-flat-avatar-or-icon.jpg",
  },
  {
    id: "2",
    imageUrl:
      "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/e1eb0b30-372f-418d-89be-58e821a3639c/dbkeqxq-f874e128-c89a-430f-aa81-be3313742fa4.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2UxZWIwYjMwLTM3MmYtNDE4ZC04OWJlLTU4ZTgyMWEzNjM5Y1wvZGJrZXF4cS1mODc0ZTEyOC1jODlhLTQzMGYtYWE4MS1iZTMzMTM3NDJmYTQucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.h9_L-eGX0lcoFHw4jicbJIZyT6V-0Z1h6LSZXRGgYT4",
  },
  {
    id: "3",
    imageUrl: "https://drive.google.com/uc?id=13Oga0FHjEhbt-SHbw-ILNkOIq12tKuGg",
  },
  {
    id: "4",
    imageUrl: "https://drive.google.com/uc?id=1SiBtZRLO5jsQLYn5IDYjqwxrkgn3lbiw",
  },
  {
    id: "5",
    imageUrl: "https://drive.google.com/uc?id=1eTAiLP-1Aev1z4dtttgQmjfgsD179CqK",
  },
  {
    id: "6",
    imageUrl: "https://drive.google.com/uc?id=1u4ixL3UkVHxgg7NKViJI7276dp7JR7OG",
  },
  {
    id: "7",
    imageUrl: "https://drive.google.com/uc?id=1D4ZrsI0QSJsXq1b9A1aLjmiFpcINft5P",
  },
  {
    id: "8",
    imageUrl: "https://drive.google.com/uc?id=1RXE3zLTBD-YlwdE43ZzIA_4b-PMTTE7i",
  },
  {
    id: "9",
    imageUrl: "https://drive.google.com/uc?id=1-519yL_XMyNHrHMJcJdw6AgkqQ1dNl-0",
  },
];
const { width, height } = Dimensions.get("screen");
const ModalAvatar = ({ handleShowAvatar, setAvatar }) => {
  return (
    <Modal transparent={true}>
      <SafeAreaView>
        <View
          style={{
            backgroundColor: "#fff",
            width: width,
            height: 0.75 * height,
            top: 0.5 * height,
            position: "relative",
            borderRadius: 10,
            shadowOpacity: 0.3,
            shadowColor: "gray",

            // paddingTop: 100,
          }}
        >
          <Pressable onPress={handleShowAvatar}>
            <Text style={{ alignSelf: "flex-end", padding: 10 }}>X</Text>
          </Pressable>
          <View style={styles.avatarContainer}>
            {testdoang.map((el, idx) => {
              return (
                <Pressable key={idx} onPress={() => setAvatar(el.imageUrl)}>
                  <View style={styles.avatarContainer}>
                    <Image
                      source={{
                        uri: el.imageUrl,
                      }}
                      style={styles.imageAvatar}
                    />
                  </View>
                </Pressable>
              );
            })}
          </View>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

export default ModalAvatar;

const styles = StyleSheet.create({
  categoryImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 5,
  },
  avatarContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    marginHorizontal: 2,
    marginTop: 10,
    rowGap: 10,
    columnGap: 30,
  },
  imageAvatar: {
    width: 80,
    height: 80,
    borderRadius: 50,
    marginBottom: 5,
  },
});
