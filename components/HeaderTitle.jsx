import { View, Text, Image } from "react-native";
import React from "react";
import { icons } from "../constants";

const HeaderTitle = () => {
  return (
    <View className=" flex-row justify-center items-center">
      <Image source={icons.logo} resizeMode="contain" className="w-5 h-5" />
      <Text className=" text-secondary-200 text-lg font-psemibold">
        ThailandAny Where
      </Text>
    </View>
  );
};

export default HeaderTitle;
