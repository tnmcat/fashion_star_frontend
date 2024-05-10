import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';
OrderList.propTypes = {
    orders: PropTypes.array
};

function OrderList({ orders }) {

    if (orders === null) {
        return <div>No orders found</div>;
    }
    const columns = [
        { field: 'id', headerName: 'Order ID', width: 150 },
        { field: 'order_date', headerName: 'Date', width: 150 },
        { field: 'order_status', headerName: 'Status', width: 150 },
        {
            field: 'clientName', headerName: 'Customer Name', width: 200,
            renderCell: (params) => (
                <p>
                    {params.row.userDTO && params.row.userDTO.clientName}
                </p>
            ),
        },
        { field: 'orderTotal', headerName: 'Total Price', width: 150 },
        {
            field: 'details',
            headerName: 'Details',
            width: 150,
            renderCell: (params) => (
                <Link to={`/selling/order/details/${params.row.id}`}>
                    Details
                </Link>
            ),
        },
    ];
    return (
        <>
            <div style={{ height: 600, width: '100%' }}>
                <DataGrid
                    rows={orders}
                    columns={columns}
                    pageSize={5}
                    checkboxSelection
                    rowHeight={100} // Increase the row height as desired

                />
            </div>
        </>
    );
}

export default OrderList;
