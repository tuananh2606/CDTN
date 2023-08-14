import { useState } from 'react';
import { TextField, Button } from '@mui/material';
import styled from 'styled-components';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { loginSuccess } from '../../../redux/authSlice';
import { useSelector, useDispatch } from 'react-redux';
import { useMutation } from '@tanstack/react-query';
import adminApis from '../../../apis/adminApis';
import { createAxios } from '../../../utils/http';
import AdminPageWrapper from '../../../components/AdminPageWrapper';
import { useNavigate } from 'react-router-dom';

const CreateCategoryPage = () => {
  const [name, setName] = useState('');
  const [images, setImages] = useState([]);
  const [videos, setVideos] = useState([]);
  const navigate = useNavigate();
  const { t } = useTranslation('admin');
  const user = useSelector((state) => state.auth.login.currentUser);
  const dispatch = useDispatch();

  let axiosJWT = createAxios(user, dispatch, loginSuccess);

  const createCateMutation = useMutation({
    mutationFn: (data) => adminApis.createCategory(axiosJWT, user?.accessToken, data),
    onSuccess: () => {
      navigate('/admin/categories');
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
    <AdminPageWrapper title="create_new_category">
      <Form onSubmit={_handleSubmit} encType="multipart/form-data">
        <TextField type="text" label="Name" value={name} onChange={(e) => setName(e.target.value)} />
        {/* <input type="text" onChange={(e) => setName(e.target.value)} value={'Test'} name="name" /> */}
        <label className="media">Images</label>
        <input type="file" multiple accept="image/*" onChange={(e) => setImages(e.target.files)} />
        <label className="media">Videos</label>
        <input
          type="file"
          multiple
          accept="video/mp4,video/x-m4v,video/*"
          onChange={(e) => setVideos(e.target.files)}
        />

        <Button variant="outlined" color="secondary" type="submit" sx={{ mt: 3 }}>
          {t('submit')}
        </Button>
      </Form>
    </AdminPageWrapper>
  );
};

export default CreateCategoryPage;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  .media {
    margin-top: 0.5rem;
  }
  input[type='file'] {
    width: 500px;
    height: 56px;
    max-width: 100%;
    color: #444;
    padding: 10px;
    background: #fff;
    border-radius: 6px;
    border: 1px solid rgba(145, 158, 171, 0.32);
  }
  input[type='file']::file-selector-button {
    margin-right: 20px;
    border: none;
    background: #084cdf;
    padding: 10px 20px;
    border-radius: 10px;
    color: #fff;
    cursor: pointer;
    transition: background 0.2s ease-in-out;
  }

  input[type='file']::file-selector-button:hover {
    background: #0d45a5;
  }
`;
