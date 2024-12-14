import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  useWindowDimensions,
} from "react-native";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "expo-router";
import icons from "../constants/icons";
import * as Animatable from "react-native-animatable";
import { CachedImage } from "../helpers/image";
import HTML from "react-native-render-html";
import { Dimensions } from "react-native";

const AttractionCart = ({ item }) => {
  const router = useRouter();
  const { width: screenWidth } = useWindowDimensions();
  const [percent, setPercent] = useState(0);
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

  const calculatePercent = useCallback(
    (lowest_walk_in_price, lowest_variation_price) => {
      if (
        lowest_walk_in_price &&
        lowest_variation_price &&
        lowest_walk_in_price !== "null"
      ) {
        const result = (
          ((Number(lowest_walk_in_price) - Number(lowest_variation_price)) /
            Number(lowest_walk_in_price)) *
          100
        ).toFixed(0); // Round to 2 decimal places if necessary
        return `${result}`;
      } else {
        return `0`;
      }
    }
  );

  // Truncate HTML content to a specific character count
  const truncateHtml = (html, maxChars) => {
    if (html != null && html != "") {
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
      return `<div style="font-size: 10px;">coming soon</div>`;
    }
  };

  return (
    <View style={{ backgroundColor: "white" }} key={item.id.toString()}>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => router.push("/detail/attraction/" + item.id)}
        style={{ position: "relative" }}
      >
        <View
          style={{
            width: screenWidth,
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
              className=" relative"
              style={{
                width: screenWidth * 0.35,
                height: 160,
                overflow: "hidden",
                borderRadius: 15,
              }}
            >
              {item?.cover_image != null ? (
                <CachedImage
                  uri={
                    item?.cover_image
                      ? item?.cover_image
                      : "https://cdn-icons-png.flaticon.com/128/14005/14005478.png"
                  }
                  style={{ width: "100%", height: "100%", borderRadius: 15 }}
                />
              ) : (
                <Image
                  source={{
                    uri: "https://cdn-icons-png.flaticon.com/128/14005/14005478.png",
                  }}
                  style={{ width: "100%", height: "100%", borderRadius: 15 }}
                />
              )}
              <View
                style={{
                  backgroundColor: "#ff1c1c",
                  width: "auto",
                  paddingHorizontal: 8,
                  borderRadius: 16,
                  position: "absolute",
                  bottom: 2,
                  right: 2,
                }}
              >
                <Text
                  style={{
                    paddingVertical: 2,
                    textAlign: "center",
                    color: "white",
                    fontSize: 10,
                  }}
                >
                  {calculatePercent(
                    item.lowest_walk_in_price,
                    item.lowest_variation_price
                  )}
                  % OFF
                </Text>
              </View>
            </View>

            {/* Details Section */}
            <View style={{ width: screenWidth * 0.6, paddingLeft: 4 }}>
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
                    <View
                      style={{
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
                      <Text style={{ fontSize: 8 }} className=" font-pregular">
                        {item?.cities[0]?.name}
                      </Text>
                    </View>
                  </View>
                </View>

                {/* Description Section */}
                <View style={{ height: 40, overflow: "hidden", marginTop: 2 }}>
                  {item?.description && (
                    <HTML
                      source={{
                        html: truncateHtml(item?.description, 100),
                      }}
                      baseFontStyle={{ fontSize: 8 }}
                      numberOfLines={4}
                    />
                  )}
                </View>
                <View className=" flex-row justify-between items-center pr-2">
                  {item?.youtube_link &&
                    (item?.youtube_link[0]?.mm_link ||
                      item?.youtube_link[0]?.en_link) && (
                      <View className=" px-1 flex justify-end items-center flex-row">
                        <Image
                          source={{
                            uri: "https://cdn-icons-png.flaticon.com/128/18546/18546874.png",
                          }}
                          style={{
                            width: 10,
                            height: 10,
                            tintColor: "#08d14b",
                          }}
                        />
                        <Text className=" text-[10px] px-1 py-0.5 text-green-500">
                          includes
                        </Text>
                      </View>
                    )}
                  {!item?.youtube_link && (
                    <View className=" px-1 flex justify-end items-center flex-row">
                      <Image
                        source={{
                          uri: "https://cdn-icons-png.flaticon.com/128/18546/18546874.png",
                        }}
                        style={{
                          width: 10,
                          height: 10,
                          tintColor: "#fff400",
                        }}
                      />
                      <Text className=" text-[10px] px-1 py-0.5 text-yellow-500">
                        coming soon
                      </Text>
                    </View>
                  )}
                </View>

                {/* Price Section */}
                <View style={{ width: "100%" }}>
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
                      {item?.lowest_variation_price} THB
                      <Text
                        style={{ fontSize: 10, color: "rgba(0, 0, 0, 0.5)" }}
                      >
                        {" "}
                        / tickets
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

export default AttractionCart;
