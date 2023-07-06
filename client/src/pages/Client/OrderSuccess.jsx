import styled from 'styled-components';
import { Typography, Grid, Button } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import orderApis from '../../apis/orderApis';

const OrderSuccess = ({ state }) => {
    // const { state } = useLocation();
    const { data, isLoading, error } = useQuery({
        queryKey: ['order-details'],
        queryFn: () => orderApis.getOrderDetails(state !== undefined && state),
    });
    if (isLoading) return 'Loading...';

    if (error) return 'An error has occurred: ' + error.message;
    const { address, name, city, district, country, phoneNumber } = data?.shippingInfo;

    return (
        <Wrapper>
            <SuccessContainer>
                <img src="/images/transaction/success.png" alt="Anh" />
                <span>Thank you for your purchase!</span>
            </SuccessContainer>

            <Grid item xs={12} sm={6} sx={{ mt: 3 }}>
                <Typography variant="h6" gutterBottom>
                    Your order number is:
                </Typography>
                <Typography>Billing & Shipping Infomation</Typography>
                <Typography>{name}</Typography>
                <Typography>{address.addressLine1}</Typography>
                <Typography>{address.addressLine2}</Typography>
                <Typography>{district}</Typography>
                <Typography>{city}</Typography>
                <Typography>{country}</Typography>
                <Typography gutterBottom>{phoneNumber}</Typography>
                <Typography paragraph>
                    You will receive an order confirmation email with details of your order.
                </Typography>
            </Grid>
            <Link to="/">
                <StyledButton variant="contained">Countinue Shopping</StyledButton>
            </Link>
        </Wrapper>
    );
};

export default OrderSuccess;

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
