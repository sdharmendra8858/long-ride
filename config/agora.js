// Agora.io Configuration
// Get your App ID from: https://console.agora.io/
// Free tier includes 10,000 free minutes per month

export const AGORA_CONFIG = {
  // Replace with your actual Agora App ID
  APP_ID: "b35f3d24675d48128d6ce407ac41f976", // Get this from Agora Console

  // For testing, you can use a temporary token or no token (for development)
  // In production, generate tokens from your server
  TOKEN: null, // Set to null for testing, or provide a token for production

  // Voice-only channel settings
  CHANNEL_PROFILE: 0, // Communication profile (0 = Communication, 1 = Live Broadcasting)
  CLIENT_ROLE: 1, // 1 = Broadcaster (can send/receive), 2 = Audience (receive only)

  // Audio settings
  AUDIO_PROFILE: 0, // 0 = Default, 1 = Speech, 2 = Music
  AUDIO_SCENARIO: 0, // 0 = Default, 1 = Chatroom, 2 = Education, 3 = Game Streaming
};

// Instructions for getting your Agora App ID:
// 1. Go to https://console.agora.io/
// 2. Sign up for a free account
// 3. Create a new project
// 4. Copy the App ID and replace 'YOUR_AGORA_APP_ID' above
// 5. For development, you can use the app without a token
// 6. For production, implement token generation on your server
