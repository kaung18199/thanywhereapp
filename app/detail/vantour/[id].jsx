import { Ionicons } from "@expo/vector-icons";
import {
  router,
  useLocalSearchParams,
  useNavigation,
  useRouter,
} from "expo-router";
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  ChevronRightIcon,
  MapPinIcon,
  MinusIcon,
  PlusIcon,
} from "react-native-heroicons/solid";
import {
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import axios from "../../../axiosConfig";
import { icons } from "../../../constants";
import ImageCarousel from "../../../components/ImageCarousel";
import { CachedImage } from "../../../helpers/image";
import { images } from "../../../constants";
import RenderHTML from "react-native-render-html";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import Whattime from "../../../components/detailPackage/Whattime";
import Howbook from "../../../components/detailPackage/Howbook";
import HowPayment from "../../../components/detailPackage/HowPayment";

const VantourDetailPage = () => {
  const navigation = useNavigation();
  const { id } = useLocalSearchParams();
  const [loading, setLoading] = useState(false);
  const [detail, setDetail] = useState({});
  const [imagesCover, setImagesCover] = useState([]);
  const [otherPackage, setOtherPackage] = useState(null);

  const router = useRouter();

  const [faq, setFaq] = useState([1]);

  const contentWidth = Dimensions.get("window").width;

  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => ["1%", "95%"], []);

  const handleClosePreps = () => bottomSheetRef.current?.close();
  const handleOpenPreps = () => bottomSheetRef.current?.expand();
  const handleIndexPreps = () => bottomSheetRef.current?.snapToIndex(4);

  const handleSheetChanges = useCallback((index) => {
    console.log("handleSheetChanges", index);
  }, []);

  useEffect(() => {
    handleClosePreps();
  }, []);

  const shareListingg = async () => {
    try {
      await Share.share({
        title: listing.name,
        url: listing.listing_url,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getDetail = async () => {
    try {
      setLoading(true);
      setImagesCover([]);
      const data = await axios.get(`/private-van-tours/${id}`);

      setDetail(data.data.data);
      let get = data.data.data;
      const newImages = [];
      if (get?.cover_image) {
        newImages.push({ image: get?.cover_image });
      }

      if (get?.destinations.length > 0) {
        for (let i = 0; i < get?.destinations.length; i++) {
          newImages.push({ image: get?.destinations[i].feature_img });
        }
      }

      setImagesCover(newImages);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const getCarTypeImage = useCallback((cartype) => {
    switch (cartype.toLowerCase()) {
      case "saloon":
        return images.car1;
      case "suv":
        return images.car2;
      case "vip van":
        return images.car3;
      case "vvip van (luxury)":
        return images.car3;
      case "bus (30 seaters)":
        return images.car3;
      case "bus (20 seaters)":
        return images.car3;
      case "50 seaters bus":
        return images.car3;
      case "40 seaters bus":
        return images.car3;
      case "14 seater":
        return images.car3;
      default:
        return images.car1; // Default image
    }
  });

  const getOtherPackage = async (id) => {
    try {
      const res = await axios.get(
        `/private-van-tours?order_by=top_selling_products&type=van_tour&city_id=${id}`
      );
      setOtherPackage(res.data.data);
      console.log(res.data.data, "this is another");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDetail(id);
  }, [id]);

  useEffect(() => {
    if (detail?.cities != null) {
      getOtherPackage(detail?.cities[0]?.id);
    }
  }, [detail]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => {
        return (
          <View className=" flex-row justify-start ml-4 items-center space-x-2">
            <Text className="text-sm font-psemibold"></Text>
          </View>
        );
      },
      headerTransparent: true,

      headerRight: () => {
        return (
          <View className=" flex-row justify-center items-center gap-2">
            <TouchableOpacity
              activeOpacity={0.7}
              className="bg-white p-2 rounded-full "
            >
              <Ionicons name="heart-outline" size={18} color={"#FF601B"} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={shareListingg}
              activeOpacity={0.7}
              className="bg-white p-2 rounded-full "
            >
              <Ionicons name="share-outline" size={18} color={"#FF601B"} />
            </TouchableOpacity>
          </View>
        );
      },
      headerLeft: () => {
        return (
          <View className=" flex-row justify-center items-center space-x-2">
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => router.back()}
              className="bg-white p-2 rounded-full "
            >
              <Ionicons name="chevron-back" size={18} color={"#FF601B"} />
            </TouchableOpacity>
          </View>
        );
      },
    });
  }, []);

  return (
    <SafeAreaView>
      {loading ? (
        <View className=" w-full h-full flex justify-center bg-white items-center">
          <Image
            source={icons.logo}
            resizeMode="contain"
            className="w-20 h-20"
          />
        </View>
      ) : (
        <View className=" h-full relative">
          <ScrollView className=" bg-white h-full ">
            <View className=" pb-[120px]">
              {imagesCover.length > 0 ? (
                <ImageCarousel list={imagesCover} showButtom={false} />
              ) : (
                <View className=" h-40 flex justify-center items-center bg-secondary/50 relative">
                  <Image
                    source={icons.logo}
                    resizeMode="contain"
                    className="w-28 h-28"
                  />
                  <View className=" absolute -bottom-4 left-0 flex-row justify-center bg-white rounded-3xl w-full  items-center h-[30px]"></View>
                </View>
              )}
              <View className="  ">
                <View className=" border-b-8 border-black-100/10  pb-4">
                  <Text className=" font-psemibold text-lg text-secondary px-4">
                    {detail?.name}
                  </Text>
                  <View className=" flex-row items-center gap-x-2 pt-2 px-4">
                    <MapPinIcon color={"#FF601B"} size={15} />
                    <Text className=" text-secondary font-psemibold text-xs">
                      {detail?.destinations?.length} destinations
                    </Text>
                  </View>
                  <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    className=" pt-4 px-2"
                  >
                    {detail?.destinations?.map((destination) => (
                      <TouchableOpacity
                        key={destination.id}
                        activeOpacity={0.7}
                        className="w-[200px]"
                        onPress={() => console.log("hello")}
                      >
                        <CachedImage
                          uri={destination.feature_img}
                          style={{ width: 180, height: 100, borderRadius: 10 }}
                        />
                        <Text
                          className=" text-sm text-black/80 font-psemibold pl-4 pt-2 w-[180px]"
                          numberOfLines={1}
                        >
                          {destination.name}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                </View>
                <View className=" border-b-8 border-black-100/10 pb-6">
                  <View className=" flex-row justify-between items-center px-4 py-4">
                    <Text className=" font-psemibold text-lg text-black border-l-4 border-secondary pl-3">
                      Select Options
                    </Text>
                  </View>
                  <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    className="pl-4 "
                  >
                    <View className=" px-2 mr-2 py-1.5 rounded-lg border border-black/10">
                      <Text className=" font-pmedium text-sm text-black-100/80">
                        Choose date
                      </Text>
                    </View>
                    <View className=" px-2 mr-2 py-1.5 rounded-lg border border-black/10">
                      <Text className=" font-pmedium text-sm text-black-100/80">
                        Today
                      </Text>
                    </View>
                    <View className=" px-2 mr-2 py-1.5 rounded-lg border border-black/10">
                      <Text className=" font-pmedium text-sm text-black-100/80">
                        Tomorrow
                      </Text>
                    </View>
                    <View className=" px-2 mr-2 py-1.5 rounded-lg border border-black/10">
                      <Text className=" font-pmedium text-sm text-black-100/80">
                        -- / -- / 2025
                      </Text>
                    </View>
                  </ScrollView>
                  <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    className=" pt-4 px-4 pb-4"
                  >
                    {detail?.cars?.map((car) => (
                      <TouchableOpacity
                        key={car.id}
                        activeOpacity={0.7}
                        className="w-[200px] border rounded-2xl border-black/10 mr-4"
                        onPress={() => console.log("hello")}
                      >
                        <Image
                          source={getCarTypeImage(car.name)}
                          style={{ width: 150, height: 100 }}
                          className="mx-auto"
                          resizeMode="cover"
                        />
                        <Text
                          className=" text-sm text-black/80 text-center font-psemibold pl-4 pt-2"
                          numberOfLines={1}
                        >
                          {car?.name} ({car.max_person} pax)
                        </Text>
                        <Text
                          className=" text-2xl font-pbold text-black/80 text-center pl-4 pt-1 pb-4"
                          numberOfLines={1}
                        >
                          ฿ {car.price}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                  <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    className="px-4 pb-4"
                  >
                    <View className=" mr-4 border border-secondary rounded-2xl p-4">
                      <Text className=" text-secondary text-xs font-pmedium">
                        Private Tour (Without Tickets)
                      </Text>
                      <Text className=" text-secondary text-xs font-pmedium">
                        +0 ฿ per pax
                      </Text>
                    </View>
                    <View className=" mr-4 border border-gray-100/60 rounded-2xl p-4">
                      <Text className=" text-gray-600 text-xs font-pmedium">
                        Private Tour (With Tickets)
                      </Text>
                      <Text className=" text-gray-600 text-xs font-pmedium">
                        +-- ฿ per pax
                      </Text>
                    </View>
                  </ScrollView>
                  <View className=" px-6 gap-y-2">
                    <Text className=" text-base font-psemibold">
                      What's included
                    </Text>
                    <View className=" flex-row justify-start items-center gap-x-2">
                      <Image
                        source={{
                          uri: "https://thanywhere.com/assets/circle-B01dUox6.png",
                        }}
                        resizeMode="cover"
                        className="w-5 h-5"
                        height={10}
                      />
                      <Text className=" font-pregular text-sm">
                        Professional driver for 12 hours
                      </Text>
                    </View>
                    <View className=" flex-row justify-start items-center gap-x-2">
                      <Image
                        source={{
                          uri: "https://thanywhere.com/assets/circle-B01dUox6.png",
                        }}
                        resizeMode="cover"
                        className="w-5 h-5"
                        height={10}
                      />
                      <Text className=" font-pregular text-sm">Toll Fees</Text>
                    </View>
                    <View className=" flex-row justify-start items-center gap-x-2">
                      <Image
                        source={{
                          uri: "https://thanywhere.com/assets/circle-B01dUox6.png",
                        }}
                        resizeMode="cover"
                        className="w-5 h-5"
                        height={10}
                      />
                      <Text className=" font-pregular text-sm">Fuel Fees</Text>
                    </View>
                    <View className=" flex-row justify-start items-center gap-x-2">
                      <Image
                        source={{
                          uri: "https://thanywhere.com/assets/circle-B01dUox6.png",
                        }}
                        resizeMode="cover"
                        className="w-5 h-5"
                        height={10}
                      />
                      <Text className=" font-pregular text-sm">
                        Liability Insurance
                      </Text>
                    </View>
                    <View className=" flex-row justify-start items-center gap-x-2">
                      <Image
                        source={{
                          uri: "https://thanywhere.com/assets/circle-B01dUox6.png",
                        }}
                        resizeMode="cover"
                        className="w-5 h-5"
                        height={10}
                      />
                      <Text className=" font-pregular text-sm">
                        Private car for up to -- people
                      </Text>
                    </View>
                    <View className=" flex-row justify-start items-center gap-x-2">
                      <Image
                        source={{
                          uri: "https://thanywhere.com/assets/close-D2RalHKN.png",
                        }}
                        resizeMode="cover"
                        className="w-5 h-5"
                        height={10}
                      />
                      <Text className=" font-pregular text-sm">
                        Admission to Attractions
                      </Text>
                    </View>
                    <View className=" flex-row justify-start items-center gap-x-2">
                      <Image
                        source={{
                          uri: "https://thanywhere.com/assets/close-D2RalHKN.png",
                        }}
                        resizeMode="cover"
                        className="w-5 h-5"
                        height={10}
                      />
                      <Text className=" font-pregular text-sm">
                        Meals and Beverages
                      </Text>
                    </View>
                  </View>
                </View>
                <View className=" border-b-8 border-black-100/10 pb-6">
                  <View className=" flex-row justify-between items-center px-4 pt-4">
                    <Text className=" font-psemibold text-lg text-black border-l-4 border-secondary pl-3">
                      Package Summary
                    </Text>
                  </View>
                  <View className=" px-6">
                    <RenderHTML
                      contentWidth={contentWidth}
                      source={{ html: detail?.long_description || "" }}
                    />
                  </View>
                  {detail?.destinations?.length > 0 &&
                    detail?.destinations.map((destination, index) => {
                      return (
                        <View className=" px-6" key={destination.id}>
                          <Text
                            className={` font-psemibold text-base text-black ${
                              index == 0 ? "pb-2" : "py-2"
                            }`}
                          >
                            {destination?.name}
                          </Text>
                          <Text className=" font-pregular text-base text-black ">
                            {destination?.summary
                              ? destination.summary
                              : "coming soon"}
                          </Text>
                        </View>
                      );
                    })}
                  <View className=" flex-row justify-between items-center px-4 pt-6 pb-2">
                    <Text className=" font-psemibold text-lg text-black border-l-4 border-secondary pl-3">
                      FAQS
                    </Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => {
                      handleOpenPreps();
                      setFaq(1);
                    }}
                    className=" px-6 pt-2 pb-4 border-b border-gray-100/50 flex-row justify-between items-center"
                  >
                    <Text className=" font-pmedium text-sm text-black">
                      What time can you pick us up?
                    </Text>
                    <ChevronRightIcon size={20} color="black" />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      handleOpenPreps();
                      setFaq(2);
                    }}
                    className=" px-6 pt-4 pb-4 border-b border-gray-100/50 flex-row justify-between items-center"
                  >
                    <Text className=" font-pmedium text-sm text-black">
                      How to book this tour?
                    </Text>
                    <ChevronRightIcon size={20} color="black" />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      handleOpenPreps();
                      setFaq(3);
                    }}
                    className=" px-6 pt-4 pb-4 border-b border-gray-100/50 flex-row justify-between items-center"
                  >
                    <Text className=" font-pmedium text-sm text-black">
                      How do I make a payment?
                    </Text>
                    <ChevronRightIcon size={20} color="black" />
                  </TouchableOpacity>
                </View>
                <View>
                  <View className=" flex-row justify-between items-center px-4 pt-4">
                    <Text className=" font-psemibold text-lg text-black border-l-4 border-secondary pl-3">
                      Other Packages in{" "}
                      {detail?.cities != null && detail?.cities[0].name}
                    </Text>
                  </View>
                  <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    className=" pt-4 px-2"
                  >
                    {otherPackage?.map((a) => (
                      <TouchableOpacity
                        key={a.id}
                        activeOpacity={0.7}
                        className="w-[200px] gap-y-1"
                        onPress={() => router.push(`/detail/vantour/${a.id}`)}
                      >
                        <CachedImage
                          uri={a.cover_image}
                          style={{ width: 180, height: 100, borderRadius: 10 }}
                        />
                        <Text
                          className=" text-sm text-black/80 font-psemibold pl-4 pt-4 w-[180px]"
                          numberOfLines={1}
                        >
                          {a.name}
                        </Text>
                        <Text className=" pl-4 font-pmedium text-xs text-secondary">
                          {a?.destinations != null && a?.destinations.length}{" "}
                          destinations
                        </Text>
                        <Text className=" pl-4 font-pmedium text-xs">
                          starting car price
                        </Text>
                        <Text className=" pl-4 font-pmedium text-lg">
                          ฿ {a?.lowest_car_price}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                </View>
              </View>
            </View>
          </ScrollView>
          <View className=" bg-white absolute bottom-0 border-t border-gray-100/50 left-0 right-0">
            <View className=" flex-row justify-between items-center px-6 pt-4 pb-2">
              <View className=" flex-row justify-center items-center gap-x-2">
                <View className=" flex-row justify-center items-center gap-x-2 border border-gray-200 bg-gray-100/50 rounded-md p-1">
                  <MinusIcon size={20} color="gray" />
                </View>
                <Text className=" px-2 py-1 ">1</Text>

                <View className=" flex-row justify-center items-center gap-x-2 border border-gray-200 bg-gray-100/50 rounded-md p-1">
                  <PlusIcon size={20} color="gray" />
                </View>
              </View>
              <Text className=" font-pbold text-2xl text-secondary ">
                ฿ {detail?.lowest_car_price}
              </Text>
            </View>
            <View className=" flex-row px-2 pb-4 justify-center items-center gap-x-4">
              <TouchableOpacity
                activeOpacity={0.7}
                className=" bg-white border border-gray-100 w-[180px] py-3 rounded-3xl flex justify-center items-center px-4  "
              >
                <Text className=" font-psemibold text-sm text-gray-500">
                  Add to Cart
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.7}
                className=" bg-secondary border border-secondary w-[180px] py-3 rounded-3xl flex justify-center items-center px-4  "
              >
                <Text className=" font-psemibold text-sm text-white">
                  Book Now
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
      <BottomSheet
        index={0}
        ref={bottomSheetRef}
        onChange={handleSheetChanges}
        snapPoints={snapPoints}
        enablePanDownToClose={true}
        style={styles.bottomSheet}
      >
        <BottomSheetView
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "flex-start",
            zIndex: 3,
          }}
        >
          <View
            style={{
              width: "100%",
            }}
            className=" border-b border-gray-100"
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                paddingBottom: 16,
                paddingTop: 16,
                paddingHorizontal: 16,
                width: "100%",
              }}
            >
              <Text style={{ opacity: 0 }}>......</Text>
              {faq == 1 && (
                <Text
                  style={{ fontSize: 14, color: "#000000" }}
                  className=" font-psemibold"
                >
                  What time can you pick us up?
                </Text>
              )}
              {faq == 2 && (
                <Text
                  style={{ fontSize: 14, color: "#000000" }}
                  className=" font-psemibold"
                >
                  How to book this tour?
                </Text>
              )}
              {faq == 3 && (
                <Text
                  style={{ fontSize: 14, color: "#000000" }}
                  className=" font-psemibold"
                >
                  How do I make a payment?
                </Text>
              )}
              <TouchableOpacity onPress={() => handleClosePreps()}>
                <Image
                  source={icons.close}
                  style={{ width: 10, height: 10 }}
                  resizeMode="contain"
                  tintColor="#000000"
                />
              </TouchableOpacity>
            </View>
          </View>
          <View>
            {faq == 1 && (
              <ScrollView className="">
                <Whattime />
              </ScrollView>
            )}
            {faq == 2 && <Howbook />}
            {faq == 3 && <HowPayment />}
          </View>
        </BottomSheetView>
      </BottomSheet>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  bottomSheet: {
    zIndex: 100,
  },
});

export default VantourDetailPage;
