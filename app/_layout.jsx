import React, { useEffect } from "react";
import { SplashScreen, Stack, useRouter } from "expo-router";
import { useFonts } from "expo-font";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { icons } from "../constants";
import { Ionicons, SimpleLineIcons } from "@expo/vector-icons";
import HeaderTitle from "../components/HeaderTitle";
import HeaderLeft from "../components/HeaderLeft";
import { store } from "../redux/store";
import { Provider } from "react-redux";
import SearchHeader from "../components/SearchHeader";
import "../assets/global.css";
import TabHeader from "../components/TabHeader";
import { GestureHandlerRootView } from "react-native-gesture-handler";

SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  const [fontsLoaded, error] = useFonts({
    "Poppins-Black": require("../assets/fonts/Poppins-Black.ttf"),
    "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
    "Poppins-ExtraBold": require("../assets/fonts/Poppins-ExtraBold.ttf"),
    "Poppins-ExtraLight": require("../assets/fonts/Poppins-ExtraLight.ttf"),
    "Poppins-Light": require("../assets/fonts/Poppins-Light.ttf"),
    "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Thin": require("../assets/fonts/Poppins-Thin.ttf"),
  });

  const router = useRouter();

  useEffect(() => {
    if (error) throw error;
    if (fontsLoaded) SplashScreen.hideAsync();
  }, [fontsLoaded, error]);

  if (!fontsLoaded && !error) return null;

  return (
    <Provider store={store}>
      <GestureHandlerRootView>
        <Stack>
          <Stack.Screen
            name="index"
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="(tabs)"
            options={{
              headerShown: false,
            }}
          />

          <Stack.Screen
            name="detail/hotel/[id]"
            options={{
              headerTitle: "",
              headerTransparent: false,
            }}
          />
          <Stack.Screen
            name="detail/room/[id]"
            options={{
              headerTitle: "",
              headerTransparent: false,
            }}
          />
          <Stack.Screen
            name="detail/attraction/[id]"
            options={{
              headerTitle: "",
              headerTransparent: false,
            }}
          />
          <Stack.Screen
            name="detail/ticket/[id]"
            options={{
              headerTitle: "",
              headerTransparent: false,
            }}
          />
        </Stack>
      </GestureHandlerRootView>
    </Provider>
  );
};

export default RootLayout;
