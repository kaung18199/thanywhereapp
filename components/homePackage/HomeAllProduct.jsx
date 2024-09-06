import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import AllProductCart from "./AllProductCart";
import { icons } from "../../constants";

// Example data array
const data = [
  {
    icon: icons.hotelicon,
    text: "hotel bookings",
    state: false,
    link: "/hotel",
  },
  {
    icon: icons.attractionicon,
    text: "attraction tickets",
    state: false,
    link: "/attraction",
  },
  {
    icon: icons.vantouricon,
    text: "private vantours",
    state: true,
    link: "/vantour",
  },
  {
    icon: icons.destiantionicon,
    text: "read destiantion",
    state: false,
    link: "/destination",
  },
  {
    icon: icons.inclusiveicon,
    text: "inclusive packages",
    state: false,
    link: "/inclusive",
  },
  {
    icon: icons.flighticon,
    text: "flight tickets",
    state: false,
    link: "/flight",
  },
];

const HomeAllProduct = () => {
  return (
    <View className=" px-4 gap-y-4">
      <View className="pt-6 flex flex-row w-full justify-start items-center gap-4">
        <Text className="text-lg tracking-wide font-psemibold text-secondary">
          all products
        </Text>
      </View>

      <FlatList
        data={data}
        renderItem={({ item }) => (
          <AllProductCart
            icon={item.icon}
            text={item.text}
            state={item.state}
            key={item.text}
            link={item.link}
          />
        )}
        keyExtractor={(item) => item.text}
        horizontal={true} // Enable horizontal scrolling
        onEndReachedThreshold={0.5}
        showsHorizontalScrollIndicator={false} // Hide horizontal scroll indicator
      />
    </View>
  );
};

export default HomeAllProduct;
