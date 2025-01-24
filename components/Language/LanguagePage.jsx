import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  useWindowDimensions,
  Modal,
} from "react-native";
import images from "../../constants/images";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LanguageSelectionModal = ({ visible, onSelectLanguage }) => {
  const [chooseLanguage, setChooseLanguage] = useState("english");
  const { height, width } = useWindowDimensions();

  const handleLanguageChange = (language) => {
    setChooseLanguage(language);
  };

  const getLanguage = async () => {
    let res = await AsyncStorage.getItem("language");
    console.log(res);
    if (!res) {
      setChooseLanguage("english");
    }
    setChooseLanguage(res);
  };

  useEffect(() => {
    getLanguage();
  }, []);

  const choose = async () => {
    await AsyncStorage.setItem("language", chooseLanguage);
    onSelectLanguage(chooseLanguage);
  };

  return (
    <Modal visible={visible} transparent={true} animationType="fade">
      <View className="flex-1 justify-center items-center bg-black/50">
        {/* Modal Container */}
        <View className="bg-white rounded-lg relative border-4 border-white overflow-hidden p-6 h-[80vh] w-11/12">
          {/* Background Image inside the modal */}
          <Image
            source={images.languageImage}
            resizeMode="cover"
            className="absolute w-[95vw] h-[80vh] rounded-lg"
            style={{ zIndex: 0 }}
          />

          {/* Content Container */}
          <View style={{ zIndex: 1 }}>
            <Text className="text-secondary text-2xl text-center font-pbold mb-4">
              Choose your language
            </Text>
            <View>
              <Text className="text-sm font-pmedium text-secondary text-center">
                Select your preferred language to use
              </Text>
              <Text className="text-sm font-pmedium text-secondary mb-4 text-center">
                TH Anywhere easily
              </Text>
            </View>
            <View className="gap-y-3">
              <TouchableOpacity
                className={`flex-row justify-between items-center px-2 py-3  border border-secondary rounded-lg ${
                  chooseLanguage === "english"
                    ? "bg-secondary/20"
                    : "bg-transparent"
                }`}
                onPress={() => handleLanguageChange("english")}
              >
                <View className="flex-row justify-start items-center gap-4">
                  <Image
                    source={images.englishImage}
                    className="w-8 h-8 rounded-full border-2 border-white"
                  />
                  <Text className="text-sm font-psemibold">English</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                className={`flex-row justify-between items-center px-2 py-3  border border-secondary rounded-lg ${
                  chooseLanguage === "myanmar"
                    ? "bg-secondary/20"
                    : "bg-transparent"
                }`}
                onPress={() => handleLanguageChange("myanmar")}
              >
                <View className="flex-row justify-start items-center gap-4 ">
                  <Image
                    source={images.myanmarImage}
                    className="w-8 h-8 rounded-full border-2 border-white"
                  />
                  <Text className="text-sm font-psemibold">Burmese</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                className={`flex-row justify-between w-full mx-auto items-center px-2 py-3 bg-secondary border border-secondary rounded-lg `}
                onPress={() => choose()}
              >
                <View className=" text-center w-full">
                  <Text className=" text-white text-center font-psemibold">
                    choose
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
            {/* <Button title="Choose" className="bg-secondary" onPress={choose} /> */}
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default LanguageSelectionModal;
