import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  useWindowDimensions,
  Image,
} from "react-native";
import { CachedImage } from "../../helpers/image";
import axios from "../../axiosConfig";
import { icons } from "../../constants";
import LoadingCart from "../LoadingCart/LoadingCart";

// Fetch the destination data using axios
const getListAction = async () => {
  try {
    const res = await axios.get("/destinations");
    // console.log("API Response:", res.data); // Log API response
    return res.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return { data: [] }; // Return empty data on error
  }
};

const loadingCarts = [1, 2, 3, 4, 5, 6, 7, 8];

const TopDestinationToRead = () => {
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

  // Function to render each item in the carousel
  const renderItem = ({ item, index }) => (
    <View
      style={{
        width: width / 2 - 20,
        marginBottom: 8,
        marginLeft: index % 2 === 0 ? 0 : 4, // Margin left for even index
        marginRight: index % 2 !== 0 ? 0 : 4, // Margin right for odd index
      }}
      key={item.id.toString()}
    >
      <TouchableOpacity
        onPress={() => {
          console.log(`Pressed ${item.name}`);
        }}
      >
        <View
          style={{
            backgroundColor: "white",
            borderRadius: 20,
            overflow: "hidden",
          }}
        >
          <View style={{ padding: 6 }}>
            {item.feature_img ? (
              <CachedImage
                uri={item.feature_img}
                style={{ width: "100%", height: 100, borderRadius: 15 }}
              />
            ) : (
              <Image
                source={icons.bookmark}
                style={{ width: "100%", height: 100, borderRadius: 15 }}
              />
            )}
          </View>
          <View
            style={{
              paddingHorizontal: 8,
              paddingVertical: 10,
            }}
          >
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
                  {item?.city?.name}
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

            <View style={{ height: 80 }}>
              <Text style={{ fontSize: 10, color: "#333" }} numberOfLines={4}>
                {item?.summary}
              </Text>
            </View>

            <View style={{ marginTop: 8 }}>
              <Text
                style={{ fontSize: 16, fontWeight: "600", color: "#FF601B" }}
              >
                read more ...
              </Text>
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
          paddingTop: 16,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text
          style={{ fontSize: 16, fontWeight: "600", color: "#FF601B" }}
          className=" font-psemibold"
        >
          Top destination to read
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
          renderItem={({ item, index }) => renderItem({ item, index })}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
        />
      ) : (
        <View>
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
  );
};

export default TopDestinationToRead;
