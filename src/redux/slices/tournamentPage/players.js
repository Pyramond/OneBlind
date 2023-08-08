import { createSlice } from "@reduxjs/toolkit";

export const tournamentPlayers = createSlice({
    name: "tournamentPlayerSlice",
    initialState: {
        value: [],
    },
    reducers: {
        setPlayers: (state, action) => {
            state.value = action.payload;
        },
    },
});

export const { setPlayers } = tournamentPlayers.actions;
export default tournamentPlayers.reducer;