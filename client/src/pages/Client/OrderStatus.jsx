import { useState, useEffect } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';

import { LoadingBackdrop } from '../../components/common';
import OrderSuccess from './OrderSuccess';
import OrderFailed from './OrderFailed';

import orderApis from '../../apis/orderApis';

const OrderStatus = () => {
    const [message, setMessage] = useState('');
    const { state } = useLocation();
    const navigate = useNavigate();
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
            updateOrderMutation.mutate(orderId);
        }
        if (state.paymentMethod === 'ttknh') {
            setMessage('paymentSuccess');
        }
    }, []);
    return (
        <div>
            {message === 'paymentSuccess' ? (
                <OrderSuccess state={orderId || state.orderId} />
            ) : (
                <LoadingBackdrop open />
            )}
        </div>
    );
};

export default OrderStatus;
