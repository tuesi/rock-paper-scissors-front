import { createSlice } from "@reduxjs/toolkit"

export const selectSlice = createSlice({
    name: "username",
    initialState: {
        usernameSelect: "",
    },
    reducers:{
        usernameAdd: (state, action) => {
            state.usernameSelect = action.payload;
        }
    }
});

export const { usernameAdd } = selectSlice.actions;
export default selectSlice.reducer;