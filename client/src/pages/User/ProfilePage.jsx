import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Formik, Form } from 'formik';
import { TextField, InputLabel } from '@mui/material';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

import { BoxContainer, StyledButtonSave, StyledButtonChange } from './ProfilePageStyles';
import { InputField, Box, FloatModal } from '../../components/common';
import userApis from '../../apis/userApis';

const ProfilePage = () => {
  const [showModal, setShowModal] = useState(false);
  const user = useSelector((state) => state.auth.login.currentUser);
  const { t } = useTranslation('profile');
  const queryClient = useQueryClient();
  const { data, error, isLoading } = useQuery({
    queryKey: ['user', user._id],
    queryFn: async () => await userApis.getUser(user.accessToken, user._id),
  });

  const EditProfileMutation = useMutation({
    mutationFn: (data) => userApis.editProfile(user.accessToken, data),
    onSuccess: async () => {
      toast.success('Thay đổi thông tin thành công!');
      await queryClient.invalidateQueries({ queryKey: ['user', user._id] });
    },
  });

  if (isLoading) return 'Loading...';

  if (error) return 'An error has occurred: ' + error.message;

  const _sleep = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  const _handleSubmit = async (values, actions) => {
    await _sleep(1000);

    try {
      const data = {
        firstName: values.firstName,
        lastName: values.lastName,
        id: user._id,
      };

      EditProfileMutation.mutate(data);
    } catch (err) {
      actions.setErrors({ firstName: err });
    }
    actions.setSubmitting(false);
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
        theme="light"
      />
      <section style={{ position: 'relative' }}>
        <BoxContainer>
          <div className="wp-push">
            <Box title="personal_information">
              <Formik
                initialValues={{
                  firstName: data?.firstName || '',
                  lastName: data?.lastName || '',
                }}
                //   validationSchema={currentValidationSchema}
                onSubmit={_handleSubmit}
              >
                {({ isSubmitting }) => (
                  <Form>
                    <InputField
                      id="firstName"
                      name="firstName"
                      type="text"
                      height={48}
                      labelCustom="First Name"
                      isLabelPosition
                    />
                    <InputField
                      id="lastName"
                      name="lastName"
                      type="text"
                      height={48}
                      labelCustom="Last Name"
                      isLabelPosition
                    />

                    <StyledButtonSave disabled={isSubmitting} type="submit">
                      {t('saveBtn')}
                    </StyledButtonSave>
                  </Form>
                )}
              </Formik>
            </Box>
          </div>
          <div className="wp-push">
            <Box title="login_information">
              <InputLabel sx={{ mb: 1 }}>Email</InputLabel>
              <TextField id="email" variant="outlined" sx={{ width: '100%' }} disabled value={user.email} />
              <InputLabel sx={{ mt: 2 }}>Password</InputLabel>
              <StyledButtonChange variant="contained" onClick={() => setShowModal(true)}>
                {t('changeBtn')}
              </StyledButtonChange>
            </Box>
          </div>
        </BoxContainer>
      </section>
      {showModal && <FloatModal setShowModal={setShowModal} />}
    </>
  );
};

export default ProfilePage;
