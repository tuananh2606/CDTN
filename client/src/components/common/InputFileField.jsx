import styled from 'styled-components';
import InputLabel from '@mui/material/InputLabel';
import { useField } from 'formik';
import { at } from 'lodash';

const InputFileField = (props) => {
    const { isLabelPosition = false, htmlFor, labelCustom, ...rest } = props;
    const [field, meta] = useField(props);

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
            <input
                // error={meta.touched && meta.error && true}
                // helperText={_renderHelperText()}
                {...field}
                {...rest}
                type="file"
                multiple
            />
        </Container>
    );
};

export default InputFileField;

const Container = styled.div`
    width: 100%;
    margin-top: 1.5rem;
`;

// const StyledInputField = styled(TextField)`
//     &&& {
//         width: 100%;
//         input {
//             height: ${(props) => props.height && props.height + 'px !important'};
//             padding: 0 1rem;
//         }
//     }
// `;
const StyledInputLabel = styled(InputLabel)`
    &&& {
        font-size: 14px;
        margin-bottom: 0.5rem;
    }
`;
