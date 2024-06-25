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
import { getHotelDetail } from "../../../redux/stores/hotelSlice";
// import * as Animatable from "react-native-animatable";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import CustomButton from "../../../components/CustomButton";
import RoomList from "../../../components/RoomList";
import CustomBottomSheet from "../../../components/CustomBottomSheet";
import EmptyState from "../../../components/EmptyState";
import Animated, {
  SlideInDown,
  SlideInUp,
  useScrollViewOffset,
} from "react-native-reanimated";
import { CachedImage } from "../../../helpers/image";

const HotelDetail = () => {
  const { id } = useLocalSearchParams();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [hotel, setHotel] = useState(null);
  const scrollRef = useRef(null);
  const navigation = useNavigation();
  const router = useRouter();

  const bottomSheetRef = useRef(null);
  const handleClosePreps = () => bottomSheetRef.current?.close();
  const handleOpenPreps = () => bottomSheetRef.current?.expand();
  const handleIndexPreps = () => bottomSheetRef.current?.snapToIndex(4);

  const [roomData, setRoomData] = useState("");
  const modalOpenFunction = (data) => {
    setRoomData(data);
    handleIndexPreps();
  };

  const getFunction = async (id) => {
    try {
      setLoading(true);
      const data = await dispatch(getHotelDetail(id));
      setHotel(data.data);
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
          <EmptyState title="loading Hotel Detail" subtitle="please wait ..." />
        </View>
      ) : (
        <View className=" relative h-full">
          <Animated.ScrollView ref={scrollRef} scrollEventThrottle={16}>
            <ImageCarousel list={hotel?.images} showButtom={false} />
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
                  {hotel?.name}
                </Text>
                <View className="w-full flex-1 flex-row flex-wrap justify-between items-between gap-3">
                  <View className=" gap-3">
                    <View className=" flex-row gap-2 justify-start items-start  ">
                      <Ionicons
                        name="location-outline"
                        size={16}
                        color={"#FF601B"}
                      />
                      <Text className=" text-sm font-pregular text-gray-700">
                        {hotel?.city?.name}
                      </Text>
                    </View>
                    <View className=" flex-row gap-2 justify-start items-start">
                      <Ionicons
                        name="location-outline"
                        size={16}
                        color={"#FF601B"}
                      />
                      <Text className=" text-sm font-pregular text-gray-700">
                        {hotel?.place}
                      </Text>
                    </View>
                  </View>

                  <View className=" gap-3">
                    <View className=" flex-row gap-2 justify-start items-start">
                      {/* <Ionicons
                        name="location-outline"
                        size={16}
                        color={"#FF601B"}
                      /> */}
                      <FontAwesome5 name="hotel" size={14} color={"#FF601B"} />
                      <Text className=" text-sm font-pregular text-gray-700">
                        {hotel?.rooms?.length} rooms
                      </Text>
                    </View>
                    <View className=" flex-row gap-2 justify-start items-start">
                      <Ionicons
                        name="star-outline"
                        size={16}
                        color={"#FF601B"}
                      />
                      <Text className=" text-sm text-green-700 font-pmedium">
                        Direct Partner{" "}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
            {hotel?.facilities.length > 0 && (
              <View className=" px-4 pt-4  ">
                <View
                  className=" bg-white rounded-xl overflow-hidden p-4"
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
                  <View className=" flex-row justify-between items-center">
                    <Text className=" text-lg font-pmedium text-gray-700 pb-2">
                      Facilities
                    </Text>
                    <Text className=" text-sm font-pregular text-gray-700 pb-2 pr-4">
                      scroll right for see all
                    </Text>
                  </View>
                  <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    className=" pt-2 ml-4"
                  >
                    {hotel?.facilities?.map((item, index) => (
                      <TouchableOpacity
                        activeOpacity={0.7}
                        key={index}
                        className={`  rounded-xl  w-auto flex-nowrap  mr-2 py-1.5 font-pregular gap-y-2`}
                      >
                        {/* <Image
                          source={{ uri: item.image }}
                          resizeMode="contain"
                          className=" w-[30px] h-[30px] mx-auto"
                        /> */}
                        <CachedImage
                          uri={item.image}
                          resizeMode="contain"
                          className=" w-[30px] h-[30px] mx-auto"
                        />
                        <Text className=" text-xs font-pregular">
                          {item.name}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                </View>
              </View>
            )}
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
                  About Hotel
                </Text>
                <View className="w-full ">
                  <Text className=" text-sm py-2 font-pregular text-gray-700 leading-[20px]">
                    {hotel?.description}
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
                  Rooms
                </Text>
                {/* <Button title="open" onPress={handleOpenPreps} />
                <Button title="close" onPress={handleClosePreps} />
                <Button title="index2" onPress={handleIndexPreps} /> */}
                <RoomList
                  rooms={hotel?.rooms}
                  modalOpen={modalOpenFunction}
                  closeModal={handleClosePreps}
                />
              </View>
            </View>
          </Animated.ScrollView>
          <Animated.View
            entering={SlideInDown.delay(500)
              .duration(1000)
              .springify()
              .damping(16)}
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
              <Text className=" text-lg font-psemibold text-secondary">
                {hotel?.lowest_room_price} thb
                <Text className=" text-sm font-pmedium text-gray-400">
                  /night
                </Text>
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
          {/* <CustomBottomSheet
            id={roomData}
            ref={bottomSheetRef}
            handleClosePreps={handleClosePreps}
          /> */}
        </View>
      )}
    </View>
  );
};

export default HotelDetail;
