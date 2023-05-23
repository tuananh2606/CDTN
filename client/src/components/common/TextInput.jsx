import styled from 'styled-components';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';

const TextInput = ({ isLabelPosition = false, htmlFor, labelCustom, ...props }) => {
    return (
        <Container>
            {isLabelPosition && (
                <StyledInputLabel htmlFor={props.id} required={true}>
                    {labelCustom}
                </StyledInputLabel>
            )}
            <StyledTextInput variant="outlined" className="input" {...props} />
        </Container>
    );
};

export default TextInput;

const Container = styled.div`
    width: 100%;
    margin-top: 1.5rem;
`;

const StyledTextInput = styled(TextField)`
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
