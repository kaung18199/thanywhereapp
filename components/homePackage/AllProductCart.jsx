import { View, Text, Image } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useRouter } from "expo-router";

// const StyledLinearGradient = styled(LinearGradient);

const AllProductCart = ({ icon, text, state, link }) => {
  const router = useRouter();
  return (
    <TouchableOpacity
      onPress={() => {
        if (state == true) {
          router.push(`${link}`);
        }
      }}
      accessible={true}
      accessibilityRole="button"
      accessibilityLabel={`${text} category`}
      accessibilityHint={state ? `Navigate to ${text} page` : "This feature is coming soon"}
      accessibilityState={{ disabled: !state }}
    >
      <View
        key={text}
        className={`${
          state ? "bg-secondary" : "bg-black-100/40"
        } mx-auto mr-4 w-14 h-14 rounded-full overflow-hidden p-4`}
      >
        <Image
          source={icon}
          resizeMethod="contain"
          className=" w-full h-full object-cover"
          tintColor={"#ffffff"}
          accessible={false}
        />
      </View>
      <Text
        className=" pt-2 w-[53px] text-wrap font-pregular text-center"
        style={{ fontSize: 11 }} // Increased font size for better readability
        accessible={false} // The parent TouchableOpacity already has the accessibility label
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
};

export default AllProductCart;
