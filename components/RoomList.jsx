import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import React from "react";
import CustomButton from "./CustomButton";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { CachedImage } from "../helpers/image";

const RoomList = ({ rooms, modalOpen }) => {
  const router = useRouter();
  return (
    <FlatList
      data={rooms}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() => router.push("/detail/room/" + item.id)}
          activeOpacity={0.7}
          className=" w-[160px] h-[280px] mr-6"
        >
          <View className=" gap-y-2">
            {/* <Image
              source={{
                uri: item?.images[0]?.image,
              }}
              resizeMode="cover"
              className=" w-[160px] h-[120px] rounded-lg"
            /> */}
            <CachedImage
              uri={item?.images[0]?.image}
              resizeMode="cover"
              className=" w-[160px] h-[120px] rounded-lg"
            />
            <Text
              className=" text-sm font-psemibold text-secondary"
              numberOfLines={1}
            >
              {item.name}
            </Text>
            <Text
              className=" text-xs h-[25px] font-pregular text-gray-600"
              numberOfLines={2}
            >
              {item.description}
            </Text>
            <View className=" w-full flex-row justify-start items-center mt-3 mb-2">
              <MaterialIcons name="attach-money" size={16} color="#FF601B" />
              <Text className=" text-base  font-psemibold text-secondary ">
                {item?.room_price} thb
              </Text>
            </View>
            <CustomButton
              title="more details"
              handlePress={() => router.push("/detail/room/" + item.id)}
              containerStyle="w-auto py-2"
              textStyles="text-sm"
            />
          </View>
        </TouchableOpacity>
      )}
      horizontal
      showsHorizontalScrollIndicator={false}
    />
  );
};

export default RoomList;
