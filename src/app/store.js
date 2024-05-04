import { configureStore } from "@reduxjs/toolkit";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
  persistStore,
} from "redux-persist";
//import storage from "redux-persist/lib/storage";
import categoryReducer from "../features/category/categorySlice";
import productReducer from "../features/product/productSlice";
import optionReducer from "../features/option/optionSlice";
import optionValueReducer from "../features/option_value/optionValueSlice";
import sellerReducer from "../features/seller/sellerSlice";
import variantReducer from "../features/variant/variantSlice";
import sellerStoreReducer from "../features/store/sellerStoreSlice";
import storeCategoryReducer from "../features/store_category/storeCategorySlice";
import userReducer from "../features/user/userSlice";
import storage from "redux-persist/lib/storage";


const persistConfig = {
  key: "root",
  version: 1,
  storage,
};
const persistConfig2 = {
  key: "root2",
  version: 1,
  storage,
};
const persistConfig3 = {
  key: "root3",
  version: 1,
  storage,
};
const persistConfig4 = {
  key: "root4",
  version: 1,
  storage,
};
const persistConfig5 = {
  key: "root5",
  version: 1,
  storage,
};
const persistConfig6 = {
  key: "root6",
  version: 1,
  storage,
};
const persistConfig7 = {
  key: "root7",
  version: 1,
  storage,
};
const persistConfig8 = {
  key: "root8",
  version: 1,
  storage,
};
const userPersistedReducer = persistReducer(persistConfig, userReducer);
const sellerPersistedReducer = persistReducer(persistConfig, sellerReducer);
const sellerStorePersistedReducer = persistReducer(persistConfig2, sellerStoreReducer);
const storeCategoryPersistedReducer = persistReducer(persistConfig3, storeCategoryReducer);
const categoryPersistedReducer = persistReducer(persistConfig4, categoryReducer);
const productPersistedReducer = persistReducer(persistConfig5, productReducer);
const optionPersistedReducer = persistReducer(persistConfig6, optionReducer);
const optionValuePersistedReducer = persistReducer(persistConfig7, optionValueReducer);
const variantPersistedReducer = persistReducer(persistConfig8, variantReducer);

export const store = configureStore({
  reducer: {
    sellerStore: sellerStorePersistedReducer,
    user: userPersistedReducer,
    seller: sellerPersistedReducer,
    category: categoryPersistedReducer,
    storeCategory: storeCategoryPersistedReducer,
    product: productPersistedReducer,
    option: optionPersistedReducer,
    optionValue: optionValuePersistedReducer,
    variant: variantPersistedReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export let persistor = persistStore(store);
