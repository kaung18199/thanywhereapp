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
  TagIcon,
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
import { WebView } from "react-native-webview";
import { Modal } from "react-native";

const AttractionDetailPage = () => {
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

  const contentWidth = Dimensions.get("window").width;

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
      const data = await axios.get(`/entrance-tickets/${id}`);

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
        `/entrance-tickets?order_by=top_selling_products&show_only=1&city_id=${id}`
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
    getOtherPackage(detail?.cities && detail?.cities[0]?.id);
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
                    <View className=" flex-row items-center gap-x-2 pt-2 px-4">
                      <MapPinIcon color={"#FF601B"} size={15} />
                      {detail?.cities && (
                        <Text className=" text-secondary font-psemibold text-xs">
                          {detail?.cities[0]?.name}
                        </Text>
                      )}
                    </View>
                    <View className=" flex-row items-center gap-x-2 pt-2 px-4">
                      <TagIcon color={"#FF601B"} size={15} />
                      {detail?.categories &&
                        detail?.categories.map((category, index) => (
                          <Text
                            className={` text-secondary font-psemibold text-xs ${
                              index > 1 ? "hidden" : ""
                            }`}
                            key={category.id}
                          >
                            {category.name},
                          </Text>
                        ))}
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
                          style={{ flex: 1 }}
                          source={{
                            html: `
                              <!DOCTYPE html>
                              <html>
                                <head>
                                  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">
                                  <style>
                                    body {
                                      margin: 0;
                                      padding: 0;
                                      display: flex;
                                      justify-content: center;
                                      align-items: center;
                                    }
                                    iframe {
                                      width: 100%;
                                      height: 200px;
                                      border: 0;
                                      border-radius: 20px; /* Adjust border-radius */
                                    }
                                  </style>
                                </head>
                                <body>
                                  <iframe 
                                    src="${detail?.location_map}" 
                                    allowfullscreen="" 
                                    loading="lazy" 
                                    referrerpolicy="no-referrer-when-downgrade">
                                  </iframe>
                                </body>
                              </html>
                            `,
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
                    className="pl-4 pb-4 "
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
                    className=" pt-2 px-4 pb-4"
                  >
                    {detail?.variations?.map((room) => (
                      <TouchableOpacity
                        key={room.id}
                        activeOpacity={0.7}
                        className="w-[200px] border rounded-2xl border-black/10 mr-4 p-1"
                        onPress={() => console.log("hello")}
                      >
                        <View className="relative">
                          {(room?.owner_price ||
                            room?.owner_price != null ||
                            room?.owner_price !== room?.price) && (
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
                                {percent(room?.owner_price, room?.price)}% OFF
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
                        <View>
                          {room?.including_services &&
                            JSON.parse(room.including_services).map(
                              (service, index) => (
                                <View
                                  className=" flex-row px-4 justify-start gap-x-2 py-1 items-center"
                                  key={index}
                                >
                                  <Text className=" w-2 h-2 bg-secondary rounded-full">
                                    .
                                  </Text>
                                  <Text
                                    className=" text-xs font-pregular text-black/80"
                                    numberOfLines={1}
                                  >
                                    {service}
                                  </Text>
                                </View>
                              )
                            )}
                        </View>
                        <View className=" flex-row justify-start gap-x-1 py-1 items-center">
                          <Text className=" text-2xl font-pbold text-black/80 pl-4 pt-1 ">
                            ฿ {room?.price}
                          </Text>
                          <Text className=" text-xs font-pregular text-black/80  pt-1 line-through ">
                            ฿ {room?.owner_price}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                </View>
                <View className=" border-b-8 border-black-100/10 pb-6">
                  <View className=" flex-row justify-between items-center px-4 pt-4">
                    <Text className=" font-psemibold text-lg text-black border-l-4 border-secondary pl-3">
                      Package Summary
                    </Text>
                  </View>
                  <View className={` px-6 ${showMore ? "" : " "}`}>
                    {/* <RenderHTML
                      contentWidth={contentWidth}
                      source={{ html: detail?.description || "" }}
                    /> */}
                    <Text className=" text-sm font-pregular pt-4">
                      {detail?.description}
                    </Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => setShowMore(!showMore)}
                    className=" mt-2 px-6"
                  >
                    <Text className=" font-pregular text-xs text-secondary">
                      {showMore ? "Show Less" : "Show More"}
                    </Text>
                  </TouchableOpacity>
                </View>
                <View>
                  <View className=" flex-row justify-between items-center px-4 pt-4">
                    <Text className=" font-psemibold text-lg text-black border-l-4 border-secondary pl-3">
                      Other Packages in{" "}
                      {detail?.cities && detail?.cities[0].name}
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
                        onPress={() =>
                          router.push(`/detail/attraction/${a.id}`)
                        }
                      >
                        <CachedImage
                          uri={a?.cover_image}
                          style={{ width: 180, height: 100, borderRadius: 10 }}
                        />
                        <Text
                          className=" text-sm text-black/80 font-psemibold pl-4 pt-4 w-[180px]"
                          numberOfLines={1}
                        >
                          {a.name}
                        </Text>
                        <Text className=" pl-4 font-pmedium text-xs text-secondary">
                          {a?.cities[0]?.name}, {a?.categories[0]?.name}
                        </Text>
                        <Text className=" pl-4 font-pmedium text-xs">
                          starting price
                        </Text>
                        <Text className=" pl-4 font-pmedium text-lg">
                          ฿ {a?.lowest_variation_price}
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
                ฿ {detail?.lowest_variation_price}
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  bottomSheet: {
    zIndex: 100,
  },
});

export default AttractionDetailPage;
