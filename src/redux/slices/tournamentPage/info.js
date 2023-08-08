import { createSlice } from "@reduxjs/toolkit";

export const tournamentInfo = createSlice({
    name: "tournamentInfoSlice",
    initialState: {
        name: "",
        date: 0,
        blindName: "",
        blindId: 0,
        initialChip: 0,

        avStack: 0
    },
    reducers: {
        setInfos: (state, action) => {
            state.name = action.payload.name
            state.date = action.payload.date
            state.blindName = action.payload.blindName
            state.blindId = action.payload.blindId
            state.initialChip = action.payload.initialChip
        }
    },
});

export const { setInfos } = tournamentInfo.actions;
export default tournamentInfo.reducer;