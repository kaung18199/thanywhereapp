import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  useWindowDimensions,
} from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import icons from "../constants/icons";
import * as Animatable from "react-native-animatable";
import { CachedImage } from "../helpers/image";
import HTML from "react-native-render-html";

const VantourCart = ({ item }) => {
  const router = useRouter();
  const { width: contentWidth } = useWindowDimensions();
  const fadeInRight = {
    from: {
      opacity: 0,
      translateX: 100, // Start from 100 units to the right
    },
    to: {
      opacity: 1,
      translateX: 0, // Move to 0 units (initial position)
    },
  };

  // Truncate HTML content to a specific character count
  const truncateHtml = (html, maxChars) => {
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
  };

  return (
    <View style={{ backgroundColor: "white" }} key={item.id.toString()}>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => console.log("hello")}
        style={{ position: "relative" }}
      >
        <View
          style={{
            width: contentWidth,
            padding: 5,
            borderBottomColor: "#ececec",
            borderBottomWidth: 6,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "flex-start",
              gap: 6,
              padding: 8,
            }}
          >
            {/* Image Section */}
            <View
              style={{
                width: "40%",
                height: 160,
                overflow: "hidden",
                borderRadius: 15,
              }}
            >
              <CachedImage
                uri={
                  item?.cover_image
                    ? item?.cover_image
                    : "https://img.freepik.com/free-photo/abstract-textured-backgound_1258-30576.jpg?t=st=1730589697~exp=1730593297~hmac=fcac11d660a2c87242409664e4e8bf25de2f964c16334084e744579ef2f41136&w=1380"
                }
                style={{ width: "100%", height: "100%", borderRadius: 15 }}
              />
            </View>

            {/* Details Section */}
            <View style={{ width: "60%", paddingLeft: 8 }}>
              <View style={{ gap: 4, paddingBottom: 2 }}>
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: "600",
                    color: "#FF601B",
                  }}
                  numberOfLines={1}
                  className=" font-pmedium"
                >
                  {item?.name}
                </Text>

                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexWrap: "wrap",
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      gap: 4,
                      alignItems: "center",
                    }}
                  >
                    {item?.cities.map((c) => (
                      <View
                        key={c}
                        style={{
                          backgroundColor: "rgba(0, 0, 0, 0.05)",
                          paddingVertical: 2,
                          paddingHorizontal: 4,
                          borderRadius: 8,
                          flexDirection: "row",
                          alignItems: "center",
                          gap: 4,
                        }}
                      >
                        <Image
                          source={icons.locationPin}
                          style={{ width: 12, height: 12 }}
                        />
                        <Text
                          style={{ fontSize: 8 }}
                          className=" font-pregular"
                        >
                          {c.name}
                        </Text>
                      </View>
                    ))}
                  </View>
                  <View
                    style={{
                      paddingHorizontal: 4,
                      paddingVertical: 2,
                      borderRadius: 8,
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 4,
                    }}
                  >
                    <Text style={{ fontSize: 10, fontWeight: "600" }}>
                      {item?.destinations.length}
                    </Text>
                    <Image
                      source={icons.attractionicon}
                      style={{ width: 12, height: 12, tintColor: "#FF601B" }}
                    />
                  </View>
                </View>

                {/* Description Section */}
                <View style={{ height: 50, overflow: "hidden", marginTop: 8 }}>
                  {item?.long_description && (
                    <HTML
                      source={{
                        html: truncateHtml(item?.long_description, 100),
                      }}
                      baseFontStyle={{ fontSize: 8 }}
                      numberOfLines={4}
                    />
                  )}
                </View>

                {/* Price Section */}
                <View style={{ paddingTop: 8, width: "100%" }}>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                      paddingBottom: 2,
                    }}
                  >
                    <Text style={{ fontSize: 10, fontWeight: "500" }}>
                      starting price
                    </Text>
                  </View>
                  <TouchableOpacity>
                    <Text
                      style={{
                        fontSize: 16,
                        color: "#FF601B",
                      }}
                      className=" font-psemibold"
                    >
                      {item?.lowest_car_price} THB
                      <Text
                        style={{ fontSize: 10, color: "rgba(0, 0, 0, 0.5)" }}
                      >
                        {" "}
                        / car
                      </Text>
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default VantourCart;
