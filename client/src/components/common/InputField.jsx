import styled from 'styled-components';
import { forwardRef } from 'react';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import { useField } from 'formik';
import { at } from 'lodash';
import { useTranslation } from 'react-i18next';

const InputField = (props, ref) => {
  const { t } = useTranslation();
  const { isLabelPosition = false, htmlFor, labelCustom, setMustContain, setShowMustContain, ...rest } = props;
  const [field, meta] = useField(props);
  const { value } = meta;

  const validatePassword = () => {
    // has uppercase letter
    if (value.toLowerCase() != value) setMustContain((prev) => ({ ...prev, containsCL: true }));
    else setMustContain((prev) => ({ ...prev, containsCL: false }));

    // has lowercase letter
    if (value.toUpperCase() != value) setMustContain((prev) => ({ ...prev, containsLL: true }));
    else setMustContain((prev) => ({ ...prev, containsLL: false }));

    // has number
    if (/\d/.test(value)) setMustContain((prev) => ({ ...prev, containsN: true }));
    else setMustContain((prev) => ({ ...prev, containsN: false }));

    // has special character
    if (/(?=.*[!#$&()*+,-.:;<=>%?@[^_{|}~])(?=.{8,}).*$/g.test(value))
      setMustContain((prev) => ({ ...prev, containsSC: true }));
    else setMustContain((prev) => ({ ...prev, containsSC: false }));

    // has 8 characters
    if (value.length >= 8) setMustContain((prev) => ({ ...prev, contains8C: true }));
    else setMustContain((prev) => ({ ...prev, contains8C: false }));
  };

  const _renderHelperText = () => {
    const [touched, error] = at(meta, 'touched', 'error');
    if (touched && error) {
      return error;
    }
  };

  const handleFocus = () => {
    setShowMustContain(true);
  };

  return (
    <Container ref={ref}>
      {isLabelPosition && (
        <StyledInputLabel htmlFor={props.id} required={true}>
          {t(labelCustom)}
        </StyledInputLabel>
      )}
      <StyledInputField
        variant="outlined"
        className="input"
        error={meta.touched && meta.error && true}
        helperText={_renderHelperText()}
        onKeyUp={rest.id === 'passwordReset' ? validatePassword : undefined}
        onFocus={rest.id === 'passwordReset' ? handleFocus : undefined}
        {...field}
        {...rest}
      />
    </Container>
  );
};

export default forwardRef(InputField);

const Container = styled.div`
  width: 100%;
  margin-top: 1rem;
  &:first-child {
    margin-top: 0;
  }
`;

const StyledInputField = styled(TextField)`
  &&& {
    width: 100%;
    input {
      height: ${(props) => props.height && props.height + 'px !important'};
      padding: 0 1rem;
    }
  }
`;
const StyledInputLabel = styled(InputLabel)`
  &&& {
    font-size: 14px;
    margin-bottom: 0.5rem;
  }
`;
