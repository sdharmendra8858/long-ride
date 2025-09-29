import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { Alert, Button, StyleSheet, Text, View } from 'react-native';
import { IRtcEngine, RtcConnection, createAgoraRtcEngine } from 'react-native-agora';
import { AGORA_CONFIG } from '../../config/agora';

export default function VoiceCallScreen() {
  const { roomId } = useLocalSearchParams<{ roomId: string }>();
  const [engine, setEngine] = useState<IRtcEngine | null>(null);
  const [isJoined, setIsJoined] = useState(false);

  useEffect(() => {
    initializeAgora();
    return () => {
      if (engine) {
        engine.release();
      }
    };
  }, [engine]);

  const initializeAgora = async () => {
    try {
      console.log('🎙️ Starting Agora...');
      
      // Create Agora engine
      const agoraEngine = createAgoraRtcEngine();

      // Initialize with App ID
      agoraEngine.initialize({ appId: AGORA_CONFIG.APP_ID });

      // Set up basic event handlers
      agoraEngine.registerEventHandler({
        onJoinChannelSuccess: (connection: RtcConnection, elapsed: number) => {
          console.log('✅ Connected to call!');
          setIsJoined(true);
          Alert.alert('Success', 'Connected to voice call!');
        },
        onError: (err: any) => {
          console.error('❌ Error:', err);
          Alert.alert('Error', `Agora error: ${err.message || err}`);
        },
      });

      setEngine(agoraEngine);
      console.log('✅ Agora ready!');
      
    } catch (error: any) {
      console.error('❌ Failed to start Agora:', error);
      Alert.alert('Error', `Failed to start voice calling: ${error.message}`);
    }
  };

  const joinCall = async () => {
    if (!engine) {
      Alert.alert('Error', 'Voice engine not ready yet.');
      return;
    }

    try {
      console.log('📞 Joining call...');
      await engine.joinChannel('', roomId || 'test-room', 0, {});
      console.log('📞 Join request sent');
    } catch (error: any) {
      console.error('❌ Failed to join:', error);
      Alert.alert('Error', `Failed to join call: ${error.message}`);
    }
  };

  const leaveCall = async () => {
    if (engine && isJoined) {
      await engine.leaveChannel();
    }
    router.back();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🎙️ Voice Call</Text>
      <Text style={styles.roomId}>Room: {roomId}</Text>

      <View style={styles.statusContainer}>
        <Text style={[styles.status, { color: isJoined ? '#4CAF50' : '#FF9800' }]}>
          {isJoined ? '🟢 Connected' : '🔴 Disconnected'}
        </Text>
      </View>

      <View style={styles.buttonContainer}>
        {!isJoined ? (
          <Button title="Join Call" onPress={joinCall} color="#007AFF" />
        ) : (
          <Button title="Leave Call" onPress={leaveCall} color="#f44336" />
        )}
      </View>

      <View style={styles.debugContainer}>
        <Text style={styles.debugTitle}>Debug Info:</Text>
        <Text style={styles.debugText}>App ID: {AGORA_CONFIG.APP_ID.substring(0, 8)}...</Text>
        <Text style={styles.debugText}>Engine: {engine ? '✅ Ready' : '❌ Not ready'}</Text>
        <Text style={styles.debugText}>Status: {isJoined ? '🟢 Connected' : '🔴 Disconnected'}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  roomId: {
    fontSize: 16,
    marginBottom: 30,
    color: '#666',
  },
  statusContainer: {
    marginBottom: 30,
  },
  status: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttonContainer: {
    marginBottom: 30,
  },
  debugContainer: {
    backgroundColor: '#f0f0f0',
    padding: 15,
    borderRadius: 10,
    width: '100%',
  },
  debugTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  debugText: {
    fontSize: 14,
    color: '#333',
    marginBottom: 5,
  },
});
