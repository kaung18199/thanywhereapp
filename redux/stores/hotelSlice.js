import { createSlice } from "@reduxjs/toolkit";
import axios from "../../axiosConfig";

const initialState = {
    hotel: null,
};

export const hotelSlice = createSlice({
    name: "hotel",
    initialState,
    reducers: {
        addHotel: (state, action) => {
            state.hotel = action.payload;
        },
    },
});

export const getListHotel = (params) => async(dispatch) => {
    try {
        const { city_id, page } = params;
        console.log(city_id, page, "this is page");
        const response = await axios.get("/hotels", { params: params });
        dispatch(hotelSlice.actions.addHotel(response.data)); // Dispatching addHotel action directly from hotelSlice.actions

        // console.log(response.data);
        return response.data; // Return the response
    } catch (error) {
        console.error("Error fetching user data:", error.message);
        return error.response.data; // Return the error
    }
};
export const getListHotelSearch = (params) => async(dispatch) => {
    try {
        const { city_id, page } = params;
        console.log(city_id, page, "this is page");
        const response = await axios.get("/hotels", { params: params });
        return response.data; // Return the response
    } catch (error) {
        console.error("Error fetching user data:", error.message);
        return error.response.data; // Return the error
    }
};
export const getHotelDetail = (id) => async(dispatch) => {
    try {
        const response = await axios.get("/hotels/" + id);
        return response.data; // Return the response
    } catch (error) {
        console.error("Error fetching user data:", error.message);
        return error.response.data; // Return the error
    }
};

export const { addHotel } = hotelSlice.actions;

export default hotelSlice.reducer;