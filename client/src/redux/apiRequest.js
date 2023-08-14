import axios from 'axios';
import {
  loginStart,
  loginSuccess,
  loginFailed,
  registerStart,
  registerSuccess,
  registerFailed,
  logoutSuccess,
  logoutFailed,
} from './authSlice';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const logoutUser = async (dispatch, accessToken, navigate, axiosJWT) => {
  try {
    await axiosJWT.post(`${BASE_URL}/v1/auth/logout`, {
      headers: { token: `Bearer ${accessToken}` },
    });
    dispatch(logoutSuccess());
    navigate('/');
  } catch (err) {
    dispatch(logoutFailed());
  }
};

export const loginUser = createAsyncThunk('auth/login', async (user, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${BASE_URL}/v1/auth/login`, user, {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    if (error.response && error.response.data.message) {
      return rejectWithValue(error.response.data);
    } else {
      return rejectWithValue(error.response.data);
    }
  }
});
// export const loginUser = async (user, dispatch, navigate, path) => {
//     dispatch(loginStart());
//     try {
//         const res = await axios.post(`${BASE_URL}/v1/auth/login`, user);

//         dispatch(loginSuccess(res.data));
//         console.log(res);
//         path ? navigate(path) : navigate('/user');
//     } catch (err) {
//         console.log(err);
//         dispatch(loginFailed());
//     }
// };
export const registerUser = async (user, dispatch, navigate) => {
  dispatch(registerStart());
  try {
    await axios.post(`${BASE_URL}/v1/auth/register`, user);
    dispatch(registerSuccess());
    navigate('/');
  } catch (err) {
    dispatch(registerFailed());
  }
};
