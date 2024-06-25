import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import HeaderLeft from "./HeaderLeft";
import HeaderTitle from "./HeaderTitle";

const TabHeader = () => {
  return (
    <SafeAreaView className=" h-[60px] justify-center shadow-2xl px-4 bg-white">
      <View className=" flex-row justify-between items-center ">
        <HeaderLeft />
        <HeaderTitle />
        <View className=" w-[40px]"></View>
      </View>
    </SafeAreaView>
  );
};

export default TabHeader;
