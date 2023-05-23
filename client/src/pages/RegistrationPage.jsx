import styled from 'styled-components';
import { useState, Fragment } from 'react';
import { Stepper, Step, StepLabel, StepButton, Box, Button, Stack, Typography, CircularProgress } from '@mui/material';

import SignUpInfoForm1 from '../components/forms/registration/SignUpInfoForm1';
import SignUpInfoForm2 from '../components/forms/registration/SignUpInfoForm2';
import AccountActivationForm from '../components/forms/registration/AccountActivationForm';

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
    const totalSteps = () => {
        return steps.length;
    };

    const isLastStep = () => {
        return activeStep === totalSteps() - 1;
    };

    const handleNext = () => {
        const newActiveStep =
            isLastStep() && !allStepsCompleted()
                ? // It's the last step, but not all steps have been completed,
                  // find the first step that has been completed
                  steps.findIndex((step, i) => !(i in completed))
                : activeStep + 1;
        setActiveStep(newActiveStep);
    };

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
                            <StyledButton onClick={handleNext} sx={{ mr: 1 }}>
                                Next
                            </StyledButton>
                        </Box>
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
