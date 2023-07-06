import styled from 'styled-components';
import { Typography, Grid, Button } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

const OrderFailed = () => {
    return (
        <Wrapper>
            <SuccessContainer>
                <img src="/images/transaction/failed.png" alt="Anh" />
                <span>Thank you for your purchase!</span>
            </SuccessContainer>

            <Link to="/checkout">
                <StyledButton variant="contained">Countinue Shopping</StyledButton>
            </Link>
        </Wrapper>
    );
};

export default OrderFailed;

const Wrapper = styled.div`
    width: 100%;
    padding: 2rem 1rem;
`;
const SuccessContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    img {
        width: 100px;
        height: 100px;
        object-fit: cover;
    }
    span {
        margin-top: 1rem;
        font-size: 2rem;
    }
`;
const OrderInformation = styled.div``;
const StyledButton = styled(Button)`
    float: right;
`;
