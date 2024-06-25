import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
  Share,
  Button,
} from "react-native";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import ImageCarousel from "../../../components/ImageCarousel";
import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import { useDispatch } from "react-redux";
import { getAttractionDetail } from "../../../redux/stores/attractionSlice";
// import * as Animatable from "react-native-animatable";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import CustomButton from "../../../components/CustomButton";
// import RoomList from "../../../components/RoomList";
import CustomBottomSheet from "../../../components/CustomBottomSheet";
import EmptyState from "../../../components/EmptyState";
import Animated, {
  SlideInDown,
  SlideInUp,
  useScrollViewOffset,
} from "react-native-reanimated";
import TicketList from "../../../components/TicketList";
import CustomBottomTicket from "../../../components/CustomBottomTicket";

const AttractionDetail = () => {
  const { id } = useLocalSearchParams();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [attraction, setAttraction] = useState(null);
  const scrollRef = useRef(null);
  const navigation = useNavigation();
  const router = useRouter();

  const bottomSheetRef = useRef(null);
  const handleClosePreps = () => bottomSheetRef.current?.close();
  const handleOpenPreps = () => bottomSheetRef.current?.expand();
  const handleIndexPreps = () => bottomSheetRef.current?.snapToIndex(4);

  const [ticketId, setTicketId] = useState("");
  const modalOpenFunction = (data) => {
    setTicketId(data);
    handleIndexPreps();
  };

  const getFunction = async (id) => {
    try {
      setLoading(true);
      const data = await dispatch(getAttractionDetail(id));
      setAttraction(data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleClosePreps();
    getFunction(id);
  }, []);

  const shareListingg = async () => {
    try {
      await Share.share({
        title: listing.name,
        url: listing.listing_url,
      });
    } catch (error) {
      console.log(error);
    }
  };

  // const scrollOffset = useScrollViewOffset(scrollRef);

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
              onPress={shareListingg}
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
            title="loading Attraction Detail"
            subtitle="please wait ..."
          />
        </View>
      ) : (
        <View className=" relative h-full">
          <Animated.ScrollView ref={scrollRef} scrollEventThrottle={16}>
            <ImageCarousel list={attraction?.images} showButtom={false} />
            <View className=" px-4 pt-5  ">
              <View
                className=" bg-white rounded-xl overflow-hidden pt-4 pb-6 pl-4 pr-8"
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
                <Text className=" text-lg font-psemibold text-secondary-200 pb-4">
                  {attraction?.name}
                </Text>
                <View className="w-full flex-1 flex-row flex-wrap justify-between items-between gap-3">
                  <View className=" gap-3">
                    <View className=" flex-row justify-start items-start gap-2">
                      <Ionicons
                        name="location-outline"
                        size={14}
                        color={"#FF601B"}
                      />
                      <View
                        className=" text-xs font-pregular text-gray-600 flex-row justify-start items-center flex-wrap gap-2"
                        numberOfLines={2}
                      >
                        {attraction?.cities.length > 0 &&
                          attraction?.cities.map((city) => (
                            <View
                              key={city.id}
                              className=" text-xs text-gray-600 bg-secondary/20 px-1.5 py-0.5 rounded-lg"
                            >
                              <Text className=" text-gray-600 text-xs">
                                {city.name}
                              </Text>
                            </View>
                          ))}
                      </View>
                    </View>
                    {attraction?.place && (
                      <View className=" flex-row gap-2 justify-start items-start">
                        <Ionicons
                          name="location-outline"
                          size={16}
                          color={"#FF601B"}
                        />
                        <Text className=" text-sm font-pregular text-gray-700">
                          {attraction?.place}
                        </Text>
                      </View>
                    )}
                  </View>

                  <View className=" gap-3">
                    <View className=" flex-row gap-2 justify-start items-start">
                      <Ionicons
                        name="ticket-outline"
                        size={14}
                        color={"#FF601B"}
                      />
                      <Text className=" text-sm font-pregular text-gray-700">
                        {attraction?.variations?.length} TICKETS
                      </Text>
                    </View>
                    <View className=" flex-row gap-2 justify-start items-start">
                      <Ionicons
                        name="star-outline"
                        size={16}
                        color={"#FF601B"}
                      />
                      <Text className=" text-sm text-green-700 font-pmedium">
                        Avaliable Now !{" "}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>

            <View className=" px-4 pt-4">
              <View
                className=" bg-white rounded-xl overflow-hidden pt-4 pb-6 pl-4 pr-8"
                style={{
                  // Adjust as needed
                  shadowColor: "#000", // iOS
                  shadowOffset: { width: 0, height: 2 }, // iOS
                  shadowOpacity: 0.04, // iOS
                  shadowRadius: 3.84, // iOS
                  elevation: 1.05, // Android
                  borderRadius: 4.84, // Android
                }}
              >
                <Text className=" text-lg font-pmedium text-gray-700 pb-4">
                  About Attraction Ticket
                </Text>
                <View className="w-full ">
                  <Text className=" text-sm py-2 font-pregular text-gray-700 leading-[20px]">
                    {attraction?.description}
                  </Text>
                </View>
              </View>
            </View>
            <View className=" px-4 pt-4 pb-20">
              <View
                className=" bg-white rounded-xl overflow-hidden pt-4 pb-1 pl-4 pr-4"
                style={{
                  // Adjust as needed
                  shadowColor: "#000", // iOS
                  shadowOffset: { width: 0, height: 2 }, // iOS
                  shadowOpacity: 0.04, // iOS
                  shadowRadius: 3.84, // iOS
                  elevation: 2.05, // Android
                  borderRadius: 4.84, // Android
                }}
              >
                <Text className=" text-lg font-pmedium text-gray-700 pb-4">
                  Ticket Variations
                </Text>

                {attraction?.variations.length > 0 && (
                  <TicketList
                    tickets={attraction?.variations}
                    modalOpen={modalOpenFunction}
                    closeModal={handleClosePreps}
                  />
                  // <Text>Hello</Text>
                )}
              </View>
            </View>
          </Animated.ScrollView>
          <Animated.View
            entering={SlideInDown.delay(1000).duration(500)}
            className=" bg-white px-4 w-full absolute bottom-0  h-[60px] flex-row justify-between items-center rounded-t-[20px]"
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
              <Text className=" text-base font-psemibold text-secondary">
                {/* {attraction?.lowest_room_price} thb
                <Text className=" text-sm font-pmedium text-gray-400">
                  /night
                </Text> */}
                Booking at Messenger
              </Text>
            </View>
            <View className=" my-auto">
              <CustomButton
                title="Book now"
                handlePress={() => {}}
                containerStyle="w-auto px-6 py-2 "
                textStyles="text-base"
              />
            </View>
          </Animated.View>
          {/* <CustomBottomTicket
            id={ticketId}
            ref={bottomSheetRef}
            handleClosePreps={handleClosePreps}
          /> */}
        </View>
      )}
    </View>
  );
};

export default AttractionDetail;
