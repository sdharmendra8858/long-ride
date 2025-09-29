# Voice Calling Setup Guide

## 🎙️ Voice-Only Calling with Agora.io (Free Tier)

Your app now has voice calling functionality implemented with Agora.io, which offers:
- **Free Tier**: 10,000 minutes per month
- **Voice-Only**: No video, optimized for audio calls
- **High Quality**: Professional-grade audio
- **Easy Setup**: Just need an App ID

## Quick Setup (5 minutes)

### 1. Get Your Free Agora App ID
1. Go to [https://console.agora.io/](https://console.agora.io/)
2. Sign up for a free account
3. Create a new project
4. Copy your **App ID**

### 2. Configure Your App
1. Open `config/agora.js`
2. Replace `YOUR_AGORA_APP_ID` with your actual App ID
3. Save the file

### 3. Test the App
1. Run your app: `npx expo run:android` or `npx expo run:ios`
2. Navigate to the Voice Call screen
3. You should see "Join Voice Call" button instead of setup instructions

## Features Included

✅ **Join/Leave Calls**: Simple one-tap joining  
✅ **Mute/Unmute**: Toggle your microphone  
✅ **Speaker/Earpiece**: Switch audio output  
✅ **Real-time Status**: See connection status  
✅ **User Notifications**: Know when others join/leave  
✅ **Permission Handling**: Automatic microphone permission requests  

## How It Works

- **Room ID**: Each call uses the `roomId` from your navigation params as the channel name
- **No Tokens Needed**: For development, no authentication tokens are required
- **Cross-Platform**: Works on both Android and iOS
- **Secure**: Uses Agora's enterprise-grade infrastructure

## Free Tier Limits

- **10,000 minutes per month** (that's ~166 hours!)
- **Unlimited concurrent users**
- **No credit card required**
- **Perfect for development and small apps**

## Production Considerations

For production apps, you'll want to:
1. Implement token-based authentication
2. Add user authentication
3. Add call history/logging
4. Consider upgrading to paid tier for higher limits

## Troubleshooting

**"Setup Required" still showing?**
- Make sure you replaced `YOUR_AGORA_APP_ID` in `config/agora.js`
- Restart your app after making changes

**Permission denied?**
- The app will automatically request microphone permission
- Make sure to allow it when prompted

**Can't hear others?**
- Check your device volume
- Try toggling between speaker and earpiece
- Make sure you're not muted

## Next Steps

1. Get your Agora App ID from the console
2. Update the config file
3. Test voice calling between two devices
4. Customize the UI to match your app's design

That's it! You now have professional voice calling in your app for free! 🎉
