import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import storeProcessAPI from "../../../api/storeProcessAPI";

const initialState = {
    editingStores: [],
    loading: false,
    success: false,
    error: null,
};

export const getEditingStores = createAsyncThunk("storeProcess/getEditingStores", async () => {
    const response = await storeProcessAPI.findStoreProcess(); // Assuming your API call is implemented correctly
    console.log(response)
    return response;
});

export const sendEditStoreReply = createAsyncThunk(
    "storeProcess/sendEditStoreResponse",
    async ({ storeId, reply }) => {
        console.log()
        try {
            const updatedStore = await storeProcessAPI.sendReply(storeId, reply);
            return updatedStore;
        } catch (error) {
            // Handle error
            throw error;
        }
    }
);
const storeProcessSlice = createSlice({
    name: "storeProcess",
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
            .addCase(getEditingStores.pending, (state) => {
                state.success = false;
                state.loading = true;
                state.error = null;
            })
            .addCase(getEditingStores.rejected, (state, action) => {
                state.success = false;
                state.loading = false;
                state.error = action.error;
            })
            .addCase(getEditingStores.fulfilled, (state, action) => {
                state.success = true;
                state.loading = false;
                state.editingStores = action.payload;
                state.error = null;
            })
            .addCase(sendEditStoreReply.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(sendEditStoreReply.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error;
            })
            .addCase(sendEditStoreReply.fulfilled, (state, action) => {
                state.loading = false;
                // Handle successful response if needed
            });

    },
});

export const { setLoading, setError, setSuccess } = storeProcessSlice.actions;

export const selectLoading = (state) => state.storeProcess.loading;
export const selectError = (state) => state.storeProcess.error;
export const selectSuccess = (state) => state.storeProcess.success;
export const selectEditingStores = (state) => state.storeProcess.editingStores;

export default storeProcessSlice.reducer;
