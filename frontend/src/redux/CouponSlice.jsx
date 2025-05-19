import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    coupon: { code: "" },
    couponAdd: { isCoupon: false, discount: 0 }
};


export const couponSlice = createSlice({
    name: "coupon",
    initialState,
    reducers: {
        updateCoupon: (state, action) => {
            state.coupon.code = action.payload.code;
        },
        updateCouponAdd: (state, action) => {
            state.couponAdd.isCoupon = action.payload.isCoupon;
            state.couponAdd.discount = action.payload.discount;
        }
    }
});

export const { updateCoupon, updateCouponAdd } = couponSlice.actions;
export default couponSlice.reducer;