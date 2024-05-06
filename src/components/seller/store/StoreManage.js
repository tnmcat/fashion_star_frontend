import { Box, Typography } from '@mui/material';
import { unwrapResult } from '@reduxjs/toolkit';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getStoreBySellerId, updateStore } from '../../../features/seller_feature/store/storeSlice';
StoreManage.propTypes = {
    productId: PropTypes.string
};

function StoreManage({ productId }) {
    const seller = useSelector((state) => state.seller.sellerInfo);
    const dispatch = useDispatch();

    const [editStore, setEditStore] = useState(null);
    const [store, setStore] = useState(null);


    const fetchStores = async () => {
        try {
            // Fetch stores by seller ID
            const storeResult = await dispatch(getStoreBySellerId(seller.id));
            console.log(seller.id);
            const store = unwrapResult(storeResult);
            // Set the first store in the array as the currently edited store

            setStore(store);
            console.log(store);
        } catch (error) {
            console.error("Failed to fetch stores:", error);
        }
    };

    useEffect(() => {
        if (seller) {
            fetchStores();
        }
    }, [seller]);

    const handleStoreFormSubmit = async (value) => {
        try {
            console.log(value);
            // Update the currently edited store
            const resultAction = await dispatch(updateStore({ storeId: value.id, storeData: value }));
            unwrapResult(resultAction);
            // Reset editStore after submitting the form
            setEditStore(null);
            // Refetch stores after successfully updating a store
            fetchStores();
        } catch (error) {
            console.error("Failed to update store:", error);
        }
    };

    return (

        // <Box sx={{ display: 'flex' }}>
        //     {/* <SideBar /> */}
        //     <Box component="main" sx={{ flexGrow: 1, p: 3, marginTop: "55px" }}>
        //         {/* Render StoreDetail component */}
        //         {store && <StoreDetail store={store} />}
        //         {/* Pass initialData to StoreForm */}
        //         <StoreForm onSubmit={handleStoreFormSubmit} initialData={store} />
        //     </Box>
        // </Box>


        <Box sx={{ display: 'flex' }}>

            <Box component="main" sx={{ flexGrow: 1, p: 3, marginTop: "55px" }}>
                <Typography variant="h5">
                    Settings
                </Typography>

            </Box>
        </Box>


    );
}

export default StoreManage;
