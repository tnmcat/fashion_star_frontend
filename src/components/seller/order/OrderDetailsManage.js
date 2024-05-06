import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { getOrderByOrderId, updateOrder } from '../../../features/order/orderSlice';
import OrderUpdateForm from './OrderUpdateForm';
import { Avatar, Box, Breadcrumbs, Button, CssBaseline, Grid, Link, List, ListItem, ListItemAvatar, ListItemText, Paper, Typography } from '@mui/material';
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

    const handleOrderFormSubmit = async (data) => {
        try {
            const resultAction = await dispatch(updateOrder({ orderId, data }));
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
                                    Order No. {orderDetails.id} placed at {orderDetails.order_date}
                                </Typography>
                                <Typography variant="h6" component="h6" align="left" color="primary" sx={{ marginTop: 2, marginBottom: 2 }}>
                                    {orderDetails.order_status}
                                </Typography>
                            </Box>
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
                                        <ListItemText primary="Address" secondary={orderDetails.addressDTO.street + " street, ward " + orderDetails.addressDTO.ward + orderDetails.addressDTO.city + " city "} />
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

                                    <ListItem>
                                        <ListItemAvatar>
                                            <Avatar>
                                                <AssignmentTurnedInIcon />
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText primary="Accepted At" secondary={orderDetails.shippingMethodDTO.name} />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemAvatar>
                                            <Avatar>
                                                <LocalShippingIcon />
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText primary="Delivering" secondary={orderDetails.shippingMethodDTO.name} />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemAvatar>
                                            <Avatar>
                                                <TaskAltIcon />
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText primary="Completed" secondary={orderDetails.shippingMethodDTO.name} />
                                    </ListItem>
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
                                                <TableCell>SKUCODE</TableCell>
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
                                            <TableCell align="right">10</TableCell>
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
                        <Button size="medium" variant="contained" color="error">Cancel</Button>
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <Button size="medium" variant="contained">Accept</Button>
                            <Button size="medium" variant="contained" color="success" sx={{ marginLeft: 2 }}>Delivering</Button>
                        </Box>
                    </Box>
                </Paper>
            </Box>
            <OrderUpdateForm onSubmit={handleOrderFormSubmit} />
        </>
    );
}

export default OrderDetailsManage;
