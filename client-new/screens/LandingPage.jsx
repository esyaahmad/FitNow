import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { NavigationProp } from "@react-navigation/native";

const LandingPage = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.navigate("Login")}
        style={{
          marginTop: 250,
          backgroundColor: "#fff",
          width: 280,
          height: 280,
          borderRadius: 200,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={styles.title}>FitNow</Text>
        <Text style={styles.textTagline}>Fit.Anytime.Anywhere</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.buttom}
        onPress={() => navigation.navigate("Login")}
      >
        <Text style={styles.textRegister}>Get Fit Now!</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LandingPage;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#20488f",
    alignItems: "center",
    // justifyContent: "space-between",
    flexDirection: "column",
    flex: 1,
  },
  buttom: {
    height: 50,
    width: 300,
    margin: 12,
    padding: 10,
    // backgroundColor: "#fff",
    borderRadius: 10,
    justifyContent: "center",
    // marginBottom: 80,
    position: "absolute",
    bottom: 80,
  },
  textRegister: {
    textAlign: "center",
    fontWeight: "bold",
    color: "#fff",
    fontSize: 28,
    // textShadowColor: "#20488f",
    // textShadowRadius: 10,
  },
  title: {
    fontSize: 60,
    fontWeight: "bold",
    color: "#20488f",
  },
  textTagline: {
    color: "#20488f",
    fontSize: 20,
    fontWeight: "bold",
  },
});
