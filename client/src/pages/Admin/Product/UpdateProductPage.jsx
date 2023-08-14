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
  InputAdornment,
  CircularProgress,
} from '@mui/material';
import { NumericFormat } from 'react-number-format';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useTranslation } from 'react-i18next';

import { loginSuccess } from '../../../redux/authSlice';
import adminApis from '../../../apis/adminApis';
import { createAxios } from '../../../utils/http';
import { convertLength } from '@mui/material/styles/cssUtils';
import { useNavigate } from 'react-router-dom';
import AdminPageWrapper from '../../../components/AdminPageWrapper';

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
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [media, setMedia] = useState([]);
  const [images, setImages] = useState([]);

  const { t } = useTranslation('admin');
  const navigate = useNavigate();
  const { state } = useLocation();
  const user = useSelector((state) => state.auth.login.currentUser);
  const dispatch = useDispatch();

  let axiosJWT = createAxios(user, dispatch, loginSuccess);

  const UpdateProductMutation = useMutation({
    mutationFn: (product) => adminApis.updateProduct(axiosJWT, user?.accessToken, state.id, product),
    onSuccess: () => {
      setLoading(false);
      navigate('/admin/products');
    },
  });
  const { isLoading, isError, data, error, refetch } = useQuery({
    queryKey: ['product', state.id],
    queryFn: () => adminApis.getProductById(axiosJWT, user?.accessToken, state.id),

    onSuccess: (data) => {
      setInfo(data);
    },
  });

  useQuery({
    queryKey: ['categories'],
    queryFn: () => adminApis.getAllCategories(axiosJWT, user?.accessToken),
    onSuccess: (data) => {
      setCategories(
        data?.categories.map((item, idx) => {
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

  const handleChangeDes = (value) => {
    setInfo({ ...info, description: value });
  };

  const _handleSubmit = async (e) => {
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
        setLoading(true);
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
  };

  return (
    <AdminPageWrapper title="edit_product">
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
        <InputLabel>Description</InputLabel>
        <QuillContainer theme="snow" value={info?.description || ''} onChange={handleChangeDes} />
        {/* <StyledTextInput
          type="text"
          multiline
          rows={3}
          label="Description"
          name="description"
          value={info?.description || ''}
          onChange={(e) => setInfo({ ...info, description: e.target.value })}
        /> */}
        <NumericFormat
          customInput={TextField}
          label="Price"
          value={info?.price || ''}
          thousandSeparator
          onValueChange={(values) => setInfo({ ...info, price: values.value })}
          InputProps={{
            startAdornment: <InputAdornment position="start">vnđ</InputAdornment>,
          }}
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

        <StyledTextInput
          type="number"
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

        <label className="media">Images</label>
        <input type="file" multiple accept="image/*" onChange={(e) => setImages(e.target.files)} />

        <Box sx={{ display: 'flex', alignItems: 'center', mt: 3, justifyContent: 'flex-end' }}>
          <span>
            {loading && <CircularProgress sx={{ width: '20px !important', height: '20px !important', mr: 2 }} />}
          </span>
          <Button variant="outlined" color="secondary" type="submit">
            {t('submit')}
          </Button>
        </Box>
      </Form>
    </AdminPageWrapper>
  );
};

export default UpdateProductPage;

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
const StyledTextInput = styled(TextField)`
  margin: 0.5rem 0;
`;

const QuillContainer = styled(ReactQuill)`
  margin: 0 0 0.5rem;
  .ql-editor {
    min-height: 12rem;
  }
`;
