import styled from 'styled-components';
import FormLayout from '../FormLayout';
import TextInput from '../../common/TextInput';

const AccountActivationForm = () => {
    return (
        <FormLayout>
            <Paragraph>
                Please enter the activation code you just received by email at <strong>bjjitaccll@gmail.com</strong> to
                activate your account
            </Paragraph>
            <TextInput label="Actication Code" type="text" height={54} required placeholder="ex: 123456" />
            <div style={{ marginTop: '2rem' }}></div>
            <a href="#">
                <SendAgainLink>Send again?</SendAgainLink>
            </a>
        </FormLayout>
    );
};

export default AccountActivationForm;

const Paragraph = styled.p`
    font-size: 1.125rem;
    letter-spacing: 1px;
`;

const SendAgainLink = styled.span`
    font-weight: bold;
    color: #000;
    letter-spacing: 1px;
`;
