import styled from 'styled-components';
import Button from '@mui/material/Button';
import InputField from './common/InputField';
import { Link } from 'react-router-dom';
import { forwardRef } from 'react';
import { Form, Formik } from 'formik';

import Modal from './common/Modal';
import useOnClickOutside from '../hooks/useCheckClickedOutside';

const IdentificationModal = ({ ...props }, ref) => {
    return (
        <div id="modal-container" ref={ref}>
            <Modal title="IDENTIFICATION" {...props}>
                <SectionLoginForm>
                    <TitleSection>I ALREADY HAVE AN ACCOUNT</TitleSection>
                    <Formik>
                        <form autoComplete="off">
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
                            <StyledButton>LOGIN</StyledButton>
                        </form>
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
