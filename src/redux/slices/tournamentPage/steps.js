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
            if(!state.steps[state.index]) {
                state.currentStep = {"time": 0}
            } else {
                state.currentStep = state.steps[state.index]
                state.index++
            }
        },

        prevStep: (state) => {
            state.index--
            state.currentStep = state.steps[state.index]
        }

    },
});

export const { setSteps, changeStep, prevStep } = tournamentSteps.actions;
export default tournamentSteps.reducer;