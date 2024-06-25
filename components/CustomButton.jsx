import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

const CustomButton = ({
  title,
  handlePress,
  containerStyle,
  textStyles,
  isLoading,
}) => {
  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.7}
      className={`bg-secondary-200 rounded-full justify-center items-center ${containerStyle} ${
        isLoading ? "opacity-50" : ""
      }`}
      disabled={isLoading}
      style={{
        // Adjust as needed
        shadowColor: "#000", // iOS
        shadowOffset: { width: 0, height: 2 }, // iOS
        shadowOpacity: 0.25, // iOS
        shadowRadius: 3.84, // iOS
        elevation: 5, // Android
        borderRadius: 8.84, // Android
      }}
    >
      <Text className={` text-primary font-psemibold  ${textStyles}`}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
