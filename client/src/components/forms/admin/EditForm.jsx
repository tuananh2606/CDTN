import styled from 'styled-components';

import InputField from '../../common/InputField';
import FormLayout from '../FormLayout';

const EditForm = () => {
    return (
        <FormLayout>
            <InputField name="name" label="Name" type="text" height={54} required />
            <InputField name="email" label="Email" type="email" height={54} required />
            <InputField name="admin" label="Role" type="text" height={54} required />
            <InputField name="verified" label="Verified" type="text" height={54} required />
            {/* <InputField name="status" label="Status" type="text" height={54} required /> */}
            {/* {formik.errors.email && <p className="errorMsg"> {formik.errors.email} </p>} */}
        </FormLayout>
    );
};

export default EditForm;
