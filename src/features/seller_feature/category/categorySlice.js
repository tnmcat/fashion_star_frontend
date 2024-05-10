import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import categoryAPI from "../../../api/seller/categoryAPI";

// Initialize the initial state
const initialState = {
    categories: [],
    loading: false,
    error: null,
};

// Create an async thunk to fetch all categories
export const getAllCategories = createAsyncThunk(
    'categories/getAll',
    async () => {
        try {
            const response = await categoryAPI.findAll(); // Adjust your API method name accordingly
            console.log(response)
            return response;

        } catch (error) {
            throw error;
        }
    }
);

// Create slice
const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllCategories.pending, (state) => {
                state.loading = true;
            })
            .addCase(getAllCategories.fulfilled, (state, action) => {
                state.loading = false;
                state.categories = action.payload;
                state.error = null;
            })
            .addCase(getAllCategories.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export const selectCategories = (state) => state.category.categories;
export default categorySlice.reducer;
