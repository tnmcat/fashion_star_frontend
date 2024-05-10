import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import imageAPI from "../../../api/seller/imageAPI";

const initialState = {
    images: [],
    loading: false,
    success: false,
    error: null,
};


export const deleteImage = createAsyncThunk(
    "images/deleteImage",
    async (imageId) => {
        await imageAPI.delete(imageId);
        return imageId;
    }
);

const imageSlice = createSlice({
    name: "images",
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
            .addCase(deleteImage.pending, (state) => {
                state.success = false;
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteImage.rejected, (state, action) => {
                state.success = false;
                state.loading = false;
                state.error = action.error;
            })
            .addCase(deleteImage.fulfilled, (state, action) => {
                state.success = true;
                state.loading = false;
                state.images = state.images.filter(image => image.id !== action.payload);
                state.error = null;
            });
    },
});

export const { setLoading, setError, setSuccess } = imageSlice.actions;

export const selectLoading = (state) => state.images.loading;
export const selectError = (state) => state.images.error;
export const selectSuccess = (state) => state.images.success;
export const selectImages = (state) => state.images.images;

export default imageSlice.reducer;
