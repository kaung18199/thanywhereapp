import { View, Text, Image } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import { icons } from "../../constants";
import "../../assets/global.css";

const TabIcon = ({ icon, color, name, focused }) => {
  return (
    <View className=" items-center justify-center pt-4 gap-2">
      <Image
        source={icon}
        resizeMode="contain"
        tintColor={color}
        className="w-5 h-5"
      />
      <Text
        className={`${
          focused ? "font-pregular" : "font-pregular"
        } text-center whitespace-nowrap w-10 font-pregular`}
        style={{ color: color, fontSize: 10 }}
      >
        {name}
      </Text>
    </View>
  );
};

const TabsLayout = () => {
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          tabBarActiveTintColor: "#FF601B",
          tabBarInactiveTintColor: "#CDCDE0",
          tabBarStyle: {
            backgroundColor: "#FFFFFF",
            borderTopWidth: 1,
            borderTopColor: "#FFFFFF",
            height: 60,
          },
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: "HOME",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.homefootericon}
                color={color}
                name="home"
                focused={focused}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="about"
          options={{
            title: "About",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.searchfootericon}
                color={color}
                name="search"
                focused={focused}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="save"
          options={{
            title: "save",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.wishlistsfootericon}
                color={color}
                name="wish"
                focused={focused}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="trips"
          options={{
            title: "trips",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.tripsfootericon}
                color={color}
                name="trips"
                focused={focused}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            headerShown: true,
            headerTitle: "Profile",
            headerTitleAlign: "center",
            headerTitleStyle: {
              fontFamily: "Poppins-SemiBold",
              fontSize: 16,
              color: "#FF601B",
            },
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.profilefootericon}
                color={color}
                name="profile"
                focused={focused}
              />
            ),
          }}
        />
      </Tabs>
    </>
  );
};

export default TabsLayout;
