import { View, Text, ScrollView } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const AboutPage = () => {
  return (
    <SafeAreaView>
      <ScrollView className=" px-2">
        <View className=" gap-y-4 pb-8">
          <Text className=" font-psemibold text-lg text-secondary">
            About Us
          </Text>
          <Text className=" font-pregular text-sm text-gray-500">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Expedita
            totam fugiat provident placeat velit tempora labore ducimus.
            Reiciendis ducimus eligendi ex voluptate quae beatae nesciunt neque
            molestiae! Temporibus, laborum amet.
          </Text>
          <Text className=" font-psemibold text-lg text-secondary">
            Our Vision
          </Text>
          <Text className=" font-pregular text-sm text-gray-500">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Expedita
            totam fugiat provident placeat velit tempora labore ducimus.
            Reiciendis ducimus eligendi ex voluptate quae beatae nesciunt neque
            molestiae! Temporibus, laborum amet.
          </Text>
          <Text className=" font-psemibold text-lg text-secondary">
            Our Mission
          </Text>
          <Text className=" font-pregular text-sm text-gray-500">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Expedita
            totam fugiat provident placeat velit tempora labore ducimus.
            Reiciendis ducimus eligendi ex voluptate quae beatae nesciunt neque
            molestiae! Temporibus, laborum amet.
          </Text>
          <Text className=" font-psemibold text-lg text-secondary">
            Our Success Trips
          </Text>
          <Text className=" font-pregular text-sm text-gray-500">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Expedita
            totam fugiat provident placeat velit tempora labore ducimus.
            Reiciendis ducimus eligendi ex voluptate quae beatae nesciunt neque
            molestiae! Temporibus, laborum amet.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AboutPage;
