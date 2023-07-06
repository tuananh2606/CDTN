import axios from 'axios';
import jwt_decode from 'jwt-decode';

const refreshToken = async () => {
    try {
        const res = await axios.post('http://localhost:3001/v1/auth/refresh', {
            withCredentials: true,
        });
        console.log(res.data);
        return res.data;
    } catch (err) {
        console.log(err);
    }
};

export const createAxios = (user, dispatch, stateSuccess) => {
    const newInstance = axios.create({
        baseURL: 'http://localhost:3001',
    });
    newInstance.interceptors.request.use(
        async (config) => {
            let date = new Date();
            const decodedToken = jwt_decode(user?.accessToken);

            if (decodedToken.exp < date.getTime() / 1000) {
                localStorage.removeItem('persist:root');
                const data = await refreshToken();
                // if (!data) {
                //     localStorage.clear();
                // }
                console.log(data);
                // const refreshUser = {
                //     ...user,
                //     accessToken: data.accessToken,
                // };
                // console.log(refreshUser);
                // dispatch(stateSuccess(refreshUser));
                config.headers['token'] = 'Bearer ' + data.accessToken;
            }
            return config;
        },
        (err) => {
            return Promise.reject(err);
        },
    );
    return newInstance;
};
