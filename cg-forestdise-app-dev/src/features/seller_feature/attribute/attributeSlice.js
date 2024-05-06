import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import attributeAPI from "../../../api/seller/attributeAPI";

const initialState = {
    attributes: [],
    loading: false,
    success: false,
    error: null,
};

export const fetchAttributesByProductId = createAsyncThunk(
    "attributes/fetchAttributesByProductId",
    async (productId) => {
        const response = await attributeAPI.findAll(productId);
        return response;
    }
);

export const createAttribute = createAsyncThunk(
    "attributes/createAttribute",
    async ({ data, productId }) => {
        const response = await attributeAPI.add(data, productId);
        return response;
    }
);

export const updateAttribute = createAsyncThunk(
    "attributes/updateAttribute", // Fix action type here
    async (data) => {
        const response = await attributeAPI.update(data);
        return response;
    }
);

export const deleteAttribute = createAsyncThunk(
    "attributes/deleteAttribute",
    async (attributeId) => {
        await attributeAPI.delete(attributeId);
        return attributeId;
    }
);

const attributeSlice = createSlice({
    name: "attributes",
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
            .addCase(fetchAttributesByProductId.pending, (state) => {
                state.success = false;
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAttributesByProductId.rejected, (state, action) => {
                state.success = false;
                state.loading = false;
                state.error = action.error;
            })
            .addCase(fetchAttributesByProductId.fulfilled, (state, action) => {
                state.success = true;
                state.loading = false;
                state.attributes = action.payload;
                state.error = null;
            })
            .addCase(createAttribute.pending, (state) => {
                state.success = false;
                state.loading = true;
                state.error = null;
            })
            .addCase(createAttribute.rejected, (state, action) => {
                state.success = false;
                state.loading = false;
                state.error = action.error;
            })
            .addCase(createAttribute.fulfilled, (state, action) => {
                state.success = true;
                state.loading = false;
                state.attributes.push(action.payload);
                state.error = null;
            })
            .addCase(updateAttribute.pending, (state) => { // Update this line
                state.success = false;
                state.loading = true;
                state.error = null;
            })
            .addCase(updateAttribute.rejected, (state, action) => { // Update this line
                state.success = false;
                state.loading = false;
                state.error = action.error;
            })
            .addCase(updateAttribute.fulfilled, (state, action) => { // Update this line
                state.success = true;
                state.loading = false;
                state.attributes = state.attributes.map(attribute =>
                    attribute.id === action.payload.id ? action.payload : attribute
                );
                state.error = null;
            })
            .addCase(deleteAttribute.pending, (state) => {
                state.success = false;
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteAttribute.rejected, (state, action) => {
                state.success = false;
                state.loading = false;
                state.error = action.error;
            })
            .addCase(deleteAttribute.fulfilled, (state, action) => {
                state.success = true;
                state.loading = false;
                state.attributes = state.attributes.filter(attribute => attribute.id !== action.payload);
                state.error = null;
            });
    },
});

export const { setLoading, setError, setSuccess } = attributeSlice.actions;

export const selectLoading = (state) => state.attributes.loading;
export const selectError = (state) => state.attributes.error;
export const selectSuccess = (state) => state.attributes.success;
export const selectAttributes = (state) => state.attributes.attributes;

export default attributeSlice.reducer;
