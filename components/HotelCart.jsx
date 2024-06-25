import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import icons from "../constants/icons";
import * as Animatable from "react-native-animatable";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { CachedImage } from "../helpers/image";
// import ImageCarousel from "./ImageCarousel";

const HotelCart = ({ item }) => {
  const router = useRouter();
  const fadeInRight = {
    from: {
      opacity: 0,
      translateX: 100, // Start from 100 units to the right
    },
    to: {
      opacity: 1,
      translateX: 0, // Move to 0 units (initial position)
    },
  };

  return (
    <Animatable.View
      className=" mb-4 p-3 bg-white rounded-xl shadow-sm"
      animation={fadeInRight}
      duration={500}
    >
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => router.push(`/detail/hotel/${item.id}`)}
        className=" relative"
      >
        <View className=" h-[300px] overflow-hidden rounded-lg">
          {/* <Image
            source={{ uri: item?.images[0]?.image }}
            resizeMode="cover"
            className=" w-full h-full"
          /> */}
          <CachedImage
            uri={item?.images[0]?.image}
            resizeMode="cover"
            className=" w-full h-full"
          />
        </View>

        <View className=" pt-4 px-2 pb-2 ">
          <View className=" flex-row justify-between items-start gap-5">
            <View className=" w-[60%]">
              <Text
                className=" text-base font-psemibold pb-2 text-secondary "
                numberOfLines={1}
              >
                {item.name}
              </Text>
              <View className=" flex-row justify-start items-center gap-2">
                <Ionicons name="location-outline" size={14} color={"#FF601B"} />
                <Text
                  className=" text-sm font-pregular text-gray-600"
                  numberOfLines={1}
                >
                  {item.city?.name} , {item.place}
                </Text>
              </View>
              <View className=" flex-row justify-start items-center gap-1 mt-2">
                <MaterialIcons
                  name="attach-money"
                  size={16}
                  color={"#FF601B"}
                />
                <Text className=" text-lg font-psemibold text-secondary">
                  {item.lowest_room_price} thb{" "}
                  <Text className=" text-sm font-pregular text-gray-600">
                    / night
                  </Text>
                </Text>
              </View>
            </View>
            <View className=" justify-end items-end pb-2">
              <TouchableOpacity activeOpacity={0.7} className="]">
                <Ionicons name="heart-outline" size={20} color={"#FF601B"} />
              </TouchableOpacity>
              <Text className=" font-psemibold text-secondary text-base mt-8 pt-1.5">
                {item.rooms?.length} ROOMS
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </Animatable.View>
  );
};

export default HotelCart;
