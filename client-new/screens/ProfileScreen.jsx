import {
  SafeAreaView,
  Text,
  View,
  Dimensions,
  StyleSheet,
  Image,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { NavigationProp } from "@react-navigation/native";
import { formatCapital } from "../utils/formatCapital";
import { useContext } from "react";
import { LoginContext } from "../contexts/LoginContext";
import { MaterialIcons } from "@expo/vector-icons";
import * as SecureStore from "expo-secure-store";
import { GET_PROFILE_USER } from "../queries";
import { useQuery } from "@apollo/client";

const { height } = Dimensions.get("screen");
const ProfileScreen = ({ navigation }) => {
  const { data, error, loading } = useQuery(GET_PROFILE_USER, {
    fetchPolicy: "no-cache",
  });
  console.log(data);
  const { setIsLoggedIn } = useContext(LoginContext);
  let user = data?.getUserById;
  // console.log(data.getUserById.Schedules, "ini data profile");
  if (loading) return <Text>Loading...</Text>
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.profileContainer}>
        {/* INI PUNYA USER YANG LAGI LOGIN */}
        <TouchableOpacity
          style={styles.logout}
          onPress={async () => {
            await SecureStore.deleteItemAsync("access_token");
            await SecureStore.deleteItemAsync("user_id");
            await SecureStore.deleteItemAsync("role");
            setIsLoggedIn(false);
            navigation.navigate("Login");
          }}
        >
          <MaterialIcons
            name="logout"
            size={30}
            color="black"
            style={{ alignSelf: "flex-end", color: "#fff", padding: 10 }}
          />
        </TouchableOpacity>
        <Image
          source={{
            uri: `${user?.imageUrl}`,
          }}
          style={styles.profileImage}
        />
        <View style={{ justifyContent: "center" }}>
          <Text style={styles.textName}>{user?.name}</Text>
          {/* <Text style={styles.textEmail}>{user?.email}</Text> */}
        </View>
      </View>
      <Text></Text>
      {user?.Coach.map((el, idx) => (
        <View key={el._id} style={styles.containerStatus}>
          {/*  INI PUNYA TRAINER NYA */}
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Image
              source={{
                uri: `https://xsgames.co/randomusers/avatar.php?g=male`,
              }}
              style={styles.trainerImage}
            />
            <Text style={{
              fontSize: 18,
              fontWeight: "bold",
              color: "#fff",
            }}>{el.name}</Text>
          </View>

          {/* INI KETGORINYA */}
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            {/* <Image
              source={{
                uri: "https://www.kindpng.com/picc/m/244-2443827_transparent-sports-icon-png-soccer-app-icon-png.png",
              }}
              style={styles.trainerImage}
            /> */}
            <View>

            <Text style={{
              fontSize: 18,
              fontWeight: "bold",
              color: "#fff",
            }}>{el.sport}</Text>
             <Text style={{
              fontSize: 18,
              fontWeight: "bold",
              color: "#fff",
            }}>Duration: 7 Day</Text>
            </View>

          </View>
        </View>
      ))}
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
    minHeight: height,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 5,
    alignSelf: "center",
  },
  trainerImage: {
    width: 60,
    height: 60,
    borderRadius: 50,
    marginBottom: 5,
    marginHorizontal: 14,
  },
  profileContainer: {
    gap: 10,
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 60,
    backgroundColor: "#20488f",
    shadowOpacity: 3,
    shadowRadius: 5,
    borderBottomEndRadius: 50,
    borderBottomStartRadius: 50,
    // flexDirection: "row",
  },
  textName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  textEmail: {
    fontSize: 20,
    color: "#fff",
    alignSelf: "center",
    padding: 5,
  },
  containerStatus: {
    backgroundColor: "#20488f",
    marginVertical: 5,
    paddingVertical: 20,
    marginHorizontal: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "gray",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    // gap: 10,
  },
  logout: {
    alignSelf: "flex-end",
    marginVertical: 10,
    backgroundColor: "#20488f",
    borderRadius: 20,
    padding: 5,
  },
});
