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

  useEffect(() => {
    handleClosePreps();
    // getFunction();
  }, []);

  const bottomSheetRef = useRef(null);
  const bottomSheetRef2 = useRef(null);
  const snapPoints = useMemo(() => ["1%", "100%"], []);

  const handleClosePreps = () => bottomSheetRef.current?.close();
  const handleOpenPreps = () => bottomSheetRef.current?.expand();
  const handleIndexPreps = () => bottomSheetRef.current?.snapToIndex(4);

  const handle2ClosePreps = () => bottomSheetRef2.current?.close();
  const handle2OpenPreps = () => bottomSheetRef2.current?.expand();
  const handle2IndexPreps = () => bottomSheetRef2.current?.snapToIndex(4);

  // callbacks
  const handleSheetChanges = useCallback((index) => {
    console.log("handleSheetChanges", index);
  }, []);
  const handleSheet2Changes = useCallback((index) => {
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
          handleOpenPreps={handleOpenPreps}
          handle2OpenPreps={handle2OpenPreps}
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
          }}
        >
          <View
            style={{ width: "100%" }}
            className=" border-b border-[#000000]/10"
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                paddingBottom: 16,
                paddingHorizontal: 16,
                width: "100%",
              }}
            >
              <Text style={{ opacity: 0 }}>......</Text>
              <Text
                style={{ fontSize: 14, color: "#FF601B" }}
                className=" font-psemibold"
              >
                Select a destination
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
      <BottomSheet
        index={0}
        ref={bottomSheetRef2}
        onChange={handleSheet2Changes}
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
                style={{ fontSize: 14, color: "#FF601B" }}
                className=" font-psemibold"
              >
                Pick a Date
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
      {/* <BottomSheet
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
                style={{ fontSize: 14, color: "#FF601B" }}
                className=" font-psemibold"
              >
                Select a destination
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
      </BottomSheet> */}
    </SafeAreaView>
  );
};

export default Vantour;
