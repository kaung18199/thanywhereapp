import { useRouter } from "expo-router";
import React, { useRef, useState } from "react";
import {
  View,
  Image,
  Dimensions,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Text,
} from "react-native";
import { CachedImage } from "../helpers/image";
import images from "../constants/images";
import { icons } from "../constants";
import Animated, { FadeInDown } from "react-native-reanimated";

const { width } = Dimensions.get("window");

const OnBoardingPart = () => {
  const flatListRef = useRef(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [show, setShow] = useState(false);

  const handlePrev = () => {
    if (currentPage > 0) {
      flatListRef.current.scrollToIndex({ index: currentPage - 1 });
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < list.length - 1) {
      flatListRef.current.scrollToIndex({ index: currentPage + 1 });
      setCurrentPage(currentPage + 1);
    }
  };

  const list = [
    {
      id: 1,
      image: images.onboarding1,
      title: "looking for a trips?",
      des: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque
    repellendus eligendi laboriosam, `,
      button: "next page",
    },
    {
      id: 2,
      image: images.onboarding2,
      title: "get best deals?",
      des: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque
    repellendus eligendi laboriosam, `,
      button: "next page",
    },
    {
      id: 3,
      image: images.onboarding3,
      title: "enjoy the trip?",
      des: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque
    repellendus eligendi laboriosam, .`,
      button: "guest",
    },
  ];

  const router = useRouter();

  return (
    <View>
      <View className=" relative  overflow-hidden">
        <FlatList
          ref={flatListRef}
          data={list ? list : []}
          renderItem={({ item }) => (
            <View className=" relative">
              <Animated.View className=" absolute top-[40px] z-10 w-full gap-y-2">
                <Text className=" text-center text-secondary font-psemibold text-[20px]">
                  {item.title}
                </Text>
                <Text className=" text-center text-secondary font-pmedium px-4 text-[10px]">
                  {item.des}
                </Text>
                <View className=" flex justify-center items-center gap-2 py-2 flex-row">
                  <View
                    className={` w-8 h-1 ${
                      item.id == 1 ? "bg-secondary" : "bg-secondary-100/50"
                    }`}
                  ></View>
                  <View
                    className={` w-8 h-1 ${
                      item.id == 2 ? "bg-secondary" : "bg-secondary-100/50"
                    }`}
                  ></View>
                  <View
                    className={` w-8 h-1 ${
                      item.id == 3 ? "bg-secondary" : "bg-secondary-100/50"
                    }`}
                  ></View>
                </View>
                <View
                  className={` flex flex-row px-6 ${
                    currentPage == 0 ? "justify-center" : "justify-between"
                  } items-center`}
                >
                  {currentPage != 0 && (
                    <View className="">
                      <TouchableOpacity
                        onPress={handlePrev}
                        disabled={currentPage === 0}
                        className=" bg-white/60 p-2 rounded-full"
                      >
                        <Image
                          source={icons.leftArrow}
                          resizeMode="contain"
                          className="h-4 w-4 "
                        />
                      </TouchableOpacity>
                    </View>
                  )}
                  {currentPage != list.length - 1 && (
                    <View className="">
                      <TouchableOpacity
                        onPress={handleNext}
                        className=" bg-secondary font-pmedium px-4 py-2 rounded-full"
                        disabled={currentPage === list.length - 1}
                      >
                        <Text className=" text-white font-pmedium text-sm">
                          next page
                        </Text>
                      </TouchableOpacity>
                    </View>
                  )}
                  {currentPage == list.length - 1 && (
                    <View className="">
                      <TouchableOpacity
                        onPress={() => router.push("/home")}
                        className=" bg-secondary font-pmedium px-4 py-2 rounded-full"
                      >
                        <Text className=" text-white font-pmedium text-sm">
                          guest
                        </Text>
                      </TouchableOpacity>
                    </View>
                  )}
                </View>
              </Animated.View>
              <Image
                source={item.image}
                resizeMode="cover"
                style={{ width: width }}
                className="h-screen relative z-0"
              />
            </View>
          )}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          onMomentumScrollEnd={(event) => {
            const index = Math.floor(event.nativeEvent.contentOffset.x / width);
            console.log(event.nativeEvent.contentOffset.x, width);
            setCurrentPage(index);
          }}
        />
      </View>
    </View>
  );
};

export default OnBoardingPart;
