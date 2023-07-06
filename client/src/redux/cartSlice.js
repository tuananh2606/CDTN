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
                state.shoppingCart[check].quantity += 1;
            } else {
                state.shoppingCart.push(payload);
            }
        },
        removeFromCart: (state, action) => {
            state.shoppingCart = state.shoppingCart.filter((product) => product.id != action.payload);
        },
        updateCartItem: (state, action) => {
            const check = state.shoppingCart.findIndex((product) => product.id === action.payload.id);
            if (check !== -1) {
                const { idx, quantity } = action.payload;
                state.shoppingCart[idx].quantity = Number(quantity);
            }
        },
        getEstimatedTotal: (state, action) => {
            let { total, cartQuantity } = state.shoppingCart.reduce(
                (cartTotal, cartItem) => {
                    const { price, quantity } = cartItem;
                    const itemTotal = price * quantity;

                    cartTotal.total += itemTotal;
                    cartTotal.quantity += quantity;

                    return cartTotal;
                },
                {
                    total: 0,
                    cartQuantity: 0,
                },
            );
            total = parseFloat(total.toFixed(2));
            console.log(total);
        },
        emptyCart: (state) => {
            state.shoppingCart = [];
        },
    },
});

export const { addToCart, removeFromCart, updateCartItem, getEstimatedTotal, emptyCart } = cartSlice.actions;

export default cartSlice.reducer;
