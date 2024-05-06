import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import optionAPI from "../../../api/seller/optionAPI";

const initialState = {
    options: [],
    loading: false,
    success: false,
    error: null,
};

export const fetchOptionsByProductId = createAsyncThunk(
    "options/fetchOptionsByProductId",
    async (productId) => {
        const response = await optionAPI.findAll(productId);
        return response;
    }
);

export const createOption = createAsyncThunk(
    "options/createOption",
    async ({ data, productId }) => {
        const response = await optionAPI.add(data, productId);
        return response;
    }
);

export const updateOption = createAsyncThunk(
    "options/updateOption", // Fix action type here
    async (data) => {
        const response = await optionAPI.update(data);
        return response;
    }
);

export const deleteOption = createAsyncThunk(
    "options/deleteOption",
    async (optionId) => {
        await optionAPI.deleteOption(optionId);
        return optionId;
    }
);

const optionSlice = createSlice({
    name: "options",
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
            .addCase(fetchOptionsByProductId.pending, (state) => {
                state.success = false;
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchOptionsByProductId.rejected, (state, action) => {
                state.success = false;
                state.loading = false;
                state.error = action.error;
            })
            .addCase(fetchOptionsByProductId.fulfilled, (state, action) => {
                state.success = true;
                state.loading = false;
                state.options = action.payload;
                state.error = null;
            })
            .addCase(createOption.pending, (state) => {
                state.success = false;
                state.loading = true;
                state.error = null;
            })
            .addCase(createOption.rejected, (state, action) => {
                state.success = false;
                state.loading = false;
                state.error = action.error;
            })
            .addCase(createOption.fulfilled, (state, action) => {
                state.success = true;
                state.loading = false;
                state.options.push(action.payload);
                state.error = null;
            })
            .addCase(updateOption.pending, (state) => { // Update this line
                state.success = false;
                state.loading = true;
                state.error = null;
            })
            .addCase(updateOption.rejected, (state, action) => { // Update this line
                state.success = false;
                state.loading = false;
                state.error = action.error;
            })
            .addCase(updateOption.fulfilled, (state, action) => { // Update this line
                state.success = true;
                state.loading = false;
                state.options = state.options.map(option =>
                    option.id === action.payload.id ? action.payload : option
                );
                state.error = null;
            })
            .addCase(deleteOption.pending, (state) => {
                state.success = false;
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteOption.rejected, (state, action) => {
                state.success = false;
                state.loading = false;
                state.error = action.error;
            })
            .addCase(deleteOption.fulfilled, (state, action) => {
                state.success = true;
                state.loading = false;
                state.options = state.options.filter(option => option.id !== action.payload);
                state.error = null;
            });
    },
});

export const { setLoading, setError, setSuccess } = optionSlice.actions;

export const selectLoading = (state) => state.options.loading;
export const selectError = (state) => state.options.error;
export const selectSuccess = (state) => state.options.success;
export const selectOptions = (state) => state.options.options;

export default optionSlice.reducer;
