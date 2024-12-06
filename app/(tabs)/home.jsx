import React, { useEffect, useState } from "react";
import { View, Text, SafeAreaView, Image, FlatList } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { icons, images } from "../../constants";
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
  const [isLoading, setIsLoading] = useState(true);
  const [isFirstTime, setIsFirstTime] = useState(null);

  useEffect(() => {
    const checkFirstTimeUser = async () => {
      const isNewUser = await AsyncStorage.getItem("isFirstTimeUser");
      setIsFirstTime(isNewUser === "true");
    };
    checkFirstTimeUser();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
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
          <HeaderPart style="home">
            <View>
              <Text className="text-white text-base font-psemibold">
                Expore Thailand.
              </Text>
              <Text className="text-white text-sm font-pregular">
                Bringing you over 140 partners and counting.
              </Text>
            </View>
            <View className=" bg-white px-4 py-4 flex flex-row mt-5 mb-1  justify-between items-center rounded-full">
              <Text className=" text-secondary text-sm font-pregular pl-2">
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
          <View className="">
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
    // <SafeAreaView className="flex-1">
    //   {!isLoading ? {isFirstTime && (
    //     <LanguageSelectionModal
    //       visible={isFirstTime}
    //       onSelectLanguage={handleLanguageSelect}
    //     />
    //   )}
    //   <FlatList
    //     data={sections}
    //     renderItem={renderItem}
    //     keyExtractor={(item) => item.key}
    //   /> : <View className="flex-1 justify-center items-center"></View>}
    // </SafeAreaView>
    <SafeAreaView className="flex-1">
      {!isLoading ? (
        <>
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
        </>
      ) : (
        <View className="flex-1 justify-center items-center bg-white">
          <Image
            source={icons.logo}
            resizeMode="cover"
            className="absolute w-[100px] h-[100px] rounded-lg"
            style={{ zIndex: 0 }}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

export default Home;
