import { configureStore } from "@reduxjs/toolkit";
import tournamentPlayerReducer from "./slices/tournamentPage/players";
import tournamentStepsReducer from "./slices/tournamentPage/steps";
import tournamentInfoReducer from "./slices/tournamentPage/info"


export default configureStore({
    reducer: {
        tournamentPlayers: tournamentPlayerReducer,
        tournamentSteps: tournamentStepsReducer,
        tournamentInfo: tournamentInfoReducer,
    },
});