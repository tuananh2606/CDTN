import { Stack } from '@mui/material';
import 'react-phone-number-input/style.css';

import { PhoneNumberField, InputField } from '../../common';
import FormLayout from '../FormLayout';

const ShippingAddressForm = () => {
    return (
        <FormLayout>
            <Stack direction="row" spacing={2}>
                <InputField name="firstName" label="First Name" type="text" height={54} required />
                <InputField name="lastName" label="Last Name" type="text" height={54} required />
            </Stack>
            <InputField name="addressLine1" label="Address Line 1" type="text" height={54} required />
            <InputField name="addressLine2" label="Address Line 2" type="text" height={54} required />
            <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
                <InputField name="city" label="City" type="text" height={54} required />
                <InputField name="province" label="Province" type="text" height={54} required />
            </Stack>
            {/* <PhoneNumberField name="phoneNumber" isLabelPosition labelCustom="Contact Phone Number" height="54" /> */}
            {/* {formik.errors.email && <p className="errorMsg"> {formik.errors.email} </p>} */}
        </FormLayout>
    );
};

export default ShippingAddressForm;
