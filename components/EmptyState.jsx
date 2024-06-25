import { View, Text, Image } from "react-native";
import React from "react";
import { images } from "../constants";
import CustomButton from "./CustomButton";
import { router } from "expo-router";

const EmptyState = ({ title, subtitle }) => {
  return (
    <View className=" justify-center items-center px-4 h-full">
      <Image
        source={images.search}
        resizeMode="contain"
        className=" w-[270px] h-[215px]"
      />
      <Text className=" font-psemibold text-lg text-gray-100">{title}</Text>
      <Text className=" text-sm font-pmedium text-gray-100">{subtitle}</Text>
    </View>
  );
};

export default EmptyState;
