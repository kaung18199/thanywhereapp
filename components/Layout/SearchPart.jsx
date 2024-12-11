import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import { useRouter } from "expo-router";
import { icons } from "../../constants";

const SearchPart = ({ text, handleIndexPreps, icon, style }) => {
  const router = useRouter();
  return (
    <View
      className={`${
        style ? style : "w-full"
      } h-12 pl-4 pr-4 bg-white border-1 border-gray-100/20 focus:border-secondary items-center flex-row justify-between rounded-full`}
    >
      <View className=" flex-row justify-start items-center gap-4">
        <TouchableOpacity
          onPress={() => {
            handleIndexPreps();
          }}
        >
          <Image
            source={icon}
            resizeMode="contain"
            className="w-5 h-5 "
            tintColor="#FF601B"
          />
        </TouchableOpacity>
        <TouchableOpacity
          className=""
          onPress={() => {
            handleIndexPreps();
          }}
        >
          <Text className=" text-sm font-pregular text-secondary">{text}</Text>
        </TouchableOpacity>
      </View>
      <Image
        source={icons.nexticon}
        resizeMode="contain"
        className="w-5 h-5 "
        tintColor="#FF601B"
      />
    </View>
  );
};

export default SearchPart;
