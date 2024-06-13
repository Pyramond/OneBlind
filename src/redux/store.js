import { configureStore } from "@reduxjs/toolkit";
import tournamentPlayerReducer from "./slices/tournamentPage/players";
import tournamentStepsReducer from "./slices/tournamentPage/steps";
import tournamentInfoReducer from "./slices/tournamentPage/info"
import tournamentTimer from "./slices/tournamentPage/timer";
import reload from "./slices/reload";
import recapInfosReducer from "./slices/tournamentRecap/recap"


export default configureStore({
    reducer: {
        tournamentPlayers: tournamentPlayerReducer,
        tournamentSteps: tournamentStepsReducer,
        tournamentInfo: tournamentInfoReducer,
        tournamentTimer: tournamentTimer,
        reload: reload,
        recap: recapInfosReducer
    },
});