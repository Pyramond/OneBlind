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
                state.index++
                const x = state.steps[state.steps.length - 1]
                x.order = state.index
                state.currentStep = x
            } else {
                state.currentStep = state.steps[state.index]
                state.index++
            }
        },

        prevStep: (state) => {
            if(state.index >= state.steps.length) {
                state.index = state.steps.length - 1
                state.currentStep = state.steps[state.index]
            } else {
                state.index--
                state.currentStep = state.steps[state.index]
            }
        }

    },
});

export const { setSteps, changeStep, prevStep } = tournamentSteps.actions;
export default tournamentSteps.reducer;