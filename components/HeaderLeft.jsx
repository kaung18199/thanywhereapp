import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { SimpleLineIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const HeaderLeft = () => {
  const router = useRouter();

  return (
    <TouchableOpacity 
      onPress={() => router.back()} 
      className="  "
      accessible={true}
      accessibilityRole="button"
      accessibilityLabel="Go back"
      accessibilityHint="Navigate to the previous screen"
      hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }}
    >
      <SimpleLineIcons
        name="arrow-left"
        size={16}
        color="#FF8E01"
        weight="bold"
        className=" "
        accessible={false}
      />
    </TouchableOpacity>
  );
};

export default HeaderLeft;
