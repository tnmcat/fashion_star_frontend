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
import storage from "redux-persist/lib/storage";
import categoryReducer from "../features/seller_feature/category/categorySlice";
import optionReducer from "../features/seller_feature/option/optionSlice";
import optionValueReducer from "../features/seller_feature/option_value/optionValueSlice";
import productReducer from "../features/seller_feature/product/productSlice";
import sellerReducer from "../features/seller_feature/seller/sellerSlice";
import sellerStoreReducer from "../features/seller_feature/store/sellerStoreSlice";
import storeProcessSlice from "../features/seller_feature/store/storeProcessSlice";
import storeCategoryReducer from "../features/seller_feature/store_category/storeCategorySlice";
import variantReducer from "../features/seller_feature/variant/variantSlice";
import imageReducer from "../features/seller_feature/image/imageSlice";


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

const sellerPersistedReducer = persistReducer(persistConfig, sellerReducer);
const sellerStorePersistedReducer = persistReducer(persistConfig2, sellerStoreReducer);
const storeCategoryPersistedReducer = persistReducer(persistConfig3, storeCategoryReducer);
const categoryPersistedReducer = persistReducer(persistConfig4, categoryReducer);
const productPersistedReducer = persistReducer(persistConfig5, productReducer);
const optionPersistedReducer = persistReducer(persistConfig6, optionReducer);
const optionValuePersistedReducer = persistReducer(persistConfig7, optionValueReducer);
const variantPersistedReducer = persistReducer(persistConfig8, variantReducer);
const imagePersistedReducer = persistReducer(persistConfig8, imageReducer);


const storeProcessPersistedReducer = persistReducer(persistConfig2, storeProcessSlice);

export const store = configureStore({
  reducer: {
    sellerStore: sellerStorePersistedReducer,
    seller: sellerPersistedReducer,
    category: categoryPersistedReducer,
    storeCategory: storeCategoryPersistedReducer,
    product: productPersistedReducer,
    option: optionPersistedReducer,
    optionValue: optionValuePersistedReducer,
    variant: variantPersistedReducer,
    image: imagePersistedReducer,



    storeProcess: storeProcessPersistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export let persistor = persistStore(store);
