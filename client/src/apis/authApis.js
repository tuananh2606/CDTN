import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_URL;

const authApis = {
    sendMailResetPassword: async (email) => {
        try {
            const response = await axios.post(`${BASE_URL}/v1/auth/password-reset`, email);
            return response.data;
        } catch (error) {
            console.log(error);
        }
    },
    resetPassword: async (userId, token, data) => {
        try {
            const response = await axios.post(`${BASE_URL}/v1/auth/password-reset/${userId}?token=${token}`, data);
            return response.data;
        } catch (error) {
            console.log(error);
        }
    },
};

export default authApis;
