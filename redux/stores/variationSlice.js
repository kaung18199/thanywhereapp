import { createSlice } from "@reduxjs/toolkit";
import axios from "../../axiosConfig";

const initialState = {
  variation: null,
};

export const variationSlice = createSlice({
  name: "variation",
  initialState,
  reducers: {
    addVariation: (state, action) => {
      state.variation = action.payload;
    },
  },
});

export const getVariationDetail = (id) => async (dispatch) => {
  try {
    const response = await axios.get("/entrance-ticket-variations/" + id);
    return response.data; // Return the response
  } catch (error) {
    console.error("Error fetching user data:", error.message);
    return error.response.data; // Return the error
  }
};

export const { addVariation } = variationSlice.actions;

export default variationSlice.reducer;
