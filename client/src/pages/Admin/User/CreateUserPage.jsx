import { useState } from 'react';
import { Button, InputLabel, MenuItem, FormControl, Select, Stack, Box } from '@mui/material';
import styled from 'styled-components';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Formik } from 'formik';
import { InputField } from '../../../components/common';

import AdminPageWrapper from '../../../components/AdminPageWrapper';
import { loginSuccess } from '../../../redux/authSlice';
import adminApis from '../../../apis/adminApis';
import { createAxios } from '../../../utils/http';
import userValidateSchema from './userValidateSchema';

const CreateUserPage = () => {
  const [error, setError] = useState();
  const user = useSelector((state) => state.auth.login.currentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  let axiosJWT = createAxios(user, dispatch, loginSuccess);

  const createUserMutation = useMutation({
    mutationFn: (data) => adminApis.createUser(axiosJWT, user?.accessToken, data),
    onSuccess: (data) => {
      if (data && data.name !== 'AxiosError') {
        navigate('/admin/users');
      } else {
        setError(data);
      }
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const _sleep = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  const _handleSubmit = async (values, actions) => {
    await _sleep(1000);
    let newUser = {
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      password: values.password,
      isAdmin: values.isAdmin,
    };
    try {
      let res = await createUserMutation.mutateAsync(newUser);
      if (res.response.status === 409) {
        actions.setErrors({ email: res.response.data });
      }
    } catch (error) {
      console.log('An error has occured: ', error);
    }
    actions.setSubmitting(false);
  };

  return (
    <AdminPageWrapper title="Create new user">
      <Formik
        initialValues={{ firstName: '', lastName: '', email: '', password: '', isAdmin: false }}
        validationSchema={userValidateSchema[0]}
        onSubmit={_handleSubmit}
      >
        {({ isSubmitting, values, handleChange }) => (
          <StyledForm>
            <StyledBox>
              <Stack spacing={2} sx={{ pt: 3 }} direction={{ xs: 'column', sm: 'row' }}>
                <InputField id="firstName" type="text" name="firstName" label="First Name" height={56} />
                <InputField id="lastName" type="text" name="lastName" label="Last Name" height={56} />
              </Stack>
              <InputField id="email" type="email" name="email" label="Email" height={56} />
              <InputField id="password" type="password" name="password" label="Password" height={56} />

              <FormControl sx={{ mt: 2, maxWidth: 100 }}>
                <InputLabel id="admin-select">Is Admin?</InputLabel>
                <Select
                  name="isAdmin"
                  labelId="admin-select"
                  id="select-autowidth"
                  value={values.isAdmin}
                  onChange={handleChange}
                  label="Is Admin?"
                >
                  <MenuItem value={true}>True</MenuItem>
                  <MenuItem value={false}>False</MenuItem>
                </Select>
              </FormControl>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  pt: 2,
                }}
              >
                <Box sx={{ flex: '1 1 auto' }} />
                <StyledButton variant="outlined" type="submit" disabled={isSubmitting}>
                  Submit
                </StyledButton>
              </Box>
            </StyledBox>
          </StyledForm>
        )}
      </Formik>
    </AdminPageWrapper>
  );
};
export default CreateUserPage;

const StyledForm = styled(Form)`
  display: flex;
  justify-content: center;
`;

const StyledBox = styled(Box)`
  display: flex;
  flex-direction: column;
`;

const StyledButton = styled(Button)`
  &&& {
    width: 20%;
    background-color: #000;
    color: #fff;
    padding: 0.5rem 1rem;
  }
`;
