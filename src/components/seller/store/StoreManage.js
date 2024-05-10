import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, Modal, Slide, Typography } from '@mui/material';
import { unwrapResult } from '@reduxjs/toolkit';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getStoreBySellerId, updateStore } from '../../../features/seller_feature/store/storeSlice';
import StoreDetail from './StoreDetail';
import StoreForm from './StoreForm';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
StoreManage.propTypes = {
    productId: PropTypes.string
};

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

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
    console.log(store);
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
            setOpen(true)
        } catch (error) {
            console.error("Failed to update store:", error);
        }
    };
    const [open, setOpen] = useState(false);
    const handleClose = () => setOpen(false);

    return (
        <>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        {store && <StoreDetail store={store} />}
                    </Grid>
                    <Grid item xs={6}>
                        <StoreForm onSubmit={handleStoreFormSubmit} initialData={store} /> </Grid>
                </Grid>
            </Box>

            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>{"Send Successfully"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        Your request has been sent successfully. Please wait for admin approval !
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Close</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default StoreManage;
