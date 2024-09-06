import React, { useEffect, useState } from "react";
import { View, Text, SafeAreaView, Image, FlatList } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { icons } from "../../constants";
import HeaderPart from "../../components/homePackage/HeaderPartHome";
import HomeAllProduct from "../../components/homePackage/HomeAllProduct";
import ReadAboutDestiantion from "../../components/homePackage/ReadAboutDestiantion";
import ThingsToDo from "../../components/homePackage/ThingsToDo";
import StayInBangkok from "../../components/homePackage/StayInBangkok";
import LanguageSelectionModal from "../../components/Language/LanguagePage";
import WhyBookWithUs from "../../components/homePackage/WhyBookWithUs";
import BestSellingVantour from "../../components/homePackage/BestSellingVantour";
import StayInPattaya from "../../components/homePackage/StayInPattaya";
import BestSellingAttraction from "../../components/homePackage/BestingSellingAttraction";
import TopDestinationToRead from "../../components/homePackage/TopDestinationToRead";

const Home = () => {
  const router = useRouter();
  const [isFirstTime, setIsFirstTime] = useState(null);

  useEffect(() => {
    const checkFirstTimeUser = async () => {
      const isNewUser = await AsyncStorage.getItem("isFirstTimeUser");
      setIsFirstTime(isNewUser === "true");
    };
    checkFirstTimeUser();
  }, []);

  const handleLanguageSelect = async (language) => {
    console.log(`Language selected: ${language}`);
    await AsyncStorage.setItem("isFirstTimeUser", "false");
    setIsFirstTime(false);
  };

  if (isFirstTime === null) return null;

  const renderItem = ({ item }) => {
    switch (item.key) {
      case "header":
        return (
          <HeaderPart>
            <View>
              <Text className="text-white text-base font-psemibold">
                Expore Thailand.
              </Text>
              <Text className="text-white text-sm font-pregular">
                bringing you over 140 partners and counting.
              </Text>
            </View>
            <View className=" bg-white px-4 py-4 flex flex-row mt-5 mb-1  justify-between items-center rounded-full">
              <Text className=" text-black/40 text-sm font-pregular">
                search for all products
              </Text>
              <Image
                source={icons.search}
                resizeMethod="contain"
                className=" w-5 h-5"
                tintColor="#FF601B"
              />
            </View>
          </HeaderPart>
        );
      case "homeAllProduct":
        return <HomeAllProduct />;
      case "thingsToDo":
        return <ThingsToDo />;
      case "whyBookWithUs":
        return <WhyBookWithUs />;
      case "stayInBangkok":
        return <StayInBangkok />;
      case "bestSellingVantour":
        return <BestSellingVantour />;
      case "bestSellingAttraction":
        return <BestSellingAttraction />;
      case "topDestinationToRead":
        return <TopDestinationToRead />;
      case "stayInPattaya":
        return <StayInPattaya />;
      case "readAboutDestination":
        return (
          <View className="pb-5">
            <ReadAboutDestiantion />
          </View>
        );
      default:
        return null;
    }
  };

  const sections = [
    { key: "header" },
    { key: "homeAllProduct" },
    { key: "thingsToDo" },
    { key: "whyBookWithUs" },
    { key: "stayInBangkok" },
    { key: "bestSellingVantour" },
    { key: "bestSellingAttraction" },
    { key: "topDestinationToRead" },
    { key: "stayInPattaya" },
    { key: "readAboutDestination" },
  ];

  return (
    <SafeAreaView className="flex-1">
      {isFirstTime && (
        <LanguageSelectionModal
          visible={isFirstTime}
          onSelectLanguage={handleLanguageSelect}
        />
      )}
      <FlatList
        data={sections}
        renderItem={renderItem}
        keyExtractor={(item) => item.key}
      />
    </SafeAreaView>
  );
};

export default Home;
