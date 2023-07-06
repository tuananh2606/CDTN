import styled from 'styled-components';
import { Button, Box } from '@mui/material';
import { useState, useRef } from 'react';
import { useParams } from 'react-router-dom';

import { useQueryString } from '../../../hooks';
import { useOnClickOutside } from '../../../hooks';
import { CheckBoxIcon, DoneIcon } from '../../../components/Icon';
import { InputField } from '../../../components/common';
import { Form, Formik } from 'formik';
import authApis from '../../../apis/authApis';

const ResetPasswordPage = () => {
    const [showMustContain, setShowMustContain] = useState(false);
    const [mustContain, setMustContain] = useState({
        contains8C: false,
        containsN: false,
        containsCL: false,
        containsLL: false,
        containsSC: false,
    });
    // const [contains8C, setContains8C] = useState(false);
    const ref = useRef(null);
    useOnClickOutside(ref, (e) => {
        let input = document.querySelectorAll('#password');
        let md = Array.apply(0, input).find((el) => el.contains(e.target));
        if (!md && !ref.current.contains(e.target)) {
            setShowMustContain(false);
        }
    });
    let { userId } = useParams();
    let query = useQueryString();
    const mustContainData = [
        ['At least 8 charaters', mustContain.contains8C],
        ['1 number at least', mustContain.containsN],
        ['1 capital letter at least', mustContain.containsCL],
        ['A lowercase letter at least', mustContain.containsLL],
        [
            'At least one following special caracter: ! # $ & ( ) * + , - . : ; < = > % ? @ [ ^ _ { | } ~ ',
            mustContain.containsSC,
        ],
    ];

    const _sleep = (ms) => {
        return new Promise((resolve) => setTimeout(resolve, ms));
    };

    const _handleSubmit = async (values, actions) => {
        await _sleep(1000);
        let token = query.get('token');
        authApis.resetPassword(userId, token, { password: values.password });
        console.log(userId, token, { password: values.password });
        actions.setSubmitting(false);
    };

    return (
        <Section>
            <TitleSection>MY ACCOUNT ACTIVATION</TitleSection>
            <Formik
                initialValues={{ password: '', confirmPassword: '' }}
                validate={(values) => {
                    const errors = {};
                    if (!values.password) {
                        errors.password = 'Password is required';
                    }
                    // else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
                    //     errors.email = 'Invalid password';
                    // }
                    return errors;
                }}
                onSubmit={_handleSubmit}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <StyledInfo>
                            <span>Please enter a new password</span>
                        </StyledInfo>
                        <InputField
                            id="passwordReset"
                            name="password"
                            type="password"
                            height={48}
                            labelCustom="Password"
                            autoComplete="off"
                            isLabelPosition
                            setMustContain={setMustContain}
                            setShowMustContain={setShowMustContain}
                            ref={ref}
                        />

                        <MustContainContainer show={showMustContain}>
                            <span>Your password must be different from your email and contain:</span>

                            <MustContainRules>
                                {mustContainData.map((item, idx) => (
                                    <MustContainItem success={item[1]} key={idx}>
                                        {item[1] ? (
                                            <DoneIcon width="0.75rem" height="0.75rem" />
                                        ) : (
                                            <CheckBoxIcon width="0.75rem" height="0.75rem" />
                                        )}
                                        <span>{item[0]}</span>
                                    </MustContainItem>
                                ))}
                            </MustContainRules>
                        </MustContainContainer>

                        <InputField
                            id="confirmPassword"
                            name="confirmPassword"
                            type="password"
                            height={48}
                            labelCustom="Confirm your password"
                            autoComplete="off"
                            isLabelPosition
                        />
                        <StyledButton type="submit" disabled={isSubmitting}>
                            SEND
                        </StyledButton>
                    </Form>
                )}
            </Formik>
        </Section>
    );
};

export default ResetPasswordPage;
const TitleSection = styled.h2`
    margin: 0;
    font-weight: 600;
    font-size: 1.125rem;
`;

const Section = styled.section`
    padding-left: 6.4vw;
    padding-right: 6.4vw;
    padding-top: 2rem;
    padding-bottom: 2rem;
    @media only screen and (min-width: 48em) {
        padding-top: 1.5rem;
        padding-bottom: 3rem;
    }
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

const StyledInfo = styled.div`
    display: flex;
    flex-direction: column;
    font-size: 1.125rem;
`;

const StyledButton = styled(Button)`
    height: 3rem;
    margin-top: 1.5rem;
    width: 100%;
    padding: 1rem 1.5rem;
    background-color: #000;
    color: white;
    &:hover {
        background-color: var(--border-color) !important;
        color: #000;
    }
`;

const MustContainContainer = styled.div`
    margin-top: 0.5rem;
    font-size: 0.75rem;
`;

const MustContainRules = styled.ul`
    margin-top: 0.5rem;
`;

const MustContainItem = styled.li`
    list-style: none;
    display: flex;
    align-items: center;
    line-height: 2;
    letter-spacing: 0.4px;
    color: ${(props) => props.success && '#5c7e08'};
    span {
        margin-left: 1rem;
    }
`;
