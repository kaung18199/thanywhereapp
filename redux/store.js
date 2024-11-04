import { configureStore } from "@reduxjs/toolkit";
import cityReducer from "./stores/citySlice";
import hotelReducer from "./stores/hotelSlice";
import roomReducer from "./stores/roomSlice";
import attractionReducer from "./stores/attractionSlice";
import variationReducer from "./stores/variationSlice";
import vantourReducer from "./stores/vantourSlice";
import authReducer from "./stores/authSlice";

export const store = configureStore({
    reducer: {
        hotel: hotelReducer,
        city: cityReducer,
        room: roomReducer,
        attraction: attractionReducer,
        variation: variationReducer,
        vantour: vantourReducer,
        auth: authReducer,
    },
});