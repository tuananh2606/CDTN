import { useState } from 'react';
import { TextField, Button, Box, ImageList, ImageListItem, CardMedia, Stack } from '@mui/material';
import styled from 'styled-components';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useMutation, useQuery } from '@tanstack/react-query';

import { loginSuccess } from '../../../redux/authSlice';
import adminApis from '../../../apis/adminApis';
import { createAxios } from '../../../utils/http';
import AdminPageWrapper from '../../../components/AdminPageWrapper';

const UpdateCategoryPage = () => {
  const [info, setInfo] = useState();
  const [name, setName] = useState('');
  const [media, setMedia] = useState({
    images: [],
    videos: [],
  });
  const [images, setImages] = useState([]);
  const [videos, setVideos] = useState([]);

  const navigate = useNavigate();
  const { state } = useLocation();
  const user = useSelector((state) => state.auth.login.currentUser);
  const dispatch = useDispatch();

  let axiosJWT = createAxios(user, dispatch, loginSuccess);

  const updateCateMutation = useMutation({
    mutationFn: (category) => adminApis.updateCategory(axiosJWT, user?.accessToken, state, category),
    onSuccess: () => {
      navigate('/admin/categories');
    },
  });
  const deleteImagesMutation = useMutation({
    mutationFn: (data) => adminApis.deleteImages(axiosJWT, user?.accessToken, data),
    // onSuccess: () => {
    //     navigate('/admin/categories');
    // },
  });
  const deleteVideosMutation = useMutation({
    mutationFn: (data) => adminApis.deleteVideos(axiosJWT, user?.accessToken, data),
    // onSuccess: () => {
    //     navigate('/admin/categories');
    // },
  });

  const { isLoading, isError, data, error } = useQuery({
    queryKey: ['category', state],
    queryFn: () => adminApis.getCategoryById(axiosJWT, user?.accessToken, state),
    // staleTime: Infinity,
    // enable: false,
    onSuccess: (data) => {
      setName(data.name);
      setInfo(data);
    },
  });

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  const handleDeleteImage = (publicId) => {
    setMedia((prev) => ({ ...prev, images: [...media.images, publicId] }));
    setInfo((prev) => ({ ...prev, images: info.images.filter((item) => item.public_id !== publicId) }));
    const deletedAsset = {
      publicId: publicId,
    };
    // deleteImagesMutation.mutate(deletedAsset);
    // setMedia((prev) => [...prev, info?.images[idx].public_id]);
  };
  const handleDeleteVideos = (publicId, name) => {
    setMedia((prev) => ({ ...prev, videos: [...media.videos, publicId] }));
    if (name === 'mobile') {
      setInfo((prev) => ({
        ...prev,
        videos: {
          desktop_tablet: [...info.videos.desktop_tablet],
          mobile: info.videos.mobile.filter((item) => item.public_id !== publicId),
        },
      }));
    } else {
      setInfo((prev) => ({
        ...prev,
        videos: {
          desktop_tablet: info.videos.desktop_tablet.filter((item) => item.public_id !== publicId),
          mobile: [...info.videos.mobile],
        },
      }));
    }
  };

  console.log(media);
  console.log(info);

  const _handleSubmit = async (e) => {
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
      const check = formData.getAll('images').length > 0 || formData.getAll('videos').length > 0;
      if (media) {
        if (media.images.length > 0) {
          media.images.forEach((publicId) => {
            deleteImagesMutation.mutate({ publicId: publicId });
          });
        }
        if (media.videos.length > 0) {
          media.videos.forEach((publicId) => {
            deleteVideosMutation.mutate({ publicId: publicId });
          });
        }
      }
      if (check) {
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/v1/category/upload`, formData);
        const newCate = {
          name: name.charAt(0).toUpperCase() + name.slice(1).toLowerCase(),
          images: [...info.images, ...response.data.images],
          videos: {
            desktop_tablet: [...info.videos.desktop_tablet, ...response.data.videos.desktop_tablet],
            mobile: [...info.videos.mobile, ...response.data.videos.mobile],
          },
        };
        updateCateMutation.mutate(newCate);
      } else {
        const newCate = {
          name: name.charAt(0).toUpperCase() + name.slice(1).toLowerCase(),
          images: [...info.images],
          videos: {
            desktop_tablet: [...info.videos.desktop_tablet],
            mobile: [...info.videos.mobile],
          },
        };
        updateCateMutation.mutate(newCate);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <AdminPageWrapper title="Edit category" width="800px">
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
                <Button onClick={() => handleDeleteImage(item.public_id)}>Delete</Button>
              </ImageListItem>
            ))}
          </ImageList>
        </Box>

        <label>Images</label>
        <input type="file" multiple accept="image/*" onChange={(e) => setImages(e.target.files)} />

        <Stack direction="row" spacing={2} sx={{ border: 1, padding: 2, borderColor: '#ccc', my: 1 }}>
          {info?.videos.desktop_tablet.map((item, idx) => (
            <Box sx={{ display: 'flex', flexDirection: 'column' }} key={idx}>
              <CardMedia component="video" sx={{ width: 200, height: 200 }} muted controls src={item.url} />
              <Button onClick={() => handleDeleteVideos(item.public_id, 'desktop_tablet')}>Delete</Button>
            </Box>
          ))}

          {info?.videos.mobile.map((item, idx) => (
            <Box sx={{ display: 'flex', flexDirection: 'column', width: 200, height: 400 }} key={idx}>
              <CardMedia component="video" sx={{ width: '100%', height: '100%' }} muted controls src={item.url} />
              <Button onClick={() => handleDeleteVideos(item.public_id, 'mobile')}>Delete</Button>
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
    </AdminPageWrapper>
  );
};

export default UpdateCategoryPage;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;
