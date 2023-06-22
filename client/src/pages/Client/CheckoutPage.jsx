import styled from 'styled-components';
import { useState } from 'react';
import { Box, Button, StepLabel } from '@mui/material';
import { Form, Formik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import orderApis from '../../apis/orderApis';
import { loginSuccess } from '../../redux/authSlice';
import { checkoutValidationSchema } from '../../components/forms/checkout/FormModels';
import { ShippingAddressForm, PaymentForm } from '../../components/forms/checkout';
import ReviewOrder from './ReviewOrder';

const steps = ['Shipping Address', 'Payment', 'Review Your Order'];

function _renderStep(step) {
    switch (step) {
        case 0:
            return <StyledStepLabel>Shipping Address</StyledStepLabel>;
        case 1:
            return <StyledStepLabel>Payment</StyledStepLabel>;
        case 2:
            return <StyledStepLabel>Order Review</StyledStepLabel>;
        default:
            return <div>Not Found</div>;
    }
}

function _renderStepContent(step) {
    switch (step) {
        case 0:
            return <ShippingAddressForm />;
        case 1:
            return <PaymentForm />;
        case 2:
            return <ReviewOrder />;
        default:
            return <div>Not Found</div>;
    }
}

const CheckoutPage = () => {
    const [activeStep, setActiveStep] = useState(0);
    const currentValidationSchema = checkoutValidationSchema[activeStep];
    const [totalPrice, setTotalPrice] = useState(0);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const user = useSelector((state) => state.auth.login.currentUser);
    const cart = useSelector((state) => state.cart.shoppingCart);

    const createOrderMutation = useMutation({
        mutationFn: (data) => orderApis.createOrder(user?.accessToken, data),
    });

    console.log(cart);

    const totalSteps = () => {
        return steps.length;
    };

    const isLastStep = activeStep === steps.length - 1;

    function _sleep(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }

    async function _submitForm(values, actions) {
        await _sleep(1000);
        const newOrder = {
            shippingInfo: {
                name: `${values.firstName} ${values.lastName}`,
                addressLine1: values.addressLine1,
                addressLine2: values.addressLine2,
                city: values.city,
                province: values.province,
                phoneNumber: values.phoneNumber,
            },
            orderItems: [...cart],
            payment: values.payment,
        };
        //createOrderMutation(newOrder);
        console.log(newOrder);
        actions.setSubmitting(false);
    }

    function _handleSubmit(values, actions) {
        console.log(values);
        if (isLastStep) {
            _submitForm(values, actions);
        } else {
            setActiveStep(activeStep + 1);
            actions.setTouched({});
            actions.setSubmitting(false);
        }
    }
    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const calculatePriceTotal = () => {
        let initialValue = 0;
        const totalPrice = cart.reduce(
            (accumulator, { quantity, price }) => accumulator + quantity * price,
            initialValue,
        );
        return totalPrice;
    };

    const calcEstimatedTotal = () => {
        return calculatePriceTotal();
    };

    return (
        <Wrapper>
            <Content>
                <CheckoutSection>
                    <CheckoutForm>
                        <FormLabel>
                            {_renderStep(activeStep)}
                            <span> {`(${activeStep + 1 + '/' + totalSteps() + ')'}`}</span>
                        </FormLabel>
                        <Formik
                            initialValues={{
                                firstName: '',
                                lastName: '',
                                addressLine1: '',
                                addressLine2: '',
                                city: '',
                                province: '',
                                phoneNumber: '',
                                payment: '',
                            }}
                            validationSchema={currentValidationSchema}
                            onSubmit={_handleSubmit}
                        >
                            {({ isSubmitting }) => (
                                <Form>
                                    {_renderStepContent(activeStep)}
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            flexDirection: 'row',
                                            pt: 2,
                                            px: '2rem',
                                        }}
                                    >
                                        <Button color="inherit" disabled={activeStep === 0} onClick={handleBack}>
                                            Back
                                        </Button>
                                        <Box sx={{ flex: '1 1 auto' }} />
                                        <StyledButton disabled={isSubmitting} type="submit">
                                            {isLastStep ? 'Finish' : 'Next'}
                                        </StyledButton>
                                    </Box>
                                </Form>
                            )}
                        </Formik>
                    </CheckoutForm>
                    {/* <Box sx={{ maxWidth: '100%' }}>
                        <Stepper activeStep={activeStep} orientation="vertical">
                            {steps.map((step, index) => (
                                <Step key={step}>
                                    <StyledStepLabel>{step}</StyledStepLabel>
                                    <StepContent>
                                        <Formik
                                            initialValues={{
                                                firstName: '',
                                                lastName: '',
                                                addressLine1: '',
                                                addressLine2: '',
                                                city: '',
                                                province: '',
                                                // phoneNumber: '',
                                                payment: '',
                                                test: '',
                                            }}
                                            validationSchema={currentValidationSchema}
                                            onSubmit={_handleSubmit}
                                        >
                                            {({ isSubmitting }) => (
                                                <Form>
                                                    {_renderStepContent(activeStep)}
                                                    <Box
                                                        sx={{
                                                            display: 'flex',
                                                            flexDirection: 'row',
                                                        }}
                                                    >
                                                        <Button
                                                            color="inherit"
                                                            disabled={activeStep === 0}
                                                            onClick={handleBack}
                                                            sx={{ mr: 1 }}
                                                        >
                                                            Back
                                                        </Button>
                                                        <Box sx={{ flex: '1 1 auto' }} />

                                                        <StyledButton
                                                            disabled={isSubmitting}
                                                            type="submit"
                                                            sx={{ mr: 1 }}
                                                        >
                                                            {isLastStep ? 'Finish' : 'Next'}
                                                        </StyledButton>
                                                    </Box>
                                                </Form>
                                            )}
                                        </Formik>
                                    </StepContent>
                                </Step>
                            ))}
                        </Stepper>
                    </Box> */}
                </CheckoutSection>
                <OrderSummarySection>
                    <CartList>
                        {cart &&
                            cart.length > 0 &&
                            cart.map((item, idx) => {
                                return (
                                    <li key={idx}>
                                        <CartItem>
                                            <img src={item.img.url} alt="Anh" />
                                            <CartItemContent>
                                                <CartItemInfo>
                                                    <h3>{item.name}</h3>
                                                    <span>{item.code}</span>
                                                    {/* <div>
                                                            <span>Variation: </span>
                                                            {item.variation.map((i, idxC) => (
                                                                <span key={idxC}>{i}</span>
                                                            ))}
                                                        </div> */}
                                                </CartItemInfo>
                                                <CartItemQP>
                                                    <span>QTY: {item.quantity}</span>
                                                    <span>{'$ ' + item.price * item.quantity}</span>
                                                </CartItemQP>
                                            </CartItemContent>
                                        </CartItem>
                                    </li>
                                );
                            })}
                    </CartList>
                    <OrderSummary>
                        <h6>ORDER SUMMARY</h6>
                        <ul>
                            <OrderSummaryItem>
                                <span>Subtotal</span>
                                <span>{'$ ' + calculatePriceTotal()}</span>
                            </OrderSummaryItem>
                            <OrderSummaryItem>Shipping</OrderSummaryItem>
                            <OrderSummaryItem>Estimated Tax</OrderSummaryItem>
                            <OrderSummaryItem>
                                <span>Estimated Total</span>
                                <span>{'$ ' + calcEstimatedTotal()}</span>
                            </OrderSummaryItem>
                        </ul>
                    </OrderSummary>
                </OrderSummarySection>
            </Content>
        </Wrapper>
    );
};

