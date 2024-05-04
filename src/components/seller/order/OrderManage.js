import { unwrapResult } from '@reduxjs/toolkit';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOrdersByStoreId, updateOrder } from '../../../features/order/orderSlice';

import OrderList from './OrderList';
import OrderUpdateForm from './OrderUpdateForm';

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



    return (
        <>
            <OrderList orders={orders} />

        </>
    );
}

export default OrderManage;
