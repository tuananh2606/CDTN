import { Helmet } from 'react-helmet-async';
import { filter } from 'lodash';
import { useNavigate } from 'react-router-dom';
import { sentenceCase } from 'change-case';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loginSuccess } from '../../../redux/authSlice';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createAxios } from '../../../utils/http';
// @mui
import { Stack, Button, Popover, MenuItem, Container, Typography } from '@mui/material';
// components
import Label from '../../../components/label/Label';
import Iconify from '../../../components/iconify';
// import Scrollbar from '../components/scrollbar';
import { TableComponent, ExpandableTableRow } from '../../../components/common';

import adminApis from '../../../apis/adminApis';
// ----------------------------------------------------------------------

const headCells = [
    { id: '' },
    { id: 'orderId', numeric: false, label: 'Order ID', alignRight: false },
    { id: 'user', numeric: false, label: 'User', alignRight: false },
    { id: 'paymentStatus', center: true, label: 'Payment Status', alignRight: false },
    { id: 'totalPrice', numeric: false, label: 'Total Price', alignRight: false },
    { id: 'orderStatus', numeric: false, label: 'Order Status', alignRight: false },
    { id: '' },
];
const OrdersPage = () => {
    const user = useSelector((state) => state.auth.login.currentUser);
    const [filteredOrders, setFilteredOrders] = useState();
    const [deletedOrder, setDeletedOrder] = useState();
    const [page, setPage] = useState(0);
    const [selected, setSelected] = useState([]);
    const [open, setOpen] = useState(null);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const dispatch = useDispatch();
    let axiosJWT = createAxios(user, dispatch, loginSuccess);
    const navigate = useNavigate();

    const queryClient = useQueryClient();
    const deleteOrderMutation = useMutation({
        mutationFn: (id) => adminApis.deleteOrder(axiosJWT, user?.accessToken, id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['orders'] });
        },
    });
    const { isLoading, isError, data, error } = useQuery({
        queryKey: ['orders'],
        queryFn: () => adminApis.getAllOrders(axiosJWT, user?.accessToken),
    });

    if (isLoading) {
        return <span>Loading...</span>;
    }

    if (isError) {
        return <span>Error: {error.message}</span>;
    }

    const handleClick = (event, _id) => {
        const selectedIndex = selected.indexOf(_id);
        let newSelected = [];
        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, _id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
        }
        setSelected(newSelected);
    };

    const handleOpenMenu = (event, id) => {
        setOpen(event.currentTarget);
        setDeletedOrder(id);
    };

    const handleCloseMenu = () => {
        setOpen(null);
    };

    const handleDelete = () => {
        deleteOrderMutation.mutate(deletedOrder);
        setOpen(false);
    };

    const handleEdit = () => {
        navigate('/admin/orders/edit', { state: deletedProduct.id });
    };

    return (
        <>
            <Helmet>
                <title> Order </title>
            </Helmet>

            <Container>
                <>
                    <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                        <Typography variant="h4" gutterBottom>
                            Order
                        </Typography>
                        <Button
                            variant="contained"
                            startIcon={<Iconify icon="eva:plus-fill" />}
                            // onClick={() => setCreatePageShow(true)}
                        >
                            New Order
                        </Button>
                    </Stack>

                    <TableComponent
                        headCells={headCells}
                        data={data}
                        isLoading={isLoading}
                        setFilteredData={setFilteredOrders}
                        selected={selected}
                        setSelected={setSelected}
                        page={page}
                        setPage={setPage}
                        rowsPerPage={rowsPerPage}
                        setRowsPerPage={setRowsPerPage}
                    >
                        {filteredOrders &&
                            filteredOrders.length > 0 &&
                            filteredOrders.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                                const { _id } = row;
                                const selectedOrder = selected.indexOf(_id) !== -1;

                                return (
                                    <ExpandableTableRow
                                        key={row._id}
                                        row={row}
                                        selectedOrder={selectedOrder}
                                        handleClick={handleClick}
                                        handleOpenMenu={handleOpenMenu}
                                    />
                                );
                            })}
                    </TableComponent>
                </>
            </Container>

            <Popover
                open={Boolean(open)}
                anchorEl={open}
                onClose={handleCloseMenu}
                anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                PaperProps={{
                    sx: {
                        p: 1,
                        width: 140,
                        '& .MuiMenuItem-root': {
                            px: 1,
                            typography: 'body2',
                            borderRadius: 0.75,
                        },
                    },
                }}
            >
                <MenuItem onClick={handleEdit}>
                    <Iconify icon={'eva:edit-fill'} sx={{ mr: 2 }} />
                    Edit
                </MenuItem>

                <MenuItem sx={{ color: 'error.main' }} onClick={handleDelete}>
                    <Iconify icon={'eva:trash-2-outline'} sx={{ mr: 2 }} />
                    Delete
                </MenuItem>
            </Popover>
        </>
    );
};

export default OrdersPage;
