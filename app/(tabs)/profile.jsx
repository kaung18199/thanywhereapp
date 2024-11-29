import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useCallback } from "react";
import { icons } from "../../constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";
import { useFocusEffect, useRouter } from "expo-router";
import { CachedImage } from "../../helpers/image";
import Toast from "react-native-toast-message";
import toastConfig from "../../helpers/toastConfig";
import {
  ArrowDownLeftIcon,
  ArrowLeftStartOnRectangleIcon,
  BookOpenIcon,
  ChatBubbleLeftRightIcon,
  CursorArrowRippleIcon,
  DocumentDuplicateIcon,
  PencilSquareIcon,
  PhoneIcon,
  ShieldCheckIcon,
  TicketIcon,
} from "react-native-heroicons/outline";
import { useState } from "react";

const items = [
  {
    id: 1,
    name: "Update personal information",
    icon: () => {
      return <PencilSquareIcon size={18} color="#000000" />;
    },
    action: () => {},
  },
  {
    id: 2,
    name: "Bookings",
    icon: () => {
      return <BookOpenIcon size={18} color="#000000" />;
    },
    action: () => {},
  },
  {
    id: 3,
    name: "Reviews",
    icon: () => {
      return <ChatBubbleLeftRightIcon size={18} color="#000000" />;
    },
    action: () => {},
  },

  {
    id: 4,
    name: "Trips",
    icon: () => {
      return <TicketIcon size={18} color="#000000" />;
    },
    action: () => {},
  },
  {
    id: 5,
    name: "Logout",
    icon: () => {
      return <ArrowLeftStartOnRectangleIcon size={18} color="#000000" />;
    },
    action: async (logoutAction) => {
      try {
        await AsyncStorage.removeItem("token");
        await AsyncStorage.removeItem("user");
        // Optionally, you can log success
        console.log("User logged out successfully.");
        Toast.show({
          type: "success",
          text1: "Logout success",
          text2: "See you again 👋",
          position: "top",
          visibilityTime: 3000,
        });
        setTimeout(() => {
          logoutAction();
        }, 5000);
      } catch (error) {
        console.error("Logout error:", error);
      }
    },
  },
];
const itemSec = [
  {
    id: 1,
    name: "Security & Privacy",
    icon: () => {
      return <ShieldCheckIcon size={18} color="#000000" />;
    },
    action: () => {},
  },
  {
    id: 2,
    name: "Terms & Conditions",
    icon: () => {
      return <DocumentDuplicateIcon size={18} color="#000000" />;
    },
    action: () => {},
  },
  {
    id: 5,
    name: "Help Center",
    icon: () => {
      return <PhoneIcon size={18} color="#000000" />;
    },
    action: () => {},
  },
];

const ItemBox = ({ item }) => {
  const router = useRouter();
  const logoutAction = () => {
    router.push("/login");
  };

  return (
    <View
      className={`relative  py-2 ${
        item.id == 5 ? "" : "border-b border-gray-100"
      }`}
    >
      <TouchableOpacity
        className="flex flex-row items-center"
        onPress={() => item.action(logoutAction)}
      >
        {item.icon()}
        <Text className=" font-pmedium text-sm ml-2">{item.name}</Text>
      </TouchableOpacity>
      <View className=" font-pmedium text-lg absolute right-0">
        <Image
          source={icons.nexticon}
          resizeMode="cover"
          width={10}
          className="w-6 h-6"
          height={10}
        />
      </View>
    </View>
  );
};

const Profile = () => {
  const router = useRouter();
  const [isToken, setIsToken] = useState(false);
  const [userData, setUserData] = useState(null);

  const checkToken = async () => {
    const token = await AsyncStorage.getItem("token");
    const user = await AsyncStorage.getItem("user");

    if (token) {
      setIsToken(true);
    }

    if (user) {
      const parseUser = JSON.parse(user);
      setUserData(parseUser);
    }

    console.log("====================================");
    console.log(user, token);
    console.log("====================================");

    if (!token) {
      setIsToken(false);
    }
  };

  // useEffect(() => {
  //   checkToken();
  // }, []);
  useFocusEffect(
    useCallback(() => {
      checkToken();
    }, [])
  );

  return (
    <SafeAreaView className=" w-full h-full ">
      {isToken ? (
        <ScrollView>
          {/* <View className=" py-4 bg-white flex justify-center items-center">
          <Text className=" font-psemibold text-[#FF601B]">Profile</Text>
        </View> */}
          <View className="gap-4 pt-6">
            <View className=" w-full flex justify-center items-center shadow-sm">
              <CachedImage
                uri={"https://cdn-icons-png.flaticon.com/128/6084/6084290.png"}
                style={{ width: 120, height: 120 }}
              />
            </View>
            <View className="gap-y-2 pb-10">
              <View className="flex justify-center items-center w-full">
                <Text className=" font-psemibold text-lg text-[#FF601B]">
                  {userData?.name}
                </Text>
              </View>
              <View
                className=" px-4 rounded-xl py-3 relative bg-white shadow-sm"
                style={{ marginHorizontal: 20 }}
              >
                <View>
                  <Text className=" font-pmedium pr-12 " numberOfLines={1}>
                    {userData?.unique_key}
                  </Text>
                </View>
                <View className=" absolute top-2 right-2 bg-[#FF601B] px-2 py-1 rounded-lg">
                  <TouchableOpacity
                    onPress={() => {
                      console.log("hello world!");
                    }}
                  >
                    <Text className=" font-psemibold text-white">Copy</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View
                className=" px-4 rounded-xl mt-2 py-2 relative bg-white shadow-sm gap-y-2"
                style={{ marginHorizontal: 20 }}
              >
                {items.map((item) => (
                  <ItemBox key={item.id} item={item} />
                ))}
              </View>
              <View
                className=" px-4 rounded-xl mt-2 py-2 relative bg-white shadow-sm gap-y-2"
                style={{ marginHorizontal: 20 }}
              >
                {itemSec.map((item) => (
                  <ItemBox key={item.id} item={item} />
                ))}
              </View>
            </View>
          </View>
          <Toast config={toastConfig} />
        </ScrollView>
      ) : (
        <View className=" w-full h-full flex justify-center items-center gap-y-4">
          <CachedImage
            uri={"https://cdn-icons-png.flaticon.com/128/17745/17745512.png"}
            style={{ width: 120, height: 120 }}
          />
          <Text className=" font-pmedium text-sm text-gray-600">
            You are not logged in , please
          </Text>
          <TouchableOpacity
            className=" flex flex-row justify-center items-center gap-x-2"
            onPress={() => {
              router.push("/login"); // push to login page
            }}
          >
            <Text className=" font-psemibold text-secondary text-lg">
              Login
            </Text>
            <CursorArrowRippleIcon size={20} color="#FF601B" />
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

export default Profile;
