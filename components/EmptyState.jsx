import { View, Text, Image } from "react-native";
import { images } from "../constants"; // Assuming you have images imported

const EmptyState = ({ title, subtitle }) => {
  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 16, // px-4
        height: "100%", // h-full
      }}
    >
      <Image
        source={images.search}
        resizeMode="contain"
        style={{
          width: 270, // w-[270px]
          height: 215, // h-[215px]
        }}
      />
      <Text
        style={{
          fontFamily: "Poppins-SemiBold", // font-psemibold
          fontSize: 18, // text-lg
          color: "#D1D5DB", // text-gray-100
          marginTop: 8, // Add margin for spacing
        }}
      >
        {title}
      </Text>
      <Text
        style={{
          fontFamily: "Poppins-Medium", // font-pmedium
          fontSize: 14, // text-sm
          color: "#D1D5DB", // text-gray-100
          marginTop: 4, // Add margin for spacing
        }}
      >
        {subtitle}
      </Text>
    </View>
  );
};

export default EmptyState;
