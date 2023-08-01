import { useState } from 'react';
import { Input, TextField, Button } from '@mui/material';
import styled from 'styled-components';
import axios from 'axios';
import { loginSuccess } from '../../../redux/authSlice';
import { useSelector, useDispatch } from 'react-redux';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import adminApis from '../../../apis/adminApis';
import { createAxios } from '../../../utils/http';
import AdminPageWrapper from '../../../components/AdminPageWrapper';

const CreateCategoryPage = () => {
  const [name, setName] = useState('');
  const [images, setImages] = useState([]);
  const [videos, setVideos] = useState([]);

  const user = useSelector((state) => state.auth.login.currentUser);
  const dispatch = useDispatch();

  let axiosJWT = createAxios(user, dispatch, loginSuccess);

  const queryClient = useQueryClient();

  const createCateMutation = useMutation({
    mutationFn: (data) => adminApis.createCategory(axiosJWT, user?.accessToken, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
  });

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
    const check = formData.getAll('images').length > 0 || formData.getAll('videos').length > 0;
    try {
      let newCate = {};
      if (check) {
        const { data } = await axios.post(`${import.meta.env.VITE_BASE_URL}/v1/category/upload`, formData);
        newCate = {
          name: name.charAt(0).toUpperCase() + name.slice(1).toLowerCase(),
          images: data.images,
          videos: data.videos,
        };
      } else {
        newCate = {
          name: name.charAt(0).toUpperCase() + name.slice(1).toLowerCase(),
        };
      }

      createCateMutation.mutate(newCate);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <AdminPageWrapper title="Create new category">
      <Form onSubmit={_handleSubmit} encType="multipart/form-data">
        <TextField type="text" label="Name" value={name} onChange={(e) => setName(e.target.value)} />
        {/* <input type="text" onChange={(e) => setName(e.target.value)} value={'Test'} name="name" /> */}
        <label>Images</label>
        <input type="file" multiple accept="image/*" onChange={(e) => setImages(e.target.files)} />
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

export default CreateCategoryPage;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;
