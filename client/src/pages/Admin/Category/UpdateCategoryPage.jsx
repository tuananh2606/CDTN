import { useState } from 'react';
import { Input, TextField, Button, Box, ImageList, ImageListItem, CardMedia, Stack } from '@mui/material';
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

const UpdateCategoryPage = () => {
    const [info, setInfo] = useState();
    const [name, setName] = useState('');
    const [media, setMedia] = useState([]);
    const [images, setImages] = useState([]);
    const [videos, setVideos] = useState([]);

    const navigate = useNavigate();
    const { state } = useLocation();
    const user = useSelector((state) => state.auth.login.currentUser);
    const dispatch = useDispatch();

    let axiosJWT = createAxios(user, dispatch, loginSuccess);

    const queryClient = useQueryClient();

    const UpdateCateMutation = useMutation({
        mutationFn: (category) => adminApis.updateCategory(axiosJWT, user?.accessToken, state, category),
        onSuccess: () => {
            navigate('/admin/categories');
            queryClient.invalidateQueries({ queryKey: ['categories'] });
        },
    });

    const { isLoading, isError, data, error } = useQuery({
        queryKey: ['category', state],
        queryFn: () => adminApis.getCategoryById(axiosJWT, user?.accessToken, state),
        staleTime: Infinity,
        enable: false,
        onSuccess: (data) => {
            setName(data.name);
            setInfo(data);
            // setFormState(data);
        },
    });

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
    const handleDeleteVideos = (idx, name) => {
        const deletedVideo =
            name === 'mobile' ? info?.videos.mobile[idx].public_id : info?.videos.desktop_tablet[idx].public_id;
        setMedia([...media, deletedVideo]);
        let videosDTArr = info?.videos.desktop_tablet;
        let videosMobileArr = info?.videos.mobile;
        if (name === 'mobile') {
            videosMobileArr = videosMobileArr.splice(idx, 1);
            console.log(videosMobileArr);
        } else {
            videosDTArr = videosDTArr.splice(idx, 1);
            console.log(videosDTArr);
        }
    };

    async function _handleSubmit(e) {
        e.preventDefault();
        let formData = new FormData();
        formData.append('name', name);
        Array.from(images).forEach((item) => {
            formData.append('images', item);
        });
        Array.from(videos).forEach((item) => {
            formData.append('videos', item);
        });
        try {
            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/v1/category/upload`, formData);
            const newCate = {
                name: name.charAt(0).toUpperCase() + name.slice(1).toLowerCase(),
                images: [...data.images, ...response.data.images],
                videos: {
                    desktop_tablet: [...data.videos.desktop_tablet, ...response.data.videos.desktop_tablet],
                    mobile: [...data.videos.mobile, ...response.data.videos.mobile],
                },
            };
            UpdateCateMutation.mutate(newCate);
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <Box sx={{ padding: 2 }}>
            <Form onSubmit={_handleSubmit} encType="multipart/form-data">
                <TextField type="text" label="Name" value={name} onChange={(e) => setName(e.target.value)} />
                {/* <input type="text" onChange={(e) => setName(e.target.value)} value={'Test'} name="name" /> */}

                <Box sx={{ border: 1, padding: 2, borderColor: '#ccc', my: 1 }}>
                    <ImageList sx={{ width: 500, height: 450 }} cols={3} rowHeight={164}>
                        {info?.images.map((item, idx) => (
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

                <Stack direction="row" spacing={2} sx={{ border: 1, padding: 2, borderColor: '#ccc', my: 1 }}>
                    {info?.videos.desktop_tablet.map((item, idx) => (
                        <Box sx={{ display: 'flex', flexDirection: 'column' }} key={idx}>
                            <CardMedia
                                component="video"
                                sx={{ width: 200, height: 200 }}
                                muted
                                controls
                                src={item.url}
                            />
                            <Button onClick={() => handleDeleteVideos(idx, 'desktop_tablet')}>Delete</Button>
                        </Box>
                    ))}

                    {info?.videos.mobile.map((item, idx) => (
                        <Box sx={{ display: 'flex', flexDirection: 'column', width: 200, height: 400 }} key={idx}>
                            <CardMedia
                                component="video"
                                sx={{ width: '100%', height: '100%' }}
                                muted
                                controls
                                src={item.url}
                            />
                            <Button onClick={() => handleDeleteVideos(idx, 'mobile')}>Delete</Button>
                        </Box>
                    ))}
                </Stack>

                <label>Videos</label>
                <input
                    type="file"
                    multiple
                    accept="video/mp4,video/x-m4v,video/*"
                    onChange={(e) => setVideos(e.target.files)}
                />

                <Button variant="outlined" color="secondary" type="submit" sx={{ mt: 3 }}>
                    Submit
                </Button>
            </Form>
        </Box>
    );
};

export default UpdateCategoryPage;

const Form = styled.form`
    display: flex;
    flex-direction: column;
`;
