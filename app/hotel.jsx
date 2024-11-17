// // import { View, Text } from "react-native";
// import React, {
//   useEffect,
//   useState,
//   useCallback,
//   useMemo,
//   useRef,
// } from "react";
// import { SafeAreaView } from "react-native-safe-area-context";
// import { Stack } from "expo-router";
// import SearchHeader from "../components/SearchHeader";
// import { getListCity } from "../redux/stores/citySlice";
// import { useDispatch, useSelector } from "react-redux";
// import ListHotel from "../components/ListHotel";
// import { View, Text, StyleSheet, Button } from "react-native";
// import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
// import HotelSearchBottom from "../components/HotelSearchBottom";

// const Hotel = () => {
//   const dispatch = useDispatch();
//   const [isHeaderVisible, setIsHeaderVisible] = useState(true);
//   const [searchHotel, setSearchHotel] = useState({
//     city_id: "",
//     search: "",
//     max_price: "",
//     place: "",
//   });

//   const getFunction = async () => {
//     try {
//       await dispatch(getListCity());
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     handleClosePreps();
//     getFunction();
//   }, []);

//   const bottomSheetRef = useRef(null);
//   const snapPoints = useMemo(() => ["1%", "25%", "50%", "75%", "100%"], []);

//   const handleClosePreps = () => bottomSheetRef.current?.close();
//   const handleOpenPreps = () => bottomSheetRef.current?.expand();
//   const handleIndexPreps = () => bottomSheetRef.current?.snapToIndex(4);

//   // callbacks
//   const handleSheetChanges = useCallback((index) => {
//     console.log("handleSheetChanges", index);
//   }, []);

//   return (
//     <SafeAreaView>
//       <View>
//         <Stack.Screen
//           options={{
//             // headerBackground: "#FFFFFF",
//             header: () => (
//               <SearchHeader
//                 title="HOTELS"
//                 handleClosePreps={handleClosePreps}
//                 handleIndexPreps={handleIndexPreps}
//                 isHeaderVisible={isHeaderVisible}
//                 setIsHeaderVisible={setIsHeaderVisible}
//                 searchHotel={searchHotel}
//                 setSearchHotel={setSearchHotel}
//               />
//             ),
//           }}
//         />
//       </View>
//       {/* <Button title="open" onPress={handleOpenPreps} />
//       <Button title="close" onPress={handleClosePreps} />
//       <Button title="index2" onPress={handleIndexPreps} /> */}
//       <View>
//         <ListHotel
//           city_id={searchHotel.city_id}
//           place={searchHotel.place}
//           max_price={searchHotel.max_price}
//           search={searchHotel.search}
//           setIsHeaderVisible={setIsHeaderVisible}
//           isHeaderVisible={isHeaderVisible}
//         />
//       </View>
//       <BottomSheet
//         index={0}
//         ref={bottomSheetRef}
//         onChange={handleSheetChanges}
//         snapPoints={snapPoints}
//         enablePanDownToClose={true}
//       >
//         <BottomSheetView style={styles.contentContainer}>
//           <HotelSearchBottom
//             handleClosePreps={handleClosePreps}
//             handleIndexPreps={handleIndexPreps}
//             searchHotel={searchHotel}
//             setSearchHotel={setSearchHotel}
//           />
//         </BottomSheetView>
//       </BottomSheet>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 24,
//     backgroundColor: "gray",
//   },
//   contentContainer: {
//     flex: 1,
//     alignItems: "center",
//   },
// });

// export default Hotel;

import { Stack } from "expo-router";
import React, { useRef } from "react";
import {
  Animated,
  View,
  Text,
  FlatList,
  StyleSheet,
  SafeAreaView,
} from "react-native";

export default function Hotel() {
  const scrollY = useRef(new Animated.Value(0)).current;

  // Scale the header and move it upwards to simulate top-aligned shrinking
  const headerScale = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [1, 0], // Fully scaled to zero scaling
    extrapolate: "clamp",
  });

  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [1, 0], // Fully visible to fully hidden
    extrapolate: "clamp",
  });

  const headerTranslateY = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [0, -75], // Half of initial header height to move up while shrinking
    extrapolate: "clamp",
  });

  const labelTranslateY = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [0, -80], // Adjust to match header height reduction
    extrapolate: "clamp",
  });

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text>{item}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      {/* Animated Header */}
      <Animated.View
        style={[
          styles.header,
          {
            transform: [
              { translateY: headerTranslateY },
              { scaleY: headerScale },
            ],
            opacity: headerOpacity,
          },
        ]}
      >
        <Text style={styles.headerText}>Filter Section</Text>
      </Animated.View>

      {/* Animated Label with translation */}
      <Animated.View
        style={[styles.label, { transform: [{ translateY: labelTranslateY }] }]}
      >
        <Text style={styles.labelText}>Label Section</Text>
      </Animated.View>

      {/* FlatList with Animated Scroll */}
      <Animated.FlatList
        style={{ paddingTop: 30 }}
        data={Array.from({ length: 30 }, (_, i) => `Item ${i + 1}`)}
        keyExtractor={(item) => item}
        renderItem={renderItem}
        contentContainerStyle={styles.contentContainer}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={20}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#6a1b9a",
    position: "absolute",
    width: "100%",
    height: 200, // Fixed height for header
    zIndex: 2,
  },
  headerText: {
    fontSize: 24,
    color: "#fff",
  },
  label: {
    position: "absolute",
    top: 100, // Starts below the header
    width: "100%",
    backgroundColor: "#4a148c",
    paddingVertical: 10,
    zIndex: 1,
  },
  labelText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 18,
  },
  contentContainer: {
    paddingTop: 150, // Account for header space
  },
  item: {
    padding: 20,
    borderBottomWidth: 1,
    borderColor: "#ddd",
  },
});
