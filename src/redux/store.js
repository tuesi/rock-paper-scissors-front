import { configureStore } from "@reduxjs/toolkit"
import userSelect from "./userSelection"
import opponentSelect from "./opponentSelection"
import status from "./gameStatus"

export default configureStore({
    reducer:{
        userSelect: userSelect,
        opponentSelect: opponentSelect,
        status: status,
    }
});