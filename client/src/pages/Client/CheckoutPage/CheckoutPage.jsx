import { useState } from 'react';
import { Box, Button } from '@mui/material';
import { Form, Formik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import * as dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';

import { VNDFormat } from '../../../utils/formatMoney';
import {
  Wrapper,
  Content,
  CheckoutSection,
  CheckoutForm,
  FormLabel,
  StyledStepLabel,
  StyledButton,
  OrderSummarySection,
  OrderSummary,
  OrderSummaryItem,
  CartList,
  CartItem,
  CartItemContent,
  CartItemInfo,
  CartItemQP,
} from './styles';
import orderApis from '../../../apis/orderApis';
import { checkoutValidationSchema } from '../../../components/forms/checkout/FormModels';
import { ShippingAddressForm, PaymentForm } from '../../../components/forms/checkout';
import ReviewOrder from '../ReviewOrder';
import { emptyCart } from '../../../redux/cartSlice';

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
  const { t } = useTranslation('cart_checkout');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.auth.login.currentUser);
  const cart = useSelector((state) => state.cart.shoppingCart);

  const createOrderMutation = useMutation({
    mutationFn: (data) => orderApis.createOrder(user?.accessToken, data),
    onSuccess: async (data) => {
      console.log(data);
      navigate('/order-status', {
        state: { orderId: data.orderId, paymentMethod: data.paymentInfo.paymentMethod },
      });
    },
  });
  const paymentMutation = useMutation({
    mutationFn: (data) => orderApis.purchaseByVnPay(user?.accessToken, data),
    onSuccess: async (data) => {
      window.location.href = data;
    },
  });

  const totalSteps = () => {
    return steps.length;
  };

  const isLastStep = activeStep === steps.length - 1;

  function _sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  const calculatePriceTotal = () => {
    let initialValue = 0;
    const totalPrice = cart.reduce((accumulator, { quantity, price }) => accumulator + quantity * price, initialValue);
    return parseInt(totalPrice);
  };

  const calcEstimatedTotal = () => {
    return calculatePriceTotal();
  };

  async function _submitForm(values, actions) {
    await _sleep(1000);
    const newOrder = {
      orderId: dayjs(Date.now()).format('DDHHmmss'),
      shippingInfo: {
        name: `${values.firstName} ${values.lastName}`,
        address: {
          addressLine1: values.addressLine1,
          addressLine2: values.addressLine2,
        },
        city: values.city,
        district: values.district,
        country: values.country,
        phoneNumber: values.phoneNumber,
      },
      orderItems: [...cart],
      paymentMethod: values.payment,
      totalPrice: calculatePriceTotal(),
      user: user._id,
    };
    if (values.payment === 'ttqvnp') {
      const data = {
        totalPrice: calculatePriceTotal(),
        orderId: dayjs(Date.now()).format('DDHHmmss'),
      };
      paymentMutation.mutate(data);
      createOrderMutation.mutate(newOrder);
    }
    if (values.payment === 'ttknh') {
      createOrderMutation.mutate(newOrder);
    }
    dispatch(emptyCart());
    actions.setSubmitting(false);
  }

  function _handleSubmit(values, actions) {
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
                district: '',
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
                          <span>
                            {t('qty')}: {item.quantity}
                          </span>
                          <span>{VNDFormat(item.price * item.quantity)}</span>
                        </CartItemQP>
                      </CartItemContent>
                    </CartItem>
                  </li>
                );
              })}
          </CartList>
          <OrderSummary>
            <h6>{t('order_summary')}</h6>
            <ul>
              <OrderSummaryItem>
                <span>{t('subtotal')}</span>
                <span>{VNDFormat(calculatePriceTotal())}</span>
              </OrderSummaryItem>
              <OrderSummaryItem>{t('shipping')}</OrderSummaryItem>
              <OrderSummaryItem>{t('estimated_tax')}</OrderSummaryItem>
              <OrderSummaryItem>
                <span>{t('estimated_total')}</span>
                <span>{VNDFormat(calcEstimatedTotal())}</span>
              </OrderSummaryItem>
            </ul>
          </OrderSummary>
        </OrderSummarySection>
      </Content>
    </Wrapper>
  );
};

export default CheckoutPage;
