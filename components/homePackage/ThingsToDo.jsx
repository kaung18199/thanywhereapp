import React, { useEffect, useMemo, useState } from "react";
import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import { CachedImage } from "../../helpers/image";
import axios from "../../axiosConfig";
import { icons } from "../../constants";

// const { width: screenWidth } = Dimensions.get("window");

const getListAction = async () => {
  const res = await axios.get(
    "/entrance-tickets?city_id=2&order_by=top_selling_products"
  );
  // console.log(res.data);
  return res.data;
};

const ThingsToDo = () => {
  // Example data for the carousel
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const result = await getListAction();
        setData(result);
        setLoading(false);
      } catch (error) {
        console.error("Error setting data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const percent = (lowest_walk_in_price, lowest_variation_price) => {
    if (
      lowest_walk_in_price &&
      lowest_variation_price &&
      lowest_walk_in_price !== "null"
    ) {
      const calculatedPercent = (
        ((Number(lowest_walk_in_price) - Number(lowest_variation_price)) /
          Number(lowest_walk_in_price)) *
        100
      ).toFixed(0); // Round to 2 decimal places if necessary
      return `${calculatedPercent}`;
    } else {
      return `0`;
    }
  };

  // Function to render each item in the carousel
  const renderItem = (item) => (
    <TouchableOpacity
      key={item.id.toString()}
      onPress={() => {
        // Handle item press (navigation action)
        console.log(`Pressed ${item.name}`);
      }}
    >
      <View
        key={item.id}
        className="mr-2 w-[200] overflow-hidden p-2 bg-white"
        style={{ borderRadius: "20px" }}
      >
        <CachedImage
          uri={item.cover_image}
          style={{ width: 185, height: 100, borderRadius: "15px" }}
        />

        <View className="px-2 pb-3 pt-4 gap-y-2 relative">
          {(item.lowest_walk_in_price ||
            item.lowest_walk_in_price != null ||
            item.lowest_walk_in_price != item.lowest_variation_price) && (
            <View className="bg-red-100/80 w-auto px-2 rounded-full absolute -top-4 right-2 ">
              <Text className=" py-1 px-1 text-center text-white text-sm">
                {percent(
                  item.lowest_walk_in_price,
                  item.lowest_variation_price
                )}
                % OFF
              </Text>
            </View>
          )}
          <Text
            className="text-base tracking-wide text-gray-800 font-psemibold"
            numberOfLines={1}
          >
            {item.name}
          </Text>
          <View className="flex flex-row">
            {item.cities.map((city) => (
              <TouchableOpacity
                key={city.id.toString()}
                onPress={() => {
                  console.log(`Pressed ${city.name}`);
                }}
              >
                <View className="flex flex-row justify-start items-center gap-1">
                  <Image source={icons.locationPin} className="w-4 h-4" />
                  <Text className="text-xs text-secondary-200 pr-3 font-pmedium">
                    {city.name}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
          <Text className=" text-sm font-pmedium">starting price</Text>

          <TouchableOpacity
            onPress={() => {
              console.log(`Pressed ${item.name}`);
            }}
          >
            <View className=" flex-row justify-between items-center">
              <View className=" flex-row justify-start items-center ">
                <Text className=" text-[20px] text-secondary font-psemibold">
                  {item.lowest_variation_price}thb
                </Text>
                {(item.lowest_walk_in_price ||
                  item.lowest_walk_in_price != null ||
                  item.lowest_walk_in_price != item.lowest_variation_price) && (
                  <Text
                    className=" text-sm text-black-100/80 line-through "
                    style={{ paddingLeft: 3 }}
                  >
                    {item.lowest_walk_in_price}thb
                  </Text>
                )}
              </View>
              <View className="bg-secondary w-[50px] rounded-full px-2 py-1">
                <Text className="text-white text-center">book</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View className=" px-4 gap-y-4">
      <View className="pt-6 flex flex-row w-full justify-between sticky top-0 items-center gap-4">
        <Text className="text-lg tracking-wide font-psemibold text-secondary">
          things to do in bangkok
        </Text>
        <TouchableOpacity onPress={() => console.log("see more")}>
          <Text className="text-xs font-pmedium">see more</Text>
        </TouchableOpacity>
      </View>
      {!loading ? (
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingVertical: 10 }}
        >
          {data?.data.map(renderItem)}
        </ScrollView>
      ) : (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          className=" py-10"
        >
          <Text className=" text-xs font-pmedium">Loading...</Text>
        </View>
      )}
    </View>
  );
};

export default ThingsToDo;
