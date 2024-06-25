import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { icons } from "../constants";
import { useRouter } from "expo-router";

const SearchInput = ({
  title,
  value,
  placeholder,
  handleChangeText,
  searchHotel,
  otherstyles,
  initialQuery,
  handleIndexPreps,
  ...props
}) => {
  const [query, setQuery] = useState(initialQuery || null);
  const router = useRouter();
  return (
    <View
      className="w-full h-12 pl-4 pr-2 bg-white border-1 border-gray-100/20 focus:border-secondary items-center flex-row justify-between"
      style={{
        // Adjust as needed
        shadowColor: "#000", // iOS
        shadowOffset: { width: 0, height: 2 }, // iOS
        shadowOpacity: 0.1, // iOS
        shadowRadius: 10.84, // iOS
        elevation: 5, // Android
        borderRadius: 10, // Android
      }}
    >
      <TouchableOpacity
        onPress={() => {
          handleIndexPreps();
        }}
      >
        <Image
          source={icons.search}
          resizeMode="contain"
          className="w-5 h-5 "
          tintColor="#FF601B"
        />
      </TouchableOpacity>
      <TouchableOpacity
        className="w-[70%]"
        onPress={() => {
          handleIndexPreps();
        }}
      >
        <Text className=" text-base font-pregular text-gray-500">
          {searchHotel.search != ""
            ? searchHotel.search
            : "Search with Name ..."}{" "}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          handleIndexPreps();
        }}
        className=" border p-1.5 rounded-lg border-gray-100"
      >
        <Image
          source={icons.setting}
          resizeMode="contain"
          className="w-4 h-4 "
          tintColor="#FF601B"
        />
      </TouchableOpacity>
    </View>
  );
};

export default SearchInput;
