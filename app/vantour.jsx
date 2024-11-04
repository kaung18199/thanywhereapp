import React, {
  useEffect,
  useState,
  useCallback,
  useMemo,
  useRef,
} from "react";
import { SafeAreaView, View, Text, Image } from "react-native";
import { Stack } from "expo-router";
import { getListCity } from "../redux/stores/citySlice";
import { useDispatch } from "react-redux";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import HotelSearchBottom from "../components/HotelSearchBottom";
import ListVantour from "../components/Layout/ListVantour";
import { TouchableOpacity } from "react-native";
import { icons } from "../constants";

const Vantour = () => {
  const dispatch = useDispatch();
  const [searchHotel, setSearchHotel] = useState({
    city_id: "",
    search: "",
  });

  const getFunction = async () => {
    try {
      await dispatch(getListCity());
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleClosePreps();
    getFunction();
  }, []);

  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => ["1%", "99%"], []);

  const handleClosePreps = () => bottomSheetRef.current?.close();
  const handleOpenPreps = () => bottomSheetRef.current?.expand();
  const handleIndexPreps = () => bottomSheetRef.current?.snapToIndex(4);

  // callbacks
  const handleSheetChanges = useCallback((index) => {
    console.log("handleSheetChanges", index);
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f5f5f5" }}>
      <View>
        <Stack.Screen
          options={{
            headerShown: false,
          }}
        />
      </View>
      <View style={{ flex: 1 }}>
        <ListVantour
          city_id={searchHotel.city_id}
          place={searchHotel.place}
          max_price={searchHotel.max_price}
          search={searchHotel.search}
          handleOpenPreps={handleOpenPreps}
        />
      </View>

      <BottomSheet
        index={0}
        ref={bottomSheetRef}
        onChange={handleSheetChanges}
        snapPoints={snapPoints}
        enablePanDownToClose={true}
      >
        <BottomSheetView
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "flex-start",
            padding: 16,
          }}
        >
          {/* <HotelSearchBottom
            handleClosePreps={handleClosePreps}
            handleIndexPreps={handleIndexPreps}
            searchHotel={searchHotel}
            setSearchHotel={setSearchHotel}
          /> */}
          <View
            style={{ width: "100%" }}
            className=" border-b border-[#000000]/20"
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                paddingBottom: 16,
                width: "100%",
              }}
            >
              <Text style={{ opacity: 0 }}>......</Text>
              <Text
                style={{ fontSize: 16, fontWeight: "bold", color: "#FF601B" }}
              >
                Filter
              </Text>
              <TouchableOpacity onPress={() => handleClosePreps()}>
                <Image
                  source={icons.close}
                  style={{ width: 10, height: 10 }}
                  resizeMode="contain"
                  tintColor="#000000"
                />
              </TouchableOpacity>
            </View>
          </View>
        </BottomSheetView>
      </BottomSheet>
    </SafeAreaView>
  );
};

export default Vantour;
