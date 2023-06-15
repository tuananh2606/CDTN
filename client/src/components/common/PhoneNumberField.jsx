import styled from 'styled-components';
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import { useField } from 'formik';
import { at } from 'lodash';

const PhoneNumberField = (props) => {
    const { isLabelPosition = false, htmlFor, labelCustom, ...rest } = props;
    const [field, meta] = useField({
        name: props.name,
        type: 'tel',
    });

    function _renderHelperText() {
        const [touched, error] = at(meta, 'touched', 'error');
        if (touched && error) {
            return error;
        }
    }

    return (
        <Container>
            {isLabelPosition && (
                <StyledInputLabel htmlFor={props.id} required={true}>
                    {labelCustom}
                </StyledInputLabel>
            )}
            <StyledPhoneField defaultCountry="VN" international {...field} {...rest} />
            {meta.touched && meta.error ? <div className="error">{meta.error}</div> : null}
        </Container>
    );
};

export default PhoneNumberField;

const Container = styled.div`
    width: 100%;
    margin-top: 1.5rem;
`;

const StyledPhoneField = styled(PhoneInput)`
    width: 100%;
    input {
        border: 1px solid #e0e0e0;
        border-radius: 6px;
        height: ${(props) => props.height && props.height + 'px !important'};
        &:focus {
            outline: none;
            border: 2px solid #2065d1;
        }
    }
`;
const StyledInputLabel = styled(InputLabel)`
    &&& {
        font-size: 14px;
        margin-bottom: 0.5rem;
    }
`;
