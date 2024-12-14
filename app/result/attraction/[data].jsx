import { Stack } from "expo-router";
import React, { useCallback, useState } from "react";
import {
  Animated,
  View,
  Text,
  FlatList,
  StyleSheet,
  SafeAreaView,
  RefreshControl,
  useWindowDimensions,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import axios from "../../../axiosConfig";
import { ArrowPathIcon } from "react-native-heroicons/outline";
import LoadingVantour from "../../../components/LoadingCart/LoadingVantour";
import HeaderPart from "../../../components/Layout/HeaderPart";
import debounce from "lodash.debounce";
import { useEffect } from "react";
import { useRef } from "react";
import AttractionCart from "../../../components/AttractionCart";

export default function ListAttractionResult() {
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [searchVal, setSearchVal] = useState("");
  const [vantourData, setVantourData] = useState([]);
  const [stop, setStop] = useState(false);
  const [total, setTotal] = useState(0);
  const { data, cityId, cityName } = useLocalSearchParams();
  const [typeValue, setTypeValue] = useState(null);
  const [typeName, setTypeName] = useState("");

  const { height: screenHeight } = useWindowDimensions();

  const handleInputChange = async (value) => {
    setSearch(value);
  };

  const scrollViewRef = useRef(null);

  const type = [
    {
      id: "",
      name: "all",
    },
    {
      id: 32,
      name: "amusement park",
    },
    {
      id: 40,
      name: "dinner cruises",
    },
    {
      id: 31,
      name: "water parks",
    },
    {
      id: 17,
      name: "safari",
    },
    {
      id: 16,
      name: "museums",
    },
    {
      id: 29,
      name: "theme parks",
    },
    {
      id: 54,
      name: "buffet",
    },
    {
      id: 42,
      name: "island tours",
    },
    {
      id: 39,
      name: "shows",
    },
    {
      id: 22,
      name: "skywalks",
    },
  ];

  const searchResultParams = () => {
    let data = {};
    if (search) {
      data.search = search;
    }
    if (typeValue != null) {
      data.category_id = typeValue;
    }
    if (cityId) {
      data.city_id = cityId;
    }
    return data;
  };

  const getListing = useCallback(
    async (pageCount) => {
      try {
        let params = {
          page: pageCount,
          ...searchResultParams(),
        };
        console.log("====================================");
        console.log(params, "this is params");
        console.log("====================================");
        const res = await axios.get(
          "/entrance-tickets?order_by=top_selling_products&show_only=1",
          {
            params: params,
          }
        );
        const newData = res?.data?.data.filter(
          (item) => !vantourData.some((v) => v.id === item.id)
        ); // Prevent duplicates
        setVantourData((prevVantourData) => [...prevVantourData, ...newData]);

        setTotal(res?.data?.meta.total);
        // Check for stop condition
        if (res?.data?.data.length != 10) {
          setStop(true);
        } else {
          setStop(false);
          console.log("====================================");
          console.log("this is a stop condition");
          console.log("====================================");
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    },
    [searchResultParams]
  );

  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = async () => {
    try {
      setRefreshing(true);
      setVantourData([]);
      setPage(1);
      setStop(true);
      await getListing(1);
    } catch (error) {
      console.log(error);
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    if (typeValue != null) {
      setStop(true);
      onRefresh();
    }
  }, [typeValue]);

  const handleEndReached = useCallback(async () => {
    if (!stop) {
      try {
        setLoading(true);
        setPage(page + 1);
        await getListing(page);
      } catch (error) {
        console.log(error);
      }
    }
  });

  const renderFooter = () => {
    return !stop ? (
      <View>
        <LoadingVantour />
      </View>
    ) : null;
  };

  const endReachedThreshold = refreshing || loading ? Number.MAX_VALUE : 0.5;

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      {/* FlatList with Animated Scroll */}
      <Animated.FlatList
        data={vantourData || []}
        keyExtractor={(item, index) => `${item.id}_${index}`}
        renderItem={({ item }) => <AttractionCart item={item} />}
        contentContainerStyle={styles.contentContainer}
        ListHeaderComponent={
          <>
            <HeaderPart>
              <View style={{ paddingHorizontal: 16 }}>
                <Text
                  style={{
                    color: "#fff",
                    fontSize: 13,
                    paddingBottom: 10,
                    fontFamily: "Poppins-Medium",
                    textAlign: "center",
                  }}
                  numberOfLines={1}
                >
                  Over {total} Hotels in {cityName}, {typeName ? typeName : ""}
                </Text>

                <TextInput
                  className={`text-sm font-pregular w-full px-6  bg-white rounded-full ${
                    search == "" ? "pt-5" : "py-4"
                  }`}
                  placeholder="Search"
                  keyboardType=""
                  value={search}
                  onChangeText={handleInputChange}
                  autoCapitalize="none"
                  autoCorrect={false}
                />
                <View>
                  <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    ref={scrollViewRef}
                    className=" pt-4"
                  >
                    {type?.map((item, index) => (
                      <TouchableOpacity
                        key={item.id}
                        onPress={() => {
                          setTypeValue(item.id);
                          setTypeName(item.name);
                          onRefresh();
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
                            typeValue === item.id
                              ? "border-white bg-white"
                              : "border-gray-50"
                          }`}
                          style={{ borderWidth: 1 }}
                        >
                          <Text
                            className={
                              typeValue === item.id
                                ? "text-secondary"
                                : " text-gray-50 "
                            }
                            style={{ fontSize: 10 }}
                          >
                            {item.name}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                </View>
              </View>
            </HeaderPart>
          </>
        }
        stickyHeaderIndices={[0]}
        scrollEventThrottle={20}
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        keyboardShouldPersistTaps="handled"
        onEndReached={handleEndReached}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="#FF601B"
          />
        }
        onEndReachedThreshold={endReachedThreshold}
        ListFooterComponent={renderFooter}
      />
      {refreshing && (
        <View className=" flex-row justify-center gap-x-4 items-center">
          <Text
            style={{
              textAlign: "center",
              paddingVertical: 10,
              fontSize: 12,
              fontFamily: "Poppins-Medium",
            }}
          >
            Refreshing ...
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },

  labelText: {
    color: "#000000",
    textAlign: "center",
    fontSize: 14,
  },
});
