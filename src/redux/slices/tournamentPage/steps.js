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
            
            if(state.index >= state.steps.length) {
                const x = state.steps[state.steps.length - 1]
                x.order = state.index
                state.currentStep = x
                state.index++
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