import { createSlice } from "@reduxjs/toolkit";

const getCartFromStorage = () => {
    if (localStorage.getItem("cart")) {
        return JSON.parse(localStorage.getItem("cart"))

    }
    return [];
}

const saveCartToStorage = (cart) => {
    localStorage.setItem("cart", JSON.stringify(cart))
}


const initialState = {
    products: getCartFromStorage(),
}

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const findProduct = state.products.find((product) => product.id == action.payload.id);

            if (findProduct) {

                findProduct.quantity += action.payload.quantity;
            } else {

                state.products.push(action.payload);
            }

            saveCartToStorage(state.products);
        },


        removeFromBasket: (state, action) => {
            state.products = state.products.filter((product) => product.id !== action.payload);
            saveCartToStorage(state.products)
        },

        updateProductCount: (state, action) => {
            const findProduct = state.products && state.products.find((product) => product.id == action.payload.id)
            findProduct.quantity = action.payload.newCount;
            saveCartToStorage(state.products)
        }
    }
})

export const { addToCart, updateProductCount, removeFromBasket } = cartSlice.actions
export default cartSlice.reducer