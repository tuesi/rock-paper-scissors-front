import { createSlice } from "@reduxjs/toolkit"

export const selectSlice = createSlice({
    name: "playerNames",
    initialState: {
        usernames: "",
    },
    reducers:{
        playerNames: (state, action) => {
            state.usernames = action.payload;
        }
    }
});

export const { playerNames } = selectSlice.actions;
export default selectSlice.reducer;