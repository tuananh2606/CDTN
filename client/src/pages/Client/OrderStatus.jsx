import { useState, useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';

import { LoadingBackdrop } from '../../components/common';
import OrderSuccess from './OrderSuccess';
import OrderFailed from './OrderFailed';
import { emptyCart } from '../../redux/cartSlice';
import orderApis from '../../apis/orderApis';

const OrderStatus = () => {
  const [message, setMessage] = useState('');
  const [open, setOpen] = useState(true);

  const dispatch = useDispatch();
  const { state } = useLocation();
  const user = useSelector((state) => state.auth.login.currentUser);
  const searchParams = new URLSearchParams(window.location.search);
  const vnp_ResponseCode = searchParams.get('vnp_ResponseCode');
  const orderId = searchParams.get('vnp_TxnRef');

  console.log(state);

  const updateOrderMutation = useMutation({
    mutationFn: (orderId) =>
      orderApis.updateStatusOrderVnPay(user?.accessToken, orderId, {
        paymentInfo: {
          status: true,
        },
      }),
  });

  useEffect(() => {
    if (vnp_ResponseCode === '00') {
      setMessage('paymentSuccess');
      setOpen(false);
      updateOrderMutation.mutate(orderId);
      dispatch(emptyCart());
    } else if (state && state.paymentMethod === 'ttknh') {
      setMessage('paymentSuccess');
      setOpen(false);
      dispatch(emptyCart());
    } else if (vnp_ResponseCode === '24') {
      setOpen(false);
      setMessage('paymentFailed');
    }
  }, []);
  return (
    <div>
      {/* {message == 'paymentSuccess' ? (
        <OrderSuccess state={orderId || state.orderId} />
      ) : message == 'paymentFailed' ? (
        <OrderFailed />
      ) : (
        <LoadingBackdrop open={open} />
      )} */}
      {message == 'paymentSuccess' ? (
        <OrderSuccess state={orderId || state.orderId} />
      ) : (
        <LoadingBackdrop open={open} />
      )}
      {message == 'paymentFailed' ? <OrderFailed /> : <LoadingBackdrop open={open} />}
      {/* <LoadingBackdrop open /> */}
    </div>
  );
};

export default OrderStatus;
