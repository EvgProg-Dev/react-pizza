import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

type Pizza = {
    id: string;
    imageUrl: string;
    title: string;
    count: number;
    price: number;
    size: number;
    type: string;
};

enum Status {
    LOADING = "loading",
    SUCCESS = "success",
    ERROR = "error",
}

interface PizzaSliceState {
    items: Pizza[];
    status: Status;
}

type Fetch = {
    categoryActive: string;
    sortBy: string;
    order: string;
    search: string;
    page: number;
};
export const fetchPizzas = createAsyncThunk<Pizza[], Fetch>(
    "pizza/fetchPizzasStatus",
    async (params) => {
        const { categoryActive, sortBy, order, search, page } = params;
        const { data } = await axios.get<Pizza[]>(
            `https://66a22dd1967c89168f1f1755.mockapi.io/items?page=${page}&limit=4${categoryActive}&sortBy=${sortBy}&order=${order}${search}`
        );

        return data;
    }
);

const initialState: PizzaSliceState = {
    items: [],
    status: Status.LOADING,
};
const pizzasSlice = createSlice({
    name: "pizza",
    initialState,
    reducers: {
        setItems(state, action: PayloadAction<Pizza[]>) {
            state.items = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPizzas.pending, (state) => {
                state.items = [];
                state.status = Status.LOADING;
            })
            .addCase(fetchPizzas.fulfilled, (state, action) => {
                state.items = action.payload;
                state.status = Status.SUCCESS;
            })
            .addCase(fetchPizzas.rejected, (state) => {
                state.status = Status.ERROR;
                state.items = [];
            });
    },
});

export const { setItems } = pizzasSlice.actions;
export default pizzasSlice.reducer;
