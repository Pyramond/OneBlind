import { createSlice } from "@reduxjs/toolkit";

export const tournamentSteps = createSlice({
    name: "tournamentStepsSlice",
    initialState: {
        steps: [],
        currentStep: {},
        index: 0
    },
    reducers: {
        setSteps: (state, action) => {
            state.steps = action.payload
        },
        changeStep: (state) => {
            state.currentStep = state.steps[state.index]
            state.index = state.index + 1
        }
    },
});

export const { setSteps, changeStep } = tournamentSteps.actions;
export default tournamentSteps.reducer;