import React from "react";
import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import { CachedImage } from "../../helpers/image";
import { images } from "../../constants";
// import LoadingCity from "../LoadingCart/LoadingCity";

// const { width: screenWidth } = Dimensions.get("window");

const data = [
  {
    id: 1,
    title: "Book with Confidence",
    description:
      "Our team of trained agents are with you at every step of the way. Making your trip safe and easy.",
    image: images.bookwithconfidence,
  },
  {
    id: 2,
    title: "Travel with Trust",
    description:
      "TAT licensed and direct partnership allows us to resolve all matters at hand bringing you peace of mind.",
    image: images.travelwithtrust,
  },
  {
    id: 3,
    title: "Discover Thailand",
    description:
      "Explore from hundreds of tours, attractions, hotels and destinations around Thailand.",
    image: images.discoverthailand,
  },
  {
    id: 4,
    title: "Get best prices",
    description:
      "Get great prices that are cheaper than walk-ins and save more on your next trip.",
    image: images.getbestprice,
  },
  {
    id: 5,
    title: "Growing with You",
    description:
      "Our global team and many more are working around the clock to improve travel experience.",
    image: images.growingwithyou,
  },
];

const WhyBookWithUs = () => {
  // Function to render each item in the carousel
  const renderItem = (item) => (
    <View
      className="w-[200px] p-4 mr-2 bg-white"
      style={{ borderRadius: 20 }}
      key={item.id}
    >
      <Image
        source={item.image}
        className=" w-20 h-20"
        width={400}
        height={400}
        resizeMode="cover"
      />
      <View className=" py-2 gap-y-2">
        <Text className=" font-psemibold">{item.title}</Text>
        <Text className=" font-pregular text-sm">{item.description}</Text>
      </View>
    </View>
  );

  return (
    <View className=" px-4 gap-y-4">
      <View className="pt-5 flex flex-row w-full justify-between sticky top-0 items-center gap-4">
        <Text className="text-lg tracking-wide font-psemibold text-secondary">
          why book with us
        </Text>
      </View>

      {/* <View>
        <LoadingCity />
      </View> */}
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingVertical: 10 }}
      >
        {data?.map(renderItem)}
      </ScrollView>
    </View>
  );
};

export default WhyBookWithUs;
