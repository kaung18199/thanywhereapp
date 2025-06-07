import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { icons, STRINGS } from "../constants";
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
        accessibilityLabel={STRINGS.SEARCH.SEARCH_BUTTON}
        accessibilityRole="button"
        accessibilityHint={STRINGS.SEARCH.START_SEARCH}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        style={{ minHeight: 44, minWidth: 44, justifyContent: 'center', alignItems: 'center' }}
      >
        <Image
          source={icons.search}
          resizeMode="contain"
          className="w-5 h-5 "
          tintColor="#FF601B"
          accessibilityLabel={STRINGS.ACCESSIBILITY.SEARCH_ICON}
          accessible={true}
        />
      </TouchableOpacity>
      <TouchableOpacity
        className="w-[70%]"
        onPress={() => {
          handleIndexPreps();
        }}
        accessibilityLabel={STRINGS.SEARCH.SEARCH_INPUT}
        accessibilityRole="button"
        accessibilityHint={STRINGS.SEARCH.ENTER_SEARCH_TERMS}
      >
        <Text className=" text-base font-pregular text-gray-700">
          {searchHotel.search != ""
            ? searchHotel.search
            : STRINGS.SEARCH.SEARCH_PLACEHOLDER}{" "}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          handleIndexPreps();
        }}
        className=" border p-1.5 rounded-lg border-gray-100"
        accessibilityLabel={STRINGS.SEARCH.FILTER_SETTINGS}
        accessibilityRole="button"
        accessibilityHint={STRINGS.SEARCH.OPEN_FILTERS}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        style={{ minHeight: 44, minWidth: 44, justifyContent: 'center', alignItems: 'center' }}
      >
        <Image
          source={icons.setting}
          resizeMode="contain"
          className="w-4 h-4 "
          tintColor="#FF601B"
          accessibilityLabel={STRINGS.ACCESSIBILITY.FILTER_ICON}
          accessible={true}
        />
      </TouchableOpacity>
    </View>
  );
};

export default SearchInput;
