import styled from 'styled-components';
import Button from '@mui/material/Button';
import InputField from './common/InputField';
import { Link, useNavigate } from 'react-router-dom';
import { forwardRef } from 'react';
import { Form, Formik } from 'formik';

import Modal from './common/Modal';
import { loginUser } from '../redux/apiRequest';
import { useDispatch, useSelector } from 'react-redux';

const IdentificationModal = ({ ...props }, ref) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const _handleSubmit = (values, { setSubmitting }) => {
        setTimeout(() => {
            const user = {
                email: values.email,
                password: values.password,
            };
            loginUser(user, dispatch, navigate);
            setSubmitting(false);
        }, 400);
    };

    return (
        <div id="modal-container" ref={ref}>
            <Modal title="IDENTIFICATION" {...props}>
                <SectionLoginForm>
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
                                <StyledButton type="submit" disabled={isSubmitting}>
                                    LOGIN
                                </StyledButton>
                            </Form>
                        )}
                    </Formik>
                </SectionLoginForm>
                <SeparatorModal />
                <Register>
                    <TitleSection>I DON'T HAVE AN ACCOUNT</TitleSection>
                    <p>Enjoy added benefits and a richer experience by creating a personal account</p>
                    <Link to="/registration">
                        <StyledButton>Create new account</StyledButton>
                    </Link>
                </Register>
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
        background-color: #000;
        color: white;
        width: 100%;
        padding: 1rem 1.5rem;
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
