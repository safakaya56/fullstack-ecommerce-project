import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isModal: false
}

export const searchModalSlice = createSlice({
    name: "searchModal",
    initialState,
    reducers: {
        openModal: (state) => {
            state.isModal = true;
        },
        closeModal: (state) => {
            state.isModal = false;
        }
    }
});


export const { openModal, closeModal } = searchModalSlice.actions;
export default searchModalSlice.reducer;