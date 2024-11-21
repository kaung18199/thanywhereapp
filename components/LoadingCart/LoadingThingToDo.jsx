import React from "react";
import { StyleSheet, Text, View } from "react-native";
// import Skelentonloading from "react-native-skelenton-loading";

const LoadingThingToDo = () => {
  return (
    <View className=" flex flex-col gap-1 bg-white px-2 pt-1 pb-4 rounded-2xl ">
      <View className=" bg-gray-200 py-10 animate-pulse rounded-xl">
        <Text>.</Text>
      </View>
      <View className=" bg-gray-200 py-0 animate-pulse rounded-xl w-36">
        <Text>.</Text>
      </View>
      <View className=" bg-gray-200 animate-pulse rounded-xl h-4 overflow-hidden">
        <Text>.</Text>
      </View>
      <View className=" bg-gray-200 animate-pulse rounded-xl h-2 overflow-hidden">
        <Text>.</Text>
      </View>
      <View className=" bg-gray-200 animate-pulse rounded-xl h-2 overflow-hidden">
        <Text>.</Text>
      </View>
      <View className=" bg-gray-200 animate-pulse rounded-xl h-2 overflow-hidden">
        <Text>.</Text>
      </View>
      <View className=" bg-gray-200 animate-pulse rounded-xl h-4 w-32 mt-2 overflow-hidden">
        <Text>.</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});

export default LoadingThingToDo;
