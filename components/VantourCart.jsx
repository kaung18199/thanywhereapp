import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import icons from "../constants/icons";
import * as Animatable from "react-native-animatable";
import { CachedImage } from "../helpers/image";
import HTML from "react-native-render-html";

const VantourCart = ({ item }) => {
  const router = useRouter();
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
    <Animatable.View
      style={{ backgroundColor: "white" }}
      animation={fadeInRight}
      duration={500}
      key={item.id}
    >
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => console.log("hello")}
        style={{ position: "relative" }}
      >
        <ScrollView
          contentContainerStyle={{
            padding: 6,
            margin: 4,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "flex-start",
              padding: 8,
              borderRadius: 20,
              borderWidth: 1,
              borderColor: "#f0f0f0",
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
                    : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLEoaTsWQuPn6bW-_n6hqZvmy5Lh64qwETLg&s"
                }
                style={{ width: "100%", height: "100%", borderRadius: 15 }}
              />
            </View>

            {/* Details Section */}
            <View style={{ width: "60%", paddingLeft: 8 }}>
              <View style={{ gap: 4, paddingBottom: 2 }}>
                <Text
                  style={{
                    fontSize: 14,
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
                <View style={{ height: 60, overflow: "hidden", marginTop: 8 }}>
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
                    <Text style={{ fontSize: 14, fontWeight: "500" }}>
                      starting price
                    </Text>
                  </View>
                  <TouchableOpacity>
                    <Text
                      style={{
                        fontSize: 18,
                        fontWeight: "bold",
                        color: "#FF601B",
                      }}
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
        </ScrollView>
      </TouchableOpacity>
    </Animatable.View>
  );
};

export default VantourCart;
