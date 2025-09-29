// import { signInWithPopup } from "firebase/auth"; // For web testing
// import React from "react";
// import { Button, View } from "react-native";
// import { auth, provider } from "../firebase";

// export default function AuthScreen({ navigation }) {
//   const signIn = async () => {
//     try {
//       // On native, use expo-auth-session or react-native-google-signin
//       // Here is a placeholder
//       const result = await signInWithPopup(auth, provider);
//       console.log("User info:", result.user);
//       navigation.replace("Home");
//     } catch (err) {
//       console.log("Login error:", err);
//     }
//   };

//   return (
//     <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//       <Button title="Sign in with Google" onPress={signIn} />
//     </View>
//   );
// }
