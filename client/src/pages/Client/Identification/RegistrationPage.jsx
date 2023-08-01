import { useState } from 'react';
import { Box, Button, CircularProgress } from '@mui/material';
import { Form, Formik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { GoogleLogin, useGoogleLogin } from '@react-oauth/google';
import { loginSuccess } from '../../../redux/authSlice';

const BASE_URL = import.meta.env.VITE_BASE_URL;

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

const steps = ['Registration Information', 'Registration Information', 'ACCOUNT ACTIVATION'];

function _renderStepContent(step) {
  switch (step) {
    case 0:
      return <SignUpInfoForm1 />;
    case 1:
      return <SignUpInfoForm2 />;
    case 2:
      return <AccountActivationForm />;
    default:
      return <div>Not Found</div>;
  }
}

function _renderStep(step) {
  switch (step) {
    case 0:
      return <StyledStepLabel>Registration Information</StyledStepLabel>;
    case 1:
      return <StyledStepLabel>Registration Information</StyledStepLabel>;
    case 2:
      return <StyledStepLabel>Account Activation</StyledStepLabel>;
    default:
      return <div>Not Found</div>;
  }
}

const Registration = () => {
  const [activeStep, setActiveStep] = useState(0);
  const currentValidationSchema = validationSchema[activeStep];
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const totalSteps = () => {
    return steps.length;
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
      } else {
        actions.setErrors({ email: response.data });
      }
      //   console.log(response);
      actions.setTouched({});
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
          <PageTitle>CREATE A NEW ACCOUNT</PageTitle>
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
                acticationCode: '',
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
                      Back
                    </Button>
                    <Box sx={{ flex: '1 1 auto' }} />
                    <StyledButton disabled={isSubmitting} type="submit" sx={{ mr: 1 }}>
                      {isLastStep ? 'Finish' : 'Next'}
                    </StyledButton>
                  </Box>
                </Form>
              )}
            </Formik>
          </RegistrationForm>
        </RegistrationWrapper>
        <SocialWrapper>
          <h2>My Account</h2>
          {/* <GoogleLogin
                        onSuccess={(credentialResponse) => {
                            console.log(credentialResponse);
                        }}
                        onError={() => {
                            console.log('Login Failed');
                        }}
                    /> */}
          {/* <MyCustomButton onClick={() => googleLogin()}>Sign in with Google 🚀 </MyCustomButton> */}
          <span>OR</span>
          <span>Continue with your email address</span>
          <span>Sign in with your GUCCI email and password or create a profile if you are new.</span>
        </SocialWrapper>
      </RegistrationSection>
    </Wrapper>
  );
};

export default Registration;
