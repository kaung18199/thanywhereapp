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
  useWindowDimensions,
} from "react-native";
import { icons } from "../../constants";
import EmptyState from "../EmptyState";
import VantourCart from "../VantourCart";
import axios from "../../axiosConfig";
import { ArrowPathIcon } from "react-native-heroicons/outline";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import LoadingVantour from "../LoadingCart/LoadingVantour";

export default function ListVantour({ setStickyHeader }) {
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [city_id, setCityId] = useState("");
  const [vantourData, setVantourData] = useState([]);
  const [stop, setStop] = useState(false);

  const { height: screenHeight } = useWindowDimensions();

  const scrollY = useRef(new Animated.Value(0)).current;

  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
    {
      useNativeDriver: false,
      listener: (event) => {
        const offsetY = event.nativeEvent.contentOffset.y;
        setStickyHeader(offsetY > 100); // Switch header after 100px
      },
    }
  );

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
      setStop(true);
      await getListing({ page: 1 });
    } catch (error) {
      console.log(error);
    } finally {
      setRefreshing(false);
    }
  };

  const handleEndReached = useCallback(async () => {
    if (!stop) {
      try {
        setLoading(true);
        setPage(page + 1);
        await getListing({ page: page });
      } catch (error) {
        console.log(error);
      }
    }
  });

  const renderHeader = () => (
    <View
      style={{
        paddingVertical: 8,
        paddingHorizontal: 14,
        backgroundColor: "#FFFFFF",
      }}
    >
      <Text className=" font-psemibold  text-base">Van tours Packages</Text>
    </View>
  );

  const renderFooter = () => {
    return !stop ? (
      <View>
        <LoadingVantour />
      </View>
    ) : null;
  };

  // useEffect(() => {
  //   const fetchInitialData = async () => {
  //     try {
  //       setPage(1);
  //       setVantourData([]);
  //       await getListing({ page: page });
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   fetchInitialData();

  //   // fetchVantourData();
  // }, []);

  const endReachedThreshold = refreshing || loading ? Number.MAX_VALUE : 0.5;

  return (
    <SafeAreaView style={styles.container}>
      {/* FlatList with Animated Scroll */}
      <Animated.FlatList
        data={vantourData || []}
        keyExtractor={(item, index) => `${item.id}_${index}`}
        renderItem={({ item }) => <VantourCart item={item} />}
        contentContainerStyle={styles.contentContainer}
        ListHeaderComponent={renderHeader}
        stickyHeaderIndices={[0]}
        onScroll={handleScroll}
        scrollEventThrottle={20}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
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
  },

  labelText: {
    color: "#000000",
    textAlign: "center",
    fontSize: 14,
  },
});
