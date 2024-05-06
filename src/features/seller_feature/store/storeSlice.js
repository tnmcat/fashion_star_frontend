import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import storeApi from "../../../api/seller/storeAPI";

const initialState = {
    storeInfo: null,
    storeBySeller: {},
    loading: false,
    success: false,
    error: null,
};

export const setStoreInfo = createAsyncThunk("store/info", async (storeID) => {
    const response = await storeApi.findStore(storeID);
    return response;
});

export const getStoreBySellerId = createAsyncThunk("store/storeBySeller", async (sellerId) => {
    console.log('at reducer' + sellerId)
    const response = await storeApi.getStoreBySellerId(sellerId);

    console.log(response)
    return response;
});

export const createNewStore = createAsyncThunk("store/createNewStore", async (storeData, sellerId) => {
    const response = await storeApi.createNewStore(storeData, sellerId);
    return response;
});

export const updateStore = createAsyncThunk("store/updateStore", async ({ storeId, storeData }) => {
    const response = await storeApi.updateStore(storeId, storeData);
    return response;
});

const storeSlice = createSlice({
    name: "store",
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
            .addCase(setStoreInfo.pending, (state) => {
                state.success = false;
                state.loading = true;
                state.error = false;
            })
            .addCase(setStoreInfo.rejected, (state, action) => {
                state.success = false;
                state.loading = false;
                state.error = action.error;
            })
            .addCase(setStoreInfo.fulfilled, (state, action) => {
                state.success = true;
                state.loading = false;
                state.storeInfo = action.payload;
                state.error = false;
            })
            .addCase(getStoreBySellerId.pending, (state) => {
                state.success = false;
                state.loading = true;
                state.error = false;
            })
            .addCase(getStoreBySellerId.rejected, (state, action) => {
                state.success = false;
                state.loading = false;
                state.error = action.error;
            })
            .addCase(getStoreBySellerId.fulfilled, (state, action) => {
                state.success = true;
                state.loading = false;
                state.storesBySeller = action.payload;
                state.error = false;
            })
            .addCase(createNewStore.pending, (state) => {
                state.success = false;
                state.loading = true;
                state.error = false;
            })
            .addCase(createNewStore.rejected, (state, action) => {
                state.success = false;
                state.loading = false;
                state.error = action.error;
            })
            .addCase(createNewStore.fulfilled, (state, action) => {
                state.success = true;
                state.loading = false;
                state.storeInfo = action.payload;
                state.error = false;
            })
            .addCase(updateStore.pending, (state) => {
                state.success = false;
                state.loading = true;
                state.error = false;
            })
            .addCase(updateStore.rejected, (state, action) => {
                state.success = false;
                state.loading = false;
                state.error = action.error;
            })
            .addCase(updateStore.fulfilled, (state, action) => {
                state.success = true;
                state.loading = false;
                state.storeInfo = action.payload;
                state.error = false;
            });;
    },
});

export const { setLoading, setError, setSuccess } = storeSlice.actions;

export const selectLoading = (state) => state.store.loading;
export const selectError = (state) => state.store.error;
export const selectSuccess = (state) => state.store.success;
export const selectStoreDetail = (state) => state.store.storeInfo;
export const selectStoreBySeller = (state) => state.store.storeBySeller;

export default storeSlice.reducer;
