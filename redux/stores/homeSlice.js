import { createSlice } from "@reduxjs/toolkit";

const homeSlice = createSlice({
    name: "home",
    initialState: {
        thingToDo: null, // Store the name data from API response
        staysInBangkok: null, // Store the name data from API response
        bestSellingVantour: null, // Store the name data from API response
        bestSellingAttraction: null, // Store the name data from API response
        topDestinationToRead: null, // Store the name data from API response
        staysInPattaya: null, // Store the name data from API response for
    },
    reducers: {
        setThingToDo: (state, action) => {
            state.thingToDo = action.payload;
        },
        setStaysInBangkok: (state, action) => {
            state.staysInBangkok = action.payload;
        },
        setBestSellingVantour: (state, action) => {
            state.bestSellingVantour = action.payload;
        },
        setBestSellingAttraction: (state, action) => {
            state.bestSellingAttraction = action.payload;
        },
        setTopDestinationToRead: (state, action) => {
            state.topDestinationToRead = action.payload;
        },
        setStaysInPattaya: (state, action) => {
            state.staysInPattaya = action.payload;
        },
    },
});

export const {
    setThingToDo,
    setStaysInBangkok,
    setBestSellingVantour,
    setBestSellingAttraction,
    setTopDestinationToRead,
    setStaysInPattaya,
} = homeSlice.actions;

export default homeSlice.reducer;