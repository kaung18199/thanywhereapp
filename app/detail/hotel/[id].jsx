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
  StarIcon,
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
import { WebView } from "react-native-webview";
import { Modal } from "react-native";

const HotelDetailPage = () => {
  const navigation = useNavigation();
  const { id } = useLocalSearchParams();
  const [loading, setLoading] = useState(false);
  const [detail, setDetail] = useState({});
  const [imagesCover, setImagesCover] = useState([]);
  const [otherPackage, setOtherPackage] = useState(null);
  const [showMore, setShowMore] = useState(false);
  const [youtubeLink, setYouTubeLink] = useState(null);

  const [modalVisible, setModalVisible] = useState(false); // Add state for modal visibility

  const handleOpenModal = () => setModalVisible(true); // Open modal
  const handleCloseModal = () => setModalVisible(false); // Close modal

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

  const percent = (a, b) => {
    if (a && b && a !== "null") {
      const calculatedPercent = (
        ((Number(a) - Number(b)) / Number(a)) *
        100
      ).toFixed(0); // Round to 0 decimal places
      return `${calculatedPercent}`;
    } else {
      return `0`;
    }
  };

  const getDetail = async () => {
    try {
      setLoading(true);
      setImagesCover([]);
      const data = await axios.get(`/hotels/${id}`);

      setDetail(data.data.data);

      setImagesCover(data.data.data.images);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const getOtherPackage = async (id) => {
    try {
      const res = await axios.get(
        `/hotels?order_by=top_selling_products&city_id=${id}`
      );
      setOtherPackage(res.data.data);
      console.log(res.data.data, "this is another");
    } catch (error) {
      console.log(error);
    }
  };

  const getYoutubeLink = () => {
    if (detail?.youtube_link != null) {
      return `https://www.youtube.com/embed/${
        detail?.youtube_link[0]?.en_link
          ? detail.youtube_link[0]?.en_link
          : detail.youtube_link[0]?.mm_link
      }`;
    } else {
      return "empty";
    }
  };

  useEffect(() => {
    getDetail(id);

    handleCloseModal();
  }, [id]);

  useEffect(() => {
    getOtherPackage(detail?.city?.id);
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
                  <View
                    className=" relative px-4"
                    style={{ width: contentWidth }}
                  >
                    <Text className=" font-psemibold text-lg text-secondary">
                      {detail?.name}
                    </Text>
                    {detail?.youtube_link &&
                      (detail?.youtube_link[0]?.mm_link ||
                        detail?.youtube_link[0]?.en_link) && (
                        <View className=" absolute right-4 top-2 ">
                          <TouchableOpacity
                            className="flex-row justify-end items-center gap-x-1"
                            onPress={() => {
                              handleOpenModal();
                              setYouTubeLink(getYoutubeLink());
                            }}
                          >
                            <Image
                              source={{
                                uri: "https://cdn-icons-png.flaticon.com/128/18546/18546874.png",
                              }}
                              style={{
                                width: 10,
                                height: 10,
                                tintColor: "#08d14b",
                              }}
                            />
                            <Text className=" text-xs text-green-600 font-psemibold">
                              see video
                            </Text>
                          </TouchableOpacity>
                        </View>
                      )}
                  </View>
                  <View className=" flex-row justify-between items-center space-x-2">
                    <View className=" flex-row flex justify-start items-center gap-x-1 pl-4">
                      {Array.from({ length: detail?.rating }, (_, index) => (
                        <StarIcon key={index} color={"#FF601B"} size={10} />
                      ))}
                    </View>
                    <View className=" flex-row items-center gap-x-2 pt-2 px-4">
                      <MapPinIcon color={"#FF601B"} size={15} />
                      <Text className=" text-secondary font-psemibold text-xs">
                        {detail?.city?.name}, {detail?.place}
                      </Text>
                    </View>
                  </View>
                  {detail?.location_map && (
                    <View className=" px-4 pt-4 gap-y-2">
                      <Text className=" font-psemibold text-lg text-black border-l-4 border-secondary pl-3">
                        Location
                      </Text>
                      <View className=" overflow-hidden h-[200px]">
                        <WebView
                          originWhitelist={["*"]}
                          source={{
                            html: `<iframe src="${detail?.location_map}" width="1000" height="500" style="border:0; border-radius: 50px" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>`,
                          }}
                        />
                      </View>
                      <Text className=" font-pregular text-xs">
                        {detail?.location_map_title}
                      </Text>
                    </View>
                  )}
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
                    className=" pt-2 px-4 pb-4"
                  >
                    {detail?.rooms?.map((room) => (
                      <TouchableOpacity
                        key={room.id}
                        activeOpacity={0.7}
                        className="w-[200px] border rounded-2xl border-black/10 mr-4 p-1"
                        onPress={() => console.log("hello")}
                      >
                        <View className="relative">
                          {room.images.length != 0 ? (
                            <CachedImage
                              uri={room.images[0].image}
                              style={{
                                width: 190,
                                height: 100,
                                borderRadius: 10,
                              }}
                            />
                          ) : (
                            <Image
                              source={{
                                uri: "https://cdn-icons-png.flaticon.com/128/14005/14005478.png",
                              }}
                              style={{
                                width: 190,
                                height: 100,
                                borderRadius: 10,
                              }}
                            />
                          )}
                          {(room?.owner_price ||
                            room?.owner_price != null ||
                            room?.owner_price !== room?.room_price) && (
                            <View
                              style={{
                                backgroundColor: "#ff1c1c",
                                width: "auto",
                                paddingHorizontal: 8,
                                borderRadius: 16,
                                position: "absolute",
                                bottom: -8,
                                right: 8,
                              }}
                            >
                              <Text
                                style={{
                                  paddingVertical: 2,
                                  textAlign: "center",
                                  color: "white",
                                  fontSize: 12,
                                }}
                              >
                                {percent(room?.owner_price, room?.room_price)}%
                                OFF
                              </Text>
                            </View>
                          )}
                        </View>
                        <Text
                          className=" text-sm text-black/80  font-psemibold pl-2 pt-4"
                          numberOfLines={1}
                        >
                          {room?.name}
                        </Text>
                        <View className=" flex-row justify-start gap-x-1 py-1 items-center">
                          <Text className=" text-2xl font-pbold text-black/80 pl-4 pt-1 ">
                            ฿ {room?.room_price}
                          </Text>
                          <Text className=" text-xs font-pregular text-black/80  pt-1 line-through ">
                            ฿ {room?.owner_price}
                          </Text>
                        </View>
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
                        Extra Bed
                      </Text>
                      <Text className=" text-secondary text-xs font-pmedium">
                        +400 ฿ per pax
                      </Text>
                    </View>
                    <View className=" mr-4 border border-gray-100/60 rounded-2xl p-4">
                      <Text className=" text-gray-600 text-xs font-pmedium">
                        Breakfast Includes
                      </Text>
                      <Text className=" text-gray-600 text-xs font-pmedium">
                        +-- ฿ per pax
                      </Text>
                    </View>
                  </ScrollView>
                  <View className=" px-6 pb-2">
                    <Text className=" text-base font-psemibold">
                      Popular Amenties
                    </Text>
                  </View>
                  {detail?.facilities &&
                    detail?.facilities.map(function (item) {
                      return (
                        <View className=" px-6 pb-2" key={item.id}>
                          <View className=" flex-row justify-start items-center gap-x-4">
                            <CachedImage
                              uri={item.image}
                              style={{ width: 16, height: 16 }}
                            />
                            <Text className=" font-pregular text-sm">
                              {item.name}
                            </Text>
                          </View>
                        </View>
                      );
                    })}
                </View>
                <View className=" border-b-8 border-black-100/10 pb-6">
                  <View className=" flex-row justify-between items-center px-4 pt-4">
                    <Text className=" font-psemibold text-lg text-black border-l-4 border-secondary pl-3">
                      About the Hotel
                    </Text>
                  </View>
                  <View
                    className={` px-6 ${
                      showMore ? "" : "h-32 overflow-hidden"
                    }`}
                  >
                    <RenderHTML
                      contentWidth={contentWidth}
                      source={{ html: detail?.full_description || "" }}
                    />
                  </View>
                  <TouchableOpacity
                    onPress={() => setShowMore(!showMore)}
                    className=" mt-2 px-6"
                  >
                    <Text className=" font-pregular text-xs text-secondary">
                      {showMore ? "Show Less" : "Show More"}
                    </Text>
                  </TouchableOpacity>

                  <View className=" px-4 pt-6 pb-2">
                    <Text className=" font-psemibold text-lg text-black border-l-4 border-secondary pl-3">
                      Nearby Places
                    </Text>
                    <View className=" pt-4">
                      {detail?.nearby_places &&
                        detail?.nearby_places.map((a, index) => (
                          <View
                            className=" pb-2 flex-row justify-between items-center"
                            key={index}
                          >
                            <View className=" flex-row justify-start items-center gap-x-4">
                              <Image
                                source={icons.locationPin}
                                style={{ width: 16, height: 16 }}
                              />
                              <Text className=" font-pregular text-sm">
                                {a.name}
                              </Text>
                            </View>
                            <Text className=" font-pregular text-xs">
                              {a.distance}
                            </Text>
                          </View>
                        ))}
                    </View>
                  </View>

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
                      What time can you checkin & checkout?
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
                      How to book this hotel?
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
                      {detail?.city != null && detail?.city.name}
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
                        onPress={() => router.push(`/detail/hotel/${a.id}`)}
                      >
                        <CachedImage
                          uri={a?.images?.[0]?.image}
                          style={{ width: 180, height: 100, borderRadius: 10 }}
                        />
                        <Text
                          className=" text-sm text-black/80 font-psemibold pl-4 pt-4 w-[180px]"
                          numberOfLines={1}
                        >
                          {a.name}
                        </Text>
                        <Text className=" pl-4 font-pmedium text-xs text-secondary">
                          {a?.city?.name}, {a?.place}
                        </Text>
                        <Text className=" pl-4 font-pmedium text-xs">
                          starting price
                        </Text>
                        <Text className=" pl-4 font-pmedium text-lg">
                          ฿ {a?.lowest_room_price}
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
                ฿ {detail?.lowest_room_price}
              </Text>
            </View>
            <View className=" flex-row px-2 pt-2 pb-4 justify-center items-center gap-x-4">
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
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible} // Use modal visibility state
            onRequestClose={handleCloseModal} // Handle back button
          >
            <ScrollView
              contentContainerStyle={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "rgba(0, 0, 0, 0.2)",
              }}
            >
              <View
                style={{
                  width: "100%",
                  backgroundColor: "white",
                  borderRadius: 10,
                  padding: 4,
                }}
              >
                <Text className="px-2 pb-2 pt-4 text-secondary font-psemibold">
                  {detail?.name} video
                </Text>

                <View
                  className="mt-2 "
                  style={{
                    maxHeight: 400,
                    minHeight: 300,
                    width: contentWidth,
                    overflow: "hidden",
                  }}
                >
                  {/* <Text>{youtubeLink}</Text> */}
                  <WebView
                    originWhitelist={["*"]}
                    source={{
                      html: `<iframe
                        style="border:0; border-radius: 50px; width: 98%; height: 100%;"
                        src="${youtubeLink}"
                        title="YouTube video player"
                        frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowfullscreen
                      ></iframe>`,
                    }}
                  />
                </View>
                <TouchableOpacity
                  onPress={handleCloseModal}
                  style={{ marginTop: 10, marginBottom: 10 }}
                >
                  <Text style={{ textAlign: "center", color: "#FF601B" }}>
                    Close
                  </Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </Modal>
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
                  What time can you checkin & checkout?
                </Text>
              )}
              {faq == 2 && (
                <Text
                  style={{ fontSize: 14, color: "#000000" }}
                  className=" font-psemibold"
                >
                  How to book this hotel?
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

export default HotelDetailPage;
