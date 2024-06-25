// import { View, Text } from "react-native";
import React, {
  useEffect,
  useState,
  useCallback,
  useMemo,
  useRef,
} from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack } from "expo-router";
import SearchHeader from "../components/SearchHeader";
import { getListCity } from "../redux/stores/citySlice";
import { useDispatch, useSelector } from "react-redux";
import ListHotel from "../components/ListHotel";
import { View, Text, StyleSheet, Button } from "react-native";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import ListAttraction from "../components/ListAttraction";
import TicketSearchBottom from "../components/TicketSearchBottom";
import Animated, { FadeInLeft, FadeInRight } from "react-native-reanimated";

const Attraction = () => {
  const dispatch = useDispatch();
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
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
    <SafeAreaView>
      <View>
        <Stack.Screen
          options={{
            // headerBackground: "#FFFFFF",
            header: () => (
              <SearchHeader
                title="ATTRACTIONS"
                handleClosePreps={handleClosePreps}
                handleIndexPreps={handleIndexPreps}
                isHeaderVisible={isHeaderVisible}
                setIsHeaderVisible={setIsHeaderVisible}
                searchHotel={searchHotel}
                setSearchHotel={setSearchHotel}
              />
            ),
          }}
        />
      </View>
      <View>
        <ListAttraction
          city_id={searchHotel.city_id}
          search={searchHotel.search}
          setIsHeaderVisible={setIsHeaderVisible}
          isHeaderVisible={isHeaderVisible}
        />
      </View>
      <BottomSheet
        index={0}
        ref={bottomSheetRef}
        onChange={handleSheetChanges}
        snapPoints={snapPoints}
        enablePanDownToClose={true}
      >
        <BottomSheetView style={styles.contentContainer}>
          <TicketSearchBottom
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "gray",
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
  },
});

export default Attraction;
