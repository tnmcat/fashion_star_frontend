import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import sellerApi from "../../../api/seller/sellerAPI";
import jwt_decode from "jwt-decode";

const initialState = {
  sellerInfo: null,
  loading: false,
  success: false,
  successNotify: '',
  error: false,
};

export const setSellerInfo = createAsyncThunk("seller/info", async (sellerID) => {
  const token = window.localStorage.getItem("seller_token");
  console.log(sellerID);
  console.log("token in setSllerInfo" + token);
  const response = await sellerApi.findSeller(sellerID, token);
  return response;
});
export const loginSeller = createAsyncThunk("seller/login", async (credentials) => {
  const token = await sellerApi.loginSeller(credentials);
  console.log(token);
  window.localStorage.setItem("seller_token", token);
  console.log("seller id:  " + (jwt_decode(token).sub));
  return jwt_decode(token).sub;
});


export const registerSeller = createAsyncThunk("seller/register", async (userData) => {
  console.log(userData);
  const response = await sellerApi.registerSeller(userData);
  console.log('res' + response);
  return response;
});

export const updateSeller = createAsyncThunk("seller/update", async ({ sellerId, data }) => {
  console.log(sellerId);
  console.log(data);
  const response = await sellerApi.updateSeller(sellerId, data);
  return response;
});

const sellerSlice = createSlice({
  name: "seller",
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
    logOutSeller: (state) => {
      state.sellerInfo = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(setSellerInfo.pending, (state) => {
        state.success = false;
        state.loading = true;
        state.error = false;
      })
      .addCase(setSellerInfo.rejected, (state, action) => {
        state.success = false;
        state.loading = false;
        state.error = action.error;
      })
      .addCase(setSellerInfo.fulfilled, (state, action) => {
        state.success = true;
        state.loading = false;
        state.sellerInfo = action.payload;
        state.error = false;
      })
      .addCase(loginSeller.pending, (state) => {
        state.success = false;
        state.loading = true;
        state.error = false;
      })
      .addCase(loginSeller.rejected, (state, action) => {
        state.success = false;
        state.loading = false;
        state.error = action.error;
      })
      .addCase(loginSeller.fulfilled, (state, action) => {
        state.success = true;
        state.loading = false;
        state.sellerInfo = action.payload;
        state.successNotify = 'Log in succesfully! Welcome back';
        state.error = false;
      })
      .addCase(registerSeller.pending, (state) => {
        state.success = false;
        state.loading = true;
        state.error = false;
      })
      .addCase(registerSeller.rejected, (state, action) => {
        state.success = false;
        state.loading = false;
        state.error = action.error;
      })
      .addCase(registerSeller.fulfilled, (state, action) => {
        state.success = true;
        state.loading = false;
        state.sellerInfo = action.payload;
        state.error = false;
      });
  },
});

export const { setLoading, setError, setSuccess, logOutSeller } = sellerSlice.actions;

export const selectLoading = (state) => state.seller.loading;
export const selectError = (state) => state.seller.error;
export const selectSuccess = (state) => state.seller.success;
export const selectSellerDetail = (state) => state.seller.sellerInfo;
export const selectSuccessNotify = (state) => state.seller.successNotify;
export default sellerSlice.reducer;

