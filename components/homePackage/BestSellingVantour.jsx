import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  useWindowDimensions,
  Image,
  StyleSheet,
} from "react-native";
import { CachedImage } from "../../helpers/image";
import axios from "../../axiosConfig";
import HTML from "react-native-render-html";
import { icons } from "../../constants";

const getListAction = async () => {
  try {
    const res = await axios.get(
      "/private-van-tours?order_by=top_selling_products&type=van_tour"
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

const BestSellingVantour = () => {
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

  const renderItem = ({ item }) => (
    <View
      style={{
        width: width / 2 - 20,
        marginBottom: 10,
        marginLeft: 2,
        marginRight: 2,
        margin: "auto",
      }}
      key={item.id}
    >
      <TouchableOpacity
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
              uri={
                item.cover_image
                  ? item.cover_image
                  : "https://img.freepik.com/free-photo/abstract-textured-backgound_1258-30576.jpg?t=st=1730589697~exp=1730593297~hmac=fcac11d660a2c87242409664e4e8bf25de2f964c16334084e744579ef2f41136&w=1380"
              }
              style={{ height: 100, borderRadius: 15, width: "100%" }}
              accessibilityLabel="Cover Image"
            />
          </View>
          <View style={{ paddingHorizontal: 8, paddingVertical: 12 }}>
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
                marginTop: 8,
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
                  {item?.destinations?.length}
                </Text>
                <Image
                  source={icons.attractionicon}
                  style={{ width: 12, height: 12 }}
                  tintColor="#FF601B"
                />
              </View>
            </View>

            <View style={{ height: 60, overflow: "hidden", marginTop: 8 }}>
              {item?.long_description && (
                <HTML
                  source={{ html: truncateHtml(item?.long_description, 100) }}
                  baseFontStyle={{ fontSize: 8 }}
                  contentWidth={width}
                />
              )}
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
                {item?.lowest_car_price} thb
              </Text>
              <Text style={{ fontSize: 14, color: "#6c757d" }}> / car</Text>
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
          best selling van tours
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

export default BestSellingVantour;
