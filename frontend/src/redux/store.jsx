import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./CartSlice"
import totalsReducer from "./TotalSlice"
import couponReducer from "./CouponSlice"
import searchModalReducer from "./SearchModalSlice"


export const store = configureStore({
    reducer: {
        cart: cartReducer,
        totals: totalsReducer,
        coupon: couponReducer,
        searchModal: searchModalReducer,

    },


})