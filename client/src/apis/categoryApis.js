import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_URL;

const categoryApis = {
    getAllCategories: async () => {
        try {
            const response = await axios.get(`${BASE_URL}/v1/category/`);
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
};

export default categoryApis;
