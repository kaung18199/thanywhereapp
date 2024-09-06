import React, {
  useEffect,
  useState,
  useCallback,
  useMemo,
  useRef,
} from "react";
import { SafeAreaView, View, Text } from "react-native";
import { Stack } from "expo-router";
import { getListCity } from "../redux/stores/citySlice";
import { useDispatch } from "react-redux";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import HotelSearchBottom from "../components/HotelSearchBottom";
import ListVantour from "../components/Layout/ListVantour";

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
  const snapPoints = useMemo(() => ["1%", "25%", "50%", "75%", "100%"], []);

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
          <HotelSearchBottom
            handleClosePreps={handleClosePreps}
            handleIndexPreps={handleIndexPreps}
            searchHotel={searchHotel}
            setSearchHotel={setSearchHotel}
          />
        </BottomSheetView>
      </BottomSheet>
    </SafeAreaView>
  );
};

export default Vantour;
