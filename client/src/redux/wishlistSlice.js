import { createSlice } from '@reduxjs/toolkit';

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState: [],
  reducers: {
    addToWishlist: (state, action) => {
      state.push(action.payload);
    },

    removeFromWishlist: (state) => {},
  },
});

export const { addToWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
