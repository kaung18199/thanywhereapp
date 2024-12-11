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
        <View className=" relative overflow-hidden" style={{ width: width }}>
          <FlatList
            ref={flatListRef}
            data={list || []}
            renderItem={({ item }) => (
              <View>
                <CachedImage
                  uri={item.image}
                  style={{ width: width, height: 380 }}
                />
              </View>
            )}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()}
            onMomentumScrollEnd={(event) => {
              const index = Math.round(
                event.nativeEvent.contentOffset.x / width
              ); // Use Math.round for better accuracy
              setCurrentPage(index); // Directly update the state with the calculated index
            }}
          />
          {showButtom && (
            <View className=" absolute bottom-8 right-24 flex-row justify-center bg-gray-800/60 rounded-3xl w-[100px] gap-x-3 px-2 py-1.5 items-center">
              <TouchableOpacity onPress={() => setShow(true)}>
                <Text className=" text-white text-sm text-nowrap">
                  see images
                </Text>
              </TouchableOpacity>
            </View>
          )}
          <View className=" absolute bottom-8 right-4 flex-row justify-center bg-gray-800/60 rounded-3xl w-[65px] gap-x-3 px-2 py-1.5 items-center">
            <Text className=" text-white text-sm">{currentPage + 1}</Text>
            <Text className=" text-white text-sm">|</Text>
            <Text className=" text-white text-sm">{list?.length}</Text>
          </View>
          <View className=" absolute -bottom-4 left-0 flex-row justify-center bg-white rounded-3xl w-full  items-center h-[30px]"></View>
        </View>
      ) : (
        <View className=" relative">
          <View className=" flex-col gap-y-1">
            {list?.map((item, index) => (
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => setShow(false)}
                key={index}
                className={` h-[350px] `}
                style={{ width: width }}
              >
                <CachedImage
                  uri={item.image}
                  resizeMode="cover"
                  className="h-full mx-auto"
                  style={{ width: width }}
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
