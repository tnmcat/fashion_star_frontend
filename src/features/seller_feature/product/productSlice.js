import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import productAPI from "../../../api/seller/productAPI";

const initialState = {
    productInfo: null,
    productAdded: null,
    productNeedCheckInfo: null,
    productsByStoreId: [],
    productsByStoreCategoryId: [],
    loading: false,
    success: false,
    error: null,
};

export const getProductsByStoreId = createAsyncThunk(
    "product/products_by_store_id",
    async (storeId) => {
        const response = await productAPI.findByStoreId(storeId);
        return response;
    }
);

export const getProductsByStoreCategoryId = createAsyncThunk(
    "product/products_by_store_category_id",
    async (storeCategoryId) => {
        const response = await productAPI.findByStoreCategoryId(storeCategoryId);
        return response;
    }
);

export const addProduct = createAsyncThunk(
    "product/add",
    async ({ data, storeId }) => {
        const response = await productAPI.add(data, storeId);
        return response;
    }
);

export const getProductById = createAsyncThunk(
    "product/product_by_id",
    async (productId) => {
        const response = await productAPI.findById(productId);
        return response;
    }
);

export const sendNeedCheckProduct = createAsyncThunk(
    "product/send_need_check_product",
    async (productId) => {
        const response = await productAPI.sendNeedCheckRequest(productId);
        return response;
    }
);

export const updateProduct = createAsyncThunk(
    "product/update",
    async ({ productId, data }) => {
        const response = await productAPI.update(productId, data);
        return response;
    }
);

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
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(getProductsByStoreId.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.productsByStoreId = action.payload;
                state.error = null;
            })
            .addCase(getProductsByStoreId.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error;
                state.success = false;
            })
            .addCase(getProductsByStoreCategoryId.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(getProductsByStoreCategoryId.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.productsByStoreCategoryId = action.payload;
                state.error = null;
            })
            .addCase(getProductsByStoreCategoryId.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error;
                state.success = false;
            })
            .addCase(addProduct.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(addProduct.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.productAdded = action.payload;
                state.error = null;
            })
            .addCase(addProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error;
                state.success = false;
            })
            .addCase(getProductById.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(getProductById.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.productInfo = action.payload;
                state.error = null;
            })
            .addCase(getProductById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error;
                state.success = false;
            })
            .addCase(updateProduct.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(updateProduct.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.productInfo = action.payload;
                state.error = null;
            })
            .addCase(updateProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error;
                state.success = false;
            })
            .addCase(sendNeedCheckProduct.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(sendNeedCheckProduct.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.productAdded = null;
                state.error = null;
            })
            .addCase(sendNeedCheckProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error;
                state.success = false;
            });
    },
});

export const { setLoading, setError, setSuccess } = productSlice.actions;

export const selectLoading = (state) => state.product.loading;
export const selectError = (state) => state.product.error;
export const selectSuccess = (state) => state.product.success;
export const selectProductInfo = (state) => state.product.productInfo;
export const selectProductAdded = (state) => state.product.productAdded;
export const selectProductNeedCheckInfo = (state) => state.product.productNeedCheckInfo;
export const selectProductsByStoreId = (state) => state.product.productsByStoreId;
export const selectProductsByStoreCategoryId = (state) => state.product.productsByStoreCategoryId;

export default productSlice.reducer;
