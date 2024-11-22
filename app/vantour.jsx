import React, {
  useEffect,
  useState,
  useCallback,
  useMemo,
  useRef,
} from "react";
import {
  SafeAreaView,
  View,
  Text,
  Image,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
  Dimensions,
  TextInput,
} from "react-native";
import { Stack } from "expo-router";
import { getListCity } from "../redux/stores/citySlice";
import { useDispatch } from "react-redux";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import HotelSearchBottom from "../components/HotelSearchBottom";
import ListVantour from "../components/Layout/ListVantour";
import { TouchableOpacity } from "react-native";
import { icons } from "../constants";
import axios from "../axiosConfig";
import HeaderPart from "../components/Layout/HeaderPart";
import SearchPart from "../components/Layout/SearchPart";
import debounce from "lodash.debounce";
import LoadingCity from "../components/LoadingCart/LoadingCity";

const Vantour = () => {
  const dispatch = useDispatch();
  const [stickyHeader, setStickyHeader] = useState(false);
  const { height: screenHeight } = Dimensions.get("window");

  const [city, setCity] = useState(null);
  const [city_name, setCityName] = useState(null);
  const [cityLoading, setCityLoading] = useState(true);

  const handleInputChange = (value) => {
    setCityName(value);
    getCityAction(value);
  }; // Debounce delay of 500ms

  const getCityAction = useCallback(
    debounce(async (search) => {
      setCityLoading(true);
      try {
        const res = await axios.get("/cities?limit=20", {
          params: { search: search },
        });
        setCity(res.data.data);
      } catch (error) {
        setCityLoading(false);
        setCity = null;
      } finally {
        setCityLoading(false);
      }
    }, 500),
    []
  );

  const loadingCitys = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const Loader = () => {
    return (
      <View className=" flex flex-col gap-y-2">
        <LoadingCity />
      </View>
    );
  };

  useEffect(() => {
    handleClosePreps();

    // getFunction();
  }, []);

  useEffect(() => {
    getCityAction(city_name);
  }, []);

  const bottomSheetRef = useRef(null);
  const bottomSheetRef2 = useRef(null);
  const snapPoints = useMemo(() => ["1%", "60%", "80%", "95%"], []);

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
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <View>
        <Stack.Screen
          options={{
            headerShown: false,
          }}
        />
      </View>
      {!stickyHeader && (
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
      )}
      <View style={{ flex: 1 }}>
        <ListVantour setStickyHeader={setStickyHeader} />
      </View>

      <BottomSheet
        index={0}
        ref={bottomSheetRef}
        onChange={handleSheetChanges}
        snapPoints={snapPoints}
        enablePanDownToClose={true}
        style={styles.bottomSheet}
      >
        <BottomSheetView
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "flex-start",
            zIndex: 3,
          }}
        >
          <View
            style={{
              width: "100%",
            }}
            className=" border-b border-gray-100"
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                paddingBottom: 16,
                paddingTop: 16,
                paddingHorizontal: 16,
                width: "100%",
              }}
            >
              <Text style={{ opacity: 0 }}>......</Text>
              <Text
                style={{ fontSize: 14, color: "#000000" }}
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
            <View
              className=" bg-gray-50 border border-gray-100 px-4  flex flex-row justify-between items-center rounded-full"
              style={{ marginHorizontal: 16, marginBottom: 10 }}
            >
              <Image
                source={icons.search}
                resizeMethod="contain"
                className=" w-5 h-5"
                tintColor="#FF601B"
              />
              <TextInput
                className="  text-sm font-pregular w-full pt-4 ml-4"
                placeholder="search"
                keyboardType="" // Show email-specific keyboard
                value={city_name}
                onChangeText={handleInputChange}
                autoCapitalize="none" // No automatic capitalization
                autoCorrect={false} // Disable autocorrect
              />
            </View>
          </View>
          {cityLoading ? (
            loadingCitys.map((item) => <LoadingCity key={item} />)
          ) : (
            <ScrollView className=" px-6 w-full">
              {city?.map((item, index) => (
                <TouchableOpacity
                  key={item.id}
                  onPress={() => {
                    console.log("====================================");
                    console.log("hello");
                    console.log("====================================");
                  }}
                >
                  <View
                    className={`rounded-full py-4 gap-x-2 w-full flex-1 flex-row justify-start items-center`}
                  >
                    <Image
                      source={icons.locationPin}
                      resizeMode="contain"
                      className="w-6 h-6 "
                      tintColor="#FF601B"
                    />
                    <View>
                      <Text
                        style={{ fontSize: 16 }}
                        className=" font-psemibold text-secondary"
                      >
                        {item.name}
                      </Text>
                      <Text
                        style={{ fontSize: 10 }}
                        className=" font-pregular text-secondary"
                      >
                        +50 tirps.
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
          )}
        </BottomSheetView>
      </BottomSheet>
      <BottomSheet
        index={0}
        ref={bottomSheetRef2}
        onChange={handleSheet2Changes}
        snapPoints={snapPoints}
        enablePanDownToClose={true}
        style={styles.bottomSheet}
      >
        <BottomSheetView
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "flex-start",
            padding: 16, // Ensure it appears above other components
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
              <TouchableOpacity onPress={() => handle2ClosePreps()}>
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

const styles = StyleSheet.create({
  bottomSheet: {
    zIndex: 100,
  },
});

export default Vantour;
