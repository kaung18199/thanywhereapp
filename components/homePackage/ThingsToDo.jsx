import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import { CachedImage } from "../../helpers/image";
import axios from "../../axiosConfig";
import { icons } from "../../constants";

// Async function to fetch data
const getListAction = async () => {
  const res = await axios.get(
    "/entrance-tickets?city_id=2&order_by=top_selling_products"
  );
  return res.data;
};

const ThingsToDo = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const result = await getListAction();
        setData(result);
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
      ).toFixed(0); // Round to 0 decimal places
      return `${calculatedPercent}`;
    } else {
      return `0`;
    }
  };

  // Function to render each item
  const renderItem = (item) => (
    <TouchableOpacity
      key={item.id.toString()}
      onPress={() => {
        console.log(`Pressed ${item.name}`);
      }}
      style={{
        marginRight: 8,
        width: 200,
        overflow: "hidden",
        backgroundColor: "#FFFFFF",
        borderRadius: 20,
        padding: 8,
      }}
    >
      <View style={{ position: "relative" }}>
        <CachedImage
          uri={item.cover_image}
          style={{ width: 185, height: 100, borderRadius: 15 }}
        />

        <View
          style={{
            paddingHorizontal: 8,
            paddingBottom: 12,
            paddingTop: 16,
            gap: 8,
          }}
        >
          {(item.lowest_walk_in_price ||
            item.lowest_walk_in_price != null ||
            item.lowest_walk_in_price !== item.lowest_variation_price) && (
            <View
              style={{
                backgroundColor: "#ff1c1c",
                width: "auto",
                paddingHorizontal: 8,
                borderRadius: 16,
                position: "absolute",
                top: -16,
                right: 8,
              }}
            >
              <Text
                style={{
                  paddingVertical: 2,
                  textAlign: "center",
                  color: "white",
                  fontSize: 12,
                }}
              >
                {percent(
                  item.lowest_walk_in_price,
                  item.lowest_variation_price
                )}
                % OFF
              </Text>
            </View>
          )}
          <Text
            style={{ fontSize: 12, fontWeight: "600" }}
            numberOfLines={1}
            className=" font-psemibold text-secondary"
          >
            {item?.name}
          </Text>
          <View style={{ flexDirection: "row" }}>
            {item.cities.map((city) => (
              <TouchableOpacity
                key={city.id.toString()}
                onPress={() => {
                  console.log(`Pressed ${city.name}`);
                }}
                style={{ flexDirection: "row", alignItems: "center", gap: 4 }}
              >
                <View
                  style={{ flexDirection: "row", alignItems: "center", gap: 4 }}
                >
                  <Image
                    source={icons.locationPin}
                    style={{ width: 12, height: 12 }}
                  />
                  <Text
                    style={{ fontSize: 10, color: "#757575", paddingRight: 8 }}
                    className=" font-pmedium"
                  >
                    {city.name}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
          <Text style={{ fontSize: 14, fontWeight: "500", paddingBottom: 4 }}>
            starting price
          </Text>

          <TouchableOpacity
            onPress={() => {
              console.log(`Pressed ${item.name}`);
            }}
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text
                style={{ fontSize: 20, fontWeight: "700", color: "#FF5722" }}
              >
                {item?.lowest_variation_price}thb
              </Text>
              {(item?.lowest_walk_in_price ||
                item?.lowest_walk_in_price != null ||
                item?.lowest_walk_in_price != item?.lowest_variation_price) && (
                <Text
                  style={{
                    fontSize: 10,
                    color: "#757575",
                    textDecorationLine: "line-through",
                    paddingLeft: 4,
                  }}
                >
                  {item?.lowest_walk_in_price} thb
                </Text>
              )}
            </View>
            <View
              style={{
                backgroundColor: "#FF601B", // secondary color
                width: 50,
                borderRadius: 50,
                paddingHorizontal: 2,
                paddingVertical: 2,
              }}
            >
              <Text
                style={{ color: "#FFFFFF", textAlign: "center" }}
                className=" font-pmedium"
              >
                book
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={{ paddingHorizontal: 16, gap: 16 }}>
      <View
        style={{
          paddingTop: 30,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 16,
        }}
      >
        <Text
          style={{ fontSize: 16, fontWeight: "600", color: "#FF601B" }}
          className=" font-psemibold"
        >
          things to do in bangkok
        </Text>
        <TouchableOpacity onPress={() => console.log("see more")}>
          <Text
            style={{ fontSize: 10, color: "#000000" }}
            className=" font-pregular"
          >
            see more
          </Text>
        </TouchableOpacity>
      </View>
      {!loading ? (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingVertical: 10 }}
        >
          {data?.data.map(renderItem)}
        </ScrollView>
      ) : (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            paddingVertical: 40,
          }}
        >
          <Text style={{ fontSize: 12, fontWeight: "500" }}>Loading...</Text>
        </View>
      )}
    </View>
  );
};

export default ThingsToDo;
