import { useState } from 'react';
import { Box, Button, CircularProgress } from '@mui/material';
import { Form, Formik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { GoogleLogin, useGoogleLogin } from '@react-oauth/google';
import { loginSuccess } from '../../../redux/authSlice';
import { useTranslation } from 'react-i18next';
import {
  Wrapper,
  RegistrationSection,
  PageTitle,
  RegistrationWrapper,
  RegistrationForm,
  FormLabel,
  SocialWrapper,
  StyledStepLabel,
  StyledButton,
} from './RegistrationPageStyles';
import validationSchema from '../../../components/forms/registration/FormModels/validationSchema';
import { SignUpInfoForm1, SignUpInfoForm2, AccountActivationForm } from '../../../components/forms/registration';
import { registerUser } from '../../../redux/apiRequest';
import axios from 'axios';
import authApis from '../../../apis/authApis';

const steps = ['Registration Information', 'Registration Information'];

function _renderStepContent(step) {
  switch (step) {
    case 0:
      return <SignUpInfoForm1 />;
    case 1:
      return <SignUpInfoForm2 />;
    default:
      return <div>Not Found</div>;
  }
}

const Registration = () => {
  const [activeStep, setActiveStep] = useState(0);
  const currentValidationSchema = validationSchema[activeStep];
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const totalSteps = () => {
    return steps.length;
  };

  const _renderStep = (step) => {
    switch (step) {
      case 0:
        return <StyledStepLabel>{t('authentication.registration_info')}</StyledStepLabel>;
      case 1:
        return <StyledStepLabel>{t('authentication.registration_info')}</StyledStepLabel>;
      default:
        return <div>Not Found</div>;
    }
  };

  const isLastStep = activeStep === steps.length - 1;

  const _sleep = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  const _submitForm = async (values, actions) => {
    await _sleep(1000);
    const newUser = {
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      password: values.password,
    };
    registerUser(newUser, dispatch, navigate);
    actions.setSubmitting(false);
  };

  const _handleSubmit = async (values, actions) => {
    if (isLastStep) {
      _submitForm(values, actions);
    } else if (activeStep === 0 && values.email) {
      let response = await authApis.checkEmail({ email: values.email });
      if (response.status === 200) {
        setActiveStep(activeStep + 1);
        actions.setTouched({});
      } else {
        actions.setErrors({ email: response.data });
      }

      actions.setSubmitting(false);
    } else {
      setActiveStep(activeStep + 1);
      actions.setTouched({});
      actions.setSubmitting(false);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  // const googleLogin = useGoogleLogin({
  //     flow: 'auth-code',
  //     onSuccess: async (codeResponse) => {
  //         const { data } = await axios.post('http://localhost:3001/v1/auth/google', {
  //             code: codeResponse.code,
  //         });
  //         dispatch(loginSuccess(data));
  //         console.log(data);
  //     },
  //     onError: (errorResponse) => console.log(errorResponse),
  // });

  return (
    <Wrapper>
      <RegistrationSection>
        <RegistrationWrapper>
          <PageTitle>{t('authentication.create_new_acccount')}</PageTitle>
          <RegistrationForm>
            <FormLabel>
              {_renderStep(activeStep)}
              <span> {`(${activeStep + 1 + '/' + totalSteps() + ')'}`}</span>
            </FormLabel>
            <Formik
              initialValues={{
                firstName: '',
                lastName: '',
                email: '',
                password: '',
                confirmedPassword: '',
              }}
              validationSchema={currentValidationSchema}
              onSubmit={_handleSubmit}
            >
              {({ isSubmitting }) => (
                <Form>
                  {_renderStepContent(activeStep)}
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      pt: 2,
                    }}
                  >
                    <Button color="inherit" disabled={activeStep === 0} onClick={handleBack} sx={{ mr: 1 }}>
                      {t('authentication.back')}
                    </Button>
                    <Box sx={{ flex: '1 1 auto' }} />
                    <StyledButton disabled={isSubmitting} type="submit" sx={{ mr: 1 }}>
                      {isLastStep ? t('authentication.finish') : t('authentication.next')}
                    </StyledButton>
                  </Box>
                </Form>
              )}
            </Formik>
          </RegistrationForm>
        </RegistrationWrapper>
        <SocialWrapper>
          <h2>My Account</h2>
          <span>OR</span>
          <p>{t('authentication.des_register')}</p>
          {/* <GoogleLogin
                        onSuccess={(credentialResponse) => {
                            console.log(credentialResponse);
                        }}
                        onError={() => {
                            console.log('Login Failed');
                        }}
                    /> */}
          {/* <MyCustomButton onClick={() => googleLogin()}>Sign in with Google 🚀 </MyCustomButton> */}
        </SocialWrapper>
      </RegistrationSection>
    </Wrapper>
  );
};

export default Registration;
