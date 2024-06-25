import { View, Text, StyleSheet } from "react-native";
import React, {
  forwardRef,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from "react";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import RoomDetailView from "./RoomDetailView";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";

const CustomBottomSheet = forwardRef(({ id, handleClosePreps }, ref) => {
  const snapPoints = useMemo(() => ["1%", "25%", "50%", "80%", "100%"], []);

  const handleSheetChanges = useCallback((index) => {
    console.log("handleSheetChanges", index);
  }, []);

  return (
    <BottomSheet
      index={0}
      ref={ref}
      onChange={handleSheetChanges}
      snapPoints={snapPoints}
      enablePanDownToClose={true}
      handleIndicatorStyle={{ backgroundColor: "orange" }}
      handleStyle={{ backgroundColor: "#FFFFFF", borderColor: "#FFFFFF" }}
    >
      <BottomSheetView style={styles.contentContainer} className=" relative">
        <View className=" absolute top-2 left-4 z-30">
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={handleClosePreps}
            className="bg-[#FFFFFF] p-2 overflow-hidden rounded-full  border border-[#ff5f1b33] "
          >
            <Ionicons
              name="close"
              size={18}
              color={"#FF601B"}
              className=" p-2"
            />
          </TouchableOpacity>
        </View>
        <RoomDetailView id={id} />
      </BottomSheetView>
    </BottomSheet>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    color: "#F7F7F7",
    backgroundColor: "#F7F7F7",
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
    color: "#F7F7F7",
    backgroundColor: "#F7F7F7",
    opacity: 10,
  },
});

export default CustomBottomSheet;
