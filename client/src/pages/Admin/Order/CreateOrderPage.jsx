import { useState } from 'react';
import { TextField, Button, InputLabel, MenuItem, FormControl, Select } from '@mui/material';
import styled from 'styled-components';
import axios from 'axios';
import { loginSuccess } from '../../../redux/authSlice';
import { useSelector, useDispatch } from 'react-redux';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import adminApis from '../../../apis/adminApis';
import { createAxios } from '../../../utils/http';

const CreateProductPage = () => {
    const [code, setCode] = useState('');
    const [name, setName] = useState('');
    const [slug, setSlug] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [price, setPrice] = useState('');
    const [stock, setStock] = useState('');
    const [images, setImages] = useState([]);
    const [categories, setCategories] = useState([]);

    const user = useSelector((state) => state.auth.login.currentUser);
    const dispatch = useDispatch();

    let axiosJWT = createAxios(user, dispatch, loginSuccess);

    const queryClient = useQueryClient();
    const createOrderMutation = useMutation({
        mutationFn: (data) => adminApis.createOrder(axiosJWT, user?.accessToken, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['orders'] });
        },
    });

    // useQuery({
    //     queryKey: ['orders'],
    //     queryFn: () => adminApis.getAllCategories(axiosJWT, user?.accessToken),
    //     onSuccess: (data) => {
    //         setCategories(
    //             data?.map((item, idx) => {
    //                 return { name: item.name, id: item._id };
    //             }),
    //         );
    //     },
    // });

    async function _handleSubmit(e) {
        e.preventDefault();
        try {
            let newOrder = {
                code,
                name,
                slug,
                description,
                category,
                price,
                stock,
            };

            createOrderMutation.mutate(newOrder);
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

                <FormControl fullWidth sx={{ mt: '1rem', mb: '0.5rem' }}>
                    <InputLabel id="select-label">Category</InputLabel>
                    <Select
                        labelId="select-label"
                        id="select"
                        value={category || ''}
                        label="Category"
                        onChange={(e) => setCategory(e.target.value)}
                    >
                        {categories &&
                            categories.length > 0 &&
                            categories.map((item, idx) => (
                                <MenuItem key={idx} value={item.id}>
                                    {item.name}
                                </MenuItem>
                            ))}
                    </Select>
                </FormControl>
                {/* <StyledTextInput
                    type="text"
                    name="category"
                    label="Category"
                    onChange={(e) => setCategory(e.target.value)}
                /> */}
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
