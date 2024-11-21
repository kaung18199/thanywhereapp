import React from "react";
import { StyleSheet, Text, useWindowDimensions, View } from "react-native";
// import Skelentonloading from "react-native-skelenton-loading";

const LoadingVantour = () => {
  const { width: screenWidth } = useWindowDimensions();

  return (
    <View
      className=" flex flex-row justify-between items-start gap-1 bg-white px-4 py-4 rounded-2xl "
      style={{ width: screenWidth }}
    >
      <View
        className=" bg-gray-200 py-20 animate-pulse rounded-xl "
        style={{ width: screenWidth * 0.35 }}
      >
        <Text>.</Text>
      </View>
      <View
        style={{ width: screenWidth * 0.55 }}
        className="overflow-hidden pr-5 gap-y-2"
      >
        <View className=" bg-gray-200 py-0 animate-pulse rounded-xl w-36">
          <Text>.</Text>
        </View>
        <View className=" bg-gray-200 animate-pulse rounded-xl h-4 overflow-hidden">
          <Text>.</Text>
        </View>
        <View className=" bg-gray-200 animate-pulse rounded-xl h-3 overflow-hidden">
          <Text>.</Text>
        </View>
        <View className=" bg-gray-200 animate-pulse rounded-xl h-3 overflow-hidden">
          <Text>.</Text>
        </View>
        <View className=" bg-gray-200 animate-pulse rounded-xl h-3 overflow-hidden">
          <Text>.</Text>
        </View>
        <View className=" bg-gray-200 animate-pulse rounded-xl h-5 w-32 mt-2 overflow-hidden">
          <Text>.</Text>
        </View>
        <View className=" bg-gray-200 animate-pulse rounded-xl h-5 w-32 overflow-hidden">
          <Text>.</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});

export default LoadingVantour;
