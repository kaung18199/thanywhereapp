import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import CustomButton from "./CustomButton";
import { useDispatch } from "react-redux";
import { getListHotelSearch } from "../redux/stores/hotelSlice";
// import * as Animatable from "react-native-animatable";

const HotelSearchBottom = ({
  handleClosePreps,
  handleIndexPreps,
  searchHotel,
  setSearchHotel,
}) => {
  const [searchText, setSearchText] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [list, setList] = useState(null);
  const [showList, setShowList] = useState(false);
  const dispatch = useDispatch();

  const submit = () => {
    console.log(searchText, maxPrice);
    setSearchHotel({ ...searchHotel, max_price: maxPrice, search: searchText });
    handleClosePreps();
  };

  const cancel = () => {
    setSearchText("");
    setMaxPrice("");
    setSearchHotel({ ...searchHotel, max_price: "", search: "" });
    handleClosePreps();
  };

  useEffect(() => {
    const getSearchList = async () => {
      try {
        let data = {
          page: 1,
          limit: 10,
          city_id: searchHotel.city_id,
          search: searchText,
        };
        const res = await dispatch(getListHotelSearch(data));
        setList(res.data);
      } catch (error) {
        console.log("====================================");
        console.log(error);
        console.log("====================================");
      }
    };

    getSearchList();
  }, [searchText, searchHotel.city_id]);

  return (
    <ScrollView className=" w-full h-full">
      <View className=" px-4 w-[100%] h-full ">
        <Text className=" text-secondary font-pregular">
          Search Hotel {searchHotel.city_id ? "" : "from All"}
        </Text>
        <TextInput
          className="w-full h-18 border border-secondary px-4 py-2 mt-4 rounded-xl font-pregular"
          placeholder="Enter search text"
          value={searchText}
          onChangeText={setSearchText}
        />
        {list != null &&
          list.length > 0 &&
          list.map((item) => (
            <TouchableOpacity
              key={item.id}
              onPress={() => setSearchText(item.name)}
            >
              <View className=" border border-secondary-200 rounded-lg py-2 bg-secondary-200/10 mt-2 w-full px-4">
                <Text>{item.name}</Text>
              </View>
            </TouchableOpacity>
          ))}
        <TextInput
          className="w-full h-18 border border-secondary px-4 py-2 mt-4 rounded-xl font-pregular"
          placeholder="Enter max price thb"
          value={maxPrice}
          onChangeText={setMaxPrice}
          keyboardType="numeric"
        />
        <CustomButton
          title="search"
          handlePress={() => {
            submit();
          }}
          containerStyle="py-2.5 w-full mt-4"
          textStyles="text-base font-semibold"
        />
        <CustomButton
          title="clear"
          handlePress={() => {
            cancel();
          }}
          containerStyle="py-2.5 w-full mt-4"
          textStyles="text-base font-semibold"
        />
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});

export default HotelSearchBottom;
