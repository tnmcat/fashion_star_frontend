import {configureStore} from "@reduxjs/toolkit";
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
