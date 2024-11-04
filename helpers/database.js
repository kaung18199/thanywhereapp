import { clearAllData } from "@react-native-async-storage/async-storage";

const clearAppData = async() => {
    try {
        await clearAllData();
        console.log("App data cleared successfully");
    } catch (error) {
        console.error("Error clearing app data:", error);
    }
};

// Call this function when needed, e.g., on app start or when encountering the error
clearAppData();

export { clearAppData };