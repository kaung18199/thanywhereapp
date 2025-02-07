import React, { useEffect, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { icons, images } from "../../constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LanguageSelectionModal from "../Language/LanguagePage";
import { useRouter } from "expo-router";

const HeaderPart = ({ children, style }) => {
  const [language, setLanguage] = useState();
  const [isShowModal, setIsShowModal] = useState(false);

  const router = useRouter();

  const getLanguage = async () => {
    let res = await AsyncStorage.getItem("language");

    setLanguage(res);
  };

  const handleLanguageSelect = async (language) => {
    // console.log(`Language selected: ${language}`);
    setIsShowModal(false);
  };

  useEffect(() => {
    getLanguage();
  }, [isShowModal]);

  return (
    <View className={`${style != "home" ? "bg-secondary" : "bg-white"}`}>
      <View style={styles.container}>
        {isShowModal && (
          <LanguageSelectionModal
            visible={isShowModal}
            onSelectLanguage={handleLanguageSelect}
          />
        )}
        <View style={styles.header}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
            }}
          >
            <TouchableOpacity
              onPress={() => router.back()}
              className="flex flex-row pr-4 pt-1 justify-start items-center gap-x-2"
            >
              <Image
                source={icons.logo}
                tintColor="#ffffff"
                resizeMode="cover"
                style={styles.logo}
              />

              <Text style={styles.title}>THANYWHERE</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.languageContainer}>
            {language === "english" ? (
              <TouchableOpacity
                style={styles.languageButton}
                onPress={() => setIsShowModal(true)}
              >
                <Image
                  source={images.englishImage}
                  style={styles.languageImage}
                />
                {/* <Text style={styles.languageText}>en</Text> */}
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={styles.languageButton}
                onPress={() => setIsShowModal(true)}
              >
                <Image
                  source={images.myanmarImage}
                  style={styles.languageImage}
                />
                {/* <Text style={styles.languageText}>mm</Text> */}
              </TouchableOpacity>
            )}
          </View>
        </View>
        <View style={styles.childrenContainer}>{children}</View>
      </View>
    </View>
  );
};

const styles = {
  container: {
    backgroundColor: "#FF6300", // bg-secondary-200
    paddingVertical: 12, // py-3
    paddingHorizontal: 16, // px-4
    borderBottomLeftRadius: 35,
    borderBottomRightRadius: 35,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 12, // pb-3
  },
  logo: {
    width: 25, // w-8
    height: 25, // h-8
  },
  title: {
    color: "#ffffff",
    fontSize: 16, // text-lg
    fontWeight: "600", // font-psemibold
  },
  languageContainer: {
    // borderColor: "#ffffff",
    // borderWidth: 1,
    // borderRadius: 50,
    // paddingHorizontal: 4, // px-1
    // paddingVertical: 4, // py-1
  },
  languageButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4, // gap-1
    paddingRight: 6, // pr-1.5
    paddingTop: 1,
  },
  languageImage: {
    width: 24, // w-6
    height: 24, // h-6
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#ffffff",
  },
  languageText: {
    fontSize: 14, // text-sm
    fontWeight: "600", // font-psemibold
    color: "#ffffff",
  },
  childrenContainer: {},
};

export default HeaderPart;
