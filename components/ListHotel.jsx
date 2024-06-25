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
  isHeaderVisible,
  city_id,
  max_price,
  place,
  search,
}) => {
  const dispatch = useDispatch();
  const hotel = useSelector((state) => state.hotel.hotel);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hotelData, setHotelData] = useState([]);

  const memoizedPage = useMemo(() => page, [page]);

  const listRef = useRef(null);
  const [stop, setStop] = useState(false);

  const getListing = async (params) => {
    try {
      const res = await dispatch(getListHotel(params));
      // console.log(res.data, "this is get result");
      if (res.data.length != 10) {
        setStop(true);
      } else {
        setStop(false);
      }
      setHotelData((prevHotelData) => [...prevHotelData, ...res.data]);
      // console.log(hotelData.length);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
    // console.log(hotel, "this is hotel");
  };

  const handleScroll = (event) => {
    const { contentOffset, contentSize, layoutMeasurement } = event.nativeEvent;

    const offsetY = contentOffset.y;
    const contentHeight = contentSize.height;
    const scrollViewHeight = layoutMeasurement.height;
    let isScrolledToTop;
    let isScrolledToBottom;

    if (offsetY > 10) {
      isScrolledToTop = offsetY > 10;
      setIsHeaderVisible(false);
    } else {
      isScrolledToBottom = offsetY >= contentHeight - scrollViewHeight;
      setIsHeaderVisible(true);
    }
  };

  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = async () => {
    // listRef.current?.scrollToOffset({ animated: true, offset: 0 });
    try {
      setRefreshing(true);
      setPage(1);
      await getListing({ page: 1, city_id, max_price, place, search });
      setHotelData([]);
    } catch (error) {
      console.log(error);
    } finally {
      setRefreshing(false);
    }
  };

  const handleEndReached = async () => {
    if (!stop) {
      setPage(page + 1);
      try {
        await getListing({ page, city_id, max_price, place, search });
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
  };

  const renderFooter = () => {
    return !stop ? (
      <Text className=" text-sm pt-3 pb-6 font-pmedium w-full text-center">
        Loading more...
      </Text>
    ) : null;
  };

  useEffect(() => {
    // Define a function to fetch hotel data
    const fetchHotelData = async () => {
      try {
        setPage(1);
        setRefreshing(true);
        const res = await dispatch(
          getListHotel({ page: 1, city_id, max_price, place, search })
        );
        // Update hotel data with new array
        setHotelData(res.data);
        console.log(res.data.length);
        if (res.data.length != 10) {
          setStop(true);
        } else {
          setStop(false);
        }
        console.log("====================================");
        console.log(stop);
      } catch (error) {
        console.log(error);
      } finally {
        setRefreshing(false);
        listRef.current.scrollToIndex({ animated: true, index: 0 });
      }
    };

    // Call the fetchHotelData function
    fetchHotelData();
  }, [city_id, max_price, place, search]);

  const endReachedThreshold = refreshing || loading ? Number.MAX_VALUE : 0.1;

  return (
    <Animated.View
      className=" px-4 h-full"
      entering={FadeInRight.delay(500).duration(1000).springify().damping(12)}
      exiting={FadeOutLeft}
    >
      {refreshing && (
        <Text className=" text-sm pt-3 pb-5 font-pmedium w-full text-center">
          Refresh Loading ...
        </Text>
      )}
      <FlatList
        ref={listRef}
        data={hotelData == null ? [] : hotelData}
        keyExtractor={(item, index) => index}
        renderItem={({ item }) => <HotelCart item={item} />}
        ListEmptyComponent={() => (
          <EmptyState title="Hotel Searching" subtitle="No Data Found ..." />
        )}
        onScroll={handleScroll}
        scrollEventThrottle={16} // Adjust as
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        onEndReached={handleEndReached}
        onEndReachedThreshold={endReachedThreshold} // Adjust as needed
        ListFooterComponent={renderFooter}
      />
    </Animated.View>
  );
};

export default ListHotel;
