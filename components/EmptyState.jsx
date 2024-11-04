import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import React from "react";
import * as Animatable from "react-native-animatable";
import { CachedImage } from "../helpers/image";

const EmptyState = ({ title, subtitle, count }) => {
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

  return (
    <View>
      {[...Array(count * 1)].map((_, index) => (
        <View style={{ backgroundColor: "white" }} key={index}>
          <TouchableOpacity
            key={index}
            activeOpacity={0.7}
            onPress={() => console.log("hello")}
            style={{ position: "relative" }}
          >
            <View
              style={{
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
                      "https://img.freepik.com/free-photo/abstract-textured-backgound_1258-30576.jpg?t=st=1730589697~exp=1730593297~hmac=fcac11d660a2c87242409664e4e8bf25de2f964c16334084e744579ef2f41136&w=1380"
                    }
                    style={{
                      width: "100%",
                      height: "100%",
                      borderRadius: 15,
                      resizeMode: "cover",
                    }}
                  />
                </View>

                {/* Details Section */}
                <View style={{ width: "60%", paddingLeft: 8 }}>
                  <View style={{ gap: 4, paddingBottom: 2 }}>
                    {/* <Text
                      style={{
                        fontSize: 14,
                        fontWeight: "600",
                        color: "#FF601B",
                      }}
                      numberOfLines={1}
                      className=" font-pmedium"
                    >
                      loaing ...
                    </Text> */}
                    <View
                      style={{
                        width: 100,
                        height: 16,
                        backgroundColor: "#ececec",
                      }}
                    ></View>

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
                          width: 150,
                          height: 16,
                          backgroundColor: "#ececec",
                        }}
                      ></View>
                      <View
                        style={{
                          paddingHorizontal: 0,
                          paddingVertical: 4,
                          borderRadius: 8,
                          flexDirection: "row",
                          alignItems: "center",
                          gap: 4,
                        }}
                      >
                        <View
                          style={{
                            width: 150,
                            height: 16,
                            backgroundColor: "#ececec",
                          }}
                        ></View>
                      </View>
                    </View>

                    {/* Description Section */}
                    <View
                      style={{
                        height: 60,
                        overflow: "hidden",
                        marginTop: 8,
                        gap: 4,
                      }}
                    >
                      <View
                        style={{
                          width: 150,
                          height: 16,
                          backgroundColor: "#ececec",
                        }}
                      ></View>
                      <View
                        style={{
                          width: 150,
                          height: 16,
                          backgroundColor: "#ececec",
                        }}
                      ></View>
                      <View
                        style={{
                          width: 150,
                          height: 16,
                          backgroundColor: "#ececec",
                        }}
                      ></View>
                    </View>

                    {/* Price Section */}
                  </View>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
};

export default EmptyState;
