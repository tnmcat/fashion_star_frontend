import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import storeApi from "../../../api/seller/storeAPI";

const initialState = {
    storeBySeller: null,
    loading: false,
    success: false,
    error: null,
};

export const getStoreBySellerId = createAsyncThunk("store/storeBySeller", async (sellerId) => {
    console.log('at reducer' + sellerId)
    const response = await storeApi.getStoreBySellerId(sellerId);
    console.log(response)
    return response;
});

export const createNewStore = createAsyncThunk("store/createNewStore", async ({ storeData, sellerId }) => {
    const response = await storeApi.createNewStore(storeData, sellerId);
    return response;
});

const storeSlice = createSlice({
    name: "sellerStore",
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
                state.storeBySeller = action.payload;
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
                state.storeBySeller = action.payload; // Change this line to storeBySeller
                state.error = false;
            });
    },
});

export const { setLoading, setError, setSuccess } = storeSlice.actions;

export const selectLoading = (state) => state.sellerStore.loading;
export const selectError = (state) => state.sellerStore.error;
export const selectSuccess = (state) => state.sellerStore.success;
export const selectStoreBySeller = (state) => state.sellerStore.storeBySeller;

export default storeSlice.reducer;
