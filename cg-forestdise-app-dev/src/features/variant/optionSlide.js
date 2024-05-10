import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {createOptions} from "../../api/optionAPI";
import {findAll} from "../../api/variantAPI";

const initialState = {
    options: [],
    option: {},
    loading: false,
    error: null,
    success: false,
};

export const createOptionList = createAsyncThunk(
    "option/create",
    async (optionList, productId) => {
        const response = await createOptions(optionList, productId);
        console.log(response.data);
        return response.data.optionTableDtoList;
    }
);

export const fetchOptionsByProductId = createAsyncThunk(
    "options/fetchOptionsByProductId",
    async (productId) => {
        const response = await findAll(productId);
        return response;
    }
);
export const optionSlide = createSlice({
    name: "option",
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
            .addCase(createOptionList.pending, (state) => {
                state.success = false;
                state.loading = true;
                state.error = false;
            })
            .addCase(createOptionList.rejected, (state, action) => {
                state.success = false;
                state.loading = false;
                state.error = action.error;
            })
            .addCase(createOptionList.fulfilled, (state, action) => {
                state.success = true;
                state.loading = false;
                state.options = action.payload;
                state.error = false;
            })
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
            });
    },
});
export const {setLoading, setError, setSuccess} = optionSlide.actions;
export const selectLoading = (state) => state.option.loading;
export const selectError = (state) => state.option.error;
export const selectSuccess = (state) => state.option.success;
export const selectOptionsList = (state) => state.option.options;
export const selectOptions = (state) => state.option.option;

//Enhancement feature of book slice
export const setLoadingTrueIfCalled = (isCalled) => (dispatch, getState) => {
    const currentValue = selectLoading(getState());
    if (currentValue === isCalled) {
        dispatch(setLoading(true));
    }
};

export default optionSlide.reducer;
