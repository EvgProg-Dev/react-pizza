import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    searchValue: "",
};

const searchSlice = createSlice({
    name: "search",
    initialState,
    reducers: {
        changeSearch: (state, action) => {
            state.searchValue = action.payload;
        },
    },
});

export const { changeSearch } = searchSlice.actions;
export default searchSlice.reducer;
