import * as Yup from 'yup';
const visaRegEx = /^(?:4[0-9]{12}(?:[0-9]{3})?)$/;
const phoneRegExp = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
import 'yup-phone-lite';

export default [
    Yup.object().shape({
        firstName: Yup.string().required('First name is required').min(2, 'Must be 4 characters or more'),
        lastName: Yup.string().required('Last name is required').min(2, 'Must be 4 characters or more'),
        addressLine1: Yup.string().required('Address Line 1 is required').min(2, 'Must be 4 characters or more'),
        // addressLine2: Yup.string().min(2, 'Must be 4 characters or more'),
        city: Yup.string().required('City is required').min(2, 'Must be 4 characters or more'),
        province: Yup.string().required('Province is required').min(2, 'Must be 4 characters or more'),
        // phoneNumber: Yup.string().phone().required('A phone number is required'),
    }),
];
