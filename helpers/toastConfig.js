import Toast, { BaseToast } from "react-native-toast-message";

// Custom configuration without background opacity
const toastConfig = {
    success: (props) => ( <
        BaseToast {...props }
        style = {
            {
                borderLeftColor: "green",
                backgroundColor: "white",
                width: 300,
                position: "absolute",
            }
        }
        contentContainerStyle = {
            { paddingHorizontal: 15 } }
        text1Style = {
            {
                fontSize: 15,
                fontWeight: "600",
            }
        }
        text2Style = {
            {
                fontSize: 12,
                fontWeight: "500",
            }
        }
        />
    ),

    error: (props) => ( <
        BaseToast {...props }
        style = {
            {
                borderLeftColor: "red",
                backgroundColor: "white",
                width: 300,
                position: "absolute",
            }
        }
        contentContainerStyle = {
            { paddingHorizontal: 15 } }
        text1Style = {
            {
                fontSize: 15,
                fontWeight: "600",
            }
        }
        text2Style = {
            {
                fontSize: 12,
                fontWeight: "500",
            }
        }
        />
    ),
};

export default toastConfig;