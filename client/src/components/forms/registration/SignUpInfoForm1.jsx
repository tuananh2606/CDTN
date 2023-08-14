import styled from 'styled-components';

import InputField from '../../common/InputField';
import FormLayout from '../FormLayout';

const SignUpInfoForm1 = () => {
  return (
    <FormLayout>
      <InputField
        id="email"
        name="email"
        label="Email"
        type="email"
        height={54}
        required
        placeholder="name@example.com"
      />
      {/* {formik.errors.email && <p className="errorMsg"> {formik.errors.email} </p>} */}
    </FormLayout>
  );
};

export default SignUpInfoForm1;
