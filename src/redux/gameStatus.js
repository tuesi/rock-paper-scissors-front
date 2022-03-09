import { createSlice } from "@reduxjs/toolkit"

export const selectSlice = createSlice({
    name: "gameStatus",
    initialState: {
        status: "",
    },
    reducers:{
        gameStatus: (state, action) => {
            state.status = action.payload;
        }
    }
});

export const { gameStatus } = selectSlice.actions;
export default selectSlice.reducer;