import { store } from '../redux/store';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { loginSuccess } from '../redux/authSlice';
const {
  auth: {
    login: { currentUser: user },
  },
} = store.getState();
const refreshToken = async () => {
  try {
    const res = await axios.get('http://localhost:3001/v1/auth/refresh', {
      withCredentials: true,
    });
    console.log(res);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

export const createAxios = (user, dispatch, stateSuccess) => {
  const axiosApiInstance = axios.create({
    baseURL: 'http://localhost:3001',
    headers: {
      'Content-Type': 'application/json',
    },
    withCredentials: true,
  });
  axiosApiInstance.interceptors.request.use(
    async (config) => {
      let date = new Date();
      const decodedToken = jwt_decode(user?.accessToken);
      if (decodedToken.exp * 1000 < date.getTime()) {
        const data = await refreshToken();
        console.log(data);
        if (!data) {
          localStorage.clear();
        }
        const refreshUser = {
          ...user,
          accessToken: data.accessToken,
        };
        dispatch(loginSuccess(refreshUser));
        config.headers['token'] = 'Bearer ' + data.accessToken;
      }
      return config;
    },
    (error) => {
      Promise.reject(error);
    },
  );

  return axiosApiInstance;
};

// Request interceptor for API calls

// Response interceptor for API calls
// axiosApiInstance.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   async function (error) {
//     const originalRequest = error.config;
//     if (error.response.status === 403 && !originalRequest._retry) {
//       originalRequest._retry = true;
//       const access_token = await refreshAccessToken();
//       axios.defaults.headers.common['Authorization'] = 'Bearer ' + access_token;
//       return axiosApiInstance(originalRequest);
//     }
//     return Promise.reject(error);
//   },
// );
