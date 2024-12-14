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
  StyleSheet,
  SafeAreaView,
  useWindowDimensions,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import axios from "../../axiosConfig";
import { ArrowPathIcon } from "react-native-heroicons/outline";
import LoadingVantour from "../LoadingCart/LoadingVantour";
import AttractionCart from "../AttractionCart";

export default function ListAttraction({ setStickyHeader }) {
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [vantourData, setVantourData] = useState([]);
  const [stop, setStop] = useState(false);
  const [typeValue, setTypeValue] = useState("");
  const [typeName, setTypeName] = useState("");

  const { height: screenHeight } = useWindowDimensions();

  const scrollY = useRef(new Animated.Value(0)).current;

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

  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
    {
      useNativeDriver: false,
      listener: (event) => {
        const offsetY = event.nativeEvent.contentOffset.y;
        setStickyHeader(offsetY > 5); // Switch header after 100px
      },
    }
  );

  const getListing = useCallback(async (params) => {
    try {
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
      let data = {
        page: 1,
      };
      if (typeValue != "") {
        data.category_id = typeValue;
      }
      await getListing(data);
    } catch (error) {
      console.log(error);
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    if (typeValue != "") {
      onRefresh();
    }
  }, [typeValue]);

  const handleEndReached = useCallback(async () => {
    if (!stop) {
      try {
        setLoading(true);
        setPage(page + 1);
        let data = {
          page: page,
        };
        if (typeValue != "") {
          data.category_id = typeValue;
        }
        await getListing(data);
      } catch (error) {
        console.log(error);
      }
    }
  });

  const renderHeader = () => (
    <View
      style={{
        paddingVertical: 8,
        backgroundColor: "#FFFFFF",
      }}
    >
      <View className=" flex-row justify-between  items-center">
        <Text className=" font-psemibold  text-base pl-6">
          Attractions {typeName ? " - " + typeName : ""}
        </Text>
        <TouchableOpacity onPress={onRefresh} className=" pr-3">
          <ArrowPathIcon size={20} color="#FF601B" />
        </TouchableOpacity>
      </View>
      <View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          ref={scrollViewRef}
          className="px-4 pb-2 pt-4"
        >
          {type?.map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => {
                setTypeValue(item.id);
                setTypeName(item.name);
              }}
            >
              <View
                className={`rounded-full px-4 py-1 mr-2 ${
                  typeValue === item.id
                    ? "border-secondary"
                    : "border-[#dadada]"
                }`}
                style={{ borderWidth: 1 }}
              >
                <Text
                  className={typeValue === item.id ? "text-secondary" : ""}
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
  );

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
      {/* FlatList with Animated Scroll */}
      <Animated.FlatList
        data={vantourData || []}
        keyExtractor={(item, index) => `${item.id}_${index}`}
        renderItem={({ item }) => <AttractionCart item={item} />}
        contentContainerStyle={styles.contentContainer}
        ListHeaderComponent={renderHeader}
        stickyHeaderIndices={[0]}
        onScroll={handleScroll}
        scrollEventThrottle={20}
        initialNumToRender={10}
        maxToRenderPerBatch={10}
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
