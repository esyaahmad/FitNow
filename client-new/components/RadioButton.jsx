import React, { useMemo, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import RadioGroup from "react-native-radio-buttons-group";

export default function RadioButton({ handleRole, selectedId }) {
  const radioButtons = useMemo(
    () => [
      {
        id: "beginner",
        label: "Beginner",
        value: "option1",
        borderColor: "#20488f",
        color: "blue",
      },
      {
        id: "profesional",
        label: "Professional",
        value: "option2",
        borderColor: "#20488f",
        color: "blue",
      },
    ],
    []
  );

  // const [selectedValue, setSelectedValue] = useState();

  return (
    <View>
      <Text
        style={{
          fontSize: 18,
          alignSelf: "flex-start",
        }}
      >
        Status :
      </Text>
      <RadioGroup
        radioButtons={radioButtons}
        onPress={(id) => {
          handleRole(id);
        }}
        selectedId={selectedId}
        containerStyle={{
          flexDirection: "row",
          gap: 50,
        }}
      />
    </View>
  );
}
