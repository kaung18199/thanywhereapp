import React, { useEffect, useRef, useState } from "react";
import { Image, ScrollView, StatusBar, Text, View, Easing } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { icons, images } from "../constants";
import { router, useRouter } from "expo-router";
import Animated, { useSharedValue, withSpring } from "react-native-reanimated";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Index = () => {
  // Initial position off the screen
  const ring1padding = useSharedValue(0);
  const ring2padding = useSharedValue(0);
  let [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleLanguageSelect = async (language) => {
    // Mark user as not new
    await AsyncStorage.setItem("isFirstTimeUser", "true");
  };

  useEffect(() => {
    ring1padding.value = 0;
    ring2padding.value = 0;
    setTimeout(
      () => (ring1padding.value = withSpring(ring1padding.value + hp(5))),
      100
    );
    setTimeout(
      () => (ring2padding.value = withSpring(ring2padding.value + hp(5.5))),
      300
    );
    setTimeout(() => {
      handleLanguageSelect();
      router.push("/home");
    }, 2500);
  }, []);

  return (
    <SafeAreaView className="  h-full relative">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="w-full justify-center items-center h-full px-4 space-y-4 bg-secondary-100/30">
          <Animated.View
            className=" bg-white/20 rounded-full"
            style={{ padding: ring2padding }}
          >
            <Animated.View
              className=" bg-white/30 rounded-full"
              style={{ padding: ring1padding }}
            >
              <Image
                source={icons.logo}
                style={{
                  maxWidth: 380,
                  height: hp(20),
                  width: hp(20),
                  resizeMode: "contain",
                }}
              />
            </Animated.View>
          </Animated.View>
          <View
            className="relative mt-5"
            style={{
              width: "100%",
            }}
          >
            <Text
              className=" text-secondary-200 text-center font-pbold"
              style={{ fontSize: hp(4) }}
            >
              ThailandAny Where
            </Text>
          </View>
        </View>
      </ScrollView>
      <StatusBar backgroundColor="#161622" style="light" />
    </SafeAreaView>
  );
};

export default Index;