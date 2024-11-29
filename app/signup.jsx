import { Stack, useRouter } from "expo-router";
import React, { useState } from "react";
import { Button, TextInput } from "react-native";
import {
  Image,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Text, View } from "react-native";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import DateTimePicker, {
  DateTimePickerAndroid,
} from "@react-native-community/datetimepicker";

const HeaderLeftCustom = () => {
  const router = useRouter();
  return (
    <View style={{ marginLeft: 4 }}>
      <TouchableOpacity onPress={() => router.back()}>
        <ChevronLeftIcon size={18} color="#FF601B" />
      </TouchableOpacity>
    </View>
  );
};

const SignUp = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    first_name: "",
    last_name: "",
    phone_number: "",
    dob: "",
    password_confirmation: "",
  });

  const [showDatePicker, setShowDatePicker] = useState(false);

  const onChangeDate = (event, selectedDate) => {
    setShowDatePicker(false); // Hide picker after selection
    if (selectedDate) {
      const formattedDate = selectedDate.toISOString().split("T")[0];
      setFormData({ ...formData, dob: formattedDate });
    }
  };

  const handleLogin = () => {
    // Handle login logic here
    console.log("Email:", formData.email);
    console.log("Password:", formData.password);
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <View>
          <Stack.Screen
            options={{
              headerShown: true,
              headerTitle: "Sign up",
              headerLeft: () => <HeaderLeftCustom />,
              headerTitleAlign: "center",
              headerTitleStyle: {
                fontFamily: "Poppins-SemiBold",
                fontSize: 14,
                color: "#FF601B",
              },
            }}
          />
        </View>
        <View className=" py-5 px-6">
          <Text className=" font-pmedium text-lg pb-4">
            Welcome to ThanyWhere
          </Text>
          <View className=" flex flex-col justify-start items-center border border-gray-300 rounded-xl">
            <TextInput
              className=" border-b border-gray-300 rounded-xl px-4 text-sm font-pregular py-3 w-full"
              placeholder="First name"
              keyboardType="name" // Show email-specific keyboard
              value={formData.first_name}
              onChangeText={(first_name) =>
                setFormData({ ...formData, first_name: first_name })
              }
              autoCapitalize="none" // No automatic capitalization
              autoCorrect={false} // Disable autocorrect
            />
            <TextInput
              className="  rounded-xl px-4 text-sm font-pregular py-3 w-full"
              placeholder="Last Name"
              keyboardType="name" // Show email-specific keyboard
              value={formData.last_name}
              onChangeText={(last_name) =>
                setFormData({ ...formData, last_name: last_name })
              }
              autoCapitalize="none" // No automatic capitalization
              autoCorrect={false} // Disable autocorrect
            />
          </View>
          <Text className=" text-xs font-pregular py-4">
            make sure it matches the name on your goverment ID.
          </Text>
          <View>
            {/* <TextInput
              className="border border-gray-300 rounded-xl px-4 text-sm font-pregular py-3 w-full"
              placeholder="Select a date"
              value={formData.dob}
              onPressIn={() => setShowDatePicker(true)}
              editable={false} // Make TextInput non-editable
            /> */}
            <TouchableOpacity
              className="border border-gray-300 rounded-xl px-4 text-sm font-pregular py-3 w-full"
              onPress={() => setShowDatePicker(true)}
            >
              {formData.dob ? (
                <Text>{formData.dob}</Text>
              ) : (
                <Text>Select DOB</Text>
              )}
            </TouchableOpacity>
            {showDatePicker && (
              <DateTimePicker
                testID="dateTimePicker"
                value={formData.dob ? new Date(formData.dob) : new Date()}
                mode="date"
                className="bg-white border border-gray-300 rounded-xl px-4 text-sm font-pregular py-3 w-full"
                display="inline"
                onChange={onChangeDate}
              />
            )}
            {/* display={Platform.OS === "ios" ? "inline" : "default"} */}
            <Text className=" text-xs font-pregular py-4">
              to sign up, you need to be at least 18 . your birthday won't be
              shared with other people who use thanywhere.
            </Text>
            <TextInput
              className=" border border-gray-300 rounded-xl px-4 text-sm font-pregular py-3 w-full"
              placeholder="Enter your email"
              keyboardType="email-address" // Show email-specific keyboard
              value={formData.email}
              onChangeText={(email) =>
                setFormData({ ...formData, email: email })
              }
              autoCapitalize="none" // No automatic capitalization
              autoCorrect={false} // Disable autocorrect
            />
            <Text className=" text-xs font-pregular py-4">
              we'll email you trip confirmations and receipts.
            </Text>
          </View>
          <View className=" flex flex-col justify-start items-center border border-gray-300 rounded-xl">
            <TextInput
              className="  rounded-xl px-4 text-sm font-pregular py-3 w-full border-b border-gray-300"
              placeholder="Enter your password"
              secureTextEntry // Hides the input for passwords
              value={formData.password}
              onChangeText={(password) =>
                setFormData({ ...formData, password: password })
              }
            />
            <TextInput
              className="  rounded-xl px-4 text-sm font-pregular py-3 w-full"
              placeholder="Confirm your password"
              secureTextEntry // Hides the input for passwords
              value={formData.password_confirmation}
              onChangeText={(password_confirmation) =>
                setFormData({
                  ...formData,
                  password_confirmation: password_confirmation,
                })
              }
            />
          </View>
          <Text className=" text-xs font-pregular py-4">
            we'll send confirmation code to confirm your email. standard message
            and data rates apply.{" "}
          </Text>
          <View>
            <TouchableOpacity
              onPress={handleLogin}
              className="bg-[#FF601B]  rounded-xl px-4 py-3 flex justify-center items-center"
            >
              <Text className=" text-white font-psemibold ">Sign up</Text>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity
              className="bg-white border border-gray-300 rounded-xl px-4 py-3 mt-3 flex justify-center items-center"
              onPress={() => router.push("/login")}
            >
              <Text className=" text-gray-600 font-psemibold ">
                Go to login
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
