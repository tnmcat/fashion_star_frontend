import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import variantAPI from "../../../api/seller/variantAPI";

const initialState = {
    variantInfo: null,
    variantsByProductId: [],
    loading: false,
    success: false,
    error: null,
};

export const getVariantsByProductId = createAsyncThunk("variant/variants_by_product_id", async (productId) => {
    const response = await variantAPI.findAll(productId);
    return response;
});

export const addVariant = createAsyncThunk(
    "variant/add",
    async ({ productId }) => {
        const response = await variantAPI.add(productId);
        return response; // Assuming response.data contains serializable data
    }
);

export const updateVariant = createAsyncThunk(
    "variant/update",
    async ({ variantId, updatedVariant }) => {
        const response = await variantAPI.update(variantId, updatedVariant);
        return response.data; // Assuming response.data contains the updated variant
    }
);

export const deleteVariant = createAsyncThunk(
    "variant/delete",
    async (variantId) => {
        const response = await variantAPI.delete(variantId);
        return response; // Return the deleted variantId
    }
);

// New async thunk to find variants by product ID and list of value IDs
export const findVariantsByProductIdAndValueIds = createAsyncThunk(
    "variant/find_variants_by_product_id_and_value_ids",
    async (request) => {
        try {
            const response = await variantAPI.findByProductIdAndValueIds(request.productId, request.optionValueIds);
            return response;
        } catch (error) {
            throw new Error(error.message);
        }
    }
);

// Add the updateVariant and deleteVariant async thunks to the extraReducers
const variantSlice = createSlice({
    name: "variant",
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
            // existing cases...
            .addCase(updateVariant.pending, (state) => {
                state.success = false;
                state.loading = true;
                state.error = null;
            })
            .addCase(updateVariant.rejected, (state, action) => {
                state.success = false;
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(updateVariant.fulfilled, (state, action) => {
                state.success = true;
                state.loading = false;
                // Update the variant in the state with the updated data
                state.variantsByProductId = state.variantsByProductId.map(variant =>
                    variant.id === action.payload ? action.payload : variant
                );
                state.error = null;
            })
            .addCase(deleteVariant.pending, (state) => {
                state.success = false;
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteVariant.rejected, (state, action) => {
                state.success = false;
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(deleteVariant.fulfilled, (state, action) => {
                state.success = true;
                state.loading = false;
                // Remove the deleted variant from the state
                state.variantsByProductId = state.variantsByProductId.filter(variant => variant.id !== action.payload);
                state.error = null;
            })
            .addCase(findVariantsByProductIdAndValueIds.pending, (state) => {
                state.success = false;
                state.loading = true;
                state.error = null;
            })
            .addCase(findVariantsByProductIdAndValueIds.rejected, (state, action) => {
                state.success = false;
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(findVariantsByProductIdAndValueIds.fulfilled, (state, action) => {
                state.success = true;
                state.loading = false;
                state.variantInfo = action.payload;
                state.error = null;
            });
    },
});

export const { setLoading, setError, setSuccess } = variantSlice.actions;

export const selectLoading = (state) => state.variant.loading;
export const selectError = (state) => state.variant.error;
export const selectSuccess = (state) => state.variant.success;
export const selectVariantInfo = (state) => state.variant.variantInfo;
export const selectVariantsByProductId = (state) => state.variant.variantsByProductId;

export default variantSlice.reducer;
