import styled from 'styled-components';
import { Button, Box } from '@mui/material';
import { InputField } from './common';
import { Link, useNavigate } from 'react-router-dom';
import { forwardRef } from 'react';
import { Form, Formik } from 'formik';
import { useState } from 'react';

import authApis from '../apis/authApis';
import Modal from './common/Modal';
import { loginUser } from '../redux/apiRequest';
import { useDispatch, useSelector } from 'react-redux';

const IdentificationModal = ({ ...props }, ref) => {
    const [isForgotPassword, setIsForgotPassword] = useState(false);
    const { errorMessage } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const _sleep = (ms) => {
        return new Promise((resolve) => setTimeout(resolve, ms));
    };

    const _handleSubmit = async (values, actions) => {
        await _sleep(1000);
        if (values.password) {
            try {
                const user = {
                    email: values.email,
                    password: values.password,
                };
                await dispatch(loginUser(user)).unwrap();
                navigate('/user');
            } catch (err) {
                actions.setErrors({ email: err });
            }

            // loginUser(user, dispatch, navigate);
        } else {
            authApis.sendMailResetPassword({ email: values.email });
        }
        actions.setSubmitting(false);
    };

    console.log(errorMessage);

    return (
        <div id="modal-container" ref={ref}>
            <Modal title="IDENTIFICATION" {...props}>
                {!isForgotPassword ? (
                    <>
                        <SectionLoginForm>
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
                                {({ isSubmitting, status }) => (
                                    <Form>
                                        <InputField
                                            id="email"
                                            name="email"
                                            type="email"
                                            height={48}
                                            labelCustom="Login"
                                            autoComplete="email"
                                            isLabelPosition
                                        />
                                        {/* {status && <div>{status}</div>} */}
                                        <InputField
                                            id="password"
                                            name="password"
                                            type="password"
                                            height={48}
                                            labelCustom="Password"
                                            autoComplete="off"
                                            isLabelPosition
                                        />

                                        <SmallText onClick={() => setIsForgotPassword(true)}>
                                            Forgot your password?
                                        </SmallText>

                                        <PrimaryButton type="submit" disabled={isSubmitting}>
                                            LOGIN
                                        </PrimaryButton>
                                    </Form>
                                )}
                            </Formik>
                        </SectionLoginForm>
                        <SeparatorModal />
                        <Register>
                            <TitleSection>I DON'T HAVE AN ACCOUNT</TitleSection>
                            <p>Enjoy added benefits and a richer experience by creating a personal account</p>
                            <Link to="/registration">
                                <PrimaryButton>Create new account</PrimaryButton>
                            </Link>
                        </Register>
                    </>
                ) : (
                    <>
                        <TitleSection>FORGOT YOUR PASSWORD</TitleSection>
                        <p>Please enter your email address to reset your password. You will receive an email shortly</p>
                        <Formik
                            initialValues={{ email: '' }}
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
                                <Form>
                                    <InputField
                                        id="email"
                                        name="email"
                                        type="email"
                                        height={48}
                                        labelCustom="Email"
                                        autoComplete="email"
                                        isLabelPosition
                                    />
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            flexDirection: 'row',
                                            pt: 2,
                                        }}
                                    >
                                        <BackButton onClick={() => setIsForgotPassword(false)}>BACK</BackButton>
                                        <Box sx={{ flex: '1 1 auto' }} />
                                        <PrimaryButton type="submit" disabled={isSubmitting}>
                                            SEND
                                        </PrimaryButton>
                                    </Box>
                                </Form>
                            )}
                        </Formik>
                    </>
                )}
            </Modal>
        </div>
    );
};

export default forwardRef(IdentificationModal);
const TitleSection = styled.h2`
    margin: 0;
    font-weight: 600;
    font-size: 1.125rem;
`;

const SectionLoginForm = styled.section`
    @media screen and (min-width: 768px) {
        padding-bottom: 3rem;
    }
`;

const StyledButton = styled(Button)`
    &&& {
        height: 3rem;
        margin-top: 1.5rem;
        width: 100%;
        padding: 1rem 1.5rem;
    }
`;

const BackButton = styled(StyledButton)`
    margin-right: 1rem;
    background-color: transparent;
    color: #000;
    border: 2px solid #000 !important;
    &:hover {
        background-color: var(--border-color) !important;
        border: 1px solid var(--border-color) !important;
    }
`;

const PrimaryButton = styled(StyledButton)`
    background-color: #000;
    color: white;
    &:hover {
        background-color: var(--border-color) !important;
        color: #000;
    }
`;

const SeparatorModal = styled.div`
    margin-left: -6.4vw;
    margin-right: -6.4vw;
    border-top: 1px solid var(--border-color);
    @media screen and (min-width: 768px) {
        margin-left: -3.125vw;
        margin-right: -3.125vw;
    }
    @media screen and (min-width: 1024px) {
        margin-left: -3.125vw;
        margin-right: -3.125vw;
    }
    @media screen and (min-width: 1440px) {
        margin-left: -3.3333333333vw;
        margin-right: -3.3333333333vw;
    }
`;

const Register = styled.section`
    padding-top: 3rem;
`;

const SmallText = styled.small`
    text-decoration: underline;
    cursor: pointer;
`;
