import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import summaryAi from "../utils/summaryAi";
import { useContext, useEffect, useState } from "react";
import ModalAfterSchedule from "../components/ModalAfterSchedule";
import { LoginContext } from "../contexts/LoginContext";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../connection/fireBaseConfig";
import { useMutation } from "@apollo/client";
import {
  ADD_USER_SCHEDULE,
  GET_PROFILE_COACH,
  GET_PROFILE_USER,
} from "../queries";

const { width, height } = Dimensions.get("screen");
const SummarizeScreen = ({ route, navigation }) => {
  const [userScheduleDispatcher, { data, error, loading }] = useMutation(
    ADD_USER_SCHEDULE,
    {
      refetchQueries: [GET_PROFILE_USER],
      fetchPolicy: "no-cache",
    }
  );
  const { user } = useContext(LoginContext);
  console.log(user, "ini user di summarize screen");
  const {
    week,
    category,
    schedule,
    chatCoachId,
    duration,
    coachId,
    scheduleId,
    locationId,
    categoryId,
  } = route.params;
  const [summary, setSummary] = useState("");
  const [showModalEnd, setShowModalEnd] = useState(false);
  const [seeMore, setSeeMore] = useState(false);

  let iniText = "";
  const dataText = schedule.map((txt, idx) => {
    let num = idx + 1;
    iniText += JSON.stringify(num + ". " + txt) + `\n` + `\n`;
  });
  // console.log(iniText);
  const handleJoin = async () => {
    //check whether the group(chats in firestore) exists, if not create
    const combinedId = user + chatCoachId;
    try {
      const res = await getDoc(doc(db, "chats", combinedId));

      if (!res.exists()) {
        //create a chat in chats collection
        await setDoc(doc(db, "chats", combinedId), { messages: [] });
      }
    } catch (err) {}
  };
  const handleNavigateToChat = async () => {
    await handleJoin();

    await userScheduleDispatcher({
      variables: {
        payload: {
          UserId: user,
          CoachId: coachId,
          ScheduleId: scheduleId,
          LocationId: locationId,
          CategoryId: categoryId,
        },
      },
    });
    // navigation.reset({
    //   index: 0,
    //   routes: [{ name: "HomeScreen" }],
    // });
    setTimeout(() => {
      navigation.navigate("HomeScreen");
      navigation.navigate("ChatRoom", {
        couchId: chatCoachId,
      });
      setShowModalEnd(false);
    }, 100);
    setShowModalEnd(false);

  };
  
  const handleNavigateToHome = async () => {
    await userScheduleDispatcher({
      variables: {
        payload: {
          UserId: user,
          CoachId: coachId,
          ScheduleId: scheduleId,
          LocationId: locationId,
          CategoryId: categoryId,
        },
      },
    });
    navigation.navigate("HomeScreen");
  };

  const handleModalEnd = () => {
    setShowModalEnd(!showModalEnd);
  };
  const runSummary = async () => {
    const result = await summaryAi(category, week);
    console.log(result, "result di runSummary");
    setSummary(result);
  };

  useEffect(() => {
    runSummary();
  }, [week]);
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View
          style={{
            backgroundColor: "#20488f",
            shadowOpacity: 3,
            shadowRadius: 5,
            borderBottomEndRadius: 18,
            borderBottomStartRadius: 18,
          }}
        >
          <Text style={styles.title}>Schedule For {week} Week Training</Text>
        </View>
        <View
          style={{
            ...styles.containerStatus,
            flexDirection: "column",
            gap: 10,
          }}
        >
          <Text style={styles.textName}>Schedule Week {week}</Text>
          {seeMore ? (
            <View>
              <Text style={styles.textList}>{iniText}</Text>
              <TouchableOpacity onPress={() => setSeeMore(false)}>
                <Text style={styles.textList}>...See less</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View>
              <Text style={styles.textList}>{iniText.slice(0, 100)}</Text>
              <TouchableOpacity onPress={() => setSeeMore(true)}>
                <Text style={styles.textList}>...See more</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
        <View style={styles.containerSummerize}>
          <Text style={styles.textTitleSummerize}>What will you get :</Text>
          {summary && <Text style={styles.textSummerize}>{summary}</Text>}
        </View>

        <TouchableOpacity style={styles.button} onPress={handleModalEnd}>
          <Text style={styles.textJoin}>Join</Text>
        </TouchableOpacity>
        {showModalEnd && (
          <ModalAfterSchedule
            handleModalEnd={handleModalEnd}
            handleNavigateToChat={handleNavigateToChat}
            handleNavigateToHome={handleNavigateToHome}
          />
        )}
        <TouchableOpacity onPress={() => navigation.navigate("HomeScreen")}>
          <Text style={styles.textLater}>Maybe Later</Text>
        </TouchableOpacity>
      </ScrollView>
      <View style={{ padding: 100 }} />
    </SafeAreaView>
  );
};

export default SummarizeScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
    minHeight: height,
  },
  title: {
    paddingVertical: 30,
    paddingHorizontal: 20,
    textAlign: "center",
    fontSize: 30,
    fontWeight: "bold",
    color: "#fff",
  },

  button: {
    backgroundColor: "#20488f",
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginHorizontal: 80,
    marginVertical: 10,
    alignSelf: "center",
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  textJoin: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
  },
  textLater: {
    alignSelf: "center",
    color: "rgb(137, 207, 240)",
    fontWeight: "bold",

  },
  textTitleSummerize: {
    fontSize: 24,
    marginVertical: 10,
    paddingHorizontal: 10,
    fontWeight: "700",
    color: "#20488f",
    marginVertical: 30,
  },
  textSummerize: {
    fontSize: 20,
    paddingBottom: 20,
    paddingHorizontal: 10,
    textAlign: "justify",
  },
  containerSummerize: {
    marginHorizontal: 10,
    marginVertical: 30,
    borderTopWidth: 2,
    // backgroundColor: "#20488f",
    // borderRadius: 10,
    // borderWidth: 2,
    borderColor: "#20488f",
  },
  textList: {
    fontSize: 20,
    color: "#fff",
    padding: 10,
  },
  containerStatus: {
    backgroundColor: "#fff",
    paddingVertical: 40,
    marginHorizontal: 10,
    borderRadius: 2,
    borderWidth: 1,
    borderRadius: 30,
    borderColor: "#20488f",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    marginVertical: 10,
    backgroundColor: "#20488f",
  },
  textName: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    alignSelf: "center",
  },
});
