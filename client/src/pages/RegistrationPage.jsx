import styled from 'styled-components';
import { useState, Fragment } from 'react';
import * as Yup from 'yup';
import { Box, Button, CircularProgress } from '@mui/material';
import { Form, Formik } from 'formik';

import validationSchema from '../components/forms/registration/FormModels/validationSchema';
import { SignUpInfoForm1, SignUpInfoForm2, AccountActivationForm } from '../components/forms/registration';

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
            return <StyledStepLabel>Registration Information1</StyledStepLabel>;
        case 1:
            return <StyledStepLabel>Registration Information2</StyledStepLabel>;
        case 2:
            return <StyledStepLabel>ACCOUNT ACTIVATION</StyledStepLabel>;
        default:
            return <div>Not Found</div>;
    }
}

const Registration = () => {
    const [activeStep, setActiveStep] = useState(0);
    const currentValidationSchema = validationSchema[activeStep];
    const totalSteps = () => {
        return steps.length;
    };

    const isLastStep = activeStep === steps.length - 1;

    function _sleep(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }

    async function _submitForm(values, actions) {
        await _sleep(1000);
        alert(JSON.stringify(values, null, 2));
        actions.setSubmitting(false);
        setActiveStep(activeStep + 1);
    }

    function _handleSubmit(values, actions) {
        if (isLastStep) {
            _submitForm(values, actions);
        } else {
            setActiveStep(activeStep + 1);
            actions.setTouched({});
            actions.setSubmitting(false);
        }
    }

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleStep = (step) => () => {
        setActiveStep(step);
    };

    const handleReset = () => {
        setActiveStep(0);
        setCompleted({});
    };

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
                                        <Button
                                            color="inherit"
                                            disabled={activeStep === 0}
                                            onClick={handleBack}
                                            sx={{ mr: 1 }}
                                        >
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
                    <div>
                        <Button variant="contained">Continue with Google</Button>
                    </div>
                    <span>OR</span>
                    <span>Continue with your email address</span>
                    <span>Sign in with your GUCCI email and password or create a profile if you are new.</span>
                </SocialWrapper>
            </RegistrationSection>
        </Wrapper>
    );
};

export default Registration;

const Wrapper = styled.div`
    display: flex;
    height: 100%;
`;

const RegistrationSection = styled.section`
    margin-top: var(--header-height);
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
`;

const PageTitle = styled.h1`
    margin: 0;
    padding: 18px 0;
    font-size: 2.125rem;
    font-weight: bold;
    border-bottom: 1px solid var(--border-color);
`;

const RegistrationWrapper = styled.div`
    width: 66.666%;
    padding: 0.5rem 7.5rem 2.5rem;
    background-color: #f6f5f3;
`;

const RegistrationForm = styled.div`
    margin: 1.875rem auto;
`;

const FormLabel = styled.div`
    display: flex;
    align-items: center;
    font-size: 1.5rem;
    font-weight: bold;
    span {
        margin-left: 0.5rem;
    }
`;

const SocialWrapper = styled.div`
    display: flex;
    flex-direction: column;
    text-align: center;
`;

const StyledStepLabel = styled.h3`
    font-size: 1.5rem;
    margin: 0;
    justify-content: flex-start;
`;
const StyledButton = styled(Button)`
    &&& {
        height: 3rem;
        margin-top: 1.5rem;
        background-color: #000;
        color: white;
        padding: 1rem 1.5rem;
    }
`;
