import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  useWindowDimensions,
  StyleSheet,
  Image,
} from "react-native";
import { CachedImage } from "../../helpers/image";
import axios from "../../axiosConfig";
import HTML from "react-native-render-html";
import { icons } from "../../constants";

const getListAction = async () => {
  try {
    const res = await axios.get(
      "/entrance-tickets?order_by=top_selling_products"
    );
    // console.log("API Response:", res.data);
    return res.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return { data: [] };
  }
};

const truncateHtml = (html, maxChars) => {
  let truncated = html.replace(/<[^>]+>/g, "");
  if (truncated.length > maxChars) {
    truncated = truncated.substring(0, maxChars);
    truncated = truncated.substring(
      0,
      Math.min(truncated.length, truncated.lastIndexOf(" "))
    );
    truncated += "...";
  }
  return `<div style="font-size: 10px;">${truncated}</div>`;
};

const BestSellingAttraction = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { width } = useWindowDimensions();

  useEffect(() => {
    const fetchData = async () => {
      const result = await getListAction();
      setData(result);
      setLoading(false);
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
      ).toFixed(0);
      return `${calculatedPercent}`;
    } else {
      return `0`;
    }
  };

  const renderItem = ({ item }) => (
    <View
      style={{
        width: width / 2 - 20,
        marginBottom: 10,
        marginLeft: 2,
        margin: "auto",
        marginRight: 2,
      }}
      key={item.id}
    >
      <TouchableOpacity
        key={item.id.toString()}
        onPress={() => {
          console.log(`Pressed ${item.name}`);
        }}
      >
        <View
          style={{
            backgroundColor: "white",
            overflow: "hidden",
            borderRadius: 20,
          }}
        >
          <View style={{ padding: 6 }}>
            <CachedImage
              uri={item.cover_image}
              style={{ height: 100, borderRadius: 15, width: "100%" }}
              accessibilityLabel="Cover Image"
            />
          </View>
          <View style={{ paddingHorizontal: 8, paddingVertical: 12 }}>
            {(item.lowest_walk_in_price ||
              item.lowest_walk_in_price != null ||
              item.lowest_walk_in_price != item.lowest_variation_price) && (
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
                    paddingVertical: 4,
                    paddingHorizontal: 8,
                    color: "white",
                    fontSize: 12,
                    textAlign: "center",
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
              style={{ fontSize: 12, fontWeight: "600", paddingBottom: 3 }}
              numberOfLines={1}
              className=" font-psemibold text-secondary"
            >
              {item?.name}
            </Text>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                paddingTop: 4,
                paddingBottom: 4,
              }}
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
                  {item?.cities[0]?.name}
                </Text>
              </View>
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 4 }}
              >
                <Text
                  style={{ fontSize: 10, color: "#000000" }}
                  className=" font-pmedium"
                >
                  5
                </Text>
                <Image
                  source={icons.staricon}
                  style={{ width: 12, height: 12 }}
                />
              </View>
            </View>

            <View
              style={{
                height: 60,
                overflow: "hidden",
                marginTop: 8,
              }}
            >
              <HTML
                source={{ html: truncateHtml(item?.description, 100) }}
                baseFontStyle={{ fontSize: 10 }}
                contentWidth={width}
              />
            </View>
            <Text style={{ fontSize: 14, fontWeight: "500", marginTop: 8 }}>
              starting price
            </Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 4,
              }}
            >
              <Text
                style={{ fontSize: 20, fontWeight: "700", color: "#FF5722" }}
              >
                {item?.lowest_variation_price} thb
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
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={{ paddingHorizontal: 16, gap: 16 }}>
      <View
        style={{
          paddingTop: 20,
          flexDirection: "row",
          justifyContent: "space-between",
          paddingBottom: 16,
          position: "sticky",
          top: 0,
          alignItems: "center",
          gap: 16,
        }}
      >
        <Text
          style={{ fontSize: 16, fontWeight: "600", color: "#FF601B" }}
          className=" font-psemibold"
        >
          best selling attraction
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
      {!loading && data?.data ? (
        <FlatList
          data={data?.data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
        />
      ) : (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            paddingVertical: 20,
          }}
        >
          <Text style={{ fontSize: 12, color: "#6c757d" }}>Loading...</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 1,
    fontSize: 8,
  },
});

export default BestSellingAttraction;
