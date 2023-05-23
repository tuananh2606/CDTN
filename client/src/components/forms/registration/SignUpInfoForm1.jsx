import styled from 'styled-components';

import TextInput from '../../common/TextInput';
import FormLayout from '../FormLayout';

const SignUpInfoForm1 = () => {
    return (
        <FormLayout>
            <TextInput label="Email" type="email" height={54} required placeholder="name@example.com" />
            <TextInput label="Email Confirmation" type="email" height={54} required placeholder="name@example.com" />
        </FormLayout>
    );
};

export default SignUpInfoForm1;