export default CheckoutPage;
const Wrapper = styled.div`
    background-color: #fff;
    margin-top: var(--header-height);
`;
const Content = styled.div`
    margin: 0px auto;
    max-width: 1200px;
    padding: 23px 27px;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    @media only screen and (min-width: 768px) {
        flex-direction: row;
    }
`;
const CheckoutSection = styled.section`
    width: 100%;
    @media only screen and (min-width: 768px) {
        width: calc(100% - 345px);
    }
`;
const CheckoutForm = styled.div`
    margin: 1.875rem auto;
`;

const FormLabel = styled.div`
    display: flex;
    align-items: center;
    font-size: 1.5rem;
    font-weight: bold;
    span {
        margin-left: 0.5rem;
    }
`;
const StyledStepLabel = styled(StepLabel)`
    .Mui-active {
        fill: #fff;
    }
    .MuiStepLabel-label {
        font-size: 2rem;
        text-transform: uppercase;
        letter-spacing: 1px;
    }
    .MuiSvgIcon-root {
        border-radius: 50%;
        font-size: 2rem;
        circle {
            fill: inherit;
            stroke: black;
            stroke-width: 3;
        }
        .MuiStepIcon-text {
            fill: #000;
        }
    }
`;
const StyledButton = styled(Button)`
    &&& {
        height: 3rem;
        background-color: #000;
        color: white;
        padding: 1rem 1.5rem;
    }
`;
const OrderSummarySection = styled.section`
    width: 100%;
    height: auto;
    padding: 1rem 1.5rem;
    border: 1px solid var(--border-color);
    @media only screen and (min-width: 768px) {
        width: 345px;
    }
`;
const OrderSummary = styled.div`
    width: 100%;
    ul {
        list-style: none;
    }
    h6 {
        font-size: 12px;
        font-weight: 400;
        text-transform: uppercase;
    }
`;

const OrderSummaryItem = styled.li`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 18px;
    font-size: 12px;
    font-weight: bold;
`;
const CartList = styled.ul`
    list-style: none;
    width: 100%;
    li {
        width: 100%;
        margin-bottom: 1rem;
    }
`;
const CartItem = styled.div`
    display: flex;
    align-items: center;
    height: 100px;
    width: 100%;
    img {
        height: 100%;
        width: 21%;
        object-fit: contain;
    }
`;
const CartItemContent = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left: 1rem;
    width: 70%;
    height: 100%;
`;

const CartItemInfo = styled.div`
    display: flex;
    flex-direction: column;
    h3 {
        margin: 0;
        font-size: 11px;
    }
    span {
        font-size: 10px;
    }
`;
const CartItemQP = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    min-width: 50px;
    height: 100%;
    span {
        font-size: 11px;
        text-align: right;
    }
`;
