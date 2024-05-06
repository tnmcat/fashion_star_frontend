import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import optionValueAPI from "../../../api/seller/optionValueAPI";

const initialState = {
    optionValues: [],
    loading: false,
    success: false,
    error: null,
};

export const fetchOptionValuesByOptionId = createAsyncThunk(
    "optionValue/fetchOptionValuesByOptionId",
    async (optionId) => {
        const response = await optionValueAPI.findAll(optionId);
        return response;
    }
);

export const addOptionValue = createAsyncThunk(
    "optionValue/addOptionValue",
    async ({ data, optionId }) => {
        const response = await optionValueAPI.add(data, optionId);
        return response;
    }
);
export const updateOptionValue = createAsyncThunk(
    "optionValue/updateOptionValue", // Corrected action type
    async (data) => {
        const response = await optionValueAPI.update(data);
        return response;
    }
);


const optionValueSlice = createSlice({
    name: "optionValue",
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
            .addCase(fetchOptionValuesByOptionId.pending, (state) => {
                state.success = false;
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchOptionValuesByOptionId.rejected, (state, action) => {
                state.success = false;
                state.loading = false;
                state.error = action.error;
            })
            .addCase(fetchOptionValuesByOptionId.fulfilled, (state, action) => {
                state.success = true;
                state.loading = false;
                state.optionValues = action.payload;
                state.error = null;
            })
            .addCase(addOptionValue.pending, (state) => {
                state.success = false;
                state.loading = true;
                state.error = null;
            })
            .addCase(addOptionValue.rejected, (state, action) => {
                state.success = false;
                state.loading = false;
                state.error = action.error;
            })
            .addCase(addOptionValue.fulfilled, (state, action) => {
                state.success = true;
                state.loading = false;
                state.optionValues.push(action.payload); // Assuming the API returns the newly added option value
                state.error = null;
            })
            .addCase(updateOptionValue.pending, (state) => {
                state.success = false;
                state.loading = true;
                state.error = null;
            })
            .addCase(updateOptionValue.rejected, (state, action) => {
                state.success = false;
                state.loading = false;
                state.error = action.error;
            })
            .addCase(updateOptionValue.fulfilled, (state, action) => {
                state.success = true;
                state.loading = false;
                state.optionValues = state.optionValues.map(optionValue =>
                    optionValue.id === action.payload.id ? action.payload : optionValue
                );
                state.error = null;
            })

            ;
    },
});

export const { setLoading, setError, setSuccess } = optionValueSlice.actions;

export const selectLoading = (state) => state.optionValue.loading;
export const selectError = (state) => state.optionValue.error;
export const selectSuccess = (state) => state.optionValue.success;
export const selectOptionValues = (state) => state.optionValue.optionValues;

export default optionValueSlice.reducer;
