import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import categoryAPI from "../../../api/seller/categoryAPI";

// Initialize the initial state
const initialState = {
    categories: [],
    mainCategories: [],
    parentCategories: [],
    loading: false,
    error: null,
};

// Create an async thunk to fetch all main categories
export const getAllMainCategories = createAsyncThunk(
    'categories/getAllMainCategories',
    async () => {
        try {
            const response = await categoryAPI.findAllMainCategories(); // Adjust your API method name accordingly
            return response;
        } catch (error) {
            throw error;
        }
    }
);

// Create an async thunk to fetch all parent categories
export const getAllParentCategories = createAsyncThunk(
    'categories/getAllParentCategories',
    async (main_cate_id) => {
        try {
            const response = await categoryAPI.findAllParentCategories(main_cate_id); // Adjust your API method name accordingly
            return response;
        } catch (error) {
            throw error;
        }
    }
);
// Create an async thunk to fetch all categories
export const getAllCategories = createAsyncThunk(
    'categories/getAll',
    async (parent_cate_id) => {
        try {
            const response = await categoryAPI.findAllCategories(parent_cate_id); // Adjust your API method name accordingly
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
            })
            .addCase(getAllMainCategories.pending, (state) => {
                state.loading = true;
            })
            .addCase(getAllMainCategories.fulfilled, (state, action) => {
                state.loading = false;
                // Assuming the response structure is similar, adjust as necessary
                state.mainCategories = action.payload;
                state.error = null;
            })
            .addCase(getAllMainCategories.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(getAllParentCategories.pending, (state) => {
                state.loading = true;
            })
            .addCase(getAllParentCategories.fulfilled, (state, action) => {
                state.loading = false;
                // Assuming the response structure is similar, adjust as necessary
                state.parentCategories = action.payload;
                state.error = null;
            })
            .addCase(getAllParentCategories.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export const selectCategories = (state) => state.category.categories;
export const selectMainCategories = (state) => state.category.mainCategories;
export const selectParentCategories = (state) => state.category.parentCategories;
export default categorySlice.reducer;
