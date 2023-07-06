import { createSlice } from '@reduxjs/toolkit';
import { loginUser } from './apiRequest';

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        errorMessage: '',
        login: {
            currentUser: null,
            isFetching: false,
            error: false,
        },
        register: {
            isFetching: false,
            error: false,
        },
        logout: {
            isFetching: false,
            error: false,
        },
    },
    reducers: {
        loginSuccess: (state, action) => {
            state.login.isFetching = false;
            state.login.currentUser = action.payload;
            state.login.error = false;
        },

        registerStart: (state) => {
            state.register.isFetching = true;
        },
        registerSuccess: (state) => {
            state.register.isFetching = false;
            state.register.error = false;
        },
        registerFailed: (state) => {
            state.register.isFetching = false;
            state.register.error = true;
        },

        logoutSuccess: (state) => {
            state.register.isFetching = false;
            state.login.currentUser = null;
            state.register.error = false;
        },
        logoutFailed: (state) => {
            state.register.isFetching = false;
            state.register.error = true;
            state.register.errorMessage = '';
        },
    },
    extraReducers: {
        // login user
        [loginUser.pending]: (state) => {
            state.login.isFetching = true;
            state.errorMessage = '';
        },
        [loginUser.fulfilled]: (state, { payload }) => {
            state.login.isFetching = false;
            state.login.error = false;
            state.login.currentUser = payload;
            state.errorMessage = '';
        },
        [loginUser.rejected]: (state, { payload }) => {
            state.login.isFetching = false;
            state.login.error = true;
            state.errorMessage = payload;
        },
    },
});

export const {
    loginStart,
    loginSuccess,
    loginFailed,
    registerStart,
    registerSuccess,
    registerFailed,
    logoutSuccess,
    logoutFailed,
} = authSlice.actions;
export default authSlice.reducer;
