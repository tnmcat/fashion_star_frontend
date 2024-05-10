import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import store_categoryAPI from "../../../api/seller/store_categoryAPI";

const initialState = {
    storeCategoryInfo: null,
    storeCategoryByStoreId: [],
    loading: false,
    success: false,
    error: null,
};

export const getStoreCategoriesByStoreId = createAsyncThunk("store_category/store_categories_by_store_id", async (storeId) => {
    const response = await store_categoryAPI.findAll(storeId);
    return response;
});

export const addStoreCategory = createAsyncThunk("store_category/add", async ({ data, storeId }) => {
    console.log('at reducer')
    console.log(data)
    console.log(storeId)
    const response = await store_categoryAPI.add(data, storeId);
    return response;
});

const storeCategorySlice = createSlice({
    name: "storeCategory",
    initialState,
    reducers: {
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
        setSuccess: (state, action) => {
            state.success = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getStoreCategoriesByStoreId.pending, (state) => {
                state.success = false;
                state.loading = true;
                state.error = null;
            })
            .addCase(getStoreCategoriesByStoreId.rejected, (state, action) => {
                state.success = false;
                state.loading = false;
                state.error = action.error;
            })
            .addCase(getStoreCategoriesByStoreId.fulfilled, (state, action) => {
                state.success = true;
                state.loading = false;
                state.storeCategoryByStoreId = action.payload;
                state.error = null;
            })
            .addCase(addStoreCategory.pending, (state) => {
                state.success = false;
                state.loading = true;
                state.error = null;
            })
            .addCase(addStoreCategory.rejected, (state, action) => {
                state.success = false;
                state.loading = false;
                state.error = action.error;
            })
            .addCase(addStoreCategory.fulfilled, (state, action) => {
                state.success = true;
                state.loading = false;
                state.storeCategoryInfo = action.payload;
                state.error = null;
            });
    },
});

export const { setLoading, setError, setSuccess } = storeCategorySlice.actions;

export const selectLoading = (state) => state.storeCategory.loading;
export const selectError = (state) => state.storeCategory.error;
export const selectSuccess = (state) => state.storeCategory.success;
export const selectStoreCategoryInfo = (state) => state.storeCategory.storeCategoryInfo;
export const selectStoreCategoryByStoreId = (state) => state.storeCategory.storeCategoryByStoreId;

export default storeCategorySlice.reducer;
