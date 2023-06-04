export const getAllUsers = async (axiosJWT, accessToken, page, limit) => {
    try {
        const response = await axiosJWT.get(`http://localhost:3001/v1/user`, {
            headers: { token: `Bearer ${accessToken}` },
            params: {
                page: page,
                limit: limit,
            },
        });
        return response.data;
    } catch (error) {
        console.log(error);
    }
};
