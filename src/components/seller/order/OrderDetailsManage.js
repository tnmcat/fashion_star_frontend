import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { acceptOrder, cancelOrder, completeOrder, deliverOrder, getOrderByOrderId, updateOrder } from '../../../features/seller_feature/order/orderSlice';
import OrderUpdateForm from './OrderUpdateForm';
import { Avatar, Box, Breadcrumbs, Button, CssBaseline, Divider, Grid, Link, List, ListItem, ListItemAvatar, ListItemText, Paper, Typography } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import PlaceIcon from '@mui/icons-material/Place';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import PaymentIcon from '@mui/icons-material/Payment';
import NotesIcon from '@mui/icons-material/Notes';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import CancelPresentationIcon from '@mui/icons-material/CancelPresentation';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import CancelIcon from '@mui/icons-material/Cancel';
import convertTimestampToDate, { convertTimestampToDateTime } from '../../../utils/common';
function OrderDetailsManage() {
    const { orderId } = useParams();
    const dispatch = useDispatch();
    const [orderDetails, setOrderDetails] = useState(null);
    const fetchOrderDetails = async (orderId) => {
        try {
            const ordersDetailsResult = await dispatch(getOrderByOrderId(orderId));
            const ordersDetailsData = unwrapResult(ordersDetailsResult);
            setOrderDetails(ordersDetailsData);
        } catch (error) {
            console.error("Failed to fetch orders:", error);
        }
    };
    useEffect(() => {
        if (orderId) {
            fetchOrderDetails(orderId);
        }
    }, [dispatch, orderId]);

    const handleAcceptOrderSubmit = async () => {
        try {
            const resultAction = await dispatch(acceptOrder({ orderId }));
            unwrapResult(resultAction);
            // Refetch orders after successfully adding a new order
            fetchOrderDetails(orderId);
        } catch (err) {
            console.error('Failed to UPDATE order:', err);
        }
    };
    const handleDeliveryOrderSubmit = async () => {
        try {
            const resultAction = await dispatch(deliverOrder({ orderId }));
            unwrapResult(resultAction);
            // Refetch orders after successfully adding a new order
            fetchOrderDetails(orderId);
        } catch (err) {
            console.error('Failed to UPDATE order:', err);
        }
    };
    const handleCancelOrderSubmit = async () => {
        try {
            const resultAction = await dispatch(cancelOrder({ orderId }));
            unwrapResult(resultAction);
            // Refetch orders after successfully adding a new order
            fetchOrderDetails(orderId);
        } catch (err) {
            console.error('Failed to UPDATE order:', err);
        }
    };
    const handleCompleteOrderSubmit = async () => {
        try {
            const resultAction = await dispatch(completeOrder({ orderId }));
            unwrapResult(resultAction);
            // Refetch orders after successfully adding a new order
            fetchOrderDetails(orderId);
        } catch (err) {
            console.error('Failed to UPDATE order:', err);
        }
    };

    const handleClick = (event) => {
        event.preventDefault();
        console.info('You clicked a breadcrumb.');
    }
    return (
        <>
            <CssBaseline />
            <Box>
                <div role="presentation" onClick={handleClick}>
                    <Breadcrumbs aria-label="breadcrumb">
                        <Link underline="hover" color="inherit" href="/">
                            Home
                        </Link>
                        <Link
                            underline="hover"
                            color="text.primary"
                            href="/material-ui/react-breadcrumbs/"
                            aria-current="page"
                        >
                            Order
                        </Link>
                        <Link
                            underline="hover"
                            color="text.primary"
                            href="/material-ui/react-breadcrumbs/"
                            aria-current="page"
                        >
                            Details
                        </Link>
                    </Breadcrumbs>
                </div>
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                }}
            >
                <Paper elevation={3} sx={{ width: '100%', maxWidth: '1200px', m: 1, p: 2 }}>

                    {orderDetails && (
                        <div>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Typography variant="h5" component="h6" align="left" color="primary" sx={{ marginTop: 2, marginBottom: 2 }}>
                                    Order No. {orderDetails.id} created at {convertTimestampToDateTime(orderDetails.order_date)}
                                </Typography>
                                <Typography variant="h6" component="h6" align="left" color="primary" sx={{ marginTop: 2, marginBottom: 2 }}>
                                    Status | {orderDetails.order_status}
                                </Typography>
                            </Box>
                            <Divider />
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                                    <ListItem>
                                        <ListItemAvatar>
                                            <Avatar>
                                                <AccountCircleIcon />
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText primary="Customer Name" secondary={orderDetails.userDTO.clientName} />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemAvatar>
                                            <Avatar>
                                                <LocalPhoneIcon />
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText primary="Phone" secondary={orderDetails.userDTO.phone} />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemAvatar>
                                            <Avatar>
                                                <PlaceIcon />
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText primary="Address" secondary={orderDetails.addressDTO.street + " street, ward " + orderDetails.addressDTO.ward + " " + orderDetails.addressDTO.city + " city "} />
                                    </ListItem>
                                </List>
                                <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                                    <ListItem>
                                        <ListItemAvatar>
                                            <Avatar>
                                                <LocalShippingIcon />
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText primary="Shipping Method" secondary={orderDetails.shippingMethodDTO.name} />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemAvatar>
                                            <Avatar>
                                                <PaymentIcon />
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText primary="Payment Method" secondary={orderDetails.paymentMethodDTO.cartNumber} />
                                    </ListItem>
                                </List>
                                <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>

                                    {orderDetails.canceledAt && (
                                        <ListItem>
                                            <ListItemAvatar>
                                                <Avatar style={{ backgroundColor: 'red' }}>
                                                    <CancelIcon />
                                                </Avatar>
                                            </ListItemAvatar>
                                            <ListItemText primary="Cancel At" secondary={convertTimestampToDateTime(orderDetails.canceledAt)} />
                                        </ListItem>
                                    )}
                                    {orderDetails.acceptedAt && (
                                        <ListItem>
                                            <ListItemAvatar>
                                                <Avatar style={{ backgroundColor: 'blue' }}>
                                                    <AssignmentTurnedInIcon />
                                                </Avatar>
                                            </ListItemAvatar >
                                            <ListItemText primary="Accepted At" secondary={convertTimestampToDateTime(orderDetails.acceptedAt)} />
                                        </ListItem>
                                    )}
                                    {orderDetails.deliveringAt && (
                                        <ListItem>
                                            <ListItemAvatar>
                                                <Avatar style={{ backgroundColor: 'orange' }}>
                                                    <LocalShippingIcon />
                                                </Avatar>
                                            </ListItemAvatar>
                                            <ListItemText primary="Delivering" secondary={convertTimestampToDateTime(orderDetails.deliveringAt)} />
                                        </ListItem>
                                    )}
                                    {orderDetails.completedAt && (
                                        <ListItem>
                                            <ListItemAvatar>
                                                <Avatar style={{ backgroundColor: 'green' }}>
                                                    <TaskAltIcon />
                                                </Avatar>
                                            </ListItemAvatar>
                                            <ListItemText primary="Completed" secondary={convertTimestampToDateTime(orderDetails.completedAt)} />
                                        </ListItem>
                                    )}
                                </List>
                            </Box>

                            <TableContainer component={Paper}>
                                <Table sx={{ minWidth: 700 }} aria-label="spanning table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell align="center" colSpan={5}>
                                                Order Details
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Desc</TableCell>
                                            <TableCell>Stock</TableCell>
                                            <TableCell align="right">Order Qty</TableCell>
                                            <TableCell align="right">Price</TableCell>
                                            <TableCell align="right">Subtotal</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {orderDetails.orderItemListDTO.map(item => (
                                            <TableRow key={item.id}>
                                                <TableCell>{item.variantDTO.skuCode}</TableCell>
                                                <TableCell>{item.variantDTO.stockQuantity}</TableCell>
                                                <TableCell align="right">{item.quantity}</TableCell>
                                                <TableCell align="right">${item.price.toFixed(2)}</TableCell>
                                                <TableCell align="right">${(item.quantity * item.price).toFixed(2)}</TableCell>
                                            </TableRow>
                                        ))}
                                        <TableRow>

                                            <TableCell ></TableCell>
                                            <TableCell ></TableCell>
                                            <TableCell >Shipping</TableCell>
                                            <TableCell align="right">{orderDetails.shippingMethodDTO.name}</TableCell>
                                            <TableCell align="right">{orderDetails.shippingMethodDTO.price}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell ></TableCell>
                                            <TableCell ></TableCell>
                                            <TableCell >Total</TableCell>
                                            <TableCell ></TableCell>
                                            <TableCell align="right">{orderDetails.orderTotal}</TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </div>
                    )}

                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 2, marginBottom: 2 }}>
                        <Button onClick={handleCancelOrderSubmit} size="medium" variant="contained" color="error">Cancel</Button>
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <Button size="medium" variant="contained" onClick={handleAcceptOrderSubmit}>Accept</Button>
                            <Button onClick={handleDeliveryOrderSubmit} size="medium" variant="contained" color="warning" sx={{ marginLeft: 2 }}>Delivering</Button>
                            <Button onClick={handleCompleteOrderSubmit} size="medium" variant="contained" color="success" sx={{ marginLeft: 2 }}>Completed</Button>
                        </Box>
                    </Box>
                </Paper>
            </Box>

        </>
    );
}

export default OrderDetailsManage;
