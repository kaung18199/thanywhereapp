import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { images } from "../constants";
import { FontAwesome5 } from "@expo/vector-icons";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const HomeCart = ({ action, text, count, image, icon }) => {
  return (
    <TouchableOpacity
      onPress={action}
      activeOpacity={0.7}
      className="pb-2 p-1.5 shadow-sm bg-white relative overflow-hidden rounded-xl"
      style={{
        width: wp(45),
      }}
    >
      <View className=" w-full bg-white/10 " style={{ height: hp(25) }}>
        <Image
          source={image}
          resizeMode="cover"
          className=" w-[100%] h-[100%] rounded-lg"
        />
      </View>
      {/* <View className=" absolute -bottom-[60%] -right-[90%] w-[200px] h-[200px] bg-secondary-200/10 -z-10 rounded-full"></View> */}

      <View className=" px-2 pt-1">
        <View className=" flex-row justify-start items-center gap-2">
          <FontAwesome5 name={icon} size={wp(3.5)} color="#FF601B" />
          <Text className=" text-base font-psemibold text-secondary pt-1">
            {text}
          </Text>
        </View>
        <Text className=" text-xs pt-1 font-pregular text-gray-600 pl-1 pb-1">
          {count} Packages
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default HomeCart;
