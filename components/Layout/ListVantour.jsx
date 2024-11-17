import { Stack } from "expo-router";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  Animated,
  View,
  Text,
  FlatList,
  StyleSheet,
  SafeAreaView,
  RefreshControl,
  ActivityIndicator,
  TouchableOpacity,
  Image,
} from "react-native";
import HeaderPart from "./HeaderPart";
import SearchPart from "./SearchPart";
import { icons } from "../../constants";
import EmptyState from "../EmptyState";
import VantourCart from "../VantourCart";
import axios from "../../axiosConfig";
import { ArrowPathIcon } from "react-native-heroicons/outline";

export default function Hotel({ handleOpenPreps, handle2OpenPreps }) {
  const scrollY = useRef(new Animated.Value(0)).current;
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [city_id, setCityId] = useState("");
  const [vantourData, setVantourData] = useState([]);
  const [stop, setStop] = useState(false);

  const memoizedPage = useMemo(() => page, [page]);
  const memoizedVantourData = useMemo(() => vantourData, [vantourData]);

  // Scale the header and move it upwards to simulate top-aligned shrinking
  const headerScale = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [1, 0], // Fully scaled to zero scaling
    extrapolate: "clamp",
  });

  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [1, 0], // Fully visible to fully hidden
    extrapolate: "clamp",
  });

  const headerTranslateY = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [0, -75], // Half of initial header height to move up while shrinking
    extrapolate: "clamp",
  });

  const labelTranslateY = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [0, -80], // Adjust to match header height reduction
    extrapolate: "clamp",
  });

  const getListing = useCallback(async (params) => {
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
  });

  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = async () => {
    try {
      setRefreshing(true);
      setVantourData([]);
      setPage(1);
      await getListing({ page: 1 });
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
      <View style={styles.loading} className=" h-24 pt-6">
        <ActivityIndicator size="small" color="#FF601B" />
      </View>
    ) : null;
  };

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        await getListing({ page: 1 });
      } catch (error) {
        console.log(error);
      }
    };
    fetchInitialData();

    // fetchVantourData();
  }, [city_id, search]);

  const endReachedThreshold = refreshing || loading ? Number.MAX_VALUE : 0.5;

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />

      {/* Animated Header */}
      <Animated.View
        style={[
          styles.header,
          {
            transform: [
              { translateY: headerTranslateY },
              { scaleY: headerScale },
            ],
            opacity: headerOpacity,
          },
        ]}
      >
        {/* <Text style={styles.headerText}>Filter Section</Text> */}
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
                fontSize: 12,
                fontFamily: "Poppins-Regular",
                marginVertical: 4,
              }}
            >
              bangkok, pattaya, phuket, etc ...
            </Text>
            <View style={{ paddingTop: 15, gap: 8 }}>
              <SearchPart
                text="choose your destination *"
                handleIndexPreps={() => handleOpenPreps()}
                icon={icons.locationPin}
              />
              <SearchPart
                text="pick a date of travel"
                handleIndexPreps={() => handle2OpenPreps()}
                icon={icons.destiantionicon}
              />
              <SearchPart
                text="choose activity type *"
                handleIndexPreps={() => console.log("choose activity type")}
                icon={icons.attractionicon}
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

      {/* Animated Label with translation */}
      <Animated.View
        style={[styles.label, { transform: [{ translateY: labelTranslateY }] }]}
      >
        <Text style={styles.labelText} className=" font-psemibold">
          Vantours Packages
        </Text>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {
            onRefresh();
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
            Refresh
          </Text>
          <ArrowPathIcon color="orange" size={12} />
        </TouchableOpacity>
      </Animated.View>

      {/* FlatList with Animated Scroll */}
      <Animated.FlatList
        style={{ paddingTop: 20 }}
        data={vantourData || []}
        keyExtractor={(item, index) => item.id.toString()}
        renderItem={({ item }) => <VantourCart item={item} />}
        contentContainerStyle={styles.contentContainer}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={20}
        // refreshControl={
        //   <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        // }
        onEndReached={handleEndReached}
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
            Refreshing
          </Text>
          <ActivityIndicator size="small" color="#FF601B" />
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: "hidden",
  },
  header: {
    justifyContent: "center",
    alignItems: "center",

    position: "absolute",
    width: "100%",
    height: 350, // Fixed height for header
    zIndex: 2,
    paddingTop: 12,
  },
  headerText: {
    fontSize: 24,
    color: "#fff",
  },
  label: {
    position: "absolute",
    top: 80, // Starts below the header
    width: "100%",
    backgroundColor: "#ffffff",
    paddingVertical: 10,
    zIndex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: 16,
  },
  labelText: {
    color: "#000000",
    textAlign: "center",
    fontSize: 14,
  },
  contentContainer: {
    paddingTop: 150, // Account for header space
  },
  item: {
    padding: 20,
    borderBottomWidth: 1,
    borderColor: "#ddd",
  },
});
