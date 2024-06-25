import { createSlice } from "@reduxjs/toolkit";
import axios from "../../axiosConfig";

const initialState = {
  room: null,
};

export const roomSlice = createSlice({
  name: "room",
  initialState,
  reducers: {
    addRoom: (state, action) => {
      state.room = action.payload;
    },
  },
});

export const getRoomDetail = (id) => async (dispatch) => {
  try {
    const response = await axios.get("/rooms/" + id);
    return response.data; // Return the response
  } catch (error) {
    console.error("Error fetching user data:", error.message);
    return error.response.data; // Return the error
  }
};

export const { addRoom } = roomSlice.actions;

export default roomSlice.reducer;
