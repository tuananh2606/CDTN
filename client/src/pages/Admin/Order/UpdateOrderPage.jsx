import { useState } from 'react';
import {
  TextField,
  Button,
  Box,
  Grid,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  TableContainer,
  Container,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
} from '@mui/material';
import styled from 'styled-components';
import axios from 'axios';
import { loginSuccess } from '../../../redux/authSlice';
import { useSelector, useDispatch } from 'react-redux';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import adminApis from '../../../apis/adminApis';
import { createAxios } from '../../../utils/http';
import { useLocation, useNavigate } from 'react-router-dom';
import AdminPageWrapper from '../../../components/AdminPageWrapper';
import { fDateTime } from '../../../utils/formatTime';

const UpdateOrderPage = () => {
  const [info, setInfo] = useState();
  const [orderStatus, setOrderStatus] = useState();

  const navigate = useNavigate();
  const { state } = useLocation();
  const user = useSelector((state) => state.auth.login.currentUser);
  const dispatch = useDispatch();

  let axiosJWT = createAxios(user, dispatch, loginSuccess);

  const updateOrderMutation = useMutation({
    mutationFn: (order) => adminApis.updateOrder(axiosJWT, user?.accessToken, state, order),
    onSuccess: () => {
      navigate('/admin/orders');
    },
  });

  const { isLoading, isError, data, error } = useQuery({
    queryKey: ['order', state],
    queryFn: () => adminApis.getOrder(axiosJWT, user?.accessToken, state),
    // staleTime: Infinity,
    // enable: false,
    onSuccess: (data) => {
      setInfo(data);
    },
  });

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  const _handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const newOrder = {
        orderStatus: info.orderStatus,
      };
      updateOrderMutation.mutate(newOrder);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(state);

  return (
    <AdminPageWrapper title="Update order">
      <Grid item xs={12} sm={6} sx={{ mt: 3 }}>
        <Typography variant="h4" gutterBottom>
          Billing & Shipping Infomation
        </Typography>
        <Typography>{info?.shippingInfo.name}</Typography>
        <Typography>{info?.shippingInfo['address'].addressLine1}</Typography>
        <Typography>{info?.shippingInfo['address'].addressLine2}</Typography>
        <Typography>{info?.shippingInfo.district}</Typography>
        <Typography>{info?.shippingInfo.city}</Typography>
        <Typography>{info?.shippingInfo.country}</Typography>
        <Typography gutterBottom>{info?.shippingInfo.phoneNumber}</Typography>
      </Grid>
      <Box>
        <Typography variant="h4" gutterBottom>
          Purchase Reciept
        </Typography>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Image</TableCell>
                <TableCell align="right">Code</TableCell>
                <TableCell align="right">Name</TableCell>
                <TableCell align="right">Price</TableCell>
                <TableCell align="right">Quanity</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {info?.orderItems.map((row) => (
                <TableRow key={row.code} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell
                    component="th"
                    scope="row"
                    sx={{ width: '100px', height: '100px', objectFit: 'cover', p: 0 }}
                  >
                    <img src={row.img.url} />
                  </TableCell>
                  <TableCell align="right">{row.code}</TableCell>
                  <TableCell align="right">{row.name}</TableCell>
                  <TableCell align="right">{row.price}</TableCell>
                  <TableCell align="right">{row.quantity}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <StyledBox>
          <div>
            <Typography variant="h6" gutterBottom>
              Order Details
            </Typography>

            <Typography>Date: {fDateTime(info?.createdAt)}</Typography>
            <Typography>Order No: {info?.orderId}</Typography>
            <Typography>Payment Method: {info?.paymentInfo.paymentMethod}</Typography>
            <Typography>Payment Status: {info?.paymentInfo.status}</Typography>
            <Typography>Payment At: {fDateTime(info?.paidAt)}</Typography>
          </div>
          <Typography>Total {info?.totalPrice}</Typography>
        </StyledBox>
        <Typography variant="h6" gutterBottom>
          Tracking Order
        </Typography>
        <Form onSubmit={_handleSubmit}>
          <FormControl fullWidth sx={{ mt: '1rem', mb: '0.5rem' }}>
            <InputLabel id="select-label">Order Status</InputLabel>
            <Select
              labelId="select-label"
              id="select"
              value={info?.orderStatus || ''}
              label="Order Status"
              onChange={(e) => setInfo({ ...info, orderStatus: e.target.value })}
            >
              <MenuItem value={'Placed'}>Placed</MenuItem>
              <MenuItem value={'Shipped'}>Shipped</MenuItem>
              <MenuItem value={'Delivered'}>Delivered</MenuItem>
            </Select>
          </FormControl>
          <Button variant="outlined" color="secondary" type="submit" sx={{ mt: 3 }}>
            Submit
          </Button>
        </Form>
      </Box>
      {/* <Form onSubmit={_handleSubmit} encType="multipart/form-data">
                <Box>
                    <h2>Shipping Info</h2>
                    <TextField
                        type="text"
                        label="Name"
                        value={info?.shippingInfo.name || ''}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <TextField
                        type="text"
                        label="Address Line 1"
                        value={info?.shippingInfo['address'].addressLine1 || ''}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <TextField
                        type="text"
                        label="Address Line 2"
                        value={info?.shippingInfo['address'].addressLine2 || ''}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <TextField
                        type="text"
                        label="District"
                        value={info?.shippingInfo.district || ''}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <TextField
                        type="text"
                        label="City"
                        value={info?.shippingInfo.city || ''}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <TextField
                        type="text"
                        label="Country"
                        value={info?.shippingInfo.country || ''}
                        onChange={(e) => setName(e.target.value)}
                    />
                </Box>

                <Button variant="outlined" color="secondary" type="submit" sx={{ mt: 3 }}>
                    Submit
                </Button>
            </Form> */}
    </AdminPageWrapper>
  );
};

export default UpdateOrderPage;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;
const StyledBox = styled(Box)`
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
  div > p {
    display: flex;
    flex-direction: column;
    margin-bottom: 0.5rem;
  }
`;
const StyledOrderItem = styled(Box)`
  display: flex;
`;
