import { createSlice } from "@reduxjs/toolkit"


export const recapInfos = createSlice({
    name: "tournamentRecapInfoSlice",
    
    initialState: {
        recap: {},
        tournament: {},
        players: []
    },

    reducers: {
        setInfo: (state, action) => {
            state.recap = action.payload.recap
            state.players = action.payload.players
            state.tournament = action.payload.tournament
        }
    }
})

export const { setInfo } = recapInfos.actions
export default recapInfos.reducer