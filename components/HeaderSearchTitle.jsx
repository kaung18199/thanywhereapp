import { View, Text, Image } from "react-native";
import React from "react";
import { icons } from "../constants";

const HeaderSearchTitle = ({ title }) => {
  return (
    <View className=" flex-row justify-center items-center space-x-2">
      <Image source={icons.logo} resizeMode="contain" className=" w-5 h-5" />
      <Text className=" text-secondary-200 text-lg font-psemibold">
        {title}
      </Text>
    </View>
  );
};

export default HeaderSearchTitle;
