import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";


import { Ionicons } from "@expo/vector-icons";

import HomeScreen from "../screens/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen";
import ChatListScreen from "../screens/ChatListScreen";
import HomeStack from "../stacks/HomeStack";
import { LoginContext } from "../contexts/LoginContext";
import { useContext } from "react";

const Tab = createBottomTabNavigator();
export default function MainTab() {
  const { role } = useContext(LoginContext);
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarStyle: {
          backgroundColor: "#fff",
          height: 90,
          shadowRadius: 3,
          shadowOpacity: 0.09,
        },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName = "";

          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Chat") {
            iconName = focused
              ? "chatbox-ellipses"
              : "chatbox-ellipses-outline";
          } else if (route.name === "Profile") {
            iconName = focused ? "person" : "person-outline";
          }
          return <Ionicons name={iconName} size={size} color={color} />;

        },
        headerShown: false,
      })}
    >
      {role == "Trainee" && (
        <Tab.Screen name="Home" component={HomeStack} />
      )}

      <Tab.Screen
        name="Chat"
        component={ChatListScreen}
        // options={{ headerShown: true }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ headerShown: true }}
      />
    </Tab.Navigator>
  );
}
