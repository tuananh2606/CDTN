import { CircularProgress } from '@mui/material';
import { Formik } from 'formik';
import { useDispatch } from 'react-redux';
import { Link, useNavigate, useLocation } from 'react-router-dom';

import {
    Wrapper,
    RootSection,
    RegistrationSection,
    LoginSection,
    LoginForm,
    TitleSection,
    StyledForm,
    StyledFormContent,
    PageTitle,
    StyledButton,
} from './LoginPageStyles';
import { InputField } from '../../../components/common';
import { loginUser } from '../../../redux/apiRequest';

const LoginPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    let location = useLocation();

    const _sleep = (ms) => {
        return new Promise((resolve) => setTimeout(resolve, ms));
    };
    const _handleSubmit = async (values, { setSubmitting, setErrors }) => {
        await _sleep(1000);
        try {
            const user = {
                email: values.email,
                password: values.password,
            };
            await dispatch(loginUser(user)).unwrap();
            location.state.prevUrl ? navigate(`${location.state.prevUrl}`) : navigate('/user');
        } catch (err) {
            setErrors({ email: err });
        }
        setSubmitting(false);
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
                                errors.email = 'Email is required';
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
                <PageTitle>I DON'T HAVE AN ACCOUNT</PageTitle>
                <p>Enjoy added benefits and a richer experience by creating a personal account.</p>
                <StyledButton>
                    <Link to="/registration">Create New Account</Link>
                </StyledButton>
            </RegistrationSection>
        </Wrapper>
    );
};

export default LoginPage;
