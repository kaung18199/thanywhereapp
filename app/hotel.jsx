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
  Animated,
  StyleSheet,
  Dimensions,
  TextInput,
} from "react-native";
import { Stack, useRouter } from "expo-router";
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
import CustomCalendar from "../components/Layout/CustomCalendar";
import Toast from "react-native-toast-message";
import toastConfig from "../helpers/toastConfig";
import ListHotel from "../components/Layout/ListHotel";

const Hotel = () => {
  const animatedOpacity = useRef(new Animated.Value(1)).current; // Initial opacity is 1
  const animatedHeight = useRef(new Animated.Value(360)).current; // Initial height is 300

  const dispatch = useDispatch();
  const router = useRouter();
  const [stickyHeader, setStickyHeader] = useState(false);
  const { height: screenHeight } = Dimensions.get("window");

  // select time
  const [selectedConfirmDate, setSelectedConfirmDate] = useState(null);

  // select time condition
  const [selectedTimeCondition, setSelectedTimeCondition] = useState(null);
  const [selectedConfirmOutDate, setSelectedConfirmOutDate] = useState(null);

  // search city
  const [city, setCity] = useState(null);
  const [city_name, setCityName] = useState(null);
  const [cityLoading, setCityLoading] = useState(true);
  const [chooseDestination, setChooseDestination] = useState("");
  const [chooseDestination_name, setChooseDestinationName] = useState("");

  // search destination
  const [destination, setDestination] = useState(null);
  const [destination_search, setDestinationSearch] = useState(null);
  const [destination_id, setDestinationId] = useState(null);
  const [destination_name, setDestinationName] = useState(null);
  const [destinationLoading, setDestinationLoading] = useState(true);

  const handleInputChange = (value) => {
    setCityName(value);
    getCityAction(value);
  }; // Debounce delay of 500ms

  // const handleInputDestinationChange = (value) => {
  //   setDestinationSearch(value);
  // getDestinationAction(value);
  // }; // Debounce delay of 500ms

  const getCityAction = useCallback(
    debounce(async (search) => {
      setCityLoading(true);
      try {
        const res = await axios.get("/hotel-cities?limit=20", {
          params: { search: search },
        });
        setCity(res.data.data);
        console.log("====================================");
        console.log(res.data.data, "this is data");
        console.log("====================================");
      } catch (error) {
        setCityLoading(false);
        setCity(null);
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

  const goExploreAction = () => {
    // Navigate to explore page
    if (chooseDestination != "") {
      router.push({
        pathname: "/result/hotel/[hotel]",
        params: {
          cityId: chooseDestination,
          cityName: chooseDestination_name,
          place: destination_name,
        },
      });
    } else {
      Toast.show({
        type: "error",
        text1: "Oww !",
        text2: "Please choose a destination",
        position: "top",
        visibilityTime: 3000,
      });
    }
  };

  useEffect(() => {
    handleClosePreps();
  }, []);

  useEffect(() => {
    Animated.timing(animatedOpacity, {
      toValue: stickyHeader ? 0 : 1,
      duration: 300, // Duration in ms
    }).start();

    Animated.timing(animatedHeight, {
      toValue: stickyHeader ? 0 : 360, // Adjust to your header height
      duration: 300, // Duration in ms
    }).start();
  }, [stickyHeader]);

  useEffect(() => {
    getCityAction(city_name);
  }, []);

  // useEffect(() => {
  //   getDestinationAction();
  // }, [chooseDestination]);

  const bottomSheetRef = useRef(null);
  const bottomSheetRef2 = useRef(null);
  const bottomSheetRef3 = useRef(null);
  const snapPoints = useMemo(() => ["1%", "95%"], []);

  const handleClosePreps = () => bottomSheetRef.current?.close();
  const handleOpenPreps = () => bottomSheetRef.current?.expand();
  const handleIndexPreps = () => bottomSheetRef.current?.snapToIndex(4);

  const handle2ClosePreps = () => bottomSheetRef2.current?.close();
  const handle2OpenPreps = () => bottomSheetRef2.current?.expand();
  const handle2IndexPreps = () => bottomSheetRef2.current?.snapToIndex(4);

  const handle3ClosePreps = () => bottomSheetRef3.current?.close();
  const handle3OpenPreps = () => bottomSheetRef3.current?.expand();
  const handle3IndexPreps = () => bottomSheetRef3.current?.snapToIndex(4);

  // callbacks
  const handleSheetChanges = useCallback((index) => {
    console.log("handleSheetChanges", index);
  }, []);
  const handleSheet2Changes = useCallback((index) => {
    console.log("handleSheetChanges", index);
  }, []);
  const handleSheet3Changes = useCallback((index) => {
    console.log("handleSheetChanges", index);
  }, []);

  // change array
  const changeArray = (value) => {
    return Object.entries(value).map(([key, value]) => ({
      id: Number(key),
      name: value,
    }));
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <View>
        <Stack.Screen
          options={{
            headerShown: false,
          }}
        />
      </View>

      <Animated.View
        style={{
          opacity: animatedOpacity,
          height: animatedHeight,
          overflow: "hidden",
        }}
      >
        <HeaderPart>
          <View style={{ paddingHorizontal: 16 }}>
            <Text
              style={{
                color: "#fff",
                fontSize: 16,
                fontFamily: "Poppins-Medium",
              }}
            >
              Hotel bookings
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
                text={
                  chooseDestination_name
                    ? chooseDestination_name
                    : "choose stay city"
                }
                handleIndexPreps={() => handleOpenPreps()}
                icon={icons.locationPin}
              />
              <View className=" flex-row justify-between gap-x-1 items-center">
                <SearchPart
                  text={
                    selectedConfirmDate ? selectedConfirmDate : "check in date"
                  }
                  handleIndexPreps={() => {
                    handle2OpenPreps();
                    setSelectedTimeCondition("checkIn");
                  }}
                  style="w-1/2"
                  icon={icons.timeCalendar}
                />
                <SearchPart
                  text={
                    selectedConfirmOutDate
                      ? selectedConfirmOutDate
                      : "check out date"
                  }
                  handleIndexPreps={() => {
                    handle2OpenPreps();
                    setSelectedTimeCondition("checkOut");
                  }}
                  style="w-1/2"
                  icon={icons.timeCalendar}
                />
              </View>
              <SearchPart
                text={
                  destination_name
                    ? destination_name
                    : "select location (optional) *"
                }
                handleIndexPreps={() => handle3OpenPreps()}
                icon={icons.roomDoor}
              />
              <View style={{ width: "100%" }}>
                <TouchableOpacity
                  onPress={() => goExploreAction()}
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
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </HeaderPart>
      </Animated.View>

      <View style={{ flex: 1 }}>
        <ListHotel setStickyHeader={setStickyHeader} />
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
                Select stay
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
                placeholder={chooseDestination_name ?? "search"}
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
                    setChooseDestination(item.id);
                    setChooseDestinationName(item.name);
                    setDestinationLoading(true);
                    setDestination(changeArray(item.places));
                    setDestinationLoading(false);
                    handleClosePreps();
                    console.log(
                      item.places,
                      "===================================="
                    );
                  }}
                >
                  <View
                    className={`rounded-full py-4 gap-x-2 w-full flex-1 flex-row justify-start items-center ${
                      chooseDestination == item.id
                        ? "border-b border-secondary"
                        : ""
                    }`}
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
                        +50 hotels.
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
                style={{ fontSize: 14, color: "#000000" }}
                className=" font-psemibold"
              >
                {selectedTimeCondition == "checkIn"
                  ? "Check In Date"
                  : " Check Out Date"}
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
          {selectedTimeCondition == "checkIn" ? (
            <>
              <CustomCalendar setSelectedConfirmDate={setSelectedConfirmDate} />
              <View className="absolute bottom-0 left-0 py-8 px-6 border-t border-gray-100 right-0 flex-1 flex-row justify-between items-center">
                <Text className=" font-pbold text-lg text-secondary">
                  {selectedConfirmDate
                    ? selectedConfirmDate
                    : "Please select a date"}
                </Text>

                <TouchableOpacity
                  onPress={() => {
                    if (selectedConfirmDate) {
                      handle2ClosePreps();
                    }
                  }}
                  className=" bg-secondary py-3 rounded-full w-28"
                >
                  <Text className=" font-psemibold text-sm text-white text-center">
                    Confirm
                  </Text>
                </TouchableOpacity>
              </View>
            </>
          ) : (
            <>
              <CustomCalendar
                setSelectedConfirmDate={setSelectedConfirmOutDate}
              />
              <View className="absolute bottom-0 left-0 py-8 px-6 border-t border-gray-100 right-0 flex-1 flex-row justify-between items-center">
                <Text className=" font-pbold text-lg text-secondary">
                  {setSelectedConfirmOutDate
                    ? setSelectedConfirmOutDate
                    : "Please select a date"}
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    if (setSelectedConfirmOutDate) {
                      handle2ClosePreps();
                    }
                  }}
                  className=" bg-secondary py-3 rounded-full w-28"
                >
                  <Text className=" font-psemibold text-sm text-white text-center">
                    Confirm
                  </Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </BottomSheetView>
      </BottomSheet>
      <BottomSheet
        index={0}
        ref={bottomSheetRef3}
        onChange={handleSheet3Changes}
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
                paddingBottom: 2,
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
                Select location ( options * )
              </Text>
              <TouchableOpacity onPress={() => handle3ClosePreps()}>
                <Image
                  source={icons.close}
                  style={{ width: 10, height: 10 }}
                  resizeMode="contain"
                  tintColor="#000000"
                />
              </TouchableOpacity>
            </View>
            <View className=" pb-4">
              <Text className=" text-xs text-center font-pregular text-secondary">
                need to choose city first .
              </Text>
            </View>
          </View>
          {destinationLoading ? (
            loadingCitys.map((item) => <LoadingCity key={item} />)
          ) : (
            <ScrollView className=" px-6 w-full">
              {destination?.map((item, index) => (
                <TouchableOpacity
                  key={item.id}
                  onPress={() => {
                    console.log("====================================");
                    setDestinationId(item.id);
                    console.log(destination_id, "this is id");
                    setDestinationName(item.name);
                    handle3ClosePreps();
                    console.log("====================================");
                  }}
                >
                  <View
                    className={`rounded-full py-4 gap-x-2 w-full flex-1 flex-row justify-start items-center ${
                      destination_id == item.id
                        ? "border-b border-secondary"
                        : ""
                    }`}
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
                        {chooseDestination_name}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
          )}
        </BottomSheetView>
      </BottomSheet>
      <Toast config={toastConfig} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  bottomSheet: {
    zIndex: 100,
  },
});

export default Hotel;
