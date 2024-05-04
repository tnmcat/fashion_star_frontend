import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { getOrderByOrderId, updateOrder } from '../../../features/order/orderSlice';
import OrderUpdateForm from './OrderUpdateForm';

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
    return (
        <>
            <div>
                {orderDetails && (
                    <div>
                        <h2>Order Details</h2>
                        <p>Order ID: {orderDetails.id}</p>
                        <p>User: {orderDetails.userDTO.clientName}</p>
                        <p>Store: {orderDetails.storeDTO.name}</p>
                        <p>Order Date: {orderDetails.order_date}</p>
                        <p>Order Status: {orderDetails.order_status}</p>
                        <p>Address: {orderDetails.addressDTO.street}, {orderDetails.addressDTO.city}, {orderDetails.addressDTO.country}</p>
                        <p>Payment Method: {orderDetails.paymentMethodDTO.name}</p>
                        <p>Shipping Method: {orderDetails.shippingMethodDTO.name}</p>
                        <p>Order Total: ${orderDetails.orderTotal.toFixed(2)}</p>
                        {/* Render additional fields as needed */}
                        <h3>Order Items:</h3>
                        <table>
                            <thead>
                                <tr>
                                    <th>Item Name</th>
                                    <th>Inventory</th>
                                    <th>Order Quantity</th>
                                    <th>Price</th>
                                    <th>Total Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orderDetails.orderItemListDTO.map(item => (
                                    <tr key={item.id}>
                                        <td>{item.variantDTO.skuCode}</td>
                                        <td>{item.variantDTO.stockQuantity}</td>
                                        <td>{item.quantity}</td>
                                        <td>${item.price.toFixed(2)}</td>
                                        <td>${(item.quantity * item.price).toFixed(2)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
            <OrderUpdateForm onSubmit={handleOrderFormSubmit} />
        </>
    );
}

export default OrderDetailsManage;
