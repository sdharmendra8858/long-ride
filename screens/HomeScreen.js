import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Button, Text, View } from "react-native";

export default function HomeScreen() {
  const navigation = useNavigation();

  const joinRoom = (roomId) => {
    navigation.navigate("VoiceCall", { roomId });
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Rooms</Text>

      <Button title="Group Room 1" onPress={() => joinRoom("GroupRoom1")} />
      <Button title="Group Room 2" onPress={() => joinRoom("GroupRoom2")} />
      <Button
        title="Private Call with Alice"
        onPress={() => joinRoom("Alice-User")}
      />
    </View>
  );
}
