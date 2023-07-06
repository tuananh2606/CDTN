import { useState } from 'react';
import {
    TableRow,
    TableCell,
    IconButton,
    Checkbox,
    Typography,
    TableHead,
    Collapse,
    Box,
    Table,
    TableBody,
} from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

import Label from '../label';
import Iconify from '../iconify';

const ExpandableTableRow = ({ row, selectedOrder, handleClick, handleOpenMenu }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const { _id, orderId, user, paymentInfo, orderItems, shippingInfo, totalPrice, orderStatus } = row;
    return (
        <>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell padding="checkbox">
                    <Checkbox checked={selectedOrder} onChange={(event) => handleClick(event, _id)} />
                </TableCell>
                <TableCell>
                    <IconButton aria-label="expand row" size="small" onClick={() => setIsExpanded(!isExpanded)}>
                        {isExpanded ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell align="left">{orderId}</TableCell>
                <TableCell
                    align="left"
                    sx={{
                        textOverflow: 'ellipsis',
                        width: '200px',
                        overflow: 'hidden',
                    }}
                >
                    {user}
                </TableCell>
                <TableCell align="center">
                    <Label color={paymentInfo.status ? 'success' : 'error'}>
                        {paymentInfo.status ? 'Paid' : 'Unpaid'}
                    </Label>
                </TableCell>
                <TableCell align="left">{totalPrice}</TableCell>
                <TableCell align="left">{orderStatus}</TableCell>
                <TableCell align="right">
                    <IconButton size="large" color="inherit" onClick={(e) => handleOpenMenu(e, _id)}>
                        <Iconify icon={'eva:more-vertical-fill'} />
                    </IconButton>
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={isExpanded} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Typography variant="h6" gutterBottom component="div">
                                Products
                            </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Name</TableCell>
                                        <TableCell>Code</TableCell>
                                        <TableCell>Price</TableCell>
                                        <TableCell>Quantity</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {orderItems.map((item) => (
                                        <TableRow key={item.code}>
                                            <TableCell component="th" scope="row">
                                                {item.name}
                                            </TableCell>
                                            <TableCell>{item.code}</TableCell>
                                            <TableCell>{item.price}</TableCell>
                                            <TableCell>{item.quantity}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Box>
                        <Box sx={{ margin: 1 }}>
                            <Typography variant="h6" gutterBottom component="div">
                                Shipping Information
                            </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Name</TableCell>
                                        <TableCell>Address</TableCell>
                                        <TableCell>District</TableCell>
                                        <TableCell>City</TableCell>
                                        <TableCell>Country</TableCell>
                                        <TableCell>PhoneNumber</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow>
                                        <TableCell component="th" scope="row">
                                            {shippingInfo.name}
                                        </TableCell>
                                        <TableCell sx={{ whiteSpace: 'pre-line' }}>
                                            {`${shippingInfo.address.addressLine1}
                                            ${shippingInfo.address.addressLine2}`}
                                        </TableCell>
                                        <TableCell>{shippingInfo.district}</TableCell>
                                        <TableCell>{shippingInfo.city}</TableCell>
                                        <TableCell>{shippingInfo.country}</TableCell>
                                        <TableCell>{shippingInfo.phoneNumber}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </>
    );
};
export default ExpandableTableRow;
