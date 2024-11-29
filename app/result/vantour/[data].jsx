import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";

const RoomDetail = () => {
  const { data, cityId, pickupDate } = useLocalSearchParams();
  const navigation = useNavigation();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {}, []);

  return (
    <View className=" ">
      <Text>
        {data}
        {cityId}
        {pickupDate}
      </Text>
      <TouchableOpacity
        onPress={() => {
          router.back();
        }}
      >
        <Text>hello</Text>
      </TouchableOpacity>
    </View>
  );
};

export default RoomDetail;
