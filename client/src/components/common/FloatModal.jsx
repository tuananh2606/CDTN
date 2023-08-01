import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form } from 'formik';
import { Button } from '@mui/material';
import { useTranslation } from 'react-i18next';

import { logoutSuccess } from '../../redux/authSlice';
import { createAxios } from '../../utils/http';
import { logoutUser } from '../../redux/apiRequest';
import userApis from '../../apis/userApis';
import { Box, InputField } from '../../components/common';

const FloatModal = ({ setShowModal }) => {
  const user = useSelector((state) => state.auth.login.currentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation('profile');
  let axiosJWT = createAxios(user, dispatch, logoutSuccess);
  const _sleep = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  const _handleSubmit = async (values, actions) => {
    await _sleep(1000);

    try {
      const data = {
        oldPassword: values.oldPassword,
        newPassword: values.newPassword,
        confirmNewPassword: values.confirmNewPassword,
        id: user._id,
      };

      const response = await userApis.changePassword(user.accessToken, data);
      console.log(response);
      if (response.status >= 200 && response.status < 400) {
        logoutUser(dispatch, user?.accessToken, navigate, axiosJWT);
      } else {
        actions.setErrors({ email: response.data });
      }
    } catch (err) {
      actions.setErrors({ oldPassword: err });
    }
    actions.setSubmitting(false);
  };
  return (
    <Wrapper>
      <BackDrop />
      <Container>
        <button onClick={() => setShowModal(false)} className="close-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M12.0007 10.5865L16.9504 5.63672L18.3646 7.05093L13.4149 12.0007L18.3646 16.9504L16.9504 18.3646L12.0007 13.4149L7.05093 18.3646L5.63672 16.9504L10.5865 12.0007L5.63672 7.05093L7.05093 5.63672L12.0007 10.5865Z"
              fill="black"
            />
          </svg>
        </button>
        <Box title="password_recovery">
          <Formik
            initialValues={{
              oldPassword: '',
              newPassword: '',
              confirmNewPassword: '',
            }}
            //   validationSchema={currentValidationSchema}
            onSubmit={_handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form>
                <InputField
                  id="oldPassword"
                  name="oldPassword"
                  type="password"
                  height={48}
                  labelCustom="Old password"
                  isLabelPosition
                />
                <InputField
                  id="newPassword"
                  name="newPassword"
                  type="password"
                  height={48}
                  labelCustom="New password"
                  isLabelPosition
                />
                <InputField
                  id="confirmNewPassword"
                  name="confirmNewPassword"
                  type="password"
                  height={48}
                  labelCustom="Confirm your password"
                  isLabelPosition
                />
                <StyledButton variant="contained" type="submit" disabled={isSubmitting}>
                  {t('sendBtn')}
                </StyledButton>
              </Form>
            )}
          </Formik>
        </Box>
      </Container>
    </Wrapper>
  );
};

export default FloatModal;

const Wrapper = styled.section`
  width: 100%;
  height: 100%;
  position: fixed;
  inset: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;
const BackDrop = styled.div`
  position: absolute;
  inset: 0;
  opacity: 0.8;
  background-color: #000;
`;
const Container = styled.div`
  position: relative;
  margin: 0 auto;
  overflow-y: auto;
  display: flex;
  flex-flow: column nowrap;
  width: 90vw;
  background-color: #fff;
  opacity: 1;
  .close-icon {
    background-color: transparent;
    border: none;
    cursor: pointer;
    position: absolute;
    top: 4%;
    right: 3%;
    @media screen and (min-width: 48em) {
      top: 5%;
      right: 3%;
    }
  }
  @media only screen and (min-width: 48em) and (max-width: 63.9375em) {
    width: 60vw;
  }
  @media only screen and (min-width: 64em) {
    width: 30vw;
  }
  /* @media only screen and (min-width: 48em) {
    padding: 3rem;
  } */
`;
export const StyledButton = styled(Button)`
  &&& {
    margin-top: 2rem;
    height: 3rem;
    background-color: #000;
    color: white;
    padding: 1rem 1.5rem;
    box-shadow: none;
    float: left;
    &:hover {
      background-color: #eae8e4;
      color: #19110b;
    }
  }
`;
