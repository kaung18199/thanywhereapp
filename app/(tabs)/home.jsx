import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React from "react";
import images from "../../constants/images";
import HomeCart from "../../components/HomeCart";
import { useRouter } from "expo-router";
import Animated, { FadeInDown } from "react-native-reanimated";
import { MaterialIcons } from "@expo/vector-icons";

const Home = () => {
  const router = useRouter();

  return (
    <SafeAreaView className=" ">
      <ScrollView className=" px-2">
        <View className=" bg-secondary-100/80 w-full h-[130px] shadow rounded-2xl z-20 mt-8">
          <Image
            source={images.welcomeImage}
            alt="home"
            width={200}
            height={200}
            resizeMode="cover"
            className=" w-[160px] h-[150px] z-10 object-bottom absolute bottom-0 right-0"
          />
          <View className=" absolute top-[30%] px-4 left-1 z-10 gap-y-3">
            <Text className=" font-pbold text-2xl text-white">
              Welcome From{" "}
            </Text>
            <Text className=" font-pbold text-lg text-white">
              Thailand Anywhere
            </Text>
          </View>
          <View className=" w-full h-[130px] overflow-hidden ">
            <View className=" absolute bottom-4 -left-10 w-[200px] h-[200px] bg-secondary-200/70 -z-10 rounded-full"></View>
          </View>
        </View>
        {/* <View className=" pt-6">
          <Text className=" text-base font-pbold text-secondary">
            OUR AVALIABLE PACKAGES
          </Text>
        </View> */}
        <View className="pt-6 flex flex-row w-full justify-start items-center gap-4">
          <MaterialIcons name="travel-explore" size={20} color="#FF4000" />
          <Text className="text-base tracking-wide font-pbold text-secondary">
            AVAILABLE PACKAGES
          </Text>
        </View>
        <Animated.View
          entering={FadeInDown.duration(1000).springify().delay(2000)}
          className=" flex-row flex-wrap justify-around gap-y-6 items-center w-full mt-5 mb-6 relative z-10"
        >
          <HomeCart
            image={images.hotel}
            text="HOTELS"
            count="40 + "
            icon="hotel"
            action={() => router.push("/hotel")}
          />
          <HomeCart
            image={images.ticket}
            text="ATTRACTIONS"
            count="40 + "
            icon="ticket-alt"
            action={() => router.push("/attraction")}
          />
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
