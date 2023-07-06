import styled from 'styled-components';
import { Button } from '@mui/material';
import { Form } from 'formik';

export const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 0 1rem;
    @media only screen and (min-width: 48em) {
        flex-direction: row;
    }
`;

export const RootSection = styled.section`
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

export const RegistrationSection = styled(RootSection)`
    width: 100%;
    height: 100%;
`;

export const LoginSection = styled(RootSection)`
    width: 100%;
    background-color: #f6f5f3;
    h1 {
        margin-top: 0;
        font-size: 2.125rem;
        padding-bottom: 1rem;
        border-bottom: 1px solid var(--border-color);
    }
`;

export const LoginForm = styled.div`
    margin-top: 4rem;
`;

export const TitleSection = styled.h2`
    font-weight: 600;
    font-size: 1.25rem;
    @media only screen and (min-width: 48em) {
        font-size: 1.75rem;
    }
`;

export const StyledForm = styled(Form)``;

export const StyledFormContent = styled.div`
    background-color: #fff;
    padding: 2rem;
`;

export const PageTitle = styled.h1`
    margin: 0;
    padding: 18px 0;
    font-size: 1.25rem;
    font-weight: bold;
    border-bottom: 1px solid var(--border-color);
    @media only screen and (min-width: 48em) {
        font-size: 1.75rem;
    }
`;

export const StyledButton = styled(Button)`
    float: right;
    width: 240px;
    &&& {
        height: 3rem;
        margin-top: 1.5rem;
        background-color: #000;
        color: white;
        padding: 1rem 1.5rem;
    }
    a {
        color: #fff;
        text-decoration: none;
    }
`;
