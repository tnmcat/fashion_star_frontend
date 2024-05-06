import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link, useNavigate } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';
import { useDispatch, useSelector } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { getProductsByStoreId } from '../../../features/seller_feature/product/productSlice';
import EditIcon from '@mui/icons-material/Edit';
ProductList.propTypes = {
    productList: PropTypes.array,

};

function ProductList({ onEdit }) {

    const [productList, setProductList] = useState([]);
    const dispatch = useDispatch();
    const store = useSelector((state) => state.sellerStore.storeBySeller);
    useEffect(() => {
        // Simulate asynchronous data fetching
        const fetchProductList = async () => {
            try {
                const products_result = await dispatch(getProductsByStoreId(store.id));
                const products = unwrapResult(products_result);
                setProductList(products);

            } catch (error) {
                console.error('Error fetching product list:', error);
            }
        };

        fetchProductList(); // Call the fetchProductList function
    }, []);
    const navigate = useNavigate();
    const handleEditClick = (product) => {
        console.log(product);
        navigate(`${product.id}/edit`)


    };



    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'title', headerName: 'Title', width: 130 },
        { field: 'description', headerName: 'Description', width: 130 },
        {
            field: 'mainPicture',
            headerName: 'Picture',
            description: 'Main Picture',
            width: 130,
            sortable: false,
            renderCell: (params) => (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                    <img src={params.value} alt="Main Picture" style={{ maxWidth: '80%', maxHeight: '100%', objectFit: 'contain' }} />
                </div>
            ),
        },
        {
            field: 'createAt',
            headerName: 'Created At',
            width: 160,
        },
        {
            field: 'updatedAt',
            headerName: 'Updated At',
            width: 160,
        },
        {
            field: 'edit',
            headerName: 'Edit',
            width: 90,
            sortable: false,
            renderCell: (params) => (
                <Link to="#" onClick={() => handleEditClick(params.row)}><EditIcon /></Link>
            ),
        },
    ];

    return (
        <>
            <div style={{ height: 600, width: '100%' }}>
                <DataGrid
                    rows={productList}
                    columns={columns}
                    pageSize={5}
                    checkboxSelection
                    rowHeight={100} // Increase the row height as desired

                />
            </div>
        </>
    );
}

export default ProductList;
