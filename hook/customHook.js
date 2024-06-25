import { useEffect, useState } from "react";
import { Alert } from "react-native";

const CustomHook = (fn) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await fn;
      setData(response.data);
      console.log(response.data);
    } catch (error) {
      Alert.alert(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const refetch = () => fetchData();

  return { data, isLoading, refetch };
};

export default CustomHook;
