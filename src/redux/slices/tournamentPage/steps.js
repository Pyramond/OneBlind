import { createSlice } from "@reduxjs/toolkit";

export const tournamentSteps = createSlice({
    name: "tournamentStepsSlice",
    initialState: {
        steps: [],
    },
    reducers: {
        setSteps: (state, action) => {
            state.steps = action.payload
        }
    },
});

export const { setSteps } = tournamentSteps.actions;
export default tournamentSteps.reducer;