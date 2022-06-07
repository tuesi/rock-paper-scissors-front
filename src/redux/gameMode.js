import { createSlice } from "@reduxjs/toolkit"

export const selectSlice = createSlice({
    name: "gameMode",
    initialState: {
        mode: "",
    },
    reducers:{
        gameMode: (state, action) => {
            state.mode = action.payload;
        }
    }
});

export const { gameMode } = selectSlice.actions;
export default selectSlice.reducer;