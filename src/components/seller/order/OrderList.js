import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

OrderList.propTypes = {
    orders: PropTypes.array
};

function OrderList({ orders }) {
    return (
        <div>
            <h2>Order List</h2>
            <table>
                <thead>
                    <tr>
                        <th>Order ID</th>
                        <th>Date</th>
                        <th>Status</th>
                        <th>Customer Name</th>
                        <th>Total Price</th>
                    </tr>
                </thead>
                <tbody>
                    {orders && orders.map(order => (
                        <tr key={order.id}>
                            <td>{order.id}</td>
                            <td>{order.order_date}</td>
                            <td>{order.order_status}</td>
                            <td>{order.userDTO.clientName}</td>
                            <td>{order.orderTotal}</td>
                            <td>   <Link to={`/selling/order/${order.id}/details`}>
                                <h2>Details</h2>
                            </Link></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default OrderList;
