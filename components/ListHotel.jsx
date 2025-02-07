import {
  View,
  Text,
  FlatList,
  RefreshControl,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getListHotel } from "../redux/stores/hotelSlice";
import HotelCart from "./HotelCart";
import Animated, { FadeInRight, FadeOutLeft } from "react-native-reanimated";
import EmptyState from "./EmptyState";

const ListHotel = ({
  setIsHeaderVisible,
  city_id,
  max_price,
  place,
  search,
}) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hotelData, setHotelData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [stop, setStop] = useState(false);

  const listRef = useRef(null);

  // const getListing = async (params) => {
  //   try {
  //     setLoading(true);
  //     const res = await dispatch(getListHotel(params));
  //     setStop(res.data.length !== 10);
  //     setHotelData((prevHotelData) => [...prevHotelData, ...res.data]);
  //   } catch (error) {
  //     console.error("Error fetching hotel data:", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  const getListing = async (params) => {
    try {
      setLoading(true);
      const result = await dispatch(getListHotel(params)).unwrap(); // Use unwrap() to get the actual data
      if (Array.isArray(result)) {
        // Make sure result is an array
        setStop(result.length !== 10);
        setHotelData((prevData) => [...prevData, ...result]);
      }
    } catch (error) {
      console.error("Error fetching hotel data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleScroll = (event) => {
    const { contentOffset } = event.nativeEvent;
    setIsHeaderVisible(contentOffset.y <= 10);
  };

  const onRefresh = async () => {
    try {
      setRefreshing(true);
      setPage(1);
      const res = await dispatch(
        getListHotel({ page: 1, city_id, max_price, place, search })
      ).unwrap(); // Use unwrap()
      setHotelData(res.data);
      setStop(res.data.length !== 10);
    } catch (error) {
      console.error("Error refreshing data:", error);
    } finally {
      setRefreshing(false);
    }
  };

  const handleEndReached = async () => {
    if (!stop && !loading && !refreshing) {
      const nextPage = page + 1;
      setPage(nextPage);
      await getListing({ page: nextPage, city_id, max_price, place, search });
    }
  };

  const renderFooter = () => {
    if (loading && !refreshing) {
      return <ActivityIndicator size="small" className="py-3" />;
    }
    return !stop ? (
      <Text className="text-sm pt-3 pb-6 font-pmedium w-full text-center">
        Loading more...
      </Text>
    ) : null;
  };

  useEffect(() => {
    const fetchHotelData = async () => {
      try {
        setRefreshing(true);
        setPage(1);
        const result = await dispatch(
          getListHotel({ page: 1, city_id, max_price, place, search })
        ).unwrap(); // Use unwrap()
        if (Array.isArray(result)) {
          setHotelData(result);
          setStop(result.length !== 10);
        }
      } catch (error) {
        console.error("Error fetching initial data:", error);
      } finally {
        setRefreshing(false);
        if (listRef.current) {
          listRef.current.scrollToIndex({ animated: true, index: 0 });
        }
      }
    };

    fetchHotelData();
  }, [city_id, max_price, place, search]);

  return (
    <Animated.View
      className="px-4 h-full"
      entering={FadeInRight.delay(500).duration(1000).springify().damping(12)}
      exiting={FadeOutLeft}
    >
      <FlatList
        ref={listRef}
        data={hotelData ?? []}
        keyExtractor={(item, index) => `${item.id || index}`}
        renderItem={({ item }) => {
          console.log(item);
          return item ? <HotelCart item={item} /> : null; // Ensure valid content
        }}
        ListEmptyComponent={() => (
          <EmptyState title="Hotel Searching" subtitle="No Data Found ..." />
        )}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
      />
    </Animated.View>
  );
};

export default ListHotel;
