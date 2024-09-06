import { createSlice } from "@reduxjs/toolkit";
import axios from "../../axiosConfig";

const initialState = {
    vantour: null,
};

export const vantourSlice = createSlice({
    name: "vantour",
    initialState,
    reducers: {
        addVantour: (state, action) => {
            state.vantour = action.payload;
        },
    },
});

export const getListvantour = (params) => async(dispatch) => {
    try {
        const { city_id, page } = params;
        console.log(city_id, page, "this is page");
        const response = await axios.get(
            "/private-van-tours?order_by=top_selling_products&type=van_tour", { params: params }
        );
        dispatch(vantourSlice.actions.addVantour(response.data)); // Dispatching addVantour action directly from vantourSlice.actions

        // console.log(response.data);
        return response.data; // Return the response
    } catch (error) {
        console.error("Error fetching user data:", error.message);
        return error.response.data; // Return the error
    }
};
export const getListvantourSearch = (params) => async(dispatch) => {
    try {
        const { city_id, page } = params;
        console.log(city_id, page, "this is page");
        const response = await axios.get(
            "/private-van-tours?order_by=top_selling_products&type=van_tour", { params: params }
        );
        return response.data; // Return the response
    } catch (error) {
        console.error("Error fetching user data:", error.message);
        return error.response.data; // Return the error
    }
};
export const getvantourDetail = (id) => async(dispatch) => {
    try {
        const response = await axios.get("/private-van-tours" + id);
        return response.data; // Return the response
    } catch (error) {
        console.error("Error fetching user data:", error.message);
        return error.response.data; // Return the error
    }
};

export const { addVantour } = vantourSlice.actions;

export default vantourSlice.reducer;