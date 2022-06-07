import { configureStore } from "@reduxjs/toolkit"
import userSelect from "./userSelection"
import opponentSelect from "./opponentSelection"
import status from "./gameStatus"
import usernameSelect from "./username"
import usernames from './playerNames'
import mode from "./gameMode"
import result from "./result"
import playerCount from "./playerCount"
import eliminations from "./eliminations"

export default configureStore({
    reducer:{
        userSelect: userSelect,
        opponentSelect: opponentSelect,
        status: status,
        usernameSelect: usernameSelect,
        usernames: usernames,
        mode: mode,
        result: result,
        playerCount: playerCount,
        eliminations: eliminations
    }
});