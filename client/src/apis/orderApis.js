import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_URL;

const orderApis = {
    getAllOrders: async () => {
        try {
            const response = await axios.get(`${BASE_URL}/v1/product/`);
            return response.data;
        } catch (error) {
            console.log(error);
        }
    },
    createOrder: async (accessToken, data) => {
        console.log(data);
        try {
            const response = await axios.post('/v1/order/', data, {
                headers: { token: `Bearer ${accessToken}` },
            });
            return response.data;
        } catch (error) {
            console.log(error);
        }
        return;
    },
};

export default orderApis;
