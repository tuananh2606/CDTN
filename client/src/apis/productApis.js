import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_URL;

const productApis = {
    getAllProducts: async () => {
        try {
            const response = await axios.get(`${BASE_URL}/v1/product/`);
            return response.data;
        } catch (error) {
            console.log(error);
        }
    },
    getLatestProducts: async () => {
        try {
            const response = await axios.get(`${BASE_URL}/v1/product/latest`);
            return response.data;
        } catch (error) {
            console.log(error);
        }
    },
    getProductsByCategory: async (category) => {
        try {
            const response = await axios.get(`${BASE_URL}/v1/product/by-category`, {
                params: {
                    category: category,
                },
            });
            return response.data;
        } catch (error) {
            console.log(error);
        }
    },
    getProductDetails: async (slug, code) => {
        try {
            const response = await axios.get(`${BASE_URL}/v1/product/${slug}/${code}`);
            return response.data;
        } catch (error) {
            console.log(error);
        }
    },
    updateUser: async (axiosJWT, accessToken, data) => {
        const { id, updateUser } = data;
        console.log(data);
        try {
            const response = await axiosJWT.put('/v1/user/' + id, updateUser, {
                headers: { token: `Bearer ${accessToken}` },
            });
            return response.data;
        } catch (error) {
            console.log(error);
        }
        return;
    },
    deleteUser: async (axiosJWT, accessToken, _id) => {
        try {
            const response = await axiosJWT.delete('/v1/user/' + _id, {
                headers: { token: `Bearer ${accessToken}` },
            });
            return response.data;
        } catch (error) {
            console.log(error);
        }
    },
    searchProduct: async (searchValue) => {
        try {
            const response = await axios.post(`${BASE_URL}/v1/product/search`, {
                params: {
                    q: searchValue
                },
            });
            return response.data;
        } catch (error) {
            console.log(error);
        }
    },
};

export default productApis;
