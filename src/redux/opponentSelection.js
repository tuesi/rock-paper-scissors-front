import { createSlice } from "@reduxjs/toolkit"

export const selectSlice = createSlice({
    name: "opponentSelect",
    initialState: {
        opponentSelect: -1,
    },
    reducers:{
        opponent:(state, action) => {
            state.opponentSelect = action.payload;
        }
    }
});

export const { opponent } = selectSlice.actions;
export default selectSlice.reducer;