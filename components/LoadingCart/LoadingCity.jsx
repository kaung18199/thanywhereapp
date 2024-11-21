import React from "react";
import { StyleSheet, Text, useWindowDimensions, View } from "react-native";
// import Skelentonloading from "react-native-skelenton-loading";

const LoadingCity = () => {
  const { width: screenWidth } = useWindowDimensions();

  return (
    <View
      className=" flex flex-row justify-between items-start gap-1  px-4 py-4 rounded-2xl "
      style={{ width: screenWidth }}
    >
      <View
        className=" bg-gray-200 py-2 animate-pulse rounded-full "
        style={{ width: screenWidth * 0.1 }}
      >
        <Text>.</Text>
      </View>
      <View
        style={{ width: screenWidth * 0.8 }}
        className="overflow-hidden pr-5 gap-y-2"
      >
        <View className=" bg-gray-200 py-0 animate-pulse rounded-xl w-36">
          <Text>.</Text>
        </View>
        <View className=" bg-gray-200 animate-pulse rounded-xl h-4 w-20 overflow-hidden">
          <Text>.</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});

export default LoadingCity;
