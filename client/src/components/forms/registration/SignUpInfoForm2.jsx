import InputField from '../../common/InputField';
import FormLayout from '../FormLayout';
import { useTranslation } from 'react-i18next';

const SignUpInfoForm2 = () => {
  const { t } = useTranslation();
  return (
    <>
      <FormLayout>
        <InputField name="password" label="Password" type="password" height={54} required />
        <InputField name="confirmedPassword" label="Password Confirmation" type="password" height={54} required />
      </FormLayout>
      <h2 style={{ textTransform: 'uppercase' }}>{t('personal_info')}</h2>
      <FormLayout>
        <InputField name="firstName" label="First Name" type="text" height={54} required />
        <InputField name="lastName" label="Last Name" type="text" height={54} required />
      </FormLayout>
    </>
  );
};

export default SignUpInfoForm2;
