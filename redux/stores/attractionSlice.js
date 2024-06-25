import { createSlice } from "@reduxjs/toolkit";
import axios from "../../axiosConfig";

const initialState = {
    attraction: null,
};

export const attractionSlice = createSlice({
    name: "attraction",
    initialState,
    reducers: {
        addAttraction: (state, action) => {
            state.attraction = action.payload;
        },
    },
});

export const getListAttraction = (params) => async(dispatch) => {
    try {
        const response = await axios.get("/entrance-tickets", { params: params });
        dispatch(attractionSlice.actions.addAttraction(response.data)); // Dispatching addHotel action directly from hotelSlice.actions

        // console.log(response.data);
        return response.data; // Return the response
    } catch (error) {
        console.error("Error fetching user data:", error.message);
        return error.response.data; // Return the error
    }
};
export const getListAttractionSearch = (params) => async(dispatch) => {
    try {
        const response = await axios.get("/entrance-tickets", { params: params });
        return response.data; // Return the response
    } catch (error) {
        console.error("Error fetching user data:", error.message);
        return error.response.data; // Return the error
    }
};
export const getAttractionDetail = (id) => async(dispatch) => {
    try {
        const response = await axios.get("/entrance-tickets/" + id);
        return response.data; // Return the response
    } catch (error) {
        console.error("Error fetching user data:", error.message);
        return error.response.data; // Return the error
    }
};

export const { addAttraction } = attractionSlice.actions;

export default attractionSlice.reducer;