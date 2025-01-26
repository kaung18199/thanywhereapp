import React, { useCallback, useEffect, useMemo, useState } from "react";
import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import { CachedImage } from "../../helpers/image";
import axios from "../../axiosConfig";
import { icons } from "../../constants";
import { useRef } from "react";
import { setThingToDo } from "../../redux/stores/homeSlice";
import { useSelector, useDispatch } from "react-redux";
import { Modal } from "react-native";
import LoadingThingToDo from "../LoadingCart/LoadingThingToDo";
import { useRouter } from "expo-router";

// Async function to fetch data
const getListAction = async ({ categoryId, cityId }) => {
  let data = {
    city_id: cityId != null ? cityId : 2,
    order_by: "top_selling_products",
    category_id: categoryId != null ? categoryId : "",
  };
  const res = await axios.get("/entrance-tickets", { params: data });
  return res.data;
};

const getCityAction = async (params) => {
  const res = await axios.get("/cities?limit=100", { params: params });
  return res.data;
};

const loadData = [
  { id: 1, name: "loading" },
  { id: 2, name: "loading" },
  { id: 3, name: "loading" },
  { id: 4, name: "loading" },
];

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

const ThingsToDo = () => {
  const [data, setData] = useState(null);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [city, setCity] = useState(null);
  const [cityLoading, setCityLoading] = useState(true);
  const [cityId, setCityId] = useState(null);
  const [categoryId, setCategoryId] = useState(null);
  const [cityName, setCityName] = useState(null);
  const router = useRouter();
  const thingToDo = useSelector((state) => state.home.thingToDo);

  // for modal
  // ... existing state variables ...
  const [modalVisible, setModalVisible] = useState(false); // Add state for modal visibility

  const handleOpenModal = () => setModalVisible(true); // Open modal
  const handleCloseModal = () => setModalVisible(false); // Close modal

  const scrollViewRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      if (thingToDo == null || categoryId != null || cityId != null) {
        try {
          setLoading(true);
          const result = await getListAction({ categoryId, cityId });
          dispatch(setThingToDo(result));
          setData(result);
        } catch (error) {
          console.error("Error setting data:", error);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(true);
        setData(thingToDo);
        setLoading(false);
      }
    };

    fetchData();
  }, [categoryId, cityId]);

  // useEffect(() => {
  //   clearAppData();
  // }, []);

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
      ).toFixed(0); // Round to 0 decimal places
      return `${calculatedPercent}`;
    } else {
      return `0`;
    }
  };

  // Function to render each item
  const renderItem = (item) => (
    <View
      key={item.id.toString()}
      style={{
        marginRight: 8,
        width: 200,
        overflow: "hidden",
        backgroundColor: "#FFFFFF",

        borderRadius: 20,
        padding: 8,
      }}
    >
      <View style={{ position: "relative" }} className="">
        <CachedImage
          uri={
            item.cover_image
              ? item.cover_image
              : "https://cdn-icons-png.flaticon.com/128/14005/14005478.png"
          }
          style={{ width: 185, height: 100, borderRadius: 15 }}
        />

        <View
          style={{
            paddingHorizontal: 8,
            paddingBottom: 12,
            paddingTop: 16,
            gap: 2,
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
                top: -12,
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
            className=" font-psemibold "
          >
            {item?.name}
          </Text>
          <View style={{ flexDirection: "row" }}>
            {item.cities.map((city) => (
              <View
                key={city.id.toString()}
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
                    style={{ fontSize: 10, paddingRight: 8, paddingTop: 2 }}
                    className=" font-pmedium text-secondary"
                  >
                    {city.name}
                  </Text>
                </View>
              </View>
            ))}
          </View>
          <Text
            style={{
              fontSize: 12,
              fontWeight: "500",

              paddingBottom: 2,
            }}
            className=" font-pmedium"
          >
            starting price
          </Text>

          <TouchableOpacity
            onPress={() => {
              router.push("/detail/attraction/" + item.id);
            }}
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              paddingVertical: 4,
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text
                style={{ fontSize: 20, fontWeight: "800", color: "#FF5722" }}
              >
                ฿ {item?.lowest_variation_price}
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
                  ฿ {item?.lowest_walk_in_price}
                </Text>
              )}
            </View>
            <View
              style={{
                backgroundColor: "#FF601B", // secondary color
                width: 50,
                borderRadius: 50,
                paddingHorizontal: 3,
                paddingVertical: 1,
              }}
            >
              <Text
                style={{ color: "#FFFFFF", fontSize: 12, textAlign: "center" }}
                className=" font-pmedium"
              >
                view
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  const loadingItem = (item, text) => {
    return (
      // Added return statement
      <View
        key={item.id.toString()}
        className=" bg-black/5  flex justify-center items-center "
        style={{ width: 200, height: 200, marginRight: 10, borderRadius: 20 }}
      >
        <Text className=" text-xs">{text}</Text>
      </View>
    );
  };

  return (
    <View
      style={{ paddingHorizontal: 16, gap: 10, backgroundColor: "#FFFFFF" }}
    >
      <View
        style={{
          paddingTop: 30,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text
          style={{ fontSize: 14, fontWeight: "600", color: "#FF601B" }}
          className=" font-psemibold"
        >
          Things to do in {cityName ? cityName : "bangkok"}
        </Text>
        <TouchableOpacity onPress={handleOpenModal} style={{ padding: 4 }}>
          <Text className="text-secondary font-psemibold text-sm py-2">
            filter
          </Text>
        </TouchableOpacity>
      </View>

      <View>
        {!cityLoading && (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            ref={scrollViewRef}
          >
            {category?.map((item, index) => (
              <TouchableOpacity
                key={item.id}
                onPress={() => {
                  setCategoryId(item.id);
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
                    categoryId === item.id
                      ? "border-secondary"
                      : "border-[#dadada]"
                  }`}
                  style={{ borderWidth: 1 }}
                >
                  <Text
                    className={
                      categoryId === item.id
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
        )}
      </View>
      {!loading ? (
        <View>
          {data?.data && data.data.length > 0 ? ( // Check if data is available
            <>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                  paddingVertical: 5,
                }}
              >
                {data.data.map(renderItem)}
              </ScrollView>
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  paddingVertical: 10,
                }}
              >
                <View
                  className="w-full rounded-full px-4 py-3 "
                  style={{ borderWidth: 1, borderColor: "#dadada" }}
                >
                  <Text
                    className=" font-pmedium text-secondary text-center"
                    style={{ fontSize: 12 }}
                  >
                    see more
                  </Text>
                </View>
              </TouchableOpacity>
            </>
          ) : (
            // Render this when data is empty
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingVertical: 4 }}
            >
              {loadData.map((item) => loadingItem(item, "empty ..."))}
            </ScrollView>
          )}
        </View>
      ) : (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            paddingVertical: 4,
          }}
        >
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingVertical: 4 }}
          >
            {loadData.map((item, index) => (
              <View
                key={index}
                style={{ width: 200, marginBottom: 10, marginRight: 10 }}
              >
                <LoadingThingToDo />
              </View>
            ))}
          </ScrollView>
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
            <Text className="px-6 pb-2 text-secondary font-psemibold">
              Choose city
            </Text>

            <ScrollView
              className="mt-2 "
              style={{ maxHeight: 200, minHeight: 200, overflow: "hidden" }}
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
                    padding: 6,
                  }}
                >
                  <Text
                    className={`rounded-full px-4 w-full font-pregular py-1 mr-2 ${
                      cityId == item.id ? "text-secondary" : "text-[#000]"
                    }`}
                    style={{ flex: 1, fontSize: 12 }}
                  >
                    {item.name}
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
                      className={` ${cityId == item.id ? "bg-secondary" : ""}`}
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
              }}
            >
              <Text
                className=" font-pregular"
                style={{ textAlign: "center", color: "#FF601B", fontSize: 14 }}
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

export default ThingsToDo;
