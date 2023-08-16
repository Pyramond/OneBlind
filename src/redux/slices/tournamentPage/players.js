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
        removePlayer: (state, action) => {
            const playerId = action.payload;
            state.value = state.value.filter(player => player.id !== playerId);
        }
    },
});

export const { setPlayers, removePlayer } = tournamentPlayers.actions;
export default tournamentPlayers.reducer;