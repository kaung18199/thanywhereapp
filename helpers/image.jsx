import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { ActivityIndicator, View, StyleSheet } from "react-native";
import Animated from "react-native-reanimated";

export const CachedImage = (props) => {
  const [cachedSource, setCachedSource] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { uri } = props;

  useEffect(() => {
    const getCachedImage = async () => {
      try {
        if (uri != null) {
          const cachedImageData = await AsyncStorage.getItem(uri);
          if (cachedImageData) {
            setCachedSource({ uri: cachedImageData });
          } else {
            const response = await fetch(uri);
            const imageBlob = await response.blob();
            const base64Data = await new Promise((resolve) => {
              const reader = new FileReader();
              reader.readAsDataURL(imageBlob);
              reader.onloadend = () => {
                resolve(reader.result);
              };
            });
            await AsyncStorage.setItem(uri, base64Data);
            setCachedSource({ uri: base64Data });
          }
        } else {
          setCachedSource({ uri });
        }
      } catch (error) {
        console.log("====================================");
        console.log(error);
        console.log("====================================");
        setCachedSource({ uri });
      } finally {
        setIsLoading(false);
      }
    };

    getCachedImage();
  }, [uri]);

  return (
    <View className=" justify-center items-center">
      {isLoading ? (
        <ActivityIndicator size="small" color="#FF601B" {...props} />
      ) : (
        <Animated.Image source={cachedSource} {...props} />
      )}
    </View>
  );
};
