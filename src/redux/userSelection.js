import { createSlice } from "@reduxjs/toolkit"

export const selectSlice = createSlice({
    name: "userSelect",
    initialState: {
        userSelect: -1,
    },
    reducers:{
        user: (state, action) => {
            state.userSelect = action.payload;
        }
    }
});

export const { user } = selectSlice.actions;
export default selectSlice.reducer;