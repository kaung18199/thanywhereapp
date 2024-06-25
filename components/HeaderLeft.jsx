import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { SimpleLineIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const HeaderLeft = () => {
  const router = useRouter();

  return (
    <TouchableOpacity onPress={() => router.back()} className="  ">
      <SimpleLineIcons
        name="arrow-left"
        size={16}
        color="#FF8E01"
        weight="bold"
        className=" "
      />
    </TouchableOpacity>
  );
};

export default HeaderLeft;
