import { createSlice } from "@reduxjs/toolkit";

export const reload = createSlice({
    name: "reloadSlice",
    initialState: {
        value: 0,
    },
    reducers: {
        change: (state) => {
            state.value = Math.floor(Math.random() * (10000 - 1 + 1)) + 1;
        },
    },
});

export const { change } = reload.actions;
export default reload.reducer;