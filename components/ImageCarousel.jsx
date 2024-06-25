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

const { width } = Dimensions.get("window");

const Carousel = ({ list, showButtom }) => {
  const flatListRef = useRef(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [show, setShow] = useState(false);

  const handlePaginationPress = (index) => {
    // flatListRef.current.scrollToIndex({ animated: true, index });
    setCurrentPage(index);
    console.log(index, "this is ");
  };

  const router = useRouter();

  return (
    <View>
      {!show ? (
        <View className=" relative rounded-b-[20px] overflow-hidden">
          <FlatList
            ref={flatListRef}
            data={list ? list : []}
            renderItem={({ item }) => (
              <View>
                {/* <Image
                  source={{ uri: item.image }}
                  style={{ width: width, height: 350 }}
                /> */}
                <CachedImage
                  uri={item.image}
                  style={{ width: width, height: 350 }}
                />
              </View>
            )}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()}
            onMomentumScrollEnd={(event) => {
              const index = Math.floor(
                event.nativeEvent.contentOffset.x / width
              );
              console.log(event.nativeEvent.contentOffset.x, width);
              setCurrentPage(index);
            }}
          />
          {showButtom && (
            <View className=" absolute bottom-4 right-28 flex-row justify-center bg-gray-800/60 rounded-3xl w-[100px] gap-x-3 px-2 py-1.5 items-center">
              <TouchableOpacity onPress={() => setShow(true)}>
                <Text className=" text-white text-sm text-nowrap">
                  see images
                </Text>
              </TouchableOpacity>
            </View>
          )}
          <View className=" absolute bottom-4 right-6 flex-row justify-center bg-gray-800/60 rounded-3xl w-[65px] gap-x-3 px-2 py-1.5 items-center">
            <Text className=" text-white text-sm">{currentPage + 1}</Text>
            <Text className=" text-white text-sm">|</Text>
            <Text className=" text-white text-sm">{list?.length}</Text>
          </View>
        </View>
      ) : (
        <View className=" relative">
          <TouchableOpacity
            onPress={() => setShow(false)}
            className=" absolute top-4 right-4 z-20 flex-row justify-center bg-gray-800/60 rounded-3xl w-[130px] gap-x-3 px-2 py-1.5 items-center"
          >
            <Text className=" text-white text-sm text-nowrap">
              Close images View
            </Text>
          </TouchableOpacity>
          <View className=" flex-col gap-y-1">
            {list?.map((item, index) => (
              <TouchableOpacity
                activeOpacity={0.7}
                key={index}
                className={`  w-full h-[350px] `}
              >
                {/* <Image
                  source={{ uri: item.image }}
                  resizeMode="cover"
                  className=" w-full h-full mx-auto"
                /> */}
                <CachedImage
                  uri={item.image}
                  resizeMode="cover"
                  className=" w-full h-full mx-auto"
                />
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}
    </View>
  );
};

export default Carousel;
