// import { SplashScreen, Stack, useRouter, useSegments } from "expo-router";
// import { SafeAreaProvider } from "react-native-safe-area-context";
// import SafeScreen from "../components/SafeScreen";
// import { StatusBar } from "expo-status-bar";
// import { useFonts } from "expo-font";
// import { useAuthStore } from "../store/authStore";
// import { useEffect, useState } from "react";

// SplashScreen.preventAutoHideAsync();

// export default function RootLayout() {
//   const router = useRouter();
//   const segments = useSegments();
//   const [isNavigationReady, setIsNavigationReady] = useState(false);

//   const { checkAuth, user, token } = useAuthStore();

//   const [fontsLoaded] = useFonts({
//     "JetBrainsMono-Medium": require("../assets/fonts/JetBrainsMono-Medium.ttf"),
//   });

//   useEffect(() => {
//     if (fontsLoaded) SplashScreen.hideAsync();
//   }, [fontsLoaded]);

//   useEffect(() => {
//     checkAuth();
//   }, []);

//   // Mark navigation as ready after initial render
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setIsNavigationReady(true);
//     }, 0);
//     return () => clearTimeout(timer);
//   }, []);

//   // Handle navigation based on auth state - only after navigation is ready
//   useEffect(() => {
//     if (!isNavigationReady) return;

//     const inAuthScreen = segments[0] === "(auth)";
//     const isSignedIn = user && token;

//     if (!isSignedIn && !inAuthScreen) {
//       router.replace("/(auth)");
//     } else if (isSignedIn && inAuthScreen) {
//       router.replace("/(tabs)");
//     }
//   }, [user, token, segments, isNavigationReady]);

//   return (
//     <SafeAreaProvider>
//       <SafeScreen>
//         <Stack screenOptions={{ headerShown: false }}>
//           <Stack.Screen name="(tabs)" />
//           <Stack.Screen name="(auth)" />
//         </Stack>
//       </SafeScreen>
//       <StatusBar style="dark" />
//     </SafeAreaProvider>
//   );
// }




// ios working perfecly 

import { SplashScreen, Stack, useRouter, useSegments } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import SafeScreen from "../components/SafeScreen";
import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";
import { useAuthStore } from "../store/authStore";
import { useEffect } from "react";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const router = useRouter();
  const segments = useSegments();

  const { checkAuth, user, token } = useAuthStore();

  const [fontsLoaded] = useFonts({
    "JetBrainsMono-Medium": require("../assets/fonts/JetBrainsMono-Medium.ttf"),
  });

  useEffect(() => {
    if (fontsLoaded) SplashScreen.hideAsync();
  }, [fontsLoaded]);

  useEffect(() => {
    checkAuth();
  }, []);

  // handle navigation based on the auth state
  useEffect(() => {
    const inAuthScreen = segments[0] === "(auth)";
    const isSignedIn = user && token;

    if (!isSignedIn && !inAuthScreen) router.replace("/(auth)");
    else if (isSignedIn && inAuthScreen) router.replace("/(tabs)");
  }, [user, token, segments]);

  return (
    <SafeAreaProvider>
      <SafeScreen>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="(auth)" />
        </Stack>
      </SafeScreen>
      <StatusBar style="dark" />
    </SafeAreaProvider>
  );
}