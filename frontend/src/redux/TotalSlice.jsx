import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    total: 0,
    subTotal: 0,
};


export const totalSlice = createSlice({
    name: "totals",
    initialState,
    reducers: {
        updateTotals: (state, action) => {
            state.total = action.payload.total;
            state.subTotal = action.payload.subTotal;
        },
        resetTotals: (state) => {
            state.total = 0;
            state.subTotal = 0;
        }
    }
});

export const { updateTotals, resetTotals } = totalSlice.actions;
export default totalSlice.reducer;