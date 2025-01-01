import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    activeCategory: 0,
    activeCurrentPage: 1,
    activeSort: {
        name: "популярности ▼",
        sortProperty: "-rating",
        order: "desc",
    },
};

const filterSlice = createSlice({
    name: "filter",
    initialState,
    reducers: {
        changeCategory: (state, action) => {
            state.activeCategory = action.payload;
        },
        changeSort: (state, action) => {
            state.activeSort = action.payload;
        },
        changeCurrentPage: (state, action) => {
            state.activeCurrentPage = action.payload;
        },
        setFilters: (state, action) => {
            state.activeCurrentPage = +action.payload.page;
            state.activeCategory = +action.payload.category;
            state.activeSort = action.payload.sort;
        },
    },
});

export const { changeCategory, changeSort, changeCurrentPage, setFilters } =
    filterSlice.actions;
export default filterSlice.reducer;
