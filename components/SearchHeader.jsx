import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import HeaderLeft from "./HeaderLeft";
import HeaderSearchTitle from "./HeaderSearchTitle";
import SearchPart from "./SearchPart";
import { useSelector } from "react-redux";
import * as Haptics from "expo-haptics";
import { icons } from "../constants";
import Animated, {
  FadeInDown,
  FadeInLeft,
  FadeInRight,
  FadeInUp,
} from "react-native-reanimated";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const SearchHeader = ({
  query,
  title,
  isHeaderVisible,
  setIsHeaderVisible,
  searchHotel,
  setSearchHotel,
  handleIndexPreps,
  handleClosePreps,
}) => {
  const itemsRef = useRef([]);
  const scrollRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(null);
  const city = useSelector((state) => state.city.city);

  const handleClick = (id) => {
    setSearchHotel({ ...searchHotel, city_id: id });
    const selected = itemsRef.current[id];
    setActiveIndex(id);

    selected?.measureLayout(scrollRef.current, (x, y) => {
      scrollRef.current?.scrollTo({
        x: x - 4,
        y: 0,
        animated: true,
        duration: 5000,
      });
    });

    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  return (
    <SafeAreaView className={` bg-white justify-center`}>
      <View
        className={`${
          isHeaderVisible ? "h-[140px]" : "h-[100px]"
        }   bg-white justify-center gap-y-1.5`}
      >
        <View className=" flex-row justify-between items-center w-full pt-3 pb-2 px-4">
          <HeaderLeft />
          <HeaderSearchTitle title={title} />
          <View className=" w-6 justify-end items-end">
            {!isHeaderVisible && (
              <TouchableOpacity
                onPress={() => {
                  setIsHeaderVisible(true);
                }}
              >
                <Image
                  source={icons.search}
                  resizeMode="contain"
                  className="w-5 h-5 "
                  tintColor="#FF601B"
                />
              </TouchableOpacity>
            )}
          </View>
        </View>

        {isHeaderVisible && (
          <Animated.View
            className=" px-4"
            entering={FadeInDown.delay(500)
              .duration(1000)
              .springify()
              .damping(12)}
          >
            <SearchPart
              searchHotel={searchHotel}
              handleIndexPreps={handleIndexPreps}
              placeholer="Search with name ... ?"
            />
          </Animated.View>
        )}

        <ScrollView
          ref={scrollRef}
          horizontal
          showsHorizontalScrollIndicator={false}
          className=" mt-2 ml-4"
        >
          <Animated.View
            entering={FadeInDown.delay(500)
              .duration(1000)
              .springify()
              .damping(12)}
          >
            <TouchableOpacity
              activeOpacity={0.7}
              ref={(el) => (itemsRef.current[0] = el)}
              onPress={() => {
                handleClick("");
              }}
              className={`${
                activeIndex == "" || activeIndex == null
                  ? "bg-secondary "
                  : "bg-secondary/30 "
              } mb-4 rounded-md overflow-hidden w-auto flex-nowrap  mr-2 px-4 py-2 font-pregular `}
            >
              <Text
                className={
                  activeIndex == "" || activeIndex == null
                    ? " text-white font-psemibold"
                    : " text-gray-600 font-pregular"
                }
                style={{ fontSize: wp(3.5) }}
              >
                All
              </Text>
            </TouchableOpacity>
          </Animated.View>
          {city?.data.map((item) => (
            <Animated.View
              entering={FadeInDown.delay(500)
                .duration(1000)
                .springify()
                .damping(12)}
            >
              <TouchableOpacity
                activeOpacity={0.7}
                ref={(el) => (itemsRef.current[item?.id] = el)}
                onPress={() => {
                  handleClick(item?.id);
                }}
                key={item.id}
                className={`${
                  activeIndex == item?.id ? "bg-secondary " : "bg-secondary/30 "
                } mb-4 rounded-md overflow-hidden w-auto flex-nowrap  mr-2 px-4 py-2 font-pregular `}
              >
                <Text
                  className={
                    activeIndex == item?.id
                      ? " text-white font-psemibold"
                      : " text-gray-600 font-pregular"
                  }
                  style={{ fontSize: wp(3.5) }}
                >
                  {item.name}
                </Text>
              </TouchableOpacity>
            </Animated.View>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default SearchHeader;
