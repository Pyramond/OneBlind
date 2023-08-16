import { createSlice } from "@reduxjs/toolkit";

export const tournamentInfo = createSlice({
    name: "tournamentInfoSlice",
    initialState: {
        name: "",
        date: 0,
        blindName: "",
        blindId: 0,
        initialChip: 0,

        avStack: 0,
        totalChips: 0
    },
    reducers: {
        setInfos: (state, action) => {
            state.name = action.payload.name
            state.date = action.payload.date
            state.blindName = action.payload.blindName
            state.blindId = action.payload.blindId
            state.initialChip = action.payload.initialChip

            state.totalChips = action.payload.number * state.initialChip
            state.avStack = state.totalChips / action.payload.number
        },
        recave: (state, action) => {
            state.totalChips = state.totalChips + state.initialChip
            state.avStack = state.totalChips / action.payload
        },
        updateAvStack: (state, action) => {
            state.avStack = state.totalChips / action.payload
        }
    },
});

export const { setInfos, recave, updateAvStack } = tournamentInfo.actions;
export default tournamentInfo.reducer;