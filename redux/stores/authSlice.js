import { createSlice } from "@reduxjs/toolkit";
import axios from "../../axiosConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";

const initialState = {
    auth: null,
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        addAuth: (state, action) => {
            state.auth = action.payload;
        },
    },
});

export const loginAction = (data) => async(dispatch) => {
    try {
        const response = await axios.post("/login", data);
        // console.log(response.data, "this is a login action");

        if (response.data.message == "success") {
            AsyncStorage.setItem("token", response.data.data.token);
            AsyncStorage.setItem("user", JSON.stringify(response.data.data.user));
        }
        return response.data; // Return the response
    } catch (error) {
        console.error("Error fetching user data:", error.response);
        return "error";
    }
};

export const { addAuth } = authSlice.actions;

export default authSlice.reducer;