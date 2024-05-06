import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  findPaymentMethod,
  addPaymentMethod,
  findShippingMethod,
  findAddress,
  updateAddress,
  addAddress,
  createShopOrder,
} from "../../api/paymentAPI";

export const getAddress = createAsyncThunk("address/list", async (userId) => {
  const response = await findAddress(userId);
  return response.data;
});

export const addNewAddress = createAsyncThunk(
  "address/add",
  async (address) => {
    const response = await addAddress(address);
    return response.data;
  }
);

export const editAddress = createAsyncThunk("address/edit", async (address) => {
  const response = await updateAddress(address);
  return response.data;
});

export const getPaymentMethod = createAsyncThunk(
  "paymentMethod/list",
  async (userId) => {
    const response = await findPaymentMethod(userId);
    return response.data;
  }
);

export const addNewPaymentMethod = createAsyncThunk(
  "paymentMethod/add",
  async (paymentMethod) => {
    const response = await addPaymentMethod(paymentMethod);
    return response.data;
  }
);

export const getShippingMethod = createAsyncThunk(
  "shippingMethod",
  async () => {
    const response = await findShippingMethod();
    return response.data;
  }
);

export const addShopOrder = createAsyncThunk(
  "shopOrder/add",
  async (shopOrder) => {
    const response = await createShopOrder(shopOrder);
    return response.data;
  }
);

const initialState = {
  addressId: null,
  shippingMethodId: null,
  paymentMethodId: null,
  paymentMethod: [],
  shippingMethod: [],
  address: [],
  success: false,
  loading: false,
  error: false,
};

export const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    addAdressId: (state, action) => {
      if (state.addressId !== null) {
        state.addressId = null;
      }
      state.addressId = action.payload.addressId;
    },
    addShippingmethodId: (state, action) => {
      if (state.shippingMethodId !== null) {
        state.shippingMethodId = null;
      }
      state.shippingMethodId = action.payload.shippingMethodId;
    },
    addPaymentMethodId: (state, action) => {
      if (state.paymentMethodId !== null) {
        state.paymentMethodId = null;
      }
      state.paymentMethodId = action.payload.paymentMethodId;
    },
    clear:(state)=>{
      state.addressId = null;
      state.shippingMethodId = null;
      state.paymentMethodId = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAddress.pending, (state) => {
        state.success = false;
        state.loading = true;
        state.error = false;
      })
      .addCase(getAddress.rejected, (state, action) => {
        state.success = false;
        state.loading = false;
        state.error = action.error;
      })
      .addCase(getAddress.fulfilled, (state, action) => {
        state.success = true;
        state.loading = false;
        state.error = false;
        state.address = action.payload;
      })
      .addCase(addNewAddress.pending, (state) => {
        state.success = false;
        state.loading = true;
        state.error = false;
      })
      .addCase(addNewAddress.rejected, (state, action) => {
        state.success = false;
        state.loading = false;
        state.error = action.error;
      })
      .addCase(addNewAddress.fulfilled, (state, action) => {
        state.success = true;
        state.loading = false;
        state.error = false;
        state.address.push(action.payload);
      })
      .addCase(editAddress.pending, (state) => {
        state.success = false;
        state.loading = true;
        state.error = false;
      })
      .addCase(editAddress.rejected, (state, action) => {
        state.success = false;
        state.loading = false;
        state.error = action.error;
      })
      .addCase(editAddress.fulfilled, (state, action) => {
        state.success = true;
        state.loading = false;
        state.error = false;
        state.address = action.payload;
      })
      .addCase(getPaymentMethod.pending, (state) => {
        state.success = false;
        state.loading = true;
        state.error = false;
      })
      .addCase(getPaymentMethod.rejected, (state, action) => {
        state.success = false;
        state.loading = false;
        state.error = action.error;
      })
      .addCase(getPaymentMethod.fulfilled, (state, action) => {
        state.success = true;
        state.loading = false;
        state.error = false;
        state.paymentMethod = action.payload;
      })
      .addCase(addNewPaymentMethod.pending, (state) => {
        state.success = false;
        state.loading = true;
        state.error = false;
      })
      .addCase(addNewPaymentMethod.rejected, (state, action) => {
        state.success = false;
        state.loading = false;
        state.error = action.error;
      })
      .addCase(addNewPaymentMethod.fulfilled, (state, action) => {
        state.success = true;
        state.loading = false;
        state.error = false;
        state.paymentMethod.push(action.payload);
      })
      .addCase(getShippingMethod.pending, (state) => {
        state.success = false;
        state.loading = true;
        state.error = false;
      })
      .addCase(getShippingMethod.rejected, (state, action) => {
        state.success = false;
        state.loading = false;
        state.error = action.error;
      })
      .addCase(getShippingMethod.fulfilled, (state, action) => {
        state.success = true;
        state.loading = false;
        state.error = false;
        state.shippingMethod = action.payload;
      })
      .addCase(addShopOrder.pending, (state) => {
        state.success = false;
        state.loading = true;
        state.error = false;
      })
      .addCase(addShopOrder.rejected, (state, action) => {
        state.success = false;
        state.loading = false;
        state.error = action.error;
      })
      .addCase(addShopOrder.fulfilled, (state, action) => {
        state.success = true;
        state.loading = false;
        state.error = false;
      });
  },
});

export const { addAdressId, addPaymentMethodId, addShippingmethodId, clear } = paymentSlice.actions;

export default paymentSlice.reducer;
