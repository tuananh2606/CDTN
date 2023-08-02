import { useState } from 'react';
import {
  TextField,
  Button,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  InputAdornment,
  FormHelperText,
} from '@mui/material';
import styled from 'styled-components';
import axios from 'axios';
import { Form, Formik } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import { useMutation, useQuery } from '@tanstack/react-query';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useNavigate } from 'react-router-dom';

import NumberInput from '../../../components/common/Input/NumberInput';
import { InputField } from '../../../components/common';
import { loginSuccess } from '../../../redux/authSlice';
import adminApis from '../../../apis/adminApis';
import { createAxios } from '../../../utils/http';
import AdminPageWrapper from '../../../components/AdminPageWrapper';
import productValidateSchema from './productValidateSchema';

const CreateProductPage = () => {
  const [images, setImages] = useState([]);
  const [categories, setCategories] = useState([]);

  const user = useSelector((state) => state.auth.login.currentUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  let axiosJWT = createAxios(user, dispatch, loginSuccess);

  const createProductMutation = useMutation({
    mutationFn: (data) => adminApis.createProduct(axiosJWT, user?.accessToken, data),
    onSuccess: () => {
      navigate('/admin/products');
    },
  });

  useQuery({
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
  const _sleep = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };
  const _handleSubmit = async (values, actions) => {
    await _sleep(1000);
    let formData = new FormData();
    formData.set('name', values.name);
    formData.set('category', values.category);
    Array.from(images).forEach((item) => {
      formData.append('images', item);
    });
    const check = formData.getAll('images').length > 0 || formData.getAll('videos').length > 0;
    try {
      let newProduct = {};
      if (check) {
        const { data } = await axios.post(`${import.meta.env.VITE_BASE_URL}/v1/product/upload/`, formData);

        newProduct = {
          code: values.code,
          name: values.name,
          slug: values.slug,
          description: values.description,
          category: values.category,
          price: values.price,
          stock: values.stock,
          images: data.images,
        };
      } else {
        newProduct = {
          code: values.code,
          name: values.name,
          slug: values.slug,
          description: values.description,
          category: values.category,
          price: values.price,
          stock: values.stock,
        };
      }
      createProductMutation.mutate(newProduct);
    } catch (error) {
      console.log(error);
    }
    actions.setSubmitting(false);
  };
  return (
    <AdminPageWrapper title="Create new product">
      <Formik
        initialValues={{
          code: '',
          name: '',
          slug: '',
          description: '',
          category: '',
          price: '',
          stock: '',
        }}
        validationSchema={productValidateSchema[0]}
        onSubmit={_handleSubmit}
      >
        {({ errors, touched, isSubmitting, values, handleChange, setFieldValue }) => (
          <StyledForm encType="multipart/form-data">
            <InputField type="text" name="code" label="Code" />
            <InputField type="text" name="name" label="Name" />
            <InputField type="text" name="slug" label="Slug" />

            <FormControl>
              <label style={{ marginBottom: '0.5rem' }}>Description</label>
              <QuillContainer name="description" theme="snow" onChange={(e) => setFieldValue('description', e)} />
              {touched.description && errors.description ? (
                <FormHelperText error sx={{ marginLeft: '16px !important' }}>
                  {touched.description && errors.description}
                </FormHelperText>
              ) : null}
            </FormControl>
            <label style={{ marginBottom: '0.5rem' }}>Images</label>
            <input type="file" name="images" multiple accept="image/*" onChange={(e) => setImages(e.target.files)} />
            {/* <StyledTextInput type="text" name="code" label="Variation" onChange={(e) => setName(e.target.value)} /> */}
            <FormControl
              error={Boolean(touched.category && errors.category)}
              fullWidth
              sx={{ mt: '1rem', mb: '0.5rem' }}
            >
              <InputLabel id="select-label">Category</InputLabel>
              <Select
                name="category"
                labelId="select-label"
                id="select"
                value={values.category}
                label="Category"
                onChange={handleChange}
              >
                {categories &&
                  categories.length > 0 &&
                  categories.map((item, idx) => (
                    <MenuItem key={idx} value={item.id}>
                      {item.name}
                    </MenuItem>
                  ))}
              </Select>
              {touched.category && errors.category ? (
                <FormHelperText error sx={{ marginLeft: '16px !important' }}>
                  {touched.category && errors.category}
                </FormHelperText>
              ) : null}
            </FormControl>
            <NumberInput
              error={Boolean(touched.price && errors.price)}
              customInput={TextField}
              label="Price"
              thousandSeparator
              value={values.price}
              onValueChange={(values) => setFieldValue('price', values.value)}
              helperText={touched.price && errors.price}
              InputProps={{
                startAdornment: <InputAdornment position="start">vnđ</InputAdornment>,
              }}
            />
            <InputField type="number" name="stock" label="Stock" />
            <Button variant="outlined" color="secondary" disabled={isSubmitting} type="submit" sx={{ mt: 3 }}>
              Submit
            </Button>
          </StyledForm>
        )}
      </Formik>
    </AdminPageWrapper>
  );
};

export default CreateProductPage;

const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
`;

const QuillContainer = styled(ReactQuill)`
  .ql-editor {
    min-height: 7rem;
  }
`;
