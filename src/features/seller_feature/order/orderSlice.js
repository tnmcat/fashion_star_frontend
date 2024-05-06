import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import orderApi from "../../../api/seller/orderAPI";


const initialState = {
    ordersByUser: [],
    ordersByStore: [],
    loading: false,
    success: false,
    error: null,
};

export const getOrdersByUserId = createAsyncThunk("order/getByUserId", async (userId) => {
    const response = await orderApi.getOrdersByUserId(userId);
    return response;
});

export const getOrdersByStoreId = createAsyncThunk("order/getByStoreId", async (storeId) => {
    const response = await orderApi.getOrdersByStoreId(storeId);
    console.log(response)
    return response;
});

export const getOrderByOrderId = createAsyncThunk("order/getByOrderId", async (orderId) => {
    const response = await orderApi.findOrder(orderId);
    console.log(response)
    return response;
});

export const updateOrder = createAsyncThunk("order/updateOrder", async ({ orderId, data }) => {
    const response = await orderApi.updateOrder(orderId, data);
    return response;
});

const orderSlice = createSlice({
    name: "order",
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
            .addCase(getOrdersByUserId.pending, (state) => {
                state.success = false;
                state.loading = true;
                state.error = false;
            })
            .addCase(getOrdersByUserId.rejected, (state, action) => {
                state.success = false;
                state.loading = false;
                state.error = action.error;
            })
            .addCase(getOrdersByUserId.fulfilled, (state, action) => {
                state.success = true;
                state.loading = false;
                state.ordersByUser = action.payload;
                state.error = false;
            })
            .addCase(getOrdersByStoreId.pending, (state) => {
                state.success = false;
                state.loading = true;
                state.error = false;
            })
            .addCase(getOrdersByStoreId.rejected, (state, action) => {
                state.success = false;
                state.loading = false;
                state.error = action.error;
            })
            .addCase(getOrdersByStoreId.fulfilled, (state, action) => {
                state.success = true;
                state.loading = false;
                state.ordersByStore = action.payload;
                state.error = false;
            })
            .addCase(updateOrder.pending, (state) => {
                state.success = false;
                state.loading = true;
                state.error = false;
            })
            .addCase(updateOrder.rejected, (state, action) => {
                state.success = false;
                state.loading = false;
                state.error = action.error;
            })
            .addCase(updateOrder.fulfilled, (state, action) => {
                state.success = true;
                state.loading = false;
                // Handle the updated order here if needed
                state.error = false;
            });
    },
});

export const { setLoading, setError, setSuccess } = orderSlice.actions;

export const selectLoading = (state) => state.order.loading;
export const selectError = (state) => state.order.error;
export const selectSuccess = (state) => state.order.success;
export const selectOrdersByUser = (state) => state.order.ordersByUser;
export const selectOrdersByStore = (state) => state.order.ordersByStore;

export default orderSlice.reducer;
