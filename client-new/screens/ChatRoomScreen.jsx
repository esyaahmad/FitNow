import React, { useContext, useEffect, useState } from "react";

import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  KeyboardAvoidingView,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import {
  doc,
  onSnapshot,
  getDoc,
  setDoc,
  updateDoc,
  Timestamp,
  arrayUnion,
} from "firebase/firestore";
import { db } from "../connection/fireBaseConfig";
import { useFocusEffect } from "@react-navigation/native";
import { LoginContext } from "../contexts/LoginContext";
import { v4 as uuid } from "uuid";
import { GET_ONE_USER } from "../queries";
import { useQuery } from "@apollo/client";

const { height, width } = Dimensions.get("screen");
// DIBIKIN ANY DULU, NANTI DIGANTI
export default function ChatRoomScreen({ route }) {
  const dataChats = route.params?.dataChats;
  let couchId = route?.params?.couchId;
  const { Username } = route?.params;
  // console.log(couchId);
  const { role } = useContext(LoginContext);

  // console.log(dataChats, "ini data chats");
  const { data, error, loading } = useQuery(GET_ONE_USER, {
    variables: { coachId: dataChats ?? null, userId: couchId ?? null },
  });

  const { user } = useContext(LoginContext);
  let currentUser;
  let name;
  if (dataChats) {
    if (role === "Coach") {
      currentUser = `${dataChats}${user}`;
      name = Username;
    } else {
      currentUser = `${user}${data?.getCoachById.usersCoach._id}`;
      name = data?.getCoachById.usersCoach.name;
    }
  } else {
    name = data?.getUserByIdArgs.name;
    currentUser = `${user}${couchId}`;
  }
  // console.log(data);
  // console.log(currentUser, "ini current user");
  const [chats, setChats] = useState([]);
  const [chat, setChat] = useState("");
  useFocusEffect(
    React.useCallback(() => {
      if (currentUser) {
        const unSub = onSnapshot(doc(db, "chats", currentUser), (doc) => {
          if (doc.exists()) {
            setChats(doc.data().messages);
          } else {
            setChats([]);
          }
        });

        return () => {
          unSub();
        };
      }
    }, [currentUser])
  );

  const onSendMessage = async () => {
    let timestamp = Timestamp.now();

    createSummaryChat({
      currentUser,
      chat,
      timestamp,
    });
    setChat("");
  };

  const createSummaryChat = async ({ id, text, timestamp }) => {
    try {
      const docRef = doc(db, "chats", currentUser);
      const findDoc = await getDoc(docRef);
      if (!findDoc.exists()) {
        await setDoc(docRef, {
          messages: arrayUnion({
            id: Math.random().toString(36).substring(7),
            text: chat,
            senderId: user,
            date: Timestamp.now(),
          }),
        });
      } else {
        await updateDoc(docRef, {
          messages: arrayUnion({
            id: Math.random(),
            text: chat,
            senderId: user,
            date: Timestamp.now(),
          }),
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.chatTab}>
        <ImageBackground
          style={styles.categoryImage}
          source={{
            uri: "https://xsgames.co/randomusers/avatar.php?g=male",
          }}
        />
        <Text style={styles.textName}>{name}</Text>
      </View>
      <Image
        source={{
          uri: "https://i.pinimg.com/736x/58/86/e4/5886e42f7c5cf696becbcbe8bab52614.jpg",
        }}
        style={{
          width: width,
          height: 0.85 * height,
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: -1,
        }}
      />
      <ScrollView
        style={{
          flex: 1,
          paddingTop: 5,
          gap: 10,
        }}
      >
        {/* {chats?.map((chat, idx) => (
          <View style={{ width : 200, padding: 10, margin: 2, backgroundColor: 'white', borderRadius: 10}} key={chat.id}>
            <Text>{chat.text}</Text>
          </View>
        ))} */}
        {chats?.map((chat, idx) =>
          user === chat.senderId ? (
            <View
              style={{
                width: 270,
                padding: 10,
                margin: 4,
                backgroundColor: "white",
                borderRadius: 10,
                marginLeft: width / 3 - 12,
              }}
              key={chat.id}
            >
              <Text style={{ fontSize: 20}}>{chat.text}</Text>
            </View>
          ) : (
            <View
              style={{
                width: 270,
                padding: 10,
                margin: 4,
                marginLeft: 10,
                backgroundColor: "white",
                borderRadius: 10,
              }}
              key={chat.id}
            >
              <Text style={{ fontSize: 20}}>{chat.text}</Text>
            </View>
          )
        )}
      </ScrollView>
      <KeyboardAvoidingView
        behavior="padding"
        // keyboardVerticalOffset={60}
        // style={{ flex: 1 }}
      >
        <View
          style={{
            // position: "absolute",
            flexDirection: "row",
            alignItems: "center",
            // bottom: 0,
            gap: 3,
            // height: 300,
            marginBottom: 80,
          }}
        >
          <View
            style={{
              backgroundColor: "#fff",
              flexDirection: "row",
              alignItems: "flex-start",
              width,
              height: 80,
              borderTopWidth: 0.2,
            }}
          >
            <TextInput
              style={{
                padding: 10,
                margin: 1,
                borderRadius: 20,
                fontSize: 18,
                borderWidth: 1,
                width: 0.85 * width,
                borderColor: "gray",
                marginLeft: 10,
                marginTop: 14,
              }}
              value={chat}
              onChangeText={(v) => setChat(v)}
            />
            <TouchableOpacity
              onPress={() => onSendMessage()}
              style={{ marginTop: 20, margin: 1 }}
            >
              {/* <Text>O</Text> */}
              <Feather
                name="send"
                size={30}
                color={"#0765ff"}
                style={{
                  paddingHorizontal: 5,
                  textAlign: "center",
                }}
              />
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
    minHeight: height,
    justifyContent: "space-between",
    
  },
  chatTab: {
    borderBottomWidth: 0.2,
    borderColor: "gray",
    height: 70,
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
    backgroundColor: "#20488f",
    // marginBottom: 10,
    
  },
  categoryImage: {
    width: 50,
    height: 50,
    marginBottom: 5,
    marginLeft: 10,
    borderRadius: 50,
    overflow: "hidden",
  },
  textName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  chatContainer: {
    // backgroundColor: "gray",
    paddingVertical: 10,
    maxWidth: 300,
    marginTop: 12,
    paddingHorizontal: 10,
    borderWidth: 2,
    borderRadius: 15,
  },
  chatName: {
    fontWeight: "bold",
    
  },
});
