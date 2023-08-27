import { createSlice } from "@reduxjs/toolkit";

export const tournamentTimer = createSlice({
    name: "tournamentTimerSlice",
    initialState: {
        type: ""
    },
    reducers: {
        set: (state, action) => {
            state.type = action.payload
        }
    }
})

export const { set } = tournamentTimer.actions;
export default tournamentTimer.reducer