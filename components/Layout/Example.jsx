import {
  View,
  Text,
  FlatList,
  RefreshControl,
  useWindowDimensions,
  TouchableOpacity,
  Image,
} from "react-native";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { getListvantour } from "../../redux/stores/vantourSlice";
import Animated, {
  FadeInRight,
  FadeOutLeft,
  FadeIn,
  FadeOut,
} from "react-native-reanimated";
import EmptyState from "../EmptyState";
import { icons } from "../../constants";
import HeaderPart from "./HeaderPart";
import SearchPart from "./SearchPart";
import VantourCart from "../VantourCart";
import { debounce } from "lodash";
import axios from "../../axiosConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ListVantour = ({ city_id = "", search = "", handleOpenPreps }) => {
  const dispatch = useDispatch();
  const [showStickyHeader, setShowStickyHeader] = useState(true);
  const vantour = useSelector((state) => state.vantour.vantour);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [vantourData, setVantourData] = useState([]);

  const memoizedPage = useMemo(() => page, [page]);
  const memoizedVantourData = useMemo(() => vantourData, [vantourData]);

  const listRef = useRef(null);
  const [stop, setStop] = useState(false);

  const { width: contentWidth } = useWindowDimensions();

  const getListing = async (params) => {
    try {
      const res = await axios.get(
        "/private-van-tours?order_by=top_selling_products&type=van_tour",
        {
          params: params,
        }
      );
      const newData = res?.data?.data.filter(
        (item) => !vantourData.some((v) => v.id === item.id)
      ); // Prevent duplicates
      setVantourData((prevVantourData) => [...prevVantourData, ...newData]);

      await AsyncStorage.setItem(
        "vantourDataCache",
        JSON.stringify([...vantourData])
      );

      // Check for stop condition
      if (res?.data?.data.length != 10) {
        setStop(true);
      } else {
        setStop(false);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleScroll = (event) => {
    const scrollY = event?.nativeEvent?.contentOffset.y;
    setShowStickyHeader(scrollY < 5); // Show sticky header when scrolled past 100 pixels
  };

  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = async () => {
    try {
      setRefreshing(true);
      setPage(1);
      await getListing({ page: 1 });
      setVantourData([]);
    } catch (error) {
      console.log(error);
    } finally {
      setRefreshing(false);
    }
  };

  const handleEndReached = useCallback(async () => {
    if (!stop) {
      setPage(page + 1);
      try {
        setLoading(true);
        await getListing({ page });
      } catch (error) {
        console.log(error);
      }
      console.log("====================================");
      console.log("hello refresh");
      console.log("====================================");
    } else {
      console.log("====================================");
      console.log("hello");
      console.log("====================================");
    }
  });

  const renderFooter = () => {
    return !stop ? (
      <EmptyState
        title="vantour Searching"
        subtitle="No Data Found ..."
        count="1"
      />
    ) : null;
  };

  // const debouncedHandleScroll = debounce(handleScroll, 100); // Adjust delay as needed

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const cachedData = await AsyncStorage.getItem("vantourDataCache");
        if (cachedData) {
          setVantourData(JSON.parse(cachedData)); // Load cached data
        } else {
          await getListing({ page: 1 });
        }
        // Fetch fresh data from the server
        // await getListing({ page: 1 });
      } catch (error) {
        console.log(error);
      }
    };
    fetchInitialData();

    // fetchVantourData();
  }, [city_id, search]);

  const endReachedThreshold = refreshing || loading ? Number.MAX_VALUE : 0.5;

  return (
    <View style={{ flex: 1, position: "relative" }}>
      {refreshing && (
        <Text
          style={{
            textAlign: "center",
            paddingVertical: 8,
            fontSize: 14,
            fontFamily: "Poppins-Medium",
          }}
        >
          Refresh Loading ...
        </Text>
      )}

      {showStickyHeader && (
        <Animated.View
          entering={FadeIn.delay(500).duration(1000).springify().damping(12)}
          exiting={FadeOut}
        >
          <HeaderPart>
            <View style={{ paddingHorizontal: 16 }}>
              <Text
                style={{
                  color: "#fff",
                  fontSize: 16,
                  fontFamily: "Poppins-Medium",
                }}
              >
                van tour packages
              </Text>
              <Text
                style={{
                  color: "#fff",
                  fontSize: 14,
                  fontFamily: "Poppins-Regular",
                  marginVertical: 4,
                }}
              >
                bangkok, pattaya, phuket, etc ...
              </Text>
              <View style={{ paddingTop: 15, gap: 8 }}>
                <SearchPart
                  text="choose your destination"
                  handleIndexPreps={() =>
                    console.log("choose your destination")
                  }
                  icon={icons.locationPin}
                />
                <SearchPart
                  text="pick a date of travel"
                  handleIndexPreps={() => console.log("pick a date of travel")}
                  icon={icons.locationPin}
                />
                <SearchPart
                  text="choose activity type"
                  handleIndexPreps={() => console.log("choose activity type")}
                  icon={icons.locationPin}
                />
                <View style={{ width: "100%" }}>
                  <View
                    style={{
                      backgroundColor: "#FF601B",
                      borderRadius: 50,
                      paddingVertical: 10,
                      borderColor: "#fff",
                      borderWidth: 1,
                    }}
                  >
                    <Text
                      style={{
                        color: "#fff",
                        textAlign: "center",
                        fontSize: 12,
                        fontFamily: "Poppins-Medium",
                      }}
                    >
                      explore
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </HeaderPart>
        </Animated.View>
      )}

      <Animated.FlatList
        ref={listRef}
        data={vantourData || []}
        keyExtractor={(item, index) => item.id.toString()}
        renderItem={({ item }) => (
          <VantourCart item={item} contentWidth={contentWidth} />
        )}
        stickyHeaderIndices={[0]}
        removeClippedSubviews={true}
        ListHeaderComponent={
          <View style={{ position: "relative" }}>
            {showStickyHeader && (
              <View
                style={{
                  height: 4,
                  backgroundColor: "#767676",
                  width: 50,
                  position: "absolute",
                  top: 0,
                  alignSelf: "center",
                  zIndex: 10,
                  borderRadius: 2,
                }}
              ></View>
            )}
            <View
              style={{
                backgroundColor: "#fff",
                paddingHorizontal: 16,
                paddingVertical: 12,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  fontFamily: "Poppins-SemiBold",
                  color: "#FF601B",
                }}
              >
                van tours packages
              </Text>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => {
                  handleOpenPreps();
                }}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 2,
                }}
              >
                <Text
                  style={{
                    fontSize: 10,
                    fontFamily: "Poppins-Medium",
                    color: "#000",
                  }}
                >
                  filter by
                </Text>
                <Image
                  source={icons.menu}
                  style={{ width: 10, height: 10 }}
                  resizeMode="contain"
                  tintColor="#FF601B"
                />
              </TouchableOpacity>
            </View>
          </View>
        }
        // ListEmptyComponent={() => (
        //   <EmptyState
        //     title="vantour Searching"
        //     subtitle="No Data Found ..."
        //     count="2"
        //   />
        // )}
        scrollEventThrottle={16}
        onScroll={handleScroll}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        onEndReached={handleEndReached}
        onEndReachedThreshold={endReachedThreshold}
        ListFooterComponent={renderFooter}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
};

export default ListVantour;
