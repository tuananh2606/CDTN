import { useState } from 'react';
import { TextField, Button, InputLabel, MenuItem, FormControl, Select, Box, InputAdornment } from '@mui/material';
import { NumericFormat } from 'react-number-format';
import styled from 'styled-components';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { loginSuccess } from '../../../redux/authSlice';
import adminApis from '../../../apis/adminApis';
import { createAxios } from '../../../utils/http';
import AdminPageWrapper from '../../../components/AdminPageWrapper';

const CreateProductPage = ({ setCreatePageShow }) => {
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
  const createProductMutation = useMutation({
    mutationFn: (data) => adminApis.createProduct(axiosJWT, user?.accessToken, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
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
        const { data } = await axios.post(`${import.meta.env.VITE_BASE_URL}/v1/product/upload/`, formData);

        newProduct = {
          code,
          name,
          slug,
          description,
          category,
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
          category,
          price,
          stock,
        };
      }

      createProductMutation.mutate(newProduct);
      setCreatePageShow(false);
    } catch (error) {
      console.log(error);
    }
  }
  console.log(description);
  return (
    <AdminPageWrapper title="Create new product">
      <Form onSubmit={_handleSubmit} encType="multipart/form-data">
        <StyledTextInput type="text" name="code" label="Code" onChange={(e) => setCode(e.target.value)} />
        <StyledTextInput type="text" name="name" label="Name" onChange={(e) => setName(e.target.value)} />
        <StyledTextInput type="text" name="slug" label="Slug" onChange={(e) => setSlug(e.target.value)} />
        <label style={{ marginBottom: '0.5rem' }}>Description</label>
        <QuillContainer theme="snow" onChange={setDescription} />
        {/* <StyledTextInput
            type="text"
            name="description"
            label="Description"
            onChange={(e) => setDescription(e.target.value)}
          /> */}
        {/* <input type="text" onChange={(e) => setName(e.target.value)} value={'Test'} name="name" /> */}
        <label style={{ marginBottom: '0.5rem' }}>Images</label>
        <input type="file" name="images" multiple accept="image/*" onChange={(e) => setImages(e.target.files)} />
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
        <NumericFormat
          customInput={TextField}
          label="Price"
          thousandSeparator
          decimalSeparator="."
          onValueChange={(values) => setPrice(values.value)}
          InputProps={{
            startAdornment: <InputAdornment position="start">vnđ</InputAdornment>,
          }}
        />
        {/* <StyledTextInput
          type="number"
          name="price"
          label="Price"
          InputProps={{
            startAdornment: <InputAdornment position="start">vnđ</InputAdornment>,
          }}
          onChange={(e) => setPrice(e.target.value)}
          // inputProps={{ pattern: '[0-9]+' }}
        /> */}
        <StyledTextInput type="number" name="stock" label="Stock" onChange={(e) => setStock(e.target.value)} />
        <Button variant="outlined" color="secondary" type="submit" sx={{ mt: 3 }}>
          Submit
        </Button>
      </Form>
    </AdminPageWrapper>
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
const QuillContainer = styled(ReactQuill)`
  .ql-editor {
    min-height: 7rem;
  }
`;
