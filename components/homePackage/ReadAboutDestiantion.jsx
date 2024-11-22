import React from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { CachedImage } from "../../helpers/image";

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

const ReadAboutDestination = () => {
  // Function to render each item
  const renderItem = ({ item }) => (
    <TouchableOpacity
      key={item.id.toString()}
      onPress={() => {
        // Handle item press (navigation action)
        console.log(`Pressed ${item.name}`);
      }}
      style={{
        marginRight: 16,
      }}
    >
      <CachedImage
        uri={item.image}
        style={{
          width: 200,
          height: 100,
          borderRadius: 10,
        }}
      />
    </TouchableOpacity>
  );

  return (
    <View
      style={{
        paddingHorizontal: 16,
        paddingBottom: 16,
        gap: 16,
        backgroundColor: "#FFFFFF",
      }}
    >
      <View
        style={{
          paddingTop: 24,
          flexDirection: "row",
          justifyContent: "flex-start",
          alignItems: "center",
          paddingBottom: 16,
          gap: 16,
        }}
      >
        <Text
          style={{ fontSize: 16, fontWeight: "600", color: "#FF601B" }}
          className=" font-psemibold"
        >
          read about destinations
        </Text>
      </View>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default ReadAboutDestination;
