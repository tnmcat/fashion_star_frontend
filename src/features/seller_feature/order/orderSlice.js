import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import orderApi from "../../../api/seller/orderAPI";

const initialState = {
    ordersByUser: [],
    ordersByStore: [],
    orderInfo: {},
    loading: false,
    success: false,
    error: null,
};

// Async Thunks
export const getOrdersByUserId = createAsyncThunk("order/getByUserId", async (userId) => {
    const response = await orderApi.getOrdersByUserId(userId);
    return response;
});

export const getOrdersByStoreId = createAsyncThunk("order/getByStoreId", async (storeId) => {
    const response = await orderApi.getOrdersByStoreId(storeId);
    console.log(response);
    return response;
});

export const getOrderByOrderId = createAsyncThunk("order/getByOrderId", async (orderId) => {
    const response = await orderApi.findOrder(orderId);
    console.log(response);
    return response;
});

export const acceptOrder = createAsyncThunk("order/acceptOrder", async ({ orderId }) => {
    const response = await orderApi.acceptOrder(orderId);
    return response;
});

export const cancelOrder = createAsyncThunk("order/cancelOrder", async ({ orderId }) => {
    const response = await orderApi.cancelOrder(orderId);
    return response;
});

export const deliverOrder = createAsyncThunk("order/deliverOrder", async ({ orderId }) => {
    const response = await orderApi.deliverOrder(orderId);
    return response;
});

export const completeOrder = createAsyncThunk("order/completeOrder", async ({ orderId }) => {
    const response = await orderApi.completeOrder(orderId);
    return response;
});

// Slice
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
                state.error = null;
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
                state.error = null;
            })
            .addCase(getOrdersByStoreId.pending, (state) => {
                state.success = false;
                state.loading = true;
                state.error = null;
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
                state.error = null;
            })
            .addCase(cancelOrder.pending, (state) => {
                state.success = false;
                state.loading = true;
                state.error = null;
            })
            .addCase(cancelOrder.rejected, (state, action) => {
                state.success = false;
                state.loading = false;
                state.error = action.error;
            })
            .addCase(cancelOrder.fulfilled, (state, action) => {
                state.success = true;
                state.loading = false;
                state.orderInfo = action.payload;
                state.error = null;
            })
            .addCase(deliverOrder.pending, (state) => {
                state.success = false;
                state.loading = true;
                state.error = null;
            })
            .addCase(deliverOrder.rejected, (state, action) => {
                state.success = false;
                state.loading = false;
                state.error = action.error;
            })
            .addCase(deliverOrder.fulfilled, (state, action) => {
                state.success = true;
                state.loading = false;
                state.orderInfo = action.payload;
                state.error = null;
            }).addCase(completeOrder.pending, (state) => {
                state.success = false;
                state.loading = true;
                state.error = null;
            })
            .addCase(completeOrder.rejected, (state, action) => {
                state.success = false;
                state.loading = false;
                state.error = action.error;
            })
            .addCase(completeOrder.fulfilled, (state, action) => {
                state.success = true;
                state.loading = false;
                state.orderInfo = action.payload;
                state.error = null;
            });
    },
});

// Export Actions and Selectors
export const { setLoading, setError, setSuccess } = orderSlice.actions;
export const selectLoading = (state) => state.order.loading;
export const selectError = (state) => state.order.error;
export const selectSuccess = (state) => state.order.success;
export const selectOrdersByUser = (state) => state.order.ordersByUser;
export const selectOrderInfo = (state) => state.order.orderInfo;
export const selectOrdersByStore = (state) => state.order.ordersByStore;

export default orderSlice.reducer;
