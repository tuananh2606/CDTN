import { useState } from 'react';
import { Input, TextField, Button } from '@mui/material';
import styled from 'styled-components';
import axios from 'axios';
import { loginSuccess } from '../../../redux/authSlice';
import { useSelector, useDispatch } from 'react-redux';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import adminApis from '../../../apis/adminApis';
import { createAxios } from '../../../utils/http';

const CreateProductPage = ({ setCreatePageShow }) => {
    const [code, setCode] = useState('');
    const [name, setName] = useState('');
    const [slug, setSlug] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [price, setPrice] = useState('');
    const [stock, setStock] = useState('');
    const [images, setImages] = useState([]);

    const user = useSelector((state) => state.auth.login.currentUser);
    const dispatch = useDispatch();

    let axiosJWT = createAxios(user, dispatch, loginSuccess);

    const queryClient = useQueryClient();

    const createProductMutation = useMutation({
        mutationFn: (data) => adminApis.createProduct(axiosJWT, user?.accessToken, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['products'] });
        },
    });

    async function _handleSubmit(e) {
        e.preventDefault();
        let formData = new FormData();
        formData.set('name', name);
        formData.set('category', category);
        Array.from(images).forEach((item) => {
            formData.append('images', item);
        });
        const check = formData.getAll('images').length > 0 || formData.getAll('videos').length > 0;
        try {
            let newProduct = {};
            if (check) {
                const { data } = await axios.post(`${import.meta.env.VITE_BASE_URL}/v1/product/upload`, formData);

                newProduct = {
                    code,
                    name,
                    slug,
                    description,
                    category: category.charAt(0).toUpperCase() + category.slice(1).toLowerCase(),
                    price,
                    stock,
                    images: data.images,
                };
            } else {
                newProduct = {
                    code,
                    name,
                    slug,
                    description,
                    category: category.charAt(0).toUpperCase() + category.slice(1).toLowerCase(),
                    price,
                    stock,
                };
            }

            createProductMutation.mutate(newProduct);
            // setCreatePageShow(false);
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <>
            <Form onSubmit={_handleSubmit} encType="multipart/form-data">
                <StyledTextInput type="text" name="code" label="Code" onChange={(e) => setCode(e.target.value)} />
                <StyledTextInput type="text" name="name" label="Name" onChange={(e) => setName(e.target.value)} />
                <StyledTextInput type="text" name="slug" label="Slug" onChange={(e) => setSlug(e.target.value)} />

                <StyledTextInput
                    type="text"
                    name="description"
                    label="Description"
                    onChange={(e) => setDescription(e.target.value)}
                />
                {/* <input type="text" onChange={(e) => setName(e.target.value)} value={'Test'} name="name" /> */}
                <label>Images</label>
                <input
                    type="file"
                    name="images"
                    multiple
                    accept="image/*"
                    onChange={(e) => setImages(e.target.files)}
                />
                {/* <StyledTextInput type="text" name="code" label="Variation" onChange={(e) => setName(e.target.value)} /> */}
                <StyledTextInput
                    type="text"
                    name="category"
                    label="Category"
                    onChange={(e) => setCategory(e.target.value)}
                />
                <StyledTextInput type="text" name="price" label="Price" onChange={(e) => setPrice(e.target.value)} />
                <StyledTextInput type="text" name="stock" label="Stock" onChange={(e) => setStock(e.target.value)} />
                <Button variant="outlined" color="secondary" type="submit" sx={{ mt: 3 }}>
                    Submit
                </Button>
            </Form>
        </>
    );
};

export default CreateProductPage;

const Form = styled.form`
    display: flex;
    flex-direction: column;
`;

const StyledTextInput = styled(TextField)`
    margin: 0.5rem 0;
`;
