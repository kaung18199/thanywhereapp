import React, { useEffect, useState } from "react";
import { Modal, View, TouchableOpacity } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

const SmoothModal = ({ visible, onClose, children }) => {
  const translateY = useSharedValue(300);

  useEffect(() => {
    if (visible) {
      translateY.value = withTiming(0, {
        duration: 500,
        easing: Easing.out(Easing.ease),
      });
    } else {
      translateY.value = withTiming(300, {
        duration: 500,
        easing: Easing.in(Easing.ease),
      });
    }
  }, [visible]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  return (
    <Modal 
      visible={visible} 
      transparent={true} 
      animationType="none"
      accessibilityViewIsModal={true}
      onRequestClose={onClose}
    >
      <TouchableOpacity
        style={{ flex: 1, backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        onPress={onClose}
        accessible={true}
        accessibilityRole="button"
        accessibilityLabel="Close modal"
        accessibilityHint="Tap to close the modal and return to previous screen"
      >
        <Animated.ScrollView
          contentContainerStyle={[
            {
              position: "absolute",
              bottom: 0,
              width: "100%",
              backgroundColor: "white",
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              padding: 20,
            },
            animatedStyle,
          ]}
        >
          {children}
        </Animated.ScrollView>
      </TouchableOpacity>
    </Modal>
  );
};

export default SmoothModal;
