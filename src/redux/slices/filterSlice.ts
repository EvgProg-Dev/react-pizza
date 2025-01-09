import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Sort = {
    name: string;
    sortProperty:
        | "rating"
        | "price"
        | "title"
        | "-rating"
        | "-price"
        | "-title";
    order: "asc" | "desc";
};

interface FilterSliceState {
    category: number;
    page: number;
    sort: Sort;
    searchValue: string;
}

const initialState: FilterSliceState = {
    category: 0,
    page: 1,
    sort: {
        name: "популярности ▼",
        sortProperty: "-rating",
        order: "desc",
    },
    searchValue: "",
};

const filterSlice = createSlice({
    name: "filter",
    initialState,
    reducers: {
        changeCategory: (state, action: PayloadAction<number>) => {
            state.category = action.payload;
        },
        changeSort: (state, action: PayloadAction<Sort>) => {
            state.sort = action.payload;
        },
        changeCurrentPage: (state, action: PayloadAction<number>) => {
            state.page = action.payload;
        },
        setFilters: (state, action: PayloadAction<FilterSliceState>) => {
            state.page = +action.payload.page;
            state.category = +action.payload.category;
            state.sort = action.payload.sort;
        },
        changeSearch: (state, action: PayloadAction<string>) => {
            state.searchValue = action.payload;
        },
    },
});

export const {
    changeCategory,
    changeSort,
    changeCurrentPage,
    setFilters,
    changeSearch,
} = filterSlice.actions;
export default filterSlice.reducer;
