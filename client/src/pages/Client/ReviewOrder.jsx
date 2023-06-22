import React from 'react';
import { useFormikContext } from 'formik';
import { Typography, Grid, List, ListItem, ListItemText } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import { getEstimatedTotal } from '../../redux/cartSlice';
import FormLayout from '../../components/forms/FormLayout';

const ReviewOrder = () => {
    const { values: formValues } = useFormikContext();
    const { firstName, lastName, addressLine1, addressLine2, province, city, payment, phoneNumber } = formValues;
    const cart = useSelector((state) => state.cart.shoppingCart);
    const dispatch = useDispatch();
    return (
        <FormLayout>
            <Grid item xs={12} sm={6}>
                <Typography variant="h6" gutterBottom>
                    Shipping
                </Typography>
                <Typography gutterBottom>{`${firstName} ${lastName}`}</Typography>
                <Typography gutterBottom>{`${addressLine1}`}</Typography>
                <Typography gutterBottom>{`${addressLine2}`}</Typography>
                <Typography gutterBottom>{`${province}`}</Typography>
                <Typography gutterBottom>{`${city}`}</Typography>
                <Typography gutterBottom>{`${phoneNumber}`}</Typography>
            </Grid>
            <Typography variant="h6" gutterBottom>
                Payment details
            </Typography>
            <Typography gutterBottom>
                {payment == 'ttknh' ? 'Thanh toán khi nhận hàng' : 'Thanh toán qua VNPAY'}
            </Typography>
        </FormLayout>
    );
};

export default ReviewOrder;
