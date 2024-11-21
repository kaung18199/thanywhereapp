import axios from "../axiosConfig";
import { Stack, useRouter } from "expo-router";
import React, { useState } from "react";
import { Button, TextInput } from "react-native";
// import { loginAction } from "../redux/stores/authSlice";
// import { useDispatch } from "react-redux";
import {
  Image,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Text, View } from "react-native";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
// import Toast from "react-native-toast-message";
import Toast from "react-native-toast-message";
import toastConfig from "../helpers/toastConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";

const HeaderLeftCustom = () => {
  const router = useRouter();
  return (
    <View style={{ marginLeft: 4 }}>
      <TouchableOpacity onPress={() => router.push("/home")}>
        <ChevronLeftIcon size={18} color="#FF601B" />
      </TouchableOpacity>
    </View>
  );
};

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // const dispatch = useDispatch();

  const router = useRouter();

  const handleLogin = async () => {
    try {
      // Handle login logic here
      const frmData = {
        email: formData.email,
        password: formData.password,
      }; // Your form data here
      const res = await axios.post(
        "https://api-blog.thanywhere.com/api/v2/login",
        frmData, // data goes here as the second parameter
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );

      console.log(res.data, "this is response");

      if (res.data.message == "success") {
        setFormData({ email: "", password: "" });
        await AsyncStorage.setItem("token", res.data.data.token);
        await AsyncStorage.setItem("user", JSON.stringify(res.data.data.user));
        Toast.show({
          type: "success",
          text1: "Login success",
          text2: "Welcome to ThanyWhere 👋",
          position: "top",
          visibilityTime: 3000,
        });
        setTimeout(() => {
          router.push("/home");
        }, 5000);
      } else {
        setFormData({ email: "", password: "" });
        Toast.show({
          type: "error",
          text1: "Oww !",
          text2: "Please check your email and password",
          position: "top",
          visibilityTime: 3000,
        });
        await AsyncStorage.removeItem("token");
        await AsyncStorage.removeItem("user");
      }
    } catch (error) {
      await AsyncStorage.removeItem("token");
      await AsyncStorage.removeItem("user");
      if (error.response) {
        console.log("Server responded with an error:", error.response.data);
      } else if (error.request) {
        console.log("Request made but no response received:", error.request);
      } else {
        console.log("Error in setting up the request:", error.message);
      }
    }
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <View>
          <Stack.Screen
            options={{
              headerShown: true,
              headerTitle: "Log in",
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

        <View className=" pt-5 px-6">
          <Text className=" font-pmedium text-lg pb-4">
            Welcome to ThanyWhere
          </Text>
          <View className=" flex flex-col justify-start items-center border border-gray-300 rounded-md">
            <TextInput
              className=" border-b border-gray-300 rounded-md px-4 text-sm font-pregular py-3 w-full"
              placeholder="Enter your email"
              keyboardType="email-address" // Show email-specific keyboard
              value={formData.email}
              onChangeText={(email) =>
                setFormData({ ...formData, email: email })
              }
              autoCapitalize="none" // No automatic capitalization
              autoCorrect={false} // Disable autocorrect
            />
            <TextInput
              className="  rounded-md px-4 text-sm font-pregular py-3 w-full"
              placeholder="Enter your password"
              secureTextEntry // Hides the input for passwords
              value={formData.password}
              onChangeText={(password) =>
                setFormData({ ...formData, password: password })
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
              className="bg-[#FF601B]  rounded-md px-4 py-3 flex justify-center items-center"
            >
              <Text className=" text-white font-psemibold ">Login</Text>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity
              className="bg-white border border-gray-300 rounded-md px-4 py-3 mt-3 flex justify-center items-center"
              onPress={() => router.push("/signup")}
            >
              <Text className=" text-gray-600 font-psemibold ">
                Go to Sign up
              </Text>
            </TouchableOpacity>
          </View>

          <View className="border-b border-gray-300 mt-6"></View>
          <View>
            <TouchableOpacity className="bg-gray-200 border border-gray-300 rounded-md px-4 py-3 mt-3 flex justify-center items-center">
              <Text className=" text-gray-600 font-psemibold ">
                continue with google
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <Toast config={toastConfig} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Login;
