import { createSlice } from "@reduxjs/toolkit";
import axios from "../../axiosConfig";

const initialState = {
  city: null,
};

export const citySlice = createSlice({
  name: "city",
  initialState,
  reducers: {
    addCity: (state, action) => {
      state.city = action.payload;
    },
  },
});

export const getListCity = () => async (dispatch) => {
  try {
    const response = await axios.get("/cities?limit=1000&page=1");
    dispatch(citySlice.actions.addCity(response.data)); // Dispatching addCity action directly from citySlice.actions

    // console.log(response.data);
    return response.data; // Return the response
  } catch (error) {
    console.error("Error fetching user data:", error.message);
    return error.response.data; // Return the error
  }
};

// Action creators are generated for each case reducer function
export const { addCity } = citySlice.actions;

export default citySlice.reducer;
