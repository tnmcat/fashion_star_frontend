import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import addressAPI from "../../../api/seller/addressAPI";

const initialState = {
    addresses: [],
    loading: false,
    success: false,
    error: null,
};

export const fetchAddressesByUserId = createAsyncThunk(
    "addresses/fetchAddressesByUserId",
    async (userId) => {
        const response = await addressAPI.findAllByUserId(userId);
        return response;
    }
);

export const fetchAddressesBySellerId = createAsyncThunk(
    "addresses/fetchAddressesByUserId",
    async (sellerId) => {
        const response = await addressAPI.findAllBySellerId(sellerId);
        return response;
    }
);

export const createSellerAddress = createAsyncThunk(
    "addresses/createAddress",
    async ({ sellerId, addressData }) => {
        const response = await addressAPI.createSellerAddress(sellerId, addressData);
        return response;
    }
);

export const updateAddress = createAsyncThunk(
    "addresses/updateAddress",
    async ({ addressId, addressData }) => { // Include addressId and addressData parameters
        console.log("at reducer: +" + addressData);
        const response = await addressAPI.update(addressId, addressData); // Pass addressId and addressData to update function
        return response;
    }
);


export const deleteAddress = createAsyncThunk(
    "addresses/deleteAddress",
    async (addressId) => {
        await addressAPI.delete(addressId);
        return addressId;
    }
);

const addressSlice = createSlice({
    name: "addresses",
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
            .addCase(fetchAddressesByUserId.pending, (state) => {
                state.success = false;
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAddressesByUserId.rejected, (state, action) => {
                state.success = false;
                state.loading = false;
                state.error = action.error;
            })
            .addCase(fetchAddressesByUserId.fulfilled, (state, action) => {
                state.success = true;
                state.loading = false;
                state.addresses = action.payload;
                state.error = null;
            })
            .addCase(createSellerAddress.pending, (state) => {
                state.success = false;
                state.loading = true;
                state.error = null;
            })
            .addCase(createSellerAddress.rejected, (state, action) => {
                state.success = false;
                state.loading = false;
                state.error = action.error;
            })
            .addCase(createSellerAddress.fulfilled, (state, action) => {
                state.success = true;
                state.loading = false;
                state.addresses.push(action.payload);
                state.error = null;
            })
            .addCase(updateAddress.pending, (state) => {
                state.success = false;
                state.loading = true;
                state.error = null;
            })
            .addCase(updateAddress.rejected, (state, action) => {
                state.success = false;
                state.loading = false;
                state.error = action.error;
            })
            .addCase(updateAddress.fulfilled, (state, action) => {
                state.success = true;
                state.loading = false;
                // Cập nhật địa chỉ trong danh sách với dữ liệu mới
                state.addresses = state.addresses.map(address =>
                    address.id === action.payload.id ? action.payload : address
                );
                state.error = null;
            })
            .addCase(deleteAddress.pending, (state) => {
                state.success = false;
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteAddress.rejected, (state, action) => {
                state.success = false;
                state.loading = false;
                state.error = action.error;
            })
            .addCase(deleteAddress.fulfilled, (state, action) => {
                state.success = true;
                state.loading = false;
                state.addresses = state.addresses.filter(address => address.id !== action.payload);
                state.error = null;
            });
    },
});

export const { setLoading, setError, setSuccess } = addressSlice.actions;

export const selectLoading = (state) => state.addresses.loading;
export const selectError = (state) => state.addresses.error;
export const selectSuccess = (state) => state.addresses.success;
export const selectAddresses = (state) => state.addresses.addresses;

export default addressSlice.reducer;
