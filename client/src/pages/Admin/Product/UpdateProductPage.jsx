import { useEffect, useState } from 'react';
import {
    TextField,
    Button,
    Box,
    ImageList,
    ImageListItem,
    InputLabel,
    MenuItem,
    FormControl,
    Select,
} from '@mui/material';
import styled from 'styled-components';
import axios from 'axios';
import { loginSuccess } from '../../../redux/authSlice';
import { useSelector, useDispatch } from 'react-redux';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import adminApis from '../../../apis/adminApis';
import { createAxios } from '../../../utils/http';
import { useLocation } from 'react-router-dom';
import { convertLength } from '@mui/material/styles/cssUtils';
import { useNavigate } from 'react-router-dom';

const UpdateProductPage = () => {
    const [info, setInfo] = useState({
        code: '',
        name: '',
        description: '',
        slug: '',
        price: 0,
        category: '',
        stock: 0,
        images: [],
    });
    const [categories, setCategories] = useState([]);
    const [media, setMedia] = useState([]);
    const [images, setImages] = useState([]);

    const navigate = useNavigate();
    const { state } = useLocation();
    const user = useSelector((state) => state.auth.login.currentUser);
    const dispatch = useDispatch();

    let axiosJWT = createAxios(user, dispatch, loginSuccess);

    const queryClient = useQueryClient();

    const UpdateProductMutation = useMutation({
        mutationFn: (product) => adminApis.updateProduct(axiosJWT, user?.accessToken, state, product),
        onSuccess: () => {
            navigate('/admin/products');
        },
    });
    const { isLoading, isError, data, error, refetch } = useQuery({
        queryKey: ['product', state],
        queryFn: () => adminApis.getProductById(axiosJWT, user?.accessToken, state),
        staleTime: Infinity,
        enable: false,
        onSuccess: (data) => {
            setInfo(data);
        },
    });

    const categoriesQuery = useQuery({
        queryKey: ['categories'],
        queryFn: () => adminApis.getAllCategories(axiosJWT, user?.accessToken),
        onSuccess: (data) => {
            setCategories(
                data?.map((item, idx) => {
                    return { name: item.name, id: item._id };
                }),
            );
        },
    });

    useEffect(() => {
        refetch();
        setInfo(data);
    }, [data]);

    if (isLoading) {
        return <span>Loading...</span>;
    }

    if (isError) {
        return <span>Error: {error.message}</span>;
    }

    const handleDeleteImage = (idx) => {
        setMedia([...media, info?.images[idx].public_id]);
        let imagesArr = info?.images;
        imagesArr = imagesArr.splice(idx, 1);
    };

    async function _handleSubmit(e) {
        e.preventDefault();
        let formData = new FormData();
        formData.set('name', info.name);
        formData.set('category', info.category);
        Array.from(images).forEach((item) => {
            formData.append('images', item);
        });
        const check = formData.getAll('images').length > 0;
        try {
            let newProduct = {};
            if (check) {
                const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/v1/product/upload`, formData);
                newProduct = {
                    ...info,
                    images: [...data.images, ...response.data.images],
                };
            } else {
                newProduct = {
                    ...info,
                };
            }
            UpdateProductMutation.mutate(newProduct);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Box sx={{ padding: 2 }}>
            <Form onSubmit={_handleSubmit} encType="multipart/form-data">
                <StyledTextInput
                    type="text"
                    label="Code"
                    name="code"
                    value={info?.code || ''}
                    onChange={(e) => setInfo({ ...info, code: e.target.value })}
                />
                <StyledTextInput
                    type="text"
                    label="Slug"
                    name="slug"
                    value={info?.slug || ''}
                    onChange={(e) => setInfo({ ...info, slug: e.target.value })}
                />
                <StyledTextInput
                    type="text"
                    label="Name"
                    name="name"
                    value={info?.name || ''}
                    onChange={(e) => setInfo({ ...info, name: e.target.value })}
                />
                <StyledTextInput
                    type="text"
                    multiline
                    rows={3}
                    label="Description"
                    name="description"
                    value={info?.description || ''}
                    onChange={(e) => setInfo({ ...info, description: e.target.value })}
                />
                <StyledTextInput
                    type="text"
                    label="Price"
                    name="price"
                    value={info?.price || ''}
                    onChange={(e) => setInfo({ ...info, price: e.target.value })}
                />
                <FormControl fullWidth sx={{ mt: '1rem', mb: '0.5rem' }}>
                    <InputLabel id="select-label">Category</InputLabel>
                    <Select
                        labelId="select-label"
                        id="select"
                        value={info?.category || ''}
                        label="Category"
                        onChange={(e) => setInfo({ ...info, category: e.target.value })}
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
                    label="Category"
                    name="category"
                    value={info?.category || ''}
                    onChange={(e) => setInfo({ ...info, category: e.target.value })}
                /> */}
                <StyledTextInput
                    type="text"
                    label="Stock"
                    name="stock"
                    value={info?.stock || ''}
                    onChange={(e) => setInfo({ ...info, stock: e.target.value })}
                />
                {/* <input type="text" onChange={(e) => setName(e.target.value)} value={'Test'} name="name" /> */}

                <Box sx={{ border: 1, padding: 2, borderColor: '#ccc', my: 1 }}>
                    <ImageList sx={{ width: 500, height: 450 }} cols={3} rowHeight={164}>
                        {info.images &&
                            info.images.length > 0 &&
                            info.images.map((item, idx) => (
                                <ImageListItem key={idx}>
                                    <img
                                        src={`${item.url}?w=164&h=164&fit=crop&auto=format`}
                                        // srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                                        alt="Anh"
                                        loading="lazy"
                                    />
                                    <Button onClick={() => handleDeleteImage(idx)}>Delete</Button>
                                </ImageListItem>
                            ))}
                    </ImageList>
                </Box>

                <label>Images</label>
                <input type="file" multiple accept="image/*" onChange={(e) => setImages(e.target.files)} />

                <Button variant="outlined" color="secondary" type="submit" sx={{ mt: 3 }}>
                    Submit
                </Button>
            </Form>
        </Box>
    );
};

export default UpdateProductPage;

const Form = styled.form`
    display: flex;
    flex-direction: column;
`;
const StyledTextInput = styled(TextField)`
    margin: 0.5rem 0;
`;
