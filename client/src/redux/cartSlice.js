import { createSlice, current } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        shoppingCart: [],
    },
    reducers: {
        addToCart: (state, { payload }) => {
            const check = state.shoppingCart.findIndex((product) => product.id === payload.id);
            console.log(check);
            if (check !== -1) {
                console.log(state.shoppingCart[check].quantity);
                state.shoppingCart[check].quantity += 1;
                console.log(typeof state.shoppingCart[check].quantity);
            } else {
                state.shoppingCart.push(payload);
            }
        },
        removeFromCart: (state, action) => {
            state.shoppingCart = state.shoppingCart.filter((product) => product.id != action.payload);
            // state.shoppingCart = state.shoppingCart.filter((product) => {
            //     console.log(product);
            //     product.id !== action.payload;
            // });
        },
        updateCartItem: (state, action) => {
            const check = state.shoppingCart.findIndex((product) => product.id === action.payload.id);
            if (check !== -1) {
                const { idx, quantity } = action.payload;
                console.log(typeof quantity);
                state.shoppingCart[idx].quantity = Number(quantity);
            }
        },
    },
});

export const { addToCart, removeFromCart, updateCartItem } = cartSlice.actions;

export default cartSlice.reducer;
