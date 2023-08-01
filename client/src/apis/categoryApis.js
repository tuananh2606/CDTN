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
  getCategoryById: async (id) => {
    try {
      const response = await axios.get(`${BASE_URL}/v1/category/update/${id}`);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  },
};

export default categoryApis;
