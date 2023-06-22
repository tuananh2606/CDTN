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
import { useNavigate } from 'react-router-dom';

export const loginUser = async (user, dispatch, navigate, path) => {
    dispatch(loginStart());
    try {
        const res = await axios.post('http://localhost:3001/v1/auth/login', user);
        dispatch(loginSuccess(res.data));
        path ? navigate(path) : navigate('/user');
    } catch (err) {
        dispatch(loginFailed());
    }
};
export const registerUser = async (user, dispatch, navigate) => {
    dispatch(registerStart());
    try {
        await axios.post('http://localhost:3001/v1/auth/register', user);
        dispatch(registerSuccess());
        navigate('/');
    } catch (err) {
        dispatch(registerFailed());
    }
};
export const logoutUser = async (dispatch, accessToken, navigate, axiosJWT) => {
    try {
        await axiosJWT.post('/v1/auth/logout', {
            headers: { token: `Bearer ${accessToken}` },
        });
        dispatch(logoutSuccess());
        navigate('/');
    } catch (err) {
        dispatch(logoutFailed());
    }
};
