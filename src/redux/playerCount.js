import { createSlice } from "@reduxjs/toolkit"

export const selectSlice = createSlice({
    name: "playerCount",
    initialState: {
        playerCount: 0,
    },
    reducers:{
        setPlayerCount: (state, action) => {
            state.playerCount = action.payload;
        }
    }
});

export const { setPlayerCount } = selectSlice.actions;
export default selectSlice.reducer;