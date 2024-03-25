import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ChatRoomScreen from "../screens/ChatRoomScreen";
import HomeScreen from "../screens/HomeScreen";
import ScheduleListScreen from "../screens/ScheduleListScreen";
import SummarizeScreen from "../screens/SummarizeScreen";
import ListCoach from "../screens/ListCoach";

import Maps from "../screens/Maps";

const Stack = createNativeStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{ title: "Home", headerShown: false }}
      />
      <Stack.Screen name="ListCoach" component={ListCoach} />
      <Stack.Screen
        name="Schedule"
        component={ScheduleListScreen}
        // options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Summarize"
        component={SummarizeScreen}
        // options={{ headerShown: false }}
      />

      <Stack.Screen
        name="Maps"
        component={Maps}
        // options={{ headerShown: false }}
      />
      <Stack.Screen name="Chat" component={ChatRoomScreen} />
    </Stack.Navigator>
  );
};

export default HomeStack;
