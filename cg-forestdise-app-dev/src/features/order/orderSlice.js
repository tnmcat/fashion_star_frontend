import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {
    apiCreateOrder,
    apiGetOrderById,
    apiOrderHistory,
} from "../../api/orderAPI";
import {faL} from "@fortawesome/free-solid-svg-icons";

export const createOrder = createAsyncThunk(
    "reqData/create1",
    async (reqData, thunkAPI) => {
        try {
            const response = await apiCreateOrder(reqData);
            if (response.status === 200) {
                return response.data;
            } else {
                return thunkAPI.rejectWithValue("Failed to create order");
            }
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);
export const getOrderById = createAsyncThunk(
    "order/getById",
    async ({orderId, userId}, thunkAPI) => {
        try {
            const response = await apiGetOrderById({orderId, userId});
            if (response.status === 200) {
                return response.data; // Trả về thành công
            } else {
                return thunkAPI.rejectWithValue("Failed to fetch order"); // Sử dụng rejectWithValue để trả về một lỗi tùy chỉnh
            }
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response.data || "Unknown error occurred"
            );
        }
    }
);
export const getHistoryOrder = createAsyncThunk(
    "order/userId",
    async (userId, thunkAPI) => {
        console.log(userId);
        try {
            const response = await apiOrderHistory(userId);
            if (response.status === 200) {
                return response.data; // Trả về thành công
            } else {
                return thunkAPI.rejectWithValue("Failed to fetch orderhistory"); // Sử dụng rejectWithValue để trả về một lỗi tùy chỉnh
            }
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response
                    ? error.response.data
                    : "Unknown error occurred (orderhistory)"
            );
        }
    }
);

const initialState = {
    orders: [],
    order: null,
    loading: false,
    error: null,
    success: false,
};
export const orderSlice = createSlice({
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
        setOrder: (state, action) => {
            state.order = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(createOrder.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(createOrder.rejected, (state, action) => {
                state.loading = false;
                state.error = true;
                state.errorMessage = action.payload || "Unknown error occurred"; // Sử dụng thông tin lỗi từ payload nếu có
            })
            .addCase(createOrder.fulfilled, (state, action) => {
                state.loading = false;
                state.order = action.payload;
                state.success = true;
                state.error = false;
            })

            //getOrderById
            .addCase(getOrderById.pending, (state) => {
                state.loading = true;
            })
            .addCase(getOrderById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(getOrderById.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.order = action.payload;
            })

            //getOrderHistory
            .addCase(getHistoryOrder.pending, (state) => {
                state.success = false;
                state.loading = true;
                state.error = null; // null này là null đang tải
            })
            .addCase(getHistoryOrder.rejected, (state, action) => {
                console.log("Error object:", action.error);
                console.log("Error payload:", action.payload);
                state.loading = false;
                state.error = action.payload || action.error.message;
                state.success = false;
            })
            .addCase(getHistoryOrder.fulfilled, (state, action) => {
                console.log("Fulfilled payload:", action.payload);
                state.loading = false;
                state.order = action.payload;
                state.success = true;
                state.error = null; // null này là null thành công
            });
    },
});
export default orderSlice.reducer;
