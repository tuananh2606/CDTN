import TextInput from '../../common/TextInput';
import FormLayout from '../FormLayout';

const SignUpInfoForm2 = () => {
    return (
        <>
            <FormLayout>
                <TextInput label="Password" type="password" height={54} required />
            </FormLayout>
            <h2>PERSONAL INFORMATION</h2>
            <FormLayout>
                <TextInput label="First Name" type="text" height={54} required />
                <TextInput label="Last Name" type="text" height={54} required />
            </FormLayout>
        </>
    );
};

export default SignUpInfoForm2;
