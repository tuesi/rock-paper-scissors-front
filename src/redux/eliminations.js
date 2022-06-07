import { createSlice } from "@reduxjs/toolkit"

export const selectSlice = createSlice({
    name: "eliminations",
    initialState: {
        eliminations: "",
    },
    reducers:{
        eliminate: (state, action) => {
            state.eliminations = action.payload;
        }
    }
});

export const { eliminate } = selectSlice.actions;
export default selectSlice.reducer;