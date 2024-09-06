import React from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { CachedImage } from "../../helpers/image";

// const { width: screenWidth } = Dimensions.get("window");

const ReadAboutDestination = () => {
  // const { width } = useWindowDimensions();
  // Example data for the carousel
  const data = [
    {
      id: 2,
      image:
        "https://api-blog.thanywhere.com/storage/images/1717666471_43456_bangkok-cover.jpg",
      name: "Bangkok",
    },
    {
      id: 4,
      image:
        "https://api-blog.thanywhere.com/storage/images/1717666461_22639_Pattaya-cover.jpg",
      name: "Pattaya",
    },
    {
      id: 10,
      image:
        "https://api-blog.thanywhere.com/storage/images/1717667117_86197_chiang-mai.jpg",
      name: "Chiang Mai",
    },
    {
      id: 9,
      image:
        "https://api-blog.thanywhere.com/storage/images/1717667007_87830_phuket-cover.jpg",
      name: "Phuket",
    },
    {
      id: 8,
      image:
        "https://api-blog.thanywhere.com/storage/images/1717666584_47566_kanchanaburi-cover.jpg",
      name: "Kanchanaburi",
    },
    {
      id: 6,
      image:
        "https://api-blog.thanywhere.com/storage/images/1717666875_70551_ayutthaya-cover.jpg",
      name: "Ayutthaya",
    },
  ];

  // Function to render each item in the carousel
  const renderItem = ({ item }) => (
    <TouchableOpacity
      key={item.name}
      onPress={() => {
        // Handle item press (navigation action)
        console.log(`Pressed ${item.name}`);
      }}
    >
      <View className=" mr-4" key={item.id}>
        <CachedImage
          uri={item.image}
          style={{ width: 200, height: 100, borderRadius: "10px" }}
        />
      </View>
    </TouchableOpacity>
  );

  return (
    <View className=" px-4 gap-y-4">
      <View className="pt-6 flex flex-row w-full justify-start items-center gap-4">
        <Text className="text-lg tracking-wide font-psemibold text-secondary">
          read about destinations
        </Text>
      </View>

      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.name}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default ReadAboutDestination;
