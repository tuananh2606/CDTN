import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_URL;

const userApis = {
  getUser: async (accessToken, id) => {
    try {
      const response = await axios.get(`${BASE_URL}/v1/user/` + id, {
        headers: { token: `Bearer ${accessToken}` },
      });
      return response.data;
    } catch (error) {
      console.log(error);
    }
  },

  changePassword: async (accessToken, data) => {
    try {
      const response = await axios.post(`${BASE_URL}/v1/user/change-password`, data, {
        headers: { token: `Bearer ${accessToken}` },
      });
      return response;
    } catch (error) {
      console.log(error);
    }
  },
  editProfile: async (accessToken, data) => {
    try {
      const response = await axios.put(`${BASE_URL}/v1/user/edit-profile`, data, {
        headers: { token: `Bearer ${accessToken}` },
      });
      return response;
    } catch (error) {
      console.log(error);
    }
  },
};

export default userApis;
