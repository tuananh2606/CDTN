import * as Yup from 'yup';

export default [
  Yup.object().shape({
    code: Yup.string().min(2, 'Too Short!').max(10, 'Too Long!').required('Code is required'),
    name: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Name is required'),
    slug: Yup.string().min(2, 'Too Short!').max(20, 'Too Long!').required('Slug is required'),
    price: Yup.number().positive('Number is positive').required('Price is required'),
    stock: Yup.number()
      .min(1, 'Too Short!')
      .max(100, 'Too Much!')
      .positive('Number is positive')
      .required('Stock is required'),
  }),
  Yup.object().shape({
    firstName: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('First name is required'),
    lastName: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Last name is required'),
  }),
];
