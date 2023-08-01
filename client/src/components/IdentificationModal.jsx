import styled from 'styled-components';
import { Button, Box } from '@mui/material';
import { InputField } from './common';
import { Link, useNavigate } from 'react-router-dom';
import { forwardRef, memo } from 'react';
import { Form, Formik } from 'formik';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import authApis from '../apis/authApis';
import Modal from './common/Modal';
import { loginUser } from '../redux/apiRequest';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

const IdentificationModal = forwardRef(({ ...props }, ref) => {
  const [show, setShow] = useState(true);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [sendSuccess, setSendSuccess] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
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

        navigate('/user/overview', {
          state: true,
        });
      } catch (err) {
        actions.setErrors({ email: err });
      }
    } else {
      let response = await authApis.sendMailResetPassword({ email: values.email });
      if (response.status >= 200 && response.status < 400) {
        setSendSuccess(true);
      } else {
        actions.setErrors({ email: response.data });
      }
    }
    actions.setSubmitting(false);
  };

  useEffect(() => {
    setIsForgotPassword(false);
    setSendSuccess(false);
  }, [props.toggle]);

  return (
    <div id="modal-container" ref={ref}>
      <Modal title="authentication.identification" {...props} isShow={show} setShow={setShow}>
        {!isForgotPassword ? (
          <>
            <SectionLoginForm>
              <TitleSection>{t('authentication.exist_account')}</TitleSection>
              <Formik
                initialValues={{ email: '', password: '' }}
                validate={(values) => {
                  const errors = {};
                  if (!values.email) {
                    errors.email = t('authentication.err_email_require');
                  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
                    errors.email = t('authentication.err_email_format');
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
                      labelCustom="authentication.login"
                      autoComplete="email"
                      isLabelPosition
                    />

                    <InputField
                      id="password"
                      name="password"
                      type="password"
                      height={48}
                      labelCustom="authentication.password"
                      autoComplete="off"
                      isLabelPosition
                    />

                    <SmallText onClick={() => setIsForgotPassword(true)}>
                      {t('authentication.forgot_password')}
                    </SmallText>

                    <PrimaryButton type="submit" disabled={isSubmitting}>
                      {t('authentication.btn_login')}
                    </PrimaryButton>
                  </Form>
                )}
              </Formik>
            </SectionLoginForm>
          </>
        ) : (
          <>
            <TitleSection>{t('authentication.change_password')}</TitleSection>
            {sendSuccess ? (
              <p>{t('authentication.success_send')}</p>
            ) : (
              <SectionLoginForm>
                <p>{t('authentication.desc_change_password')}</p>
                <Formik
                  initialValues={{ email: '' }}
                  validate={(values) => {
                    const errors = {};
                    if (!values.email) {
                      errors.email = 'Email is required';
                    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
                      errors.email = 'Please enter a valid email address';
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
                        <BackButton onClick={() => setIsForgotPassword(false)}>{t('authentication.cancle')}</BackButton>
                        <Box sx={{ flex: '1 1 auto' }} />
                        <PrimaryButton type="submit" disabled={isSubmitting}>
                          {t('authentication.send')}
                        </PrimaryButton>
                      </Box>
                    </Form>
                  )}
                </Formik>
              </SectionLoginForm>
            )}
          </>
        )}
        <SeparatorModal />
        <Register>
          <TitleSection>{t('authentication.new_user')}</TitleSection>
          <p>{t('authentication.description_identification')}</p>
          <Link to="/registration">
            <PrimaryButton onClick={() => setShow(false)}>{t('authentication.register')}</PrimaryButton>
          </Link>
        </Register>
      </Modal>
    </div>
  );
});

export default memo(IdentificationModal);
const TitleSection = styled.h2`
  margin: 0;
  font-weight: 600;
  font-size: 1.125rem;
  text-transform: uppercase;
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
