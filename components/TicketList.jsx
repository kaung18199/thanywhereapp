import { View, Text, TouchableOpacity, FlatList, Image } from "react-native";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import CustomButton from "./CustomButton";
import { images } from "../constants";
import { useRouter } from "expo-router";

const TicketList = ({ tickets, modalOpen }) => {
  const router = useRouter();
  return (
    <View>
      <FlatList
        data={tickets}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => router.push("/detail/ticket/" + item.id)}
            activeOpacity={0.7}
            className=" w-[160px] h-[280px] mr-6"
          >
            <View className=" gap-y-2">
              {item?.images?.lenght > 0 ? (
                <Image
                  source={{
                    uri: item?.images[0]?.image,
                  }}
                  resizeMode="cover"
                  className=" w-[160px] h-[120px] rounded-lg"
                />
              ) : (
                <Image
                  source={images.ticketdefault}
                  resizeMode="cover"
                  className=" w-[160px] h-[120px] rounded-lg border border-secondary"
                />
              )}
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
                  {item?.price} thb
                </Text>
              </View>
              <CustomButton
                title="more details"
                handlePress={() => router.push("/detail/ticket/" + item.id)}
                containerStyle="w-auto py-2"
                textStyles="text-sm"
              />
            </View>
          </TouchableOpacity>
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default TicketList;
