import {
  Dimensions,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import { formatCapital } from "../utils/formatCapital";
import { NavigationProp } from "@react-navigation/native";
import { GET_PROFILE_COACH, GET_PROFILE_USER } from "../queries";
import { useQuery } from "@apollo/client";
import { useContext } from "react";
import { LoginContext } from "../contexts/LoginContext";

const { width, height } = Dimensions.get("screen");
const ChatListScreen = ({ navigation }) => {
  const { role } = useContext(LoginContext);
  if (role !== "Coach") {
    const { data, error, loading } = useQuery(GET_PROFILE_USER, {
      fetchPolicy: "no-cache",
    });
    console.log(data);
    console.log(error, "ini error");
    let userChats = data?.getUserById;
    // console.log(userChats?.Coach);
    // console.log(data?.getUserById.Coach, "ini data loh");
    return (
      <SafeAreaView style={styles.container}>
        <View>
          <Text style={styles.textTitleChat}>Chats</Text>
        </View>
        {userChats?.Coach?.map((el, idx) => {
          return (
            <TouchableOpacity
              style={styles.containerStatus}
              // CARA MELEMPAR PARAMS
              onPress={() =>
                navigation.navigate("ChatRoom", {
                  dataChats: el._id,
                })
              }
              key={idx}
            >
              {/*  INI PUNYA TRAINER NYA */}
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Image
                  source={{
                    uri: `https://xsgames.co/randomusers/avatar.php?g=male`,
                  }}
                  style={styles.trainerImage}
                />
                <Text style={styles.textName}>{el.name}</Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </SafeAreaView>
    );
  } else {
    const { data, error, loading } = useQuery(GET_PROFILE_COACH, {
      fetchPolicy: "no-cache",
    });
    // console.log(userChats?.Coach);
    // console.log(data?.getUserById.Coach, "ini data loh");
    console.log(data?.getProfileCoach.UserJoin, "ini data loh");
    return (
      <SafeAreaView style={styles.container}>
        <View>
          <Text style={styles.textTitleChat}>Chats</Text>
        </View>
        {data?.getProfileCoach.UsersJoin?.map((el, idx) => {
          // console.log(el, "ini el");
          console.log(el, 'ini ele');
          return (
            <TouchableOpacity
              style={styles.containerStatus}
              // CARA MELEMPAR PARAMS
              onPress={() =>
                navigation.navigate("ChatRoom", {
                  dataChats: el._id,
                  Username: el.name,
                })
              }
              key={idx}
            >
              {/*  INI PUNYA TRAINER NYA */}
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Image
                  source={{
                    uri: `${el.imageUrl}`,
                  }}
                  style={styles.trainerImage}
                />
                <Text style={styles.textName}>{el.name}</Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </SafeAreaView>
    );
  }
};

export default ChatListScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    height,
    borderRadius: 10,
  },
  containerStatus: {
    backgroundColor: "#20488f",
    paddingVertical: 20,
    marginHorizontal: 10,
    borderRadius: 2,
    borderWidth: 1,
    borderColor: "gray",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  trainerImage: {
    width: 60,
    height: 60,
    borderRadius: 50,
    marginBottom: 5,
    marginHorizontal: 14,
  },

  textTitleChat: {
    fontWeight: "bold",
    fontSize: 30,
    marginLeft: 20,
    marginBottom: 30,
  },
  textName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
});
