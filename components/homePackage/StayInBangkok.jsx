import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  useWindowDimensions,
  StyleSheet,
  Image,
  ScrollView,
  Modal,
  ActivityIndicator,
} from "react-native";
import { CachedImage } from "../../helpers/image";
import axios from "../../axiosConfig";
import HTML from "react-native-render-html";
import { icons } from "../../constants";
import LoadingCart from "../LoadingCart/LoadingCart";
import { useRouter } from "expo-router";

const priceOptions = [
  {
    id: 1,
    name: "budget ( < 1200)",
    value: "0-1200",
  },
  {
    id: 2,
    name: "standard ( 1200 - 1800)",
    value: "1200-1800",
  },
  {
    id: 3,
    name: "premium ( 1800 - 3000 )",
    value: "1800-3000",
  },
  {
    id: 4,
    name: "luxury ( 3000+ )",
    value: "3000-100000",
  },
];

const placeList = [
  "Pratunam",
  "Don Mueang Airport",
  "Silom",
  "Sukhumvit",
  "Suvanabhumi Airport",
  "Siam",
  "Ramkhamhaeng",
  "Lumphini",
  "Ratchaprarop Road",
  "Bangkok",
  "Near Chatuchak weekend Market",
  "Near Shrewsbury International School Bangkok",
  "Pratunam Area",
  "China Town",
  "Riverside",
  "Sathorn",
  "Ratchathewi",
  "Chatuchak",
  "Thong Lo",
  "silom",
  "Watthana",
  "Khao san",
  "Ratchadapisek Road",
  "Bang Kapi",
  "Patong",
  "Impact Arena",
  "56 Rong Mai Alley",
  "Rama IV Rd",
  "Surawong",
  "Pathum Thani",
  "Phetchaburi",
  "Pracha Uthit",
  "Pratu Nam",
  "Asoke",
  "pratunam",
  "Chiang Mai",
  "Makkasan",
  "Toscana Valley",
  "Khaosan",
  "Novotel Bangkok Impact",
  "Phasi Charoen",
  "Suvarnabhumi Airport",
  "Khao San",
  "Riverside Area",
  "Bangkapi",
  "Sathon",
  "NJoy Prestige Grand Hotel Don Mueang",
  "Florida Bangkok Hotel",
];

const getListAction = async (place, priceRange) => {
  try {
    let data = {
      city_id: 2,
      order_by: "top_selling_products",
      price_range: priceRange,
    };
    if (place != "") {
      data.place = place;
    }
    const res = await axios.get("/hotels", { params: data });
    // console.log("API Response:", res.data); // Log API response
    return res.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return { data: [] }; // Return empty data on error
  }
};

const truncateHtml = (html, maxChars) => {
  if (html != "" && html != null) {
    let truncated = html.replace(/<[^>]+>/g, ""); // Remove HTML tags
    if (truncated.length > maxChars) {
      truncated = truncated.substring(0, maxChars); // Truncate to maxChars characters
      truncated = truncated.substring(
        0,
        Math.min(truncated.length, truncated.lastIndexOf(" "))
      ); // Truncate at last space
      truncated += "..."; // Add ellipsis or read more link
    }
    return `<div style="font-size: 10px;">${truncated}</div>`;
  } else {
    return "";
  }
};

