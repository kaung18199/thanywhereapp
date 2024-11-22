import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  useWindowDimensions,
  Image,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { CachedImage } from "../../helpers/image";
import axios from "../../axiosConfig";
import HTML from "react-native-render-html";
import { icons } from "../../constants";
import { useRef } from "react";
import LoadingCart from "../LoadingCart/LoadingCart";

const filterCityList = [
  {
    id: 2,
    name: "Bangkok",
  },
  {
    id: 4,
    name: "Pattaya",
  },
  {
    id: 8,
    name: "Kanchanburi",
  },
  {
    id: 9,
    name: "Phuket",
  },
  {
    id: 10,
    name: "Chiang Mai",
  },
];

const getListAction = async (cityId) => {
  try {
    let data = {
      order_by: "top_selling_products",
      type: "van_tour",
      city_id: cityId,
    };
    const res = await axios.get("/private-van-tours", { params: data });
    // console.log("API Response:", res.data);
    return res.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return { data: [] };
  }
};

const truncateHtml = (html, maxChars) => {
  if (html != "" || html != null) {
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
  } else {
    return "";
  }
};

const BestSellingVantour = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { width } = useWindowDimensions();
  const [cityId, setCityId] = useState("");

  const scrollViewRef = useRef(null);

  const loadingCarts = [1, 2, 3, 4, 5, 6, 7, 8];

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      const result = await getListAction(cityId);
      setData(result);
      setLoading(false);
    };

    fetchData();
  }, [cityId]);

  const renderItem = ({ item, index }) => (
    <View
      style={{
        width: width / 2 - 20,
        marginBottom: 8,
        marginLeft: index % 2 === 0 ? 0 : 4, // Margin left for even index
        marginRight: index % 2 !== 0 ? 0 : 4, // Margin right for odd index
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
    <View
      style={{ paddingHorizontal: 16, gap: 16, backgroundColor: "#FFFFFF" }}
    >
      <View
        style={{
          paddingTop: 20,
          flexDirection: "row",
          justifyContent: "space-between",
          paddingBottom: 0,
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
        {/* <TouchableOpacity onPress={() => console.log("see more")}>
          <Text
            style={{ fontSize: 10, color: "#000000" }}
            className=" font-pregular"
          >
            see more
          </Text>
        </TouchableOpacity> */}
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        ref={scrollViewRef}
      >
        {filterCityList?.map((item, index) => (
          <TouchableOpacity
            key={item.id}
            onPress={() => {
              setCityId(item.id);
              scrollViewRef.current.scrollTo({
                // Scroll to the selected item
                animated: true,
                x: index * 70, // Adjust this value based on your item width
                y: 0,
              });
            }}
          >
            <View
              className={`rounded-full px-4 py-1 mr-2 ${
                cityId === item.id ? "border-secondary" : "border-[#dadada]"
              }`}
              style={{ borderWidth: 1 }}
            >
              <Text
                className={cityId === item.id ? "text-secondary" : ""}
                style={{ fontSize: 10 }}
              >
                {item.name}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
      {!loading && data?.data ? (
        <FlatList
          data={data?.data}
          renderItem={({ item, index }) => renderItem({ item, index })}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
        />
      ) : (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {loading && (
            <View style={{ flex: 1 }}>
              <View
                style={{
                  flexDirection: "row",
                  flexWrap: "wrap",
                  justifyContent: "space-between",
                }}
              >
                {loadingCarts.map((item, index) => (
                  <View key={index} style={{ width: "49%", marginBottom: 10 }}>
                    <LoadingCart />
                  </View>
                ))}
              </View>
            </View>
          )}
        </View>
      )}
    </View>
  );
};

export default BestSellingVantour;
