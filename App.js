import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";

import HomeScreen from "./screens/HomeScreen";
import VoiceCallScreen from "./screens/VoiceCallScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="VoiceCall" component={VoiceCallScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
