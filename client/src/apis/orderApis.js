import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_URL;

const orderApis = {
  getAllOrders: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/v1/order/`);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  },
  getOrderDetails: async (id) => {
    try {
      const response = await axios.get(`${BASE_URL}/v1/order/${id}`);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  },
  getOrderById: async (id) => {
    try {
      const response = await axios.get(`${BASE_URL}/v1/order/orderId/${id}`);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  },
  getOrderByUser: async (id) => {
    try {
      const response = await axios.get(`${BASE_URL}/v1/order/user/${id}`);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  },
  createOrder: async (accessToken, data) => {
    console.log(data);
    try {
      const response = await axios.post(`${BASE_URL}/v1/order`, data, {
        headers: { token: `Bearer ${accessToken}` },
      });
      return response.data;
    } catch (error) {
      console.log(error);
    }
  },
  purchaseByVnPay: async (accessToken, data) => {
    try {
      const response = await axios.post(`${BASE_URL}/v1/order/payment-vnpay`, data, {
        headers: { token: `Bearer ${accessToken}` },
      });
      return response.data;
    } catch (error) {
      console.log(error);
    }
    return;
  },
  updateStatusOrderVnPay: async (accessToken, orderId, data) => {
    try {
      const response = await axios.put(`${BASE_URL}/v1/order/vnpay/${orderId}`, data, {
        headers: { token: `Bearer ${accessToken}` },
      });
      return response.data;
    } catch (error) {
      console.log(error);
    }
  },
  updateStatusOrder: async (accessToken, data) => {
    try {
      const response = await axios.put(
        `${BASE_URL}/v1/order/${data.id}`,
        { orderStatus: data.status },
        {
          headers: { token: `Bearer ${accessToken}` },
        },
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  },
};

export default orderApis;
