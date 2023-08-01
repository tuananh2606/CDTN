import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_URL;

const wishlistApis = {
  getWishlist: async (id) => {
    try {
      const response = await axios.get(`${BASE_URL}/v1/wishlist/${id}`);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  },
  checkProductInWishlist: async (user, product) => {
    try {
      const data = {
        user: user,
        product: product,
      };
      const response = await axios.post(`${BASE_URL}/v1/wishlist/check`, data);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  },
  addToWishlist: async (accessToken, data) => {
    try {
      const response = await axios.post(`${BASE_URL}/v1/wishlist`, data, {
        headers: { token: `Bearer ${accessToken}` },
      });
      return response.data;
    } catch (error) {
      console.log(error);
    }
  },
  removeFromWishlist: async (accessToken, id) => {
    try {
      const response = await axios.delete(`${BASE_URL}/v1/wishlist/${id}`, {
        headers: { token: `Bearer ${accessToken}` },
      });
      return response.data;
    } catch (error) {
      console.log(error);
    }
  },
};

export default wishlistApis;
