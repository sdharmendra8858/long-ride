import React, { useEffect, useState } from "react";
import {
  Alert,
  Button,
  PermissionsAndroid,
  Platform,
  StyleSheet,
  Text,
  View,
} from "react-native";
import RtcEngine, {
  ChannelProfileType,
  ClientRoleType,
  RtcEngineContext,
} from "react-native-agora";
import { AGORA_CONFIG } from "../config/agora";

export default function VoiceCallScreen({ route, navigation }) {
  const { roomId } = route.params;
  const [engine, setEngine] = useState(null);
  const [isJoined, setIsJoined] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isSpeakerEnabled, setIsSpeakerEnabled] = useState(false);

  useEffect(() => {
    initializeAgora();
    return () => {
      if (engine) {
        engine.release();
      }
    };
  }, []);

  const initializeAgora = async () => {
    try {
      // Request microphone permission
      if (Platform.OS === "android") {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
          {
            title: "Microphone Permission",
            message:
              "This app needs access to your microphone to make voice calls.",
            buttonNeutral: "Ask Me Later",
            buttonNegative: "Cancel",
            buttonPositive: "OK",
          }
        );

        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
          Alert.alert(
            "Permission Required",
            "Microphone permission is required for voice calls."
          );
          return;
        }
      }

      // Initialize Agora RTC Engine
      const agoraEngine = await RtcEngine.createWithContext(
        new RtcEngineContext(AGORA_CONFIG.APP_ID)
      );

      // Set channel profile to communication (voice only)
      await agoraEngine.setChannelProfile(
        ChannelProfileType.ChannelProfileCommunication
      );

      // Set client role to broadcaster (can send and receive audio)
      await agoraEngine.setClientRole(ClientRoleType.ClientRoleBroadcaster);

      // Set up event handlers
      agoraEngine.addListener("JoinChannelSuccess", (channel, uid, elapsed) => {
        console.log("Successfully joined channel:", channel, "with uid:", uid);
        setIsJoined(true);
        Alert.alert("Success", "Connected to voice call!");
      });

      agoraEngine.addListener("LeaveChannel", (stats) => {
        console.log("Left channel");
        setIsJoined(false);
      });

      agoraEngine.addListener("UserJoined", (uid, elapsed) => {
        console.log("User joined:", uid);
        Alert.alert("User Joined", `User ${uid} joined the call`);
      });

      agoraEngine.addListener("UserOffline", (uid, reason) => {
        console.log("User left:", uid);
        Alert.alert("User Left", `User ${uid} left the call`);
      });

      agoraEngine.addListener("Error", (err) => {
        console.error("Agora error:", err);
        Alert.alert("Error", `Agora error: ${err.message || err}`);
      });

      setEngine(agoraEngine);
    } catch (error) {
      console.error("Failed to initialize Agora:", error);
      Alert.alert(
        "Error",
        "Failed to initialize voice calling. Please check your Agora App ID."
      );
    }
  };

  const joinCall = async () => {
    if (!engine) {
      Alert.alert(
        "Error",
        "Voice engine not initialized. Please check your Agora App ID."
      );
      return;
    }

    try {
      // Join the channel
      await engine.joinChannel(
        AGORA_CONFIG.TOKEN,
        roomId, // Use roomId as channel name
        null, // uid (null for auto-generated)
        {
          autoSubscribeAudio: true,
          autoSubscribeVideo: false,
        }
      );
    } catch (error) {
      console.error("Failed to join channel:", error);
      Alert.alert("Error", "Failed to join voice call. Please try again.");
    }
  };

  const leaveCall = async () => {
    if (engine && isJoined) {
      try {
        await engine.leaveChannel();
        navigation.goBack();
      } catch (error) {
        console.error("Failed to leave channel:", error);
      }
    } else {
      navigation.goBack();
    }
  };

  const toggleMute = async () => {
    if (engine) {
      try {
        await engine.muteLocalAudioStream(!isMuted);
        setIsMuted(!isMuted);
      } catch (error) {
        console.error("Failed to toggle mute:", error);
      }
    }
  };

  const toggleSpeaker = async () => {
    if (engine) {
      try {
        await engine.setEnableSpeakerphone(!isSpeakerEnabled);
        setIsSpeakerEnabled(!isSpeakerEnabled);
      } catch (error) {
        console.error("Failed to toggle speaker:", error);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Voice Call</Text>
      <Text style={styles.roomId}>Room: {roomId}</Text>

      {AGORA_CONFIG.APP_ID === "YOUR_AGORA_APP_ID" ? (
        <View style={styles.setupContainer}>
          <Text style={styles.setupTitle}>Setup Required</Text>
          <Text style={styles.setupText}>
            1. Go to https://console.agora.io/
          </Text>
          <Text style={styles.setupText}>
            2. Create a free account and project
          </Text>
          <Text style={styles.setupText}>
            3. Copy your App ID to config/agora.js
          </Text>
          <Text style={styles.setupText}>4. Restart the app</Text>
        </View>
      ) : (
        <View style={styles.controlsContainer}>
          <View style={styles.statusContainer}>
            <Text
              style={[
                styles.status,
                { color: isJoined ? "#4CAF50" : "#FF9800" },
              ]}
            >
              {isJoined ? "Connected" : "Disconnected"}
            </Text>
          </View>

          <View style={styles.buttonRow}>
            {!isJoined ? (
              <Button title="Join Voice Call" onPress={joinCall} />
            ) : (
              <>
                <Button
                  title={isMuted ? "Unmute" : "Mute"}
                  onPress={toggleMute}
                  color={isMuted ? "#f44336" : "#4CAF50"}
                />
                <Button
                  title={isSpeakerEnabled ? "Earpiece" : "Speaker"}
                  onPress={toggleSpeaker}
                  color={isSpeakerEnabled ? "#FF9800" : "#2196F3"}
                />
              </>
            )}
          </View>

          <Button title="Leave Call" onPress={leaveCall} color="#f44336" />
        </View>
      )}

      <Text style={styles.info}>🎙️ Voice-only calling powered by Agora.io</Text>
      <Text style={styles.info}>Free tier: 10,000 minutes/month</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  roomId: {
    fontSize: 16,
    marginBottom: 20,
    color: "#666",
  },
  setupContainer: {
    backgroundColor: "#fff3cd",
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    width: "100%",
  },
  setupTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#856404",
    marginBottom: 10,
    textAlign: "center",
  },
  setupText: {
    fontSize: 14,
    color: "#856404",
    marginBottom: 5,
  },
  controlsContainer: {
    width: "100%",
    alignItems: "center",
  },
  statusContainer: {
    marginBottom: 20,
  },
  status: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginBottom: 20,
  },
  info: {
    fontSize: 12,
    color: "#666",
    textAlign: "center",
    marginTop: 10,
  },
});
