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
        />
      </View>
      <Text
        className=" pt-2 w-[53px] text-wrap font-pregular text-center"
        style={{ fontSize: 9 }}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
};

export default AllProductCart;
