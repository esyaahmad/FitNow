import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  Pressable,
  Image,
  Dimensions,
} from "react-native";
import { useState } from "react";
import { Dropdown } from "react-native-element-dropdown";

const data = [
  { label: "Tangerang", value: "1" },
  { label: "Ambon", value: "2" },
  { label: "Padang", value: "3" },
  { label: "Manado", value: "4" },
];
const dataCategory = [
  { label: "Basketball", value: "1" },
  { label: "Tennis", value: "2" },
  { label: "Yoga", value: "3" },
  { label: "Badminton", value: "4" },
];

const { height } = Dimensions.get("screen");
const RegisterTrainerScreen = ({ navigation }) => {
  // const [showModalAvatar, setShowModalAvatar] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [categoryValue, setCategoryValue] = useState(null);
  const [locationValue, setLocationValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

  const handleRegister = () => {
    // VARIABLE YANG AKAN DIBUTUHKAN UNTUK REGISTER
    console.log(name, email, password, imageUrl);
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          marginTop: 50,
          marginBottom: 30,
          alignItems: "center",
          // backgroundColor: "gray",
        }}
      >
        <Text style={styles.title}>FitNow</Text>
        <Text style={styles.subTitle}>Register New Trainer</Text>
      </View>
      <View style={{ alignItems: "center" }}>
        <TextInput
          style={styles.inputLabel}
          placeholder="Name"
          onChangeText={setName}
        />
        <TextInput
          style={styles.inputLabel}
          placeholder="Email"
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.inputLabel}
          secureTextEntry
          placeholder="Password"
          onChangeText={setPassword}
        />
        <TextInput
          style={styles.inputLabel}
          placeholder="Image Url"
          onChangeText={setImageUrl}
        />
        <Dropdown
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          data={dataCategory}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={!isFocus ? "Select Category" : "..."}
          searchPlaceholder="Search..."
          value={categoryValue}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={(item) => {
            setCategoryValue(item.value);
            setIsFocus(false);
          }}
        />
        <Dropdown
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          data={data}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={!isFocus ? "Select location" : "..."}
          searchPlaceholder="Search..."
          value={locationValue}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={(item) => {
            setLocationValue(item.value);
            setIsFocus(false);
          }}
        />
      </View>
      <TouchableOpacity
        style={{ alignItems: "center" }}
        onPress={handleRegister}
      >
        <View style={styles.button}>
          <Text style={styles.textBottom}>Register</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("HomeAdm")}>
        <View
          style={{
            margin: 12,
            padding: 10,
            justifyContent: "center",
            marginBottom: 170,
            alignSelf: "center",
          }}
        >
          <Text style={{ color: "blue" }}>Go to home</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default RegisterTrainerScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
    minHeight: height,
  },
  inputLabel: {
    height: 50,
    width: 300,
    margin: 12,
    borderWidth: 2,
    borderColor: "gray",
    borderRadius: 10,
    padding: 10,
    fontSize: 18,
    backgroundColor: "#fff",
  },
  textBottom: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  button: {
    height: 50,
    width: 300,
    margin: 12,
    padding: 10,
    backgroundColor: "#20488f",
    borderRadius: 10,
    justifyContent: "center",
  },
  textRegister: {
    textAlign: "center",
    fontWeight: "bold",
    color: "#0765ff",
  },
  title: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#20488f",
  },
  subTitle: {
    fontSize: 20,
  },
  categoryImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 5,
  },
  dropdown: {
    height: 50,
    width: 300,
    margin: 12,
    borderColor: "gray",
    borderWidth: 2,
    borderRadius: 8,
    padding: 10,
  },
  placeholderStyle: {
    color: "gray",
  },
});
