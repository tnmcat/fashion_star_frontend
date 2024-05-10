import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import productAPI from "../../../api/seller/productAPI";

const initialState = {
    productInfo: null,
    productsByStoreId: [],
    productsByStoreCategoryId: [],
    loading: false,
    success: false,
    error: null,
};

export const getProductsByStoreId = createAsyncThunk("product/products_by_store_id", async (storeId) => {
    const response = await productAPI.findByStoreId(storeId);
    return response;
});

export const getProductsByStoreCategoryId = createAsyncThunk("product/products_by_store_category_id", async (storeCategoryId) => {
    const response = await productAPI.findByStoreCategoryId(storeCategoryId);
    return response;
});

export const addProduct = createAsyncThunk("product/add", async ({ data, storeId }) => {
    const response = await productAPI.add(data, storeId);
    return response; // Return the response, which contains the added product information
});
export const getProductById = createAsyncThunk("product/product_by_id", async (productId) => {
    const response = await productAPI.findById(productId);
    return response;
});
export const updateProduct = createAsyncThunk("product/update", async ({ productId, data }) => {
    const response = await productAPI.update(productId, data);
    return response; // Return the response, which contains the updated product information
});
const productSlice = createSlice({
    name: "product",
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
            .addCase(getProductsByStoreId.pending, (state) => {
                state.success = false;
                state.loading = true;
                state.error = null;
            })
            .addCase(getProductsByStoreId.rejected, (state, action) => {
                state.success = false;
                state.loading = false;
                state.error = action.error;
            })
            .addCase(getProductsByStoreId.fulfilled, (state, action) => {
                state.success = true;
                state.loading = false;
                state.productsByStoreId = action.payload;
                state.error = null;
            })
            .addCase(getProductsByStoreCategoryId.pending, (state) => {
                state.success = false;
                state.loading = true;
                state.error = null;
            })
            .addCase(getProductsByStoreCategoryId.rejected, (state, action) => {
                state.success = false;
                state.loading = false;
                state.error = action.error;
            })
            .addCase(getProductsByStoreCategoryId.fulfilled, (state, action) => {
                state.success = true;
                state.loading = false;
                state.productsByStoreCategoryId = action.payload;
                state.error = null;
            })
            .addCase(addProduct.pending, (state) => {
                state.success = false;
                state.loading = true;
                state.error = null;
            })
            .addCase(addProduct.rejected, (state, action) => {
                state.success = false;
                state.loading = false;
                state.error = action.error;
            })
            .addCase(addProduct.fulfilled, (state, action) => {
                state.success = true;
                state.loading = false;
                state.productInfo = action.payload; // Set productInfo to the added product information
                state.error = null;
            })
            .addCase(getProductById.pending, (state) => {
                state.success = false;
                state.loading = true;
                state.error = null;
            })
            .addCase(getProductById.rejected, (state, action) => {
                state.success = false;
                state.loading = false;
                state.error = action.error;
            })
            .addCase(getProductById.fulfilled, (state, action) => {
                state.success = true;
                state.loading = false;
                state.productInfo = action.payload; // Set productInfo to the fetched product information
                state.error = null;
            })
            .addCase(updateProduct.pending, (state) => {
                state.success = false;
                state.loading = true;
                state.error = null;
            })
            .addCase(updateProduct.rejected, (state, action) => {
                state.success = false;
                state.loading = false;
                state.error = action.error;
            })
            .addCase(updateProduct.fulfilled, (state, action) => {
                state.success = true;
                state.loading = false;
                state.productInfo = action.payload; // Set productInfo to the updated product information
                state.error = null;
            });
        ;
    },
});

export const { setLoading, setError, setSuccess } = productSlice.actions;

export const selectLoading = (state) => state.product.loading;
export const selectError = (state) => state.product.error;
export const selectSuccess = (state) => state.product.success;
export const selectProductInfo = (state) => state.product.productInfo;
export const selectProductsByStoreId = (state) => state.product.productsByStoreId;
export const selectProductsByStoreCategoryId = (state) => state.product.productsByStoreCategoryId;

export default productSlice.reducer;
