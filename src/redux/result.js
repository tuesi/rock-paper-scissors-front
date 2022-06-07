import { createSlice } from "@reduxjs/toolkit"

export const selectSlice = createSlice({
    name: "gameResult",
    initialState: {
        result: "",
    },
    reducers:{
        gameResult: (state, action) => {
            state.result = action.payload;
        }
    }
});

export const { gameResult } = selectSlice.actions;
export default selectSlice.reducer;