import styled from 'styled-components';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';

const FormLayout = ({ children }) => {
    return <StyledBox>{children}</StyledBox>;
};

FormLayout.propTypes = {
    children: PropTypes.node.isRequired,
};
export default FormLayout;

const StyledBox = styled(Box)`
    box-sizing: border-box;
    background-color: #fff;
    width: 100%;
    height: auto;
    padding: 3rem 2rem;
    margin: 2rem 0;
    & :first-child {
        margin-top: 0;
    }
`;
