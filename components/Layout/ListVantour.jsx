import {
  View,
  Text,
  FlatList,
  RefreshControl,
  useWindowDimensions,
} from "react-native";
import React, { useEffect, useMemo, useRef, useState } from "react";
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

const ListVantour = ({ city_id = "", search = "" }) => {
  const dispatch = useDispatch();
  const [isHeaderVisible, setIsHeaderVisible] = useState(false);
  const vantour = useSelector((state) => state.vantour.vantour);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [vantourData, setVantourData] = useState([]);

  const memoizedPage = useMemo(() => page, [page]);

  const listRef = useRef(null);
  const [stop, setStop] = useState(false);

  const { width: contentWidth } = useWindowDimensions();

  const getListing = async (params) => {
    try {
      const res = await dispatch(getListvantour(params));
      if (res.data.length !== 10) {
        setStop(true);
      } else {
        setStop(false);
      }
      setVantourData((prevVantourData) => [...prevVantourData, ...res.data]);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = async () => {
    try {
      setRefreshing(true);
      setPage(1);
      await getListing({ page: 1, city_id, search });
      setVantourData([]);
    } catch (error) {
      console.log(error);
    } finally {
      setRefreshing(false);
    }
  };

  const handleScroll = (event) => {
    const { contentOffset } = event.nativeEvent;

    const offsetY = contentOffset.y;
    // setIsHeaderVisible(offsetY > 350);
    if (offsetY > 350) {
      setIsHeaderVisible(true);
    } else if (offsetY < 350) {
      setIsHeaderVisible(false);
    } else {
      setIsHeaderVisible(false);
    }
  };

  const handleEndReached = async () => {
    if (!stop) {
      setPage(page + 1);
      try {
        await getListing({ page, city_id, search });
      } catch (error) {
        console.log(error);
      }
    }
  };

  const renderFooter = () => {
    return !stop ? (
      <Text
        style={{
          textAlign: "center",
          paddingVertical: 16,
          fontSize: 14,
          fontFamily: "Poppins-Medium",
        }}
      >
        Loading more...
      </Text>
    ) : null;
  };

  useEffect(() => {
    const fetchVantourData = async () => {
      try {
        setPage(1);
        setRefreshing(true);
        const res = await dispatch(
          getListvantour({ page: 1, city_id, search })
        );
        setVantourData(res.data);
        if (res.data.length !== 10) {
          setStop(true);
        } else {
          setStop(false);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setRefreshing(false);
        listRef.current?.scrollToIndex({ animated: true, index: 0 });
      }
    };

    fetchVantourData();
  }, [city_id, search]);

  const endReachedThreshold = refreshing || loading ? Number.MAX_VALUE : 0.1;

  return (
    <Animated.View
      style={{ flex: 1 }}
      entering={FadeInRight.delay(500).duration(1000).springify().damping(12)}
      exiting={FadeOutLeft}
    >
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
      {isHeaderVisible && (
        <Animated.View
          entering={FadeIn.delay(500).duration(1000).springify().damping(12)}
          exiting={FadeOut}
        >
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
            <Text
              style={{
                fontSize: 12,
                fontFamily: "Poppins-Medium",
                color: "#000",
              }}
            >
              filter by
            </Text>
          </View>
        </Animated.View>
      )}
      <FlatList
        ref={listRef}
        data={vantourData == null ? [] : vantourData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <VantourCart item={item} />}
        ListHeaderComponent={
          <View>
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
                    marginVertical: 8,
                  }}
                >
                  bangkok, pattaya, phuket, etc ...
                </Text>
                <View style={{ paddingTop: 24, gap: 8 }}>
                  <SearchPart
                    text="choose your destination"
                    handleIndexPreps={() =>
                      console.log("choose your destination")
                    }
                    icon={icons.locationPin}
                  />
                  <SearchPart
                    text="pick a date of travel"
                    handleIndexPreps={() =>
                      console.log("pick a date of travel")
                    }
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
                        paddingVertical: 12,
                        borderColor: "#fff",
                        borderWidth: 1,
                      }}
                    >
                      <Text
                        style={{
                          color: "#fff",
                          textAlign: "center",
                          fontSize: 14,
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
          </View>
        }
        ListEmptyComponent={() => (
          <EmptyState title="vantour Searching" subtitle="No Data Found ..." />
        )}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        onEndReached={handleEndReached}
        onEndReachedThreshold={endReachedThreshold}
        ListFooterComponent={renderFooter}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </Animated.View>
  );
};

export default ListVantour;
