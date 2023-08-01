import * as Yup from 'yup';
const visaRegEx = /^(?:4[0-9]{12}(?:[0-9]{3})?)$/;

export default [
  Yup.object().shape({
    email: Yup.string()
      .required('Email is required')
      .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Please enter a valid email address'),
  }),
  Yup.object().shape({
    password: Yup.string()
      .required('Password is required')
      .matches(
        /^(?=[A-Za-z0-9!#$&()*+,-.:;<=>?%@[^_{|}~]+$)^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!#$&()*+,-.:;<=>%?@[^_{|}~])(?=.{8,19}).*$/,
        'Password must be 8-19 characters and contain at least one letter, one capital letter, one number and a special character',
      ),
    confirmedPassword: Yup.string()
      .required('Password confirmation is required')
      .oneOf([Yup.ref('password'), null], 'This password does not match the above'),
    firstName: Yup.string().required('First name is required').min(2, 'Must be 4 characters or more'),
    lastName: Yup.string().required('Last name is required').min(2, 'Must be 4 characters or more'),
  }),
  Yup.object().shape({
    acticationCode: Yup.string().required('Actication code is required').length(6, 'Must be 6 characters'),
  }),
];