const StayInBangkok = () => {
  const [data, setData] = useState(null);
  const { width } = useWindowDimensions();
  const [priceRange, setPriceRange] = useState("");
  const [place, setPlace] = useState("");
  const [loadingData, setLoadingData] = useState(false);

  const router = useRouter();

  const loadingCarts = [1, 2, 3, 4, 5, 6, 7, 8];

  const [modalVisible, setModalVisible] = useState(false); // Add state for modal visibility

  const handleOpenModal = () => setModalVisible(true); // Open modal
  const handleCloseModal = () => setModalVisible(false); // Close modal

  const scrollViewRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoadingData(true);
        const result = await getListAction(place, priceRange);
        setData(result);
      } catch (error) {
        setLoadingData(false);
      } finally {
        setLoadingData(false);
      }
    };

    fetchData();
  }, [place, priceRange]);

  const percent = (lowest_walk_in_price, lowest_room_price) => {
    if (
      lowest_walk_in_price &&
      lowest_room_price &&
      lowest_walk_in_price !== "null"
    ) {
      const calculatedPercent = (
        ((Number(lowest_walk_in_price) - Number(lowest_room_price)) /
          Number(lowest_walk_in_price)) *
        100
      ).toFixed(0); // Round to 2 decimal places if necessary
      return `${calculatedPercent}`;
    } else {
      return `0`;
    }
  };

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
        key={item.id.toString()}
        onPress={() => router.push("/detail/hotel/" + item.id)}
      >
        <View
          style={{
            borderRadius: 20,
            overflow: "hidden",
            backgroundColor: "white",
          }}
        >
          <View style={{ padding: 6 }}>
            <CachedImage
              uri={item.images[0]?.image}
              style={{ height: 100, borderRadius: 15, width: "100%" }}
            />
          </View>
          <View style={{ paddingHorizontal: 8, paddingVertical: 12 }}>
            {(item.lowest_walk_in_price ||
              item.lowest_walk_in_price != null ||
              item.lowest_walk_in_price != item.lowest_room_price) && (
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
                  {percent(item.lowest_walk_in_price, item.lowest_room_price)}%
                  OFF
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
                  {item?.place}
                </Text>
              </View>
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 4 }}
              >
                <Text
                  style={{ fontSize: 10, color: "#000000" }}
                  className=" font-pmedium"
                >
                  {item?.rating}
                </Text>
                <Image
                  source={icons.staricon}
                  style={{ width: 12, height: 12 }}
                />
              </View>
            </View>

            <View style={{ height: 60, overflow: "hidden" }}>
              <HTML
                source={{ html: truncateHtml(item?.full_description, 100) }}
                baseFontStyle={{ fontSize: 8 }}
                contentWidth={width}
                numberOfLines={3}
              />
            </View>
            <Text
              style={{
                fontSize: 14,
                fontWeight: "500",
                paddingBottom: 4,
                paddingTop: 2,
              }}
            >
              starting price
            </Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text
                style={{ fontSize: 20, fontWeight: "700", color: "#FF5722" }}
              >
                ฿ {item?.lowest_room_price}
              </Text>
              {(item?.lowest_walk_in_price ||
                item?.lowest_walk_in_price != null ||
                item?.lowest_walk_in_price != item?.lowest_room_price) && (
                <Text
                  style={{
                    fontSize: 10,
                    color: "#757575",
                    textDecorationLine: "line-through",
                    paddingLeft: 4,
                  }}
                >
                  ฿ {item?.lowest_walk_in_price}
                </Text>
              )}
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );

  return (
    <View
      style={{ paddingHorizontal: 16, gap: 10, backgroundColor: "#FFFFFF" }}
    >
      <View
        style={{
          paddingTop: 20,
          flexDirection: "row",
          justifyContent: "space-between",
          paddingBottom: 0,
          alignItems: "center",
        }}
      >
        <View className=" flex-1 flex-row items-center justify-start  overflow-hidden">
          <Text
            style={{ fontSize: 16, fontWeight: "600", color: "#FF601B" }}
            className=" font-psemibold mr-2"
          >
            Stays in bangkok
          </Text>
          {place != "" && (
            <View className=" rounded-full bg-secondary/10 text-center">
              <Text
                className=" font-pregular text-secondary text-center py-1 line-clamp-1 px-2"
                style={{ fontSize: 10, maxWidth: 100, minWidth: 50 }}
              >
                {place}
              </Text>
            </View>
          )}
        </View>
        {/* <TouchableOpacity onPress={handleOpenModal}>
          <Text
            style={{ fontSize: 10 }}
            className="text-secondary font-psemibold"
          >
            filter place
          </Text>
        </TouchableOpacity> */}
        <TouchableOpacity onPress={handleOpenModal} style={{ padding: 4 }}>
          <Text className="text-secondary font-psemibold text-sm py-2">
            filter
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        ref={scrollViewRef}
      >
        {priceOptions?.map((item, index) => (
          <TouchableOpacity
            key={item.id}
            onPress={() => {
              setPriceRange(item.value);
              scrollViewRef.current.scrollTo({
                // Scroll to the selected item
                animated: true,
                x: index * 80, // Adjust this value based on your item width
                y: 0,
              });
            }}
          >
            <View
              className={`rounded-full px-4 py-1 mr-2 font-pregular ${
                priceRange === item.value
                  ? "border-secondary"
                  : "border-[#dadada]"
              }`}
              style={{ borderWidth: 1 }}
            >
              <Text
                className={
                  priceRange === item.value
                    ? "text-secondary font-pregular"
                    : "font-pregular"
                }
                style={{ fontSize: 10 }}
              >
                {item.name}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {data && data?.data && !loadingData ? (
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
          {loadingData && (
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
      {data?.data?.length === 0 && !loadingData && (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            paddingVertical: 40,
          }}
        >
          <Text className=" text-secondary font-pregular text-xs">
            No stays found in this place
          </Text>
        </View>
      )}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible} // Use modal visibility state
        onRequestClose={handleCloseModal} // Handle back button
      >
        <ScrollView
          contentContainerStyle={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0, 0, 0, 0.2)",
          }}
        >
          <View
            style={{
              width: "80%",
              backgroundColor: "white",
              borderRadius: 10,
              padding: 16,
            }}
          >
            <View className="flex-row justify-between items-center px-4 ">
              <Text className=" text-secondary font-psemibold">
                Choose Place
              </Text>
              {/* <TouchableOpacity
                onPress={() => {
                  handleCloseModal();
                  setPlace("");
                }}
              >
                <Text style={{ textAlign: "center", color: "#FF601B" }}>
                  Clean
                </Text>
              </TouchableOpacity> */}
              <TouchableOpacity
                onPress={() => {
                  handleCloseModal();
                  setPlace("");
                }}
                style={{
                  height: 48,
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "#FFFFFF",
                  borderRadius: 10,
                }}
              >
                <Text
                  className=" font-pregular"
                  style={{
                    textAlign: "center",
                    color: "#FF601B",
                    fontSize: 14,
                  }}
                >
                  Clean
                </Text>
              </TouchableOpacity>
            </View>

            <ScrollView
              className="mt-2 "
              style={{ maxHeight: 200, minHeight: 200, overflow: "hidden" }}
            >
              {placeList.map((item) => (
                <TouchableOpacity
                  className="w-full "
                  key={item.toString()}
                  onPress={() => {
                    setPlace(item);
                    handleCloseModal(); // Close modal on selection
                  }}
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: 6,
                  }}
                >
                  <Text
                    className={`rounded-full px-4 w-full font-pregular py-1 mr-2 ${
                      place == item ? "text-secondary" : "text-[#000]"
                    }`}
                    style={{ flex: 1, fontSize: 12 }}
                  >
                    {item}
                  </Text>
                  <View>
                    <View
                      style={{
                        width: 20,
                        height: 20,
                        borderWidth: 1,
                        borderColor: "#757575",
                        borderRadius: 30,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                      className={` ${place == item ? "bg-secondary" : ""}`}
                    >
                      {/* Placeholder for checkbox */}
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
            {/* <TouchableOpacity
              onPress={handleCloseModal}
              style={{ marginTop: 10 }}
            >
              <Text style={{ textAlign: "center", color: "#FF601B" }}>
                Close
              </Text>
            </TouchableOpacity> */}
            <TouchableOpacity
              onPress={handleCloseModal}
              style={{
                marginTop: 10,
                height: 48,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#FFFFFF",
                borderRadius: 10,
              }}
            >
              <Text
                className=" font-pregular"
                style={{
                  textAlign: "center",
                  color: "#FF601B",
                  fontSize: 14,
                }}
              >
                Close
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </Modal>
    </View>
  );
};

export default StayInBangkok;
