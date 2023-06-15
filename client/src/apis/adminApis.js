const adminApis = {
    //Users
    getAllUsers: async (req, res, next) => {
        return;
    },
    getUser: async (axiosJWT, accessToken, _id) => {
        try {
            const response = await axiosJWT.get('/v1/user/' + _id, {
                headers: { token: `Bearer ${accessToken}` },
            });
            return response.data;
        } catch (error) {
            console.log(error);
        }
    },
    createUser() {
        return;
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
    //Categories
    getAllCategories: async (axiosJWT, accessToken) => {
        try {
            const response = await axiosJWT.get('/v1/category/', {
                headers: { token: `Bearer ${accessToken}` },
            });
            return response.data;
        } catch (error) {
            console.log(error);
        }
    },
    getCategory: async (axiosJWT, accessToken, slug) => {
        try {
            const response = await axiosJWT.get('/v1/category/' + slug, {
                headers: { token: `Bearer ${accessToken}` },
            });
            return response.data;
        } catch (error) {
            console.log(error);
        }
    },
    getCategoryById: async (axiosJWT, accessToken, _id) => {
        try {
            const response = await axiosJWT.get('/v1/category/update/' + _id, {
                headers: { token: `Bearer ${accessToken}` },
            });
            return response.data;
        } catch (error) {
            console.log(error);
        }
    },
    createCategory: async (axiosJWT, accessToken, newCate) => {
        try {
            const response = await axiosJWT.post('/v1/category/', newCate, {
                headers: { token: `Bearer ${accessToken}` },
            });
            return response.data;
        } catch (error) {
            console.log(error);
        }
    },
    updateCategory: async (axiosJWT, accessToken, id, data) => {
        console.log(data);
        try {
            const response = await axiosJWT.put('/v1/category/' + id, data, {
                headers: { token: `Bearer ${accessToken}` },
            });
            return response.data;
        } catch (error) {
            console.log(error);
        }
        return;
    },
    deleteCategory: async (axiosJWT, accessToken, _id, name) => {
        try {
            const response = await axiosJWT.delete(
                '/v1/category/' + _id,
                { data: { name: name } },
                {
                    headers: { token: `Bearer ${accessToken}` },
                },
            );
            return response.data;
        } catch (error) {
            console.log(error);
        }
    },

    // uploadImagesProduct: async (axiosJWT, accessToken) => {
    //     try {
    //         const response = axiosJWT.post('/v1/product/upload', body, {
    //             headers: {
    //                 token: `Bearer ${accessToken}`,
    //                 'Content-Type': 'multipart/form-data',
    //             },
    //         });
    //         return response.data;
    //     } catch (error) {
    //         console.log(error);
    //     }
    // },
    // uploadMedia: async (axiosJWT, accessToken, data) => {
    //     try {
    //         const response = axiosJWT.post('/v1/category/upload', data, {
    //             headers: {
    //                 token: `Bearer ${accessToken}`,
    //                 'Content-Type': 'multipart/form-data',
    //             },
    //         });
    //         return response.data;
    //     } catch (error) {
    //         console.log(error);
    //     }
    // },
    //Products
    getAllProducts: async (axiosJWT, accessToken) => {
        try {
            const response = await axiosJWT.get('/v1/product/', {
                headers: { token: `Bearer ${accessToken}` },
            });
            return response.data;
        } catch (error) {
            console.log(error);
        }
    },
    getProductById: async (axiosJWT, accessToken, _id) => {
        try {
            const response = await axiosJWT.get('/v1/product/' + _id, {
                headers: { token: `Bearer ${accessToken}` },
            });
            return response.data;
        } catch (error) {
            console.log(error);
        }
    },
    createProduct: async (axiosJWT, accessToken, data) => {
        try {
            const response = await axiosJWT.post('/v1/product/', data, {
                headers: { token: `Bearer ${accessToken}` },
            });
            return response.data;
        } catch (error) {
            console.log(error);
        }
    },
    updateProduct: async (axiosJWT, accessToken, id, data) => {
        console.log(data);
        try {
            const response = await axiosJWT.put('/v1/product/' + id, data, {
                headers: { token: `Bearer ${accessToken}` },
            });
            return response.data;
        } catch (error) {
            console.log(error);
        }
        return;
    },
    deleteProduct: async (axiosJWT, accessToken, _id, category, name) => {
        try {
            const response = await axiosJWT.delete(
                '/v1/product/' + _id,
                { data: { category: category, name: name } },
                {
                    headers: { token: `Bearer ${accessToken}` },
                },
            );
            return response.data;
        } catch (error) {
            console.log(error);
        }
    },
};

export default adminApis;
