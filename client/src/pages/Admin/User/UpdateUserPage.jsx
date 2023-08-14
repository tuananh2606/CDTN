import { Button, InputLabel, MenuItem, FormControl, Select, Stack, Box } from '@mui/material';
import styled from 'styled-components';
import { Form, Formik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';

import { InputField } from '../../../components/common';
import { loginSuccess } from '../../../redux/authSlice';
import { useLocation } from 'react-router-dom';
import adminApis from '../../../apis/adminApis';
import { createAxios } from '../../../utils/http';
import { convertLength } from '@mui/material/styles/cssUtils';
import AdminPageWrapper from '../../../components/AdminPageWrapper';
import userValidateSchema from './userValidateSchema';

const UpdateUserPage = () => {
  const { state } = useLocation();
  const user = useSelector((state) => state.auth.login.currentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation('admin');
  let axiosJWT = createAxios(user, dispatch, loginSuccess);

  const { isLoading, isError, data, error } = useQuery({
    queryKey: ['user', state.id],
    queryFn: () => adminApis.getUser(axiosJWT, user?.accessToken, state.id),
  });

  const updateUserMutation = useMutation({
    mutationFn: (data) => adminApis.updateUser(axiosJWT, user?.accessToken, data),
    onSuccess: () => {
      navigate('/admin/users');
    },
  });

  if (isLoading) {
    return <span>Loading...</span>;
  }
  if (isError) {
    return <span>Error: {error.message}</span>;
  }
  const _sleep = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  const _handleSubmit = async (values, actions) => {
    await _sleep(1000);
    let updatedUser = {
      id: state.id,
      data: {
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        password: values.password,
        isAdmin: values.isAdmin,
      },
    };
    try {
      await updateUserMutation.mutateAsync(updatedUser);
    } catch (error) {
      console.log(error);
    }
    actions.setSubmitting(false);
  };

  return (
    <AdminPageWrapper title="edit_user">
      <Formik
        initialValues={{
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          isAdmin: data.admin,
        }}
        validationSchema={userValidateSchema[1]}
        onSubmit={_handleSubmit}
      >
        {({ isSubmitting, values, handleChange }) => (
          <StyledForm>
            <StyledBox>
              <Stack spacing={2} sx={{ pt: 3 }} direction={{ xs: 'column', sm: 'row' }}>
                <InputField id="firstName" type="text" name="firstName" label="First Name" height={56} />
                <InputField id="lastName" type="text" name="lastName" label="Last Name" height={56} />
              </Stack>
              <InputField id="email" type="email" name="email" label="Email" disabled height={56} />

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

              <SubmitContainer>
                {/* <Box sx={{ flex: '1 1 auto' }} /> */}
                <StyledButton variant="outlined" type="submit" disabled={isSubmitting}>
                  {t('submit')}
                </StyledButton>
              </SubmitContainer>
            </StyledBox>
          </StyledForm>
        )}
      </Formik>
    </AdminPageWrapper>
  );
};

export default UpdateUserPage;

const StyledForm = styled(Form)`
  display: flex;
  justify-content: center;
`;
const StyledBox = styled(Box)`
  display: flex;
  flex-direction: column;
`;

const SubmitContainer = styled(Box)`
  display: flex;
  flex-direction: row;
  padding-top: 1rem;
  @media screen and (min-width: 48rem) {
    justify-content: flex-end;
  }
`;

const StyledButton = styled(Button)`
  width: 100%;
  &&& {
    background-color: #000;
    color: #fff;
    padding: 0.5rem 1rem;
  }
  @media screen and (min-width: 48rem) {
    width: 30%;
  }
`;
