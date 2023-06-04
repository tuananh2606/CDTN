import styled from 'styled-components';
import PropTypes from 'prop-types';

const Box = ({ title, children, ...props }) => {
    return (
        <Container>
            <h1>{title}</h1>
            <Content {...props}>{children}</Content>
        </Container>
    );
};

Box.propTypes = {
    children: PropTypes.node.isRequired,
};

export default Box;

const Container = styled.section`
    width: 100%;
    background-color: #fff;
    h1 {
        margin: 0;
        font-size: 28px;
        padding: 32px;
        border-bottom: 1px solid #e1dfd8;
    }
    .text-center {
        text-align: center;
    }
`;

const Content = styled.div`
    padding: 32px;
    strong,
    span {
        font-size: 18px;
    }
`;
