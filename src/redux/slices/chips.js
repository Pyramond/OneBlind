import { createSlice } from "@reduxjs/toolkit";

export const chips = createSlice({
    name: "chipsSlice",
    initialState: {
        value: [],
    },
    reducers: {
        setChips: (state, action) => {
            state.value = action.payload;
        }
    },
});

export const { setChips } = chips.actions;
export default chips.reducer;