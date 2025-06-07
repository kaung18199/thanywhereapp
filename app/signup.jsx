import { Stack, useRouter } from "expo-router";
import { Platform } from "react-native";
import React, { useState } from "react";
import { Button, TextInput } from "react-native";
import axios from "../axiosConfig";
import Toast from "react-native-toast-message";
import toastConfig from "../helpers/toastConfig";
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
import AsyncStorage from "@react-native-async-storage/async-storage";

const HeaderLeftCustom = () => {
  const router = useRouter();
  return (
    <View>
      <TouchableOpacity
        onPress={() => router.back()}
        style={{
          height: 48, // Ensures the touch area is 48dp
          width: 48, // Ensures the touch area is 48dp
          justifyContent: "center",
          alignItems: "center",
        }}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }} // Optional, to further increase tappable area
        accessible={true}
        accessibilityLabel="Back to previous screen"
        accessibilityRole="button"
        accessibilityHint="Return to the previous page"
      >
        <ChevronLeftIcon size={24} color="#FF601B" />
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
    if (Platform.OS === 'android') {
      setShowDatePicker(false); // Hide picker after selection on Android
    }
    if (selectedDate) {
      const formattedDate = selectedDate.toISOString().split("T")[0];
      setFormData({ ...formData, dob: formattedDate });
    }
  };

  // Function to show the date picker with platform-specific handling
  const showDatePickerHandler = () => {
    if (Platform.OS === 'android') {
      // For Android, use the DateTimePickerAndroid API which provides native accessibility support
      DateTimePickerAndroid.open({
        value: formData.dob ? new Date(formData.dob) : new Date(),
        onChange: onChangeDate,
        mode: 'date',
        is24Hour: true,
        // Android-specific accessibility properties
        accessibilityLabel: "Date of birth selection",
        accessibilityHint: "Select your date of birth from the native calendar picker",
      });
    } else {
      // For iOS, use the modal approach
      setShowDatePicker(true);
    }
  };

  // const handleLogin = () => {
  //   // Handle login logic here
  //   const frmData = {
  //     email: formData.email,
  //     password: formData.password,
  //     first_name: formData.first_name,
  //     last_name: formData.last_name,
  //     phone_number: formData.phone_number,
  //     dob: formData.dob,
  //     password_confirmation: formData.password_confirmation,
  //   };

  //   // console.log(frmData, "this is a signed in user");
  // };

  const handleLogin = async () => {
    try {
      // Handle login logic here
      const frmData = {
        email: formData.email,
        password: formData.password,
        first_name: formData.first_name,
        last_name: formData.last_name,
        phone_number: formData.phone_number,
        dob: formData.dob,
        password_confirmation: formData.password_confirmation,
      };
      const res = await axios.post(
        "https://api-blog.thanywhere.com/api/v2/register",
        frmData, // data goes here as the second parameter
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );

      console.log(res.data, "this is response");

      if (res.data.message == "User registered successfully") {
        setFormData({
          email: "",
          password: "",
          first_name: "",
          last_name: "",
          phone_number: "",
          dob: "",
          password_confirmation: "",
        });
        // await AsyncStorage.setItem("token", res.data.data.token);
        // await AsyncStorage.setItem("user", JSON.stringify(res.data.data.user));
        Toast.show({
          type: "success",
          text1: "Resgistration success",
          text2: "Welcome to ThanyWhere 👋",
          position: "top",
          visibilityTime: 3000,
        });
        setTimeout(() => {
          router.push("/login");
        }, 5000);
      } else {
        setFormData({
          email: "",
          password: "",
          first_name: "",
          last_name: "",
          phone_number: "",
          dob: "",
          password_confirmation: "",
        });
        Toast.show({
          type: "error",
          text1: "Oww !",
          text2: "Please check your email and password",
          position: "top",
          visibilityTime: 3000,
        });
        // await AsyncStorage.removeItem("token");
        // await AsyncStorage.removeItem("user");
      }
    } catch (error) {
      // await AsyncStorage.removeItem("token");
      // await AsyncStorage.removeItem("user");
      if (error.response) {
        console.log("Server responded with an error:", error.response.data);
        Toast.show({
          type: "error",
          text1: "Oww !",
          text2: error.response.data.message,
          position: "top",
          visibilityTime: 3000,
        });
      } else if (error.request) {
        console.log("Request made but no response received:", error.request);
      } else {
        console.log("Error in setting up the request:", error.message);
      }
    }
  };

  return (
    <SafeAreaView>
      <ScrollView className="">
        <View>
          <Stack.Screen
            options={{
              headerShown: true,
              headerTitle: "Sign up",
              headerAccessibilityLabel: "Registration page",
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
          <Text 
            className=" font-pmedium text-lg pb-4"
            accessible={true}
            accessibilityRole="header"
            accessibilityLabel="Welcome to ThanyWhere">
            Welcome to ThanyWhere
          </Text>
          <View className=" flex flex-col justify-start items-center border border-gray-300 rounded-xl">
            <TextInput
              className=" border-b border-gray-300 rounded-xl px-6 text-base font-pregular py-6 w-full"
              placeholder="First name"
              keyboardType="name"
              value={formData.first_name}
              onChangeText={(first_name) =>
                setFormData({ ...formData, first_name: first_name })
              }
              autoCapitalize="none"
              autoCorrect={false}
              accessible={true}
              accessibilityLabel="First name input"
              accessibilityHint="Enter your first name as it appears on your ID"
              style={{ minHeight: 48 }} // Ensure minimum touch target height
            />
            <TextInput
              className="rounded-xl px-6 text-base font-pregular py-6 w-full"
              placeholder="Last Name"
              keyboardType="name"
              value={formData.last_name}
              onChangeText={(last_name) =>
                setFormData({ ...formData, last_name: last_name })
              }
              autoCapitalize="none"
              autoCorrect={false}
              accessible={true}
              accessibilityLabel="Last name input"
              accessibilityHint="Enter your last name as it appears on your ID"
              style={{ minHeight: 48 }} // Ensure minimum touch target height
            />
          </View>
          <Text 
            className=" text-xs font-pregular py-4"
            accessible={true}
            accessibilityRole="text"
            accessibilityLabel="ID name matching instruction">
            make sure it matches the name on your goverment ID.
          </Text>
          <View>
            <TouchableOpacity
              className="border border-gray-300 rounded-xl px-6 text-base font-pregular py-6 w-full"
              onPress={showDatePickerHandler}
              style={{
                minHeight: 48, // Ensure minimum touch target height
                justifyContent: 'center',
              }}
              accessible={true}
              accessibilityRole="button"
              accessibilityLabel="Select date of birth"
              accessibilityHint={Platform.OS === 'android' ? "Tap to open native Android calendar picker" : "Tap to open calendar for date selection"}
            >
              {formData.dob ? (
                <Text 
                  className=" text-sm font-pregular"
                  accessible={true}
                  accessibilityLabel={`Selected date of birth: ${formData.dob}`}
                >
                  {formData.dob}
                </Text>
              ) : (
                <Text 
                  className=" text-sm font-pregular"
                  accessible={true}
                  accessibilityLabel="No date selected"
                >
                  Select date of birth
                </Text>
              )}
            </TouchableOpacity>
            {showDatePicker && Platform.OS === 'ios' && (
              <View style={{ 
                minHeight: 48, // Ensure minimum touch target height
                minWidth: 48, // Ensure minimum touch target width
              }}>
                <DateTimePicker
                  testID="dateTimePicker"
                  value={formData.dob ? new Date(formData.dob) : new Date()}
                  mode="date"
                  display="default"
                  onChange={onChangeDate}
                  accessible={true}
                  accessibilityLabel="Date of birth calendar"
                  accessibilityHint="Select your date of birth from the calendar"
                  style={{
                    height: 48, // Ensure minimum touch target height
                    width: '100%',
                  }}
                />
              </View>
            )}
            {/* display={Platform.OS === "ios" ? "inline" : "default"} */}
            <Text 
              className=" text-xs font-pregular py-4"
              accessible={true}
              accessibilityRole="text"
              accessibilityLabel="Age requirement information">
              to sign up, you need to be at least 18 . your birthday won't be
              shared with other people who use thanywhere.
            </Text>
            <TextInput
              className="border border-gray-300 rounded-xl px-6 text-base font-pregular py-6 w-full"
              placeholder="Enter your email"
              keyboardType="email-address"
              value={formData.email}
              onChangeText={(email) =>
                setFormData({ ...formData, email: email })
              }
              autoCapitalize="none"
              autoCorrect={false}
              accessible={true}
              accessibilityLabel="Email input"
              accessibilityHint="Enter your email address for account verification"
              style={{ minHeight: 48 }} // Ensure minimum touch target height
            />
            <Text 
              className=" text-xs font-pregular py-4"
              accessible={true}
              accessibilityRole="text"
              accessibilityLabel="Email usage information">
              we'll email you trip confirmations and receipts.
            </Text>
            <TextInput
              className="border border-gray-300 rounded-xl px-6 text-base font-pregular py-6 w-full"
              placeholder="Enter your phone number"
              keyboardType="phone"
              value={formData.phone_number}
              onChangeText={(phone_number) =>
                setFormData({ ...formData, phone_number: phone_number })
              }
              autoCapitalize="none"
              autoCorrect={false}
              accessible={true}
              accessibilityLabel="Phone number input"
              accessibilityHint="Enter your phone number for account verification"
              style={{ minHeight: 48 }} // Ensure minimum touch target height
            />
            <Text 
              className=" text-xs font-pregular py-4"
              accessible={true}
              accessibilityRole="text"
              accessibilityLabel="Phone number usage information">
              we'll phone number will remind you trip confirmations and
              receipts.
            </Text>
          </View>
          <View className=" flex flex-col justify-start items-center border border-gray-300 rounded-xl">
            <TextInput
              className="rounded-xl px-6 text-base font-pregular py-6 w-full border-b border-gray-300"
              placeholder="Enter your password"
              secureTextEntry
              value={formData.password}
              onChangeText={(password) =>
                setFormData({ ...formData, password: password })
              }
              accessible={true}
              accessibilityLabel="Password input"
              accessibilityHint="Create a secure password for your account"
              style={{ minHeight: 48 }} // Ensure minimum touch target height
            />
            <TextInput
              className="rounded-xl px-6 text-base font-pregular py-6 w-full"
              placeholder="Confirm your password"
              secureTextEntry
              value={formData.password_confirmation}
              onChangeText={(password_confirmation) =>
                setFormData({
                  ...formData,
                  password_confirmation: password_confirmation,
                })
              }
              accessible={true}
              accessibilityLabel="Confirm password input"
              accessibilityHint="Re-enter your password to confirm"
              style={{ minHeight: 48 }} // Ensure minimum touch target height
            />
          </View>
          <Text 
            className=" text-xs font-pregular py-4"
            accessible={true}
            accessibilityRole="text"
            accessibilityLabel="Confirmation code information">
            we'll send confirmation code to confirm your email. standard message
            and data rates apply.
          </Text>
          <View>
            <TouchableOpacity
              onPress={handleLogin}
              className="bg-[#FF601B]  rounded-xl px-6 py-4 flex justify-center items-center"
              accessible={true}
              accessibilityRole="button"
              accessibilityLabel="Create account"
              accessibilityHint="Complete registration and create your account"
            >
              <Text 
                className=" text-white font-psemibold "
                accessible={true}
                accessibilityLabel="Create account button"
              >Sign up</Text>
            </TouchableOpacity>
          </View>
          <View className="pb-20">
            <TouchableOpacity
              className="bg-white border border-gray-300 rounded-xl px-6 py-4 mt-3 flex justify-center items-center"
              onPress={() => router.push("/login")}
              accessible={true}
              accessibilityRole="button"
              accessibilityLabel="Login instead"
              accessibilityHint="Navigate to the login page if you already have an account"
            >
              <Text 
                className=" text-gray-800 font-psemibold "
                accessible={true}
                accessibilityLabel="Login instead button"
              >
                Go to login
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      <Toast config={toastConfig} />
    </SafeAreaView>
  );
};

export default SignUp;
