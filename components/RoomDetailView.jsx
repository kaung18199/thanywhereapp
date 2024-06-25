import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getRoomDetail } from "../redux/stores/roomSlice";
import ImageCarousel from "./ImageCarousel";
import { ScrollView } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import EmptyState from "./EmptyState";

const RoomDetailView = ({ id }) => {
  const dispatch = useDispatch();
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(false);

  const getDetailAction = async (id) => {
    try {
      setLoading(true);
      const room = await dispatch(getRoomDetail(id));
      setRoom(room);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getDetailAction(id);
  }, [id]);

  return (
    <View>
      {loading ? (
        <View className=" h-full justify-center items-center">
          <EmptyState title="loading Room Detail" subtitle="please wait ..." />
        </View>
      ) : (
        <ScrollView className=" relative">
          <View className=" ">
            <ImageCarousel list={room?.data?.images} showButtom={true} />
          </View>

          <View
            className=" bg-white rounded-xl overflow-hidden pt-4 pb-6 pl-4 pr-6 mx-4 mt-4 mb-2"
            style={{
              elevation: 2, // Add elevation for shadow on Android
              shadowColor: "#000000", // Add shadow properties for iOS
              shadowOffset: {
                width: 0,
                height: 0.5, // Negative height to create a shadow on the top
              },
              shadowOpacity: 0.5,
              shadowRadius: 4,
            }}
          >
            <Text className=" text-base font-psemibold text-secondary-200 pb-4">
              {room?.data.name}
            </Text>
            <View className="w-full flex flex-row flex-wrap justify-between items-between  ">
              <View className=" gap-y-3">
                <View className=" flex-row gap-2 justify-start items-start  ">
                  <Ionicons
                    name="location-outline"
                    size={16}
                    color={"#FF601B"}
                  />
                  <Text className=" text-sm font-pregular text-gray-700">
                    {room?.data.hotel?.city?.name}
                  </Text>
                </View>
                <View className=" flex-row gap-2 justify-start items-start">
                  <Ionicons
                    name="location-outline"
                    size={16}
                    color={"#FF601B"}
                  />
                  <Text className=" text-sm font-pregular text-gray-700">
                    {room?.data.hotel?.place}
                  </Text>
                </View>
              </View>

              <View className=" gap-y-3">
                <View className=" flex-row gap-2 justify-start items-start">
                  <Ionicons name="star-outline" size={16} color={"#FF601B"} />
                  <Text className=" text-sm text-green-700 font-pmedium">
                    Direct Partner{" "}
                  </Text>
                </View>
                <View className=" flex-row gap-2 justify-start items-center">
                  {room?.data.is_extra == 0 ? (
                    <Ionicons
                      name="close-circle-outline"
                      size={16}
                      color={"#FF601B"}
                    />
                  ) : (
                    <Ionicons
                      name="checkmark-circle-outline"
                      size={16}
                      color={"#FF601B"}
                    />
                  )}
                  <Text
                    className={` text-sm text-gray-600 font-pmedium pt-0.5 ${
                      room?.data.is_extra == 0 ? "line-through" : ""
                    }`}
                  >
                    Is Extra
                  </Text>
                </View>
              </View>
            </View>
            {/* <View className=" flex-col gap-4 justify-start items-start mt-4 ">
              <View className=" text-sm text-gray-700 justify-center items-center bg-secondary-100/20 px-2 py-1.5 rounded-full font-pregular w-full">
                <Text>{room?.data.max_person} Max Person</Text>
              </View>
              <View className=" text-sm flex-row justify-center items-center bg-secondary-100/20 px-2 py-1.5 rounded-full font-psemibold w-full">
                <Text className=" text-secondary font-psemibold ">
                  {room?.data.room_price}thb{" "}
                </Text>
                <Text className=" text-gray-600 font-pregular text-sm">
                  /night
                </Text>
              </View>
            </View> */}
          </View>
          <View
            className=" bg-white rounded-xl overflow-hidden pt-5 pb-5 pl-4 pr-4 mt-2 mb-4 mx-4"
            style={{
              elevation: 2, // Add elevation for shadow on Android
              shadowColor: "#000000", // Add shadow properties for iOS
              shadowOffset: {
                width: 0,
                height: 0.5, // Negative height to create a shadow on the top
              },
              shadowOpacity: 0.5,
              shadowRadius: 4,
            }}
          >
            <Text className=" text-base font-psemibold text-gray-800 pb-4">
              Description
            </Text>
            <Text className=" leading-[20px] text-gray-600">
              {room?.data.description}
            </Text>
          </View>
        </ScrollView>
      )}
    </View>
  );
};

export default RoomDetailView;
