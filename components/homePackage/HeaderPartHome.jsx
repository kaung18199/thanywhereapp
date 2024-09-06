import React, { useEffect, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { icons } from "../../constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { images } from "../../constants";
import LanguageSelectionModal from "../Language/LanguagePage";
import { useRouter } from "expo-router";

const HeaderPart = ({ children }) => {
  const [language, setLanguage] = useState();
  const [isShowModal, setIsShowModal] = useState(false);

  const router = useRouter();

  const getLanguage = async () => {
    let res = await AsyncStorage.getItem("language");
    console.log("====================================");
    console.log(res);
    console.log("====================================");
    setLanguage(res);
  };

  const handleLanguageSelect = async (language) => {
    // Save language preference (you can use AsyncStorage for this as well)
    console.log(`Language selected: ${language}`);
    // Mark user as not new
    setIsShowModal(false);
  };

  useEffect(() => {
    getLanguage();
  }, [AsyncStorage.getItem("language")]);
  return (
    <View className=" bg-secondary-200 py-3 px-4 rounded-b-[35%]">
      {isShowModal && (
        <LanguageSelectionModal
          visible={isShowModal}
          onSelectLanguage={handleLanguageSelect}
        />
      )}
      <View className=" flex flex-row justify-between items-center pb-3">
        <TouchableOpacity className="" onPress={() => router.push("/home")}>
          <Image
            source={icons.logo}
            tintColor="#ffffff"
            resizeMethod="cover"
            className="w-8 h-8"
          />
        </TouchableOpacity>
        <Text className=" text-white text-lg font-psemibold">
          THAILAND ANYWHERE
        </Text>
        <View className=" border border-white rounded-full px-1 py-1">
          {language == "english" ? (
            <TouchableOpacity
              className="flex-row justify-start items-center gap-1 pr-1.5"
              onPress={() => setIsShowModal(true)}
            >
              <Image
                source={images.englishImage}
                className="w-6 h-6 rounded-full border-2 border-white"
              />
              <Text className="text-sm font-psemibold text-white">en</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              className="flex-row justify-start items-center gap-1 pr-1.5"
              onPress={() => setIsShowModal(true)}
            >
              <Image
                source={images.myanmarImage}
                className="w-6 h-6 rounded-full border-2 border-white"
              />
              <Text className="text-sm font-psemibold text-white">mm</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
      <View className="">{children}</View>
    </View>
  );
};

export default HeaderPart;
