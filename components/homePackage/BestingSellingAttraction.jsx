import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  useWindowDimensions,
  StyleSheet,
  Image,
  ActivityIndicator,
  Modal,
  ScrollView,
} from "react-native";
import { CachedImage } from "../../helpers/image";
import axios from "../../axiosConfig";
import HTML from "react-native-render-html";
import { icons } from "../../constants";
import { useRef } from "react";
import LoadingCart from "../LoadingCart/LoadingCart";
import { useRouter } from "expo-router";

const getListAction = async ({ categoryId, cityId }) => {
  let data = {
    city_id: cityId != "" ? cityId : 2,
    order_by: "top_selling_products",
    category_id: categoryId != "" ? categoryId : "",
    show_only: 1,
  };
  const res = await axios.get("/entrance-tickets", { params: data });
  return res.data;
};

const getCityAction = async (params) => {
  const res = await axios.get("/cities?limit=100", { params: params });
  return res.data;
};

const category = [
  {
    item: 0,
    id: null,
    name: "all",
  },
  {
    item: 1,
    id: 32,
    name: "amusement park",
  },
  {
    item: 2,
    id: 40,
    name: "dinner cruises",
  },
  {
    item: 3,
    id: 31,
    name: "water parks",
  },
  {
    item: 4,
    id: 17,
    name: "safari",
  },
  {
    item: 5,
    id: 16,
    name: "museums",
  },
  {
    item: 6,
    id: 29,
    name: "theme parks",
  },
  {
    item: 7,
    id: 54,
    name: "buffet",
  },
  {
    item: 8,
    id: 42,
    name: "island tours",
  },
  {
    item: 9,
    id: 39,
    name: "shows",
  },
  {
    item: 10,
    id: 22,
    name: "skywalks",
  },
];

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
  const [city, setCity] = useState(null);
  const [cityLoading, setCityLoading] = useState(true);
  const [cityId, setCityId] = useState(null);
  const [categoryId, setCategoryId] = useState(null);
  const [cityName, setCityName] = useState(null);
  const router = useRouter();
  const scrollViewRef = useRef(null);

  // ... existing state variables ...
  const [modalVisible, setModalVisible] = useState(false); // Add state for modal visibility

  const handleOpenModal = () => setModalVisible(true); // Open modal
  const handleCloseModal = () => setModalVisible(false); // Close modal

  const loadingCarts = [1, 2, 3, 4, 5, 6, 7, 8];

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const result = await getListAction({ categoryId, cityId });
        setData(result);
      } catch (error) {
        console.error("Error setting data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [categoryId, cityId]);

  useEffect(() => {
    const fetchCityData = async () => {
      try {
        setCityLoading(true);
        const result = await getCityAction();
        setCity(result);
        // console.log(city, "this is ciity");
      } catch (error) {
        console.error("Error setting data:", error);
      } finally {
        setCityLoading(false);
      }
    };

    fetchCityData();
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
        onPress={() => {
          router.push("/detail/attraction/" + item.id);
        }}
        accessible={true}
        accessibilityRole="button"
        accessibilityLabel={`View details of ${item?.name}`}
        accessibilityHint={`Opens detailed information about this attraction in ${item?.cities?.[0]?.name || ''}`}
        style={{ minHeight: 48 }}
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
              accessible={true}
              accessibilityLabel={`Image of ${item?.name} attraction`}
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
              style={{ fontSize: 14, fontWeight: "600", paddingBottom: 3 }}
              numberOfLines={1}
              className=" font-psemibold text-secondary"
              accessible={true}
              accessibilityRole="header"
              accessibilityLabel={`Attraction name: ${item?.name}`}
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
                  accessible={false}
                />
                <Text
                  style={{ fontSize: 12, color: "#757575", paddingRight: 8 }}
                  className=" font-pmedium"
                  accessible={true}
                  accessibilityLabel={`Located in ${item?.cities[0]?.name}`}
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
                  accessible={false}
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
            <Text
              style={{ fontSize: 14, fontWeight: "500", marginTop: 8 }}
              accessible={true}
              accessibilityLabel="Starting price information"
            >
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
                accessible={true}
                accessibilityLabel={`${item?.lowest_variation_price} Thai Baht`}
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
    <View
      style={{ paddingHorizontal: 16, gap: 16, backgroundColor: "#FFFFFF" }}
    >
      <View
        style={{
          paddingTop: 20,
          flexDirection: "row",
          justifyContent: "space-between",
          paddingBottom: 0,

          alignItems: "center",
          gap: 10,
        }}
      >
        {/* <Text
          style={{ fontSize: 16, fontWeight: "600", color: "#FF601B" }}
          className=" font-psemibold"
        >
          best selling attraction
        </Text> */}
        <View className=" flex-1 flex-row items-center justify-start  overflow-hidden">
          <Text
            style={{ fontSize: 16, fontWeight: "600", color: "#FF601B" }}
            className=" font-psemibold mr-2"
          >
            Best selling attraction
          </Text>
          {cityName != null && (
            <TouchableOpacity
              style={{
                minHeight: 48,
                minWidth: 48,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 24
              }}
              accessible={true}
              accessibilityRole="button"
              accessibilityLabel={`Selected city: ${cityName}`}
              onPress={handleOpenModal}
            >
              <View className="rounded-full bg-secondary/10 text-center px-2 py-2">
                <Text
                  className="font-pregular text-secondary text-center line-clamp-1"
                  style={{ fontSize: 14, minWidth: 50 }}
                  accessible={false}
                >
                  {cityName}
                </Text>
              </View>
            </TouchableOpacity>
          )}
        </View>
        {/* <TouchableOpacity onPress={handleOpenModal}>
          <Text
            style={{ fontSize: 10 }}
            className="text-secondary font-psemibold"
          >
            filter city
          </Text>
        </TouchableOpacity> */}
        <TouchableOpacity 
          onPress={handleOpenModal} 
          style={{
            padding: 12,
            minHeight: 48,
            minWidth: 48,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#F5F5F5',
            borderRadius: 8
          }}
          accessible={true}
          accessibilityRole="button"
          accessibilityLabel="Filter attractions by city"
          accessibilityHint="Opens city selection options"
        >
          <Text 
            className="text-secondary font-psemibold text-base"
            style={{
              paddingVertical: 4,
              paddingHorizontal: 8
            }}
            accessible={false}
          >
            Filter
          </Text>
        </TouchableOpacity>
      </View>
      <View>
        {!cityLoading && (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            ref={scrollViewRef}
            accessible={true}
            accessibilityLabel="Category filter options"
            accessibilityHint="Scroll horizontally to see all category options"
          >
            {category?.map((item, index) => (
              <TouchableOpacity
                key={item.id}
                onPress={() => {
                  setCategoryId(item.id);
                  scrollViewRef.current.scrollTo({
                    // Scroll to the selected item
                    animated: true,
                    x: index * 80, // Adjusted for wider touch targets
                    y: 0,
                  });
                }}
                style={{ 
                  minHeight: 48, 
                  minWidth: 48,
                  justifyContent: 'center',
                  marginRight: 8
                }}
                accessible={true}
                accessibilityRole="button"
                accessibilityLabel={`Filter by ${item.name} category`}
                accessibilityState={{ selected: categoryId === item.id }}
                accessibilityHint={`Show attractions in ${item.name} category`}
              >
                <View
                  className={`rounded-full px-4 py-3 mr-2 ${
                    categoryId === item.id
                      ? "border-secondary"
                      : "border-[#dadada]"
                  }`}
                  style={{ 
                    borderWidth: 1, 
                    minWidth: 48,
                    minHeight: 40,
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}
                >
                  <Text
                    className={categoryId === item.id ? "text-secondary font-pregular" : "font-pregular"}
                    style={{ fontSize: 14 }} // Increased font size for better readability
                    accessible={false} // Parent already has accessibility label
                  >
                    {item.name}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}
      </View>
      {!loading && data?.data ? (
        <FlatList
          data={data?.data}
          renderItem={({ item, index }) => renderItem({ item, index })}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          accessible={true}
          accessibilityLabel="List of attractions"
          accessibilityHint="Scroll to browse available attractions"
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
                  <View key={index} style={{ width: "48%", marginBottom: 10 }}>
                    <LoadingCart />
                  </View>
                ))}
              </View>
            </View>
          )}
        </View>
      )}
      {/* data?.data?.length === 0 && !loading && */}
      {data?.data?.length === 0 && !loading && (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            paddingVertical: 40,
          }}
        >
          <Text className=" text-secondary font-pregular text-xs">
            Coming soon for this place
          </Text>
        </View>
      )}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible} // Use modal visibility state
        onRequestClose={handleCloseModal} // Handle back button
        accessible={true}
        accessibilityLabel="City selection modal"
        accessibilityHint="Select a city to filter attractions">
      
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
              padding: 20,
            }}
          >
            <Text 
              className="px-6 pb-4 text-secondary font-psemibold"
              style={{ fontSize: 16 }}
              accessible={true}
              accessibilityRole="header"
              accessibilityLabel="Choose city">
              Choose city
            </Text>

            <ScrollView
              className="mt-2 "
              style={{ maxHeight: 250, minHeight: 200, overflow: "hidden" }}
              accessible={true}
              accessibilityLabel="List of cities"
              accessibilityHint="Scroll to see all available cities"
            >
              {city?.data.map((item) => (
                <TouchableOpacity
                  className="w-full "
                  key={item.id}
                  onPress={() => {
                    setCityId(item.id);
                    setCityName(item.name);
                    handleCloseModal(); // Close modal on selection
                  }}
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: 10,
                    minHeight: 48, // Increased to ensure minimum touch target size of 48dp
                  }}
                  accessible={true}
                  accessibilityRole="button"
                  accessibilityLabel={`Select ${item.name}`}
                  accessibilityState={{ selected: cityId === item.id }}
                >
                  <Text
                    className={`rounded-full px-4 w-full font-pregular py-2 mr-2 ${
                      cityId == item.id ? "text-secondary" : "text-[#000]"
                    }`}
                    style={{ flex: 1, fontSize: 16 }} // Increased font size for better readability
                    accessible={true}
                    accessibilityLabel={item.name}
                  >
                    {item.name}
                  </Text>
                  <View>
                    <View
                      style={{
                        width: 28,
                        height: 28, // Increased size for better touch target
                        borderWidth: 1,
                        borderColor: "#757575",
                        borderRadius: 30,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                      className={` ${cityId == item.id ? "bg-secondary" : ""}`}
                      accessible={false} // This is decorative, main accessibility is on the parent
                    >
                      {/* Placeholder for checkbox */}
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
            <TouchableOpacity
              onPress={handleCloseModal}
              style={{
                marginTop: 10,
                height: 48,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#FFFFFF",
                borderRadius: 10,
                minWidth: 88, // Ensure minimum width for touch target
              }}
              accessible={true}
              accessibilityRole="button"
              accessibilityLabel="Close city selection modal"
              accessibilityHint="Dismiss the city selection without making changes"
            >
              <Text
                className=" font-pregular"
                style={{ textAlign: "center", color: "#FF601B", fontSize: 16, paddingVertical: 8 }} // Added padding for larger touch area
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

const styles = StyleSheet.create({
  container: {
    paddingTop: 1,
    fontSize: 8,
  },
});

export default BestSellingAttraction;
