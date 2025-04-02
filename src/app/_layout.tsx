import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import "@/global.css";
import { GluestackUIProvider } from "../components/ui/gluestack-ui-provider";
import { useFonts } from "expo-font";
import { Stack, useRouter } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import "react-native-reanimated";
import { useColorScheme } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthRoutesLink } from "../utils/enum";
import SWRProvider from "../swr/swr.provider";
import { AuthProvider } from "../context/auth.context";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    "Outfit-Black": require("@assets/fonts/Outfit-Black.ttf"),
    "Outfit-Bold": require("@assets/fonts/Outfit-Bold.ttf"),
    "Outfit-ExtraBold": require("@assets/fonts/Outfit-ExtraBold.ttf"),
    "Outfit-ExtraLight": require("@assets/fonts/Outfit-ExtraLight.ttf"),
    "Outfit-Light": require("@assets/fonts/Outfit-Light.ttf"),
    "Outfit-Medium": require("@assets/fonts/Outfit-Medium.ttf"),
    "Outfit-Regular": require("@assets/fonts/Outfit-Regular.ttf"),
    "Outfit-Thin": require("@assets/fonts/Outfit-Thin.ttf"),
    "Outfit-SemiBold": require("@assets/fonts/Outfit-SemiBold.ttf"),
  });

  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const token = await AsyncStorage.getItem("authToken");

      if (token) {
        setIsAuthenticated(true);
        router.replace("/(tabs)");
      } else {
        setIsAuthenticated(false);
        router.replace(AuthRoutesLink.SIGN_IN);
      }

      SplashScreen.hideAsync();
    };

    if (loaded) {
      checkAuth();
    }
  }, [loaded, isAuthenticated]);

  if (!loaded || isAuthenticated === null) {
    return null;
  }

  return (
    <SWRProvider>
      <GluestackUIProvider mode="light">
        <ThemeProvider
          value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
        >
          <AuthProvider>
            <Stack>
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              <Stack.Screen name="(auth)" options={{ headerShown: false }} />
              <Stack.Screen name="+not-found" />
            </Stack>
          </AuthProvider>
          <StatusBar style="auto" />
        </ThemeProvider>
      </GluestackUIProvider>
    </SWRProvider>
  );
}
