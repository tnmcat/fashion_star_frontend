import { unwrapResult } from '@reduxjs/toolkit';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOrdersByStoreId, updateOrder } from '../../../features/seller_feature/order/orderSlice';
import { Box, Breadcrumbs, Button, CssBaseline, Link, Paper, Typography } from '@mui/material';
import OrderList from './OrderList';
import OrderUpdateForm from './OrderUpdateForm';
import { useNavigate } from 'react-router-dom';

function OrderManage(props) {
    const dispatch = useDispatch();
    const store = useSelector((state) => state.sellerStore.storeBySeller);
    const [orders, setOrders] = useState(null);

    const fetchOrdersByStoreId = async (storeId) => {
        try {
            const ordersResult = await dispatch(getOrdersByStoreId(storeId));
            const ordersData = unwrapResult(ordersResult);
            setOrders(ordersData);
        } catch (error) {
            console.error("Failed to fetch orders:", error);
        }
    };

    useEffect(() => {
        if (store && store.id) {
            fetchOrdersByStoreId(store.id);
        }
    }, [dispatch, store]);

    const navigate = useNavigate();
    const handleClick = () => {
        navigate("")
    };

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
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="h5" component="h6" align="left" color="primary" sx={{ marginTop: 2, marginBottom: 2 }}>
                            Order Manage
                        </Typography>

                    </Box>
                    <OrderList orders={orders} />
                </Paper>
            </Box>
        </>
    );
}

export default OrderManage;
