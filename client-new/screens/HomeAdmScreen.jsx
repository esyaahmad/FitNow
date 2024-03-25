import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React from "react";

const data = [
  { id: "1", name: "Trainer 1", category: "Basketball", location: "Jakarta" },
  { id: "2", name: "Trainer 2", category: "Tennis", location: "Jakarta" },
  { id: "3", name: "Trainer 3", category: "Basketball", location: "Jakarta" },
  { id: "4", name: "Trainer 4", category: "Basketball", location: "Jakarta" },
];

const { height } = Dimensions.get("screen");
const HomeAdmScreen = ({ navigation }) => {
  const renderItem = ({ item }) => {
    return (
      <View style={styles.row}>
        <Text style={styles.cell}>{item.id}</Text>
        <Text style={styles.cell}>{item.name}</Text>
        <Text style={styles.cell}>{item.category}</Text>
        <Text style={styles.cell}>{item.location}</Text>
      </View>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <View></View>
      <View style={{ marginTop: 20 }}>
        <Text style={styles.title}>FitNow</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("RegisterAdm")}
        >
          <Text style={styles.textAddTrainer}> + Add Trainer</Text>
        </TouchableOpacity>
        <View style={styles.header}>
          <Text style={styles.heading}>No</Text>
          <Text style={styles.heading}>Name</Text>
          <Text style={styles.heading}>Category</Text>
          <Text style={styles.heading}>Location</Text>
        </View>
        <FlatList
          data={data}
          keyExtractor={(item) => {
            item.id;
          }}
          renderItem={renderItem}
        />
      </View>
    </SafeAreaView>
  );
};
export default HomeAdmScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    minHeight: height,
  },
  textAddTrainer: {
    textAlign: "right",
    fontSize: 20,
    fontWeight: "bold",
    color: "blue",
    padding: 14,
    marginBottom: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 18,
    backgroundColor: "#20488f",
    marginHorizontal: 10,
  },
  heading: {
    flex: 1,
    fontSize: 18,
    fontWeight: "bold",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 8,
    marginHorizontal: 10,
    elevation: 2,
    borderRadius: 3,
    borderWidth: 2,
    borderColor: "#20488f",
    // backgroundColor: "red",
    padding: 19,
  },
  cell: {
    fontSize: 16,
    textAlign: "left",
    flex: 1,
  },
  title: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#20488f",
    textAlign: "center",
    marginBottom: 20,
  },
});
