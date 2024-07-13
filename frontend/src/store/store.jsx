import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import productSlice from "./slices/productSlice";
import foodSlice from "./slices/foodSlice";
import cartSlice from "./slices/cartSlice";
import userSlice from "./slices/fetchUser";
import orderSlice from "./slices/orderSlice";

export const store = configureStore({
    reducer: {
        authSlice: authSlice,
        productSlice: productSlice,
        foodSlice: foodSlice,
        cartSlice: cartSlice,
        userSlice: userSlice,
        orderSlice: orderSlice
    },
    // disable all the unnecessary default middlewares
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    })
})