import { View, Text, TouchableOpacity, ScrollView, Image } from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { getVariationDetail } from "../../../redux/stores/variationSlice";
import EmptyState from "../../../components/EmptyState";
import { images } from "../../../constants";
import Animated, { SlideInDown } from "react-native-reanimated";

const TicketDetial = () => {
  const { id } = useLocalSearchParams();
  const navigation = useNavigation();
  const router = useRouter();
  const dispatch = useDispatch();
  const [variation, setVariation] = useState(null);
  const [loading, setLoading] = useState(false);

  const getDetailAction = async (id) => {
    try {
      setLoading(true);
      const res = await dispatch(getVariationDetail(id));
      setVariation(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getDetailAction(id);
  }, [id]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <View className=" flex-row justify-center items-center gap-2">
            <TouchableOpacity
              activeOpacity={0.7}
              className="bg-white p-2 rounded-full border border-[#ff5f1b33]"
            >
              <Ionicons name="heart-outline" size={18} color={"#FF601B"} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {}}
              activeOpacity={0.7}
              className="bg-white p-2 rounded-full border border-[#ff5f1b33]"
            >
              <Ionicons name="share-outline" size={18} color={"#FF601B"} />
            </TouchableOpacity>
          </View>
        );
      },
      headerLeft: () => {
        return (
          <View className=" flex-row justify-center items-center space-x-2">
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => router.back()}
              className="bg-white p-2 rounded-full border border-[#ff5f1b33]"
            >
              <Ionicons name="chevron-back" size={18} color={"#FF601B"} />
            </TouchableOpacity>
          </View>
        );
      },
    });
  }, []);
  return (
    <View>
      {loading ? (
        <View className=" h-full justify-center items-center">
          <EmptyState
            title="loading Ticket Detail"
            subtitle="please wait ..."
          />
        </View>
      ) : (
        <ScrollView className=" relative h-full">
          {/* <View className=" ">
          <ImageCarousel list={variation?.images} showButtom={true} />
        </View> */}
          {variation?.images?.lenght > 0 ? (
            <ImageCarousel list={variation?.images} showButtom={true} />
          ) : (
            <Image
              source={images.ticketdefault}
              resizeMode="cover"
              className=" w-full h-[250px] rounded-lg"
            />
          )}

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
              {variation?.name}
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
                    {variation?.entrance_ticket?.cities[0]?.name}
                  </Text>
                </View>
                {variation?.entrance_ticket?.place && (
                  <View className=" flex-row gap-2 justify-start items-start">
                    <Ionicons
                      name="location-outline"
                      size={16}
                      color={"#FF601B"}
                    />
                    <Text className=" text-sm font-pregular text-gray-700">
                      {variation?.entrance_ticket?.place}
                    </Text>
                  </View>
                )}
              </View>

              <View className=" gap-y-3">
                <View className=" flex-row gap-2 justify-start items-start">
                  <Ionicons name="star-outline" size={16} color={"#FF601B"} />
                  <Text className=" text-sm text-green-700 font-pmedium">
                    Avaliable Now !{" "}
                  </Text>
                </View>
              </View>
            </View>
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
              {variation?.description}
            </Text>
          </View>
          <Animated.View
            entering={SlideInDown.delay(1000).duration(500)}
            className=" bg-white px-4 w-full h-[60px] flex-row justify-between items-center rounded-t-[20px]"
            style={{
              elevation: 2, // Add elevation for shadow on Android
              shadowColor: "#000000", // Add shadow properties for iOS
              shadowOffset: {
                width: 0,
                height: -0.5, // Negative height to create a shadow on the top
              },
              shadowOpacity: 0.2,
              shadowRadius: 4,
            }}
          >
            <View>
              <Text className=" text-base font-psemibold text-gray-600">
                {/* {attraction?.lowest_room_price} thb
                <Text className=" text-sm font-pmedium text-gray-400">
                  /night
                </Text> */}
                Booking at Messenger
              </Text>
            </View>
            <View className=" bg-secondary-100/50 rounded-lg px-4 py-1">
              <Text className=" text-lg font-psemibold text-secondary">
                {variation?.price} thb
              </Text>
            </View>
          </Animated.View>
        </ScrollView>
      )}
    </View>
  );
};

export default TicketDetial;
