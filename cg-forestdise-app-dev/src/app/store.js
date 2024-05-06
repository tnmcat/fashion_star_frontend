import { configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import cartReducer from "../features/cart/cartSlice";
import variantReducer from "../features/variant/variantSlice";
import userReducer from "../features/user/userSlice";
import bulletReducer from "../features/variant/bulletSlide";
import hashtagReducer from "../features/variant/hashtagSlide";
import productReducer from "../features/variant/productSlide";
import shopReducer from "../features/variant/shopSlide";
import commentReducer from "../features/coment_review/commentSlide";
import reviewReducer from "../features/coment_review/reviewSlide";
import sellerStoreReducer from "../features/sellerStore/sellerStoreSlice";
import sellerReducer from "../features/seller/sellerSlice";
import categoryReducer from "../features/variant/categorySlide";
import homeReducer from "../features/home/homeSlice";
import storeCategoryReducer from "../features/variant/storeCategorySlide";
import optionReducer from "../features/variant/optionSlide";
import optionValueReducer from "../features/variant/optionValueSlide";
import paymentReducer from "../features/payment/paymentSlice";
import imageReducer from "../features/variant/ImageSlide";
import orderReducer from "../features/order/orderSlice";

//selling reducer

const persistConfig10 = {
  key: "root10",
  version: 1,
  storage,
};
const persistConfig20 = {
  key: "root20",
  version: 1,
  storage,
};
const persistConfig30 = {
  key: "root30",
  version: 1,
  storage,
};
const persistConfig40 = {
  key: "root40",
  version: 1,
  storage,
};
const persistConfig50 = {
  key: "root50",
  version: 1,
  storage,
};
const persistConfig60 = {
  key: "root60",
  version: 1,
  storage,
};
const persistConfig70 = {
  key: "root70",
  version: 1,
  storage,
};
const persistConfig80 = {
  key: "root80",
  version: 1,
  storage,
};

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
const userPersistedReducer = persistReducer(persistConfig, userReducer);
const sellerPersistedReducer = persistReducer(persistConfig, sellerReducer);
const sellerStorePersistedReducer = persistReducer(
  persistConfig2,
  sellerStoreReducer
);
const storeCategoryPersistedReducer = persistReducer(
  persistConfig2,
  storeCategoryReducer
);
const categoryPersistedReducer = persistReducer(
  persistConfig3,
  categoryReducer
);
const cartPersistedReducer = persistReducer(persistConfig3, cartReducer);
// const orderPersistedReducer = persistReducer(persistConfig3, orderReducer);
const hashtagPersistedReducer = persistReducer(persistConfig4, hashtagReducer);
const productPersistedReducer = persistReducer(persistConfig4, productReducer);
const shopPersistedReducer = persistReducer(persistConfig4, shopReducer);
const commentPersistedReducer = persistReducer(persistConfig4, commentReducer);
const reviewPersistedReducer = persistReducer(persistConfig4, reviewReducer);

//selling
const sellerPersistedReducerForSelling = persistReducer(persistConfig10, sellerReducer);
const sellerStorePersistedReducerForSelling = persistReducer(persistConfig20, sellerStoreReducer);
const storeCategoryPersistedReducerForSelling = persistReducer(persistConfig30, storeCategoryReducer);
const categoryPersistedReducerForSelling = persistReducer(persistConfig40, categoryReducer);
const productPersistedReducerForSelling = persistReducer(persistConfig50, productReducer);
const optionPersistedReducerForSelling = persistReducer(persistConfig60, optionReducer);
const optionValuePersistedReducerForSelling = persistReducer(persistConfig70, optionValueReducer);
const variantPersistedReducerForSelling = persistReducer(persistConfig80, variantReducer);


export const store = configureStore({
  reducer: {
    cart: cartPersistedReducer,
    sellerStore: sellerStorePersistedReducer,
    variant: variantReducer,
    user: userPersistedReducer,
    bullet: bulletReducer,
    hashtag: hashtagPersistedReducer,
    product: productPersistedReducer,
    shop: shopPersistedReducer,
    comment: commentPersistedReducer,
    review: reviewPersistedReducer,
    seller: sellerPersistedReducer,
    category: categoryPersistedReducer,
    storeCategory: storeCategoryPersistedReducer,
    option: optionReducer,
    optionValue: optionValueReducer,
    payment: paymentReducer,
    image: imageReducer,
    home: homeReducer,
    order: orderReducer,

    sellerStoreSelling: sellerStorePersistedReducerForSelling,
    sellerSelling: sellerPersistedReducerForSelling,
    categorySelling: categoryPersistedReducerForSelling,
    storeCategorySelling: storeCategoryPersistedReducerForSelling,
    productSelling: productPersistedReducerForSelling,
    optionSelling: optionPersistedReducerForSelling,
    optionValueSelling: optionValuePersistedReducerForSelling,
    variantSelling: variantPersistedReducerForSelling


  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          FLUSH,
          REHYDRATE,
          PAUSE,
          PERSIST,
          PURGE,
          REGISTER,
        ],
      },
    }),
});

export let persistor = persistStore(store);
