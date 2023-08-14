import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useTheme } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';
import {
  Backdrop,
  Modal,
  Fade,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  useMediaQuery,
  Button,
} from '@mui/material';
import { VNDFormat } from '../../utils/formatMoney';
import { fDateTime } from '../../utils/formatTime';
import {
  ContainerProductList,
  StyledCard,
  ProductCardInfo,
  ProductName,
  StyledImg,
  StyledModalContent,
  StyledButton,
  ButtonAgree,
  OrderSummaryItem,
  Empty,
  ButtonRemove,
} from './OrderPageStyles';
import { orderApis } from '../../apis';

const OrderPage = () => {
  const [order, setOrder] = useState();
  const [open, setOpen] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const { t } = useTranslation('order');
  const user = useSelector((state) => state.auth.login.currentUser);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['order-by-user', user._id],
    queryFn: () => orderApis.getOrderByUser(user._id),
  });

  const updateOrderMutation = useMutation({
    mutationFn: (order) => orderApis.updateStatusOrder(user?.accessToken, order),
    onSuccess: () => {
      setOpenDialog(false);
      setOpen(false);
      refetch();
    },
  });

  if (isLoading) return 'Loading...';
  if (error) return 'An error has occurred: ' + error.message;

  const calculatePriceTotal = () => {
    let initialValue = 0;
    const totalPrice = order?.orderItems.reduce(
      (accumulator, { quantity, price }) => accumulator + quantity * price,
      initialValue,
    );
    return parseInt(totalPrice);
  };
  const handleOpen = (data) => {
    setOrder(data);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  const ConfirmCancel = () => {
    const data = {
      id: order._id,
      status: 'Cancel',
    };
    updateOrderMutation.mutateAsync(data);
  };

  return (
    <section style={{ minHeight: '100vh', height: 'auto', backgroundColor: '#f6f5f3' }}>
      <ContainerProductList>
        {data && data.length > 0 ? (
          data.map((item, idx) => (
            <StyledCard key={idx} onClick={() => handleOpen(item)}>
              <div className="card-front">
                <div>
                  <StyledImg src={item.orderItems[0]?.img.url} alt="Anh" />
                </div>
                <ProductCardInfo>
                  <span>Order No. </span>
                  <ProductName>{item.orderId}</ProductName>
                </ProductCardInfo>
              </div>
            </StyledCard>
          ))
        ) : (
          <Empty>Your order is empty</Empty>
        )}
      </ContainerProductList>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <StyledModalContent>
            <ButtonRemove onClick={handleClose}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12.0007 10.5865L16.9504 5.63672L18.3646 7.05093L13.4149 12.0007L18.3646 16.9504L16.9504 18.3646L12.0007 13.4149L7.05093 18.3646L5.63672 16.9504L10.5865 12.0007L5.63672 7.05093L7.05093 5.63672L12.0007 10.5865Z"
                  fill="black"
                />
              </svg>
            </ButtonRemove>
            <div className="card-header">
              <ul>
                <li className="order-id">
                  <p>
                    Order ID <span>{order?.orderId}</span>
                  </p>
                </li>
                <li className="order-status">
                  <p>
                    {t('placed_on')} <span>{fDateTime(order?.createdAt)}</span> | {t('order_status')}:{' '}
                    <span className={order?.orderStatus === 'Cancel' && 'cancel'}>{order?.orderStatus}</span>
                  </p>
                </li>
              </ul>
            </div>
            <div className="card-body">
              <div className="order-product">
                {order?.orderItems.map((product, idx) => (
                  <div className="order" key={idx}>
                    <div className="order-info">
                      <h4>{product?.name}</h4>
                      <p>
                        {t('qty')}: {product?.quantity}
                      </p>
                      <h3>{VNDFormat(product?.price * product?.quantity)}</h3>
                    </div>
                    <div className="order-info__img">
                      <img src={product?.img.url}></img>
                    </div>
                  </div>
                ))}
              </div>
              <div className="order-payment-ship">
                <div className="payment">
                  <h5>{t('payment')}</h5>
                  <p>
                    {order?.paymentInfo.paymentMethod === 'ttqvnp'
                      ? 'Thanh toán qua VnPay'
                      : 'Thanh toán khi nhận hàng'}
                  </p>
                  <h5>{t('payment')}</h5>
                  <span className={order?.paymentInfo.status ? 'paid' : 'unpaid'}>
                    {order?.paymentInfo.status ? 'Paid' : 'Unpaid'}
                  </span>
                </div>
                <div className="delivery">
                  <h5>{t('delivery')}</h5>
                  <div>
                    <h6>{t('adressline1')}</h6>
                    <p>{order?.shippingInfo.address.addressLine1}</p>
                    <h6 className="address-line2">{t('adressline2')}</h6>
                    <p>{order?.shippingInfo.address.addressLine2}</p>
                  </div>
                </div>
              </div>
              <div className="order-summary">
                <div className="visible"></div>
                <div className="summary">
                  <h5>{t('order_summary')}</h5>
                  <ul>
                    <OrderSummaryItem>
                      <span>{t('subtotal')}</span>
                      <span>{VNDFormat(calculatePriceTotal())}</span>
                    </OrderSummaryItem>
                    <OrderSummaryItem>
                      <span>{t('delivery_cost')}</span>
                      <span>0</span>
                    </OrderSummaryItem>
                    <OrderSummaryItem>
                      <span>{t('tax')}</span>
                      <span>0</span>
                    </OrderSummaryItem>
                  </ul>
                  <div className="total">
                    <h5>{t('total')}</h5>
                    <span>{VNDFormat(calculatePriceTotal())}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="card-footer">
              <Box sx={{ flex: '1 1 auto' }} />
              <div>
                {/* <StyledButton>Pre-pay</StyledButton> */}
                <StyledButton disabled={order?.orderStatus == 'Placed' ? false : true} onClick={handleOpenDialog}>
                  {t('cancel')}
                </StyledButton>
              </div>
            </div>
          </StyledModalContent>
        </Fade>
      </Modal>
      <Dialog
        fullScreen={fullScreen}
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">Confirm the action</DialogTitle>
        <DialogContent>
          <DialogContentText>Do you realy want to cancel this order?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleCloseDialog}>
            Disagree
          </Button>
          <ButtonAgree variant="contained" onClick={() => ConfirmCancel()} autoFocus>
            Agree
          </ButtonAgree>
        </DialogActions>
      </Dialog>
    </section>
  );
};

export default OrderPage;
