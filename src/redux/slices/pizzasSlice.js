import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPizzas = createAsyncThunk(
    "pizza/fetchPizzasStatus",
    async ({ category, sortBy, order, search, activeCurrentPage }) => {
        const { data } = await axios.get(
            `https://66a22dd1967c89168f1f1755.mockapi.io/items?page=${activeCurrentPage}&limit=4${category}&sortBy=${sortBy}&order=${order}${search}`
        );

        return data;
    }
);

const initialState = {
    items: [],
    status: "loading",
};
const pizzasSlice = createSlice({
    name: "pizza",
    initialState,
    reducers: {
        setItems(state, action) {
            state.items = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPizzas.pending, (state) => {
                state.items = [];
                state.status = "loading";
            })
            .addCase(fetchPizzas.fulfilled, (state, action) => {
                state.items = action.payload;
                state.status = "success";
            })
            .addCase(fetchPizzas.rejected, (state) => {
                state.status = "error";
                state.items = [];
            });
    },
});

export const { setItems } = pizzasSlice.actions;
export default pizzasSlice.reducer;
