import { View } from "react-native";
import React from "react";
import HeaderPartHome from "../homePackage/HeaderPartHome";

const HeaderPart = ({ children }) => {
  return (
    <View className=" bg-secondary overflow-hidden">
      <HeaderPartHome />
      {children}
      <View className=" bg-white relative -bottom-6 rounded-full w-full h-[40px] z-10"></View>
    </View>
  );
};

export default HeaderPart;
