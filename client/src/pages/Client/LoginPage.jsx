import styled from 'styled-components';
import { Box, Button, CircularProgress } from '@mui/material';
import { Form, Formik } from 'formik';
import { useDispatch } from 'react-redux';
import { Link, useNavigate, useLocation } from 'react-router-dom';

import { InputField } from '../../components/common';
import { loginUser } from '../../redux/apiRequest';

const LoginPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    let location = useLocation();
    const _handleSubmit = (values, { setSubmitting }) => {
        setTimeout(() => {
            const user = {
                email: values.email,
                password: values.password,
            };
            loginUser(user, dispatch, navigate, location.state.prevUrl);
            setSubmitting(false);
        }, 400);
    };
    return (
        <Wrapper>
            <LoginSection>
                <h1>IDENTIFICATION</h1>
                <LoginForm>
                    <TitleSection>I ALREADY HAVE AN ACCOUNT</TitleSection>
                    <Formik
                        initialValues={{ email: '', password: '' }}
                        validate={(values) => {
                            const errors = {};
                            if (!values.email) {
                                errors.email = 'Required';
                            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
                                errors.email = 'Invalid email address';
                            }
                            return errors;
                        }}
                        onSubmit={_handleSubmit}
                    >
                        {({ isSubmitting }) => (
                            <StyledForm>
                                <StyledFormContent>
                                    <InputField
                                        id="email"
                                        name="email"
                                        type="email"
                                        height={48}
                                        labelCustom="Login"
                                        autoComplete="email"
                                        isLabelPosition
                                    />
                                    <InputField
                                        id="password"
                                        name="password"
                                        type="password"
                                        height={48}
                                        labelCustom="Password"
                                        autoComplete="off"
                                        isLabelPosition
                                    />
                                    <a href="#">
                                        <small>Forgot your password?</small>
                                    </a>
                                </StyledFormContent>
                                <StyledButton type="submit" disabled={isSubmitting}>
                                    Sign in
                                </StyledButton>
                            </StyledForm>
                        )}
                    </Formik>
                </LoginForm>
            </LoginSection>
            <RegistrationSection>
                <RegistrationWrapper>
                    <PageTitle>CREATE A NEW ACCOUNT</PageTitle>
                </RegistrationWrapper>
            </RegistrationSection>
        </Wrapper>
    );
};

export default LoginPage;
const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
`;

const RootSection = styled.section`
    flex-grow: 1;
    padding-top: 3rem;
    padding-bottom: 3rem;
    @media only screen and (min-width: 48em) {
        padding-left: 3.125vw;
        padding-right: 3.125vw;
    }
    @media only screen and (min-width: 64em) {
        padding-left: 4.6875vw;
        padding-right: 4.6875vw;
    }
    @media only screen and (min-width: 90em) {
        padding-left: 8.333333333333332vw;
        padding-right: 8.333333333333332vw;
    }
`;

const RegistrationSection = styled(RootSection)`
    width: 100%;
    height: 100%;
`;

const LoginSection = styled(RootSection)`
    min-width: 500px;
    width: 100%;
    background-color: #f6f5f3;
    h1 {
        margin-top: 0;
        font-size: 2.125rem;
        padding-bottom: 1rem;
        border-bottom: 1px solid var(--border-color);
    }
`;

const LoginForm = styled.div`
    margin-top: 4rem;
`;

const TitleSection = styled.h2`
    font-weight: 600;
    font-size: 1.75rem;
    font-weight: 700;
`;

const StyledForm = styled(Form)``;

const StyledFormContent = styled.div`
    background-color: #fff;
    padding: 2rem;
`;

const PageTitle = styled.h1`
    margin: 0;
    padding: 18px 0;
    font-size: 2.125rem;
    font-weight: bold;
    border-bottom: 1px solid var(--border-color);
`;

const RegistrationWrapper = styled.div`
    background-color: #f6f5f3;
`;

const StyledButton = styled(Button)`
    float: right;
    width: 240px;
    &&& {
        height: 3rem;
        margin-top: 1.5rem;
        background-color: #000;
        color: white;
        padding: 1rem 1.5rem;
    }
`;
