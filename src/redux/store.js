import { configureStore } from "@reduxjs/toolkit";
import tournamentPlayerReducer from "./slices/tournamentPage/players";

export default configureStore({
    reducer: {
        tournamentPlayers: tournamentPlayerReducer,
    },
});