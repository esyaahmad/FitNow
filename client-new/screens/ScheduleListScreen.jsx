import {
  Dimensions,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Pressable,
} from "react-native";
import { formatCapital } from "../utils/formatCapital";
import { NavigationProp } from "@react-navigation/native";
import { useQuery } from "@apollo/client";
import { GET_SCHEDULE_BY_SPORT } from "../queries";
import { useState } from "react";

const { width, height } = Dimensions.get("screen");
const ScheduleListScreen = ({ navigation, route }) => {
  const[time, setTime] = useState()
  const { coachId, sport, locationId } = route.params;
  console.log(coachId, sport);
  const { data, error, loading } = useQuery(GET_SCHEDULE_BY_SPORT, {
    variables: { coachId , sport }
  }, {
    fetchPolicy: "no-cache"
  })
  console.log(coachId, 'ini coach id');
  console.log(error);
  console.log(data?.getCoachById.usersCoach._id);
  const dummy = [1, 1, 1];
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.topContainer}>
          <Text style={styles.textTitle}>Choose Your Schedule</Text>
        </View>
        <View style={{ marginTop: 20 }}>
          {data?.getScheduleBySport?.map((el, idx) => {
            return (
              <TouchableOpacity
                style={styles.containerStatus}
                // CARA MELEMPAR PARAMS
                key={idx}
              >
                <View style={{ fleSxDirection: "column", gap: 10 }}>
                  <Text style={styles.textName}>Schedule {idx + 1} Week</Text>
                  <Text style={styles.textList}>
                    <Pressable onPress={() => {
                      setTime(el.duration)
                      navigation.navigate("Summarize", {
                        week : idx + 1,
                        schedule: el.decription,
                        coachId: coachId,
                        chatCoachId: data?.getCoachById.usersCoach._id,
                        scheduleId: el._id,
                        duration: el.duration,
                        category: el.sport,
                        locationId: locationId,
                        categoryId: el.Category._id
                      })
                      }}>
                      {el?.decription.map((txt, idx) => (
                        <Text key={txt+idx+1} style={styles.textList}>{idx + 1}. {txt}</Text>
                      ))}
                    </Pressable>
                    {/* {console.log(el.decription)} */}
                    {/* INI HASIL YANG DIDAPAT DI PAKET {idx + 1} bulan
                    {`\n`}1. INI HASIL YANG DIDAPAT DI PAKET {idx + 1} bulan
                    {`\n`}2. INI HASIL YANG DIDAPAT DI PAKET {idx + 1} bulan
                    {`\n`}3. INI HASIL YANG DIDAPAT DI PAKET {idx + 1} bulan
                    {`\n`}1. INI HASIL YANG DIDAPAT DI PAKET {idx + 1} bulan
                    {`\n`}2. INI HASIL YANG DIDAPAT DI PAKET {idx + 1} bulan
                    {`\n`}3. INI HASIL YANG DIDAPAT DI PAKET {idx + 1} bulan
                    {`\n`}1. INI HASIL YANG DIDAPAT DI PAKET {idx + 1} bulan
                    {`\n`}2. INI HASIL YANG DIDAPAT DI PAKET {idx + 1} bulan
                    {`\n`}3. INI HASIL YANG DIDAPAT DI PAKET {idx + 1} bulan */}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
      <View style={{ padding: 100 }} />
    </SafeAreaView>
  );
};

export default ScheduleListScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    height,
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
  trainerImage: {
    width: 60,
    height: 60,
    borderRadius: 50,
    marginBottom: 5,
    marginHorizontal: 14,
  },

  textTitle: {
    fontWeight: "bold",
    fontSize: 30,
    marginVertical: 20,
    color: "#fff",
  },
  textName: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    alignSelf: "center",
  },
  textList: {
    fontSize: 20,
    color: "#fff",
    padding: 10,
  },
  topContainer: {
    gap: 10,
    justifyContent: "center",
    padding: 18,
    backgroundColor: "#20488f",
    shadowOpacity: 3,
    shadowRadius: 5,
    borderBottomEndRadius: 18,
    borderBottomStartRadius: 18,
    flexDirection: "row",
  },
});
