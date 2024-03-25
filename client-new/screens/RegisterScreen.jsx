import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  Pressable,
  Image,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { useState } from "react";
import ModalAvatar from "../components/ModalAvatar";
import { useMutation } from "@apollo/client";
import { REGISTER } from "../queries";
import RadioButton from "../components/RadioButton";

const { height } = Dimensions.get("screen");
const RegisterScreen = ({ navigation }) => {
  const [showModalAvatar, setShowModalAvatar] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedId, setSelectedId] = useState("");
  const [registerDispatcher, { data, error, loading }] = useMutation(REGISTER, {
    onCompleted: (item) => {
      navigation.navigate("Login");
    },
  });

  // INI DAPETIN AVATAR
  const [avatar, setAvatar] = useState(
    "https://cdn-icons-png.flaticon.com/512/2919/2919906.png"
  );

  const handleRegister = async () => {
    try {
      await registerDispatcher({
        variables: {
          payload: {
            name,
            email,
            password,
            imageUrl: avatar,
            status: selectedId,
          },
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleRole = (id) => {
    // dapetin valuenya dari id di radiobutton
    setSelectedId(id);
    // console.log(selectedId, "<< di register");
  };

  const handleShowAvatar = () => {
    setShowModalAvatar(!showModalAvatar);
  };
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : null}
    >
      <View style={styles.container}>
        <View style={{ alignItems: "center" }}>
          <Text style={styles.title}>FitNow</Text>
          {error && <Text style={{ fontSize: 16, color: "red", marginBottom: 12}}>Input Cannot Be Empty</Text>}
          
        </View>
        <View style={{ alignItems: "center" }}>
          <Pressable
            onPress={handleShowAvatar}
            style={{ alignItems: "center" }}
          >
            <Image
              source={{
                uri: avatar,
              }}
              style={styles.categoryImage}
            />
            <Text
              style={{ alignSelf: "center", marginBottom: 20, color: "blue" }}
            >
              Choose your avatar!
            </Text>

            {/* MODAL AVATAR */}
            {showModalAvatar && (
              <ModalAvatar
                handleShowAvatar={handleShowAvatar}
                setAvatar={setAvatar}
              />
            )}
          </Pressable>

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
          {/* <TextInput style={styles.inputLabel} placeholder="Status" /> */}
          <RadioButton handleRole={handleRole} selectedId={selectedId} />
        </View>

        <TouchableOpacity
          style={{ alignItems: "center" }}
          onPress={handleRegister}
        >
          <View style={styles.button}>
            <Text style={styles.textBottom}>Register</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View
            style={{
              justifyContent: "center",
            }}
          ></View>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
    justifyContent: "space-around",
  },
  inputLabel: {
    height: 50,
    width: 300,
    margin: 12,
    borderWidth: 2,
    borderColor: "#20488f",
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
    fontSize: 60,
    fontWeight: "bold",
    color: "#20488f",
    marginTop: 30,
    marginBottom: 10,
  },
  categoryImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 5,
  },
});
