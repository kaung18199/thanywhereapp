import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import HeaderLeft from "./HeaderLeft";
import HeaderTitle from "./HeaderTitle";
import { useRoute } from "@react-navigation/native";

const TabHeader = () => {
  const route = useRoute();
  const showHeaderLeft = route.name !== "home";
  return (
    <SafeAreaView className=" justify-center bg-white">
      <View className=" flex-row justify-between items-center py-3 bg-white px-4">
        {showHeaderLeft ? <View className=" w-[40px]"></View> : <HeaderLeft />}
        <HeaderTitle />
        <View className=" w-[40px]"></View>
      </View>
    </SafeAreaView>
  );
};

export default TabHeader;
