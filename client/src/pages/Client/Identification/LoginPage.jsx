import { CircularProgress } from '@mui/material';
import { Formik } from 'formik';
import { useDispatch } from 'react-redux';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import authApis from '../../../apis/authApis';

import {
  Wrapper,
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
  const { t } = useTranslation();

  const _sleep = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };
  const _handleSubmit = async (values, { setSubmitting, setErrors }) => {
    await _sleep(1000);
    if (values.password) {
      try {
        const user = {
          email: values.email,
          password: values.password,
        };
        const res = await dispatch(loginUser(user)).unwrap();

        if (res.admin) {
          navigate('/admin');
        } else {
          navigate(location.state.prevUrl);
        }
      } catch (err) {
        setErrors({ email: err });
      }
    } else {
      let response = await authApis.sendMailResetPassword({ email: values.email });
      if (response.status >= 200 && response.status < 400) {
        setSendSuccess(true);
      } else {
        setErrors({ email: response.data });
      }
    }
    setSubmitting(false);
  };
  return (
    <Wrapper>
      <LoginSection>
        <h1>{t('authentication.identification')}</h1>
        <LoginForm>
          <TitleSection>{t('authentication.exist_account')}</TitleSection>
          <Formik
            initialValues={{ email: '', password: '' }}
            validate={(values) => {
              const errors = {};
              if (!values.email) {
                errors.email = t('authentication.err_email_require');
              } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
                errors.email = t('authentication.err_email_format');
              } else if (!values.password) {
                errors.password = t('authentication.err_password_require');
              } else if (!/^.{8,19}$/i.test(values.password)) {
                errors.password = t('authentication.err_password_format');
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
                    <small>{t('authentication.forgot_password')}</small>
                  </a>
                </StyledFormContent>
                <StyledButton type="submit" disabled={isSubmitting}>
                  {t('authentication.btn_login')}
                </StyledButton>
              </StyledForm>
            )}
          </Formik>
        </LoginForm>
      </LoginSection>
      <RegistrationSection>
        <PageTitle>{t('authentication.new_user')}</PageTitle>
        <p>{t('authentication.description_identification')}</p>
        <Link to="/registration">
          <StyledButton>{t('authentication.register')}</StyledButton>
        </Link>
      </RegistrationSection>
    </Wrapper>
  );
};

export default LoginPage;
