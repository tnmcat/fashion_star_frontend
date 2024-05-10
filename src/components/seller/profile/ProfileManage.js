import { Box, Breadcrumbs, CssBaseline, Grid, Link, Paper, Typography } from '@mui/material';
import { unwrapResult } from '@reduxjs/toolkit';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectError, selectLoading, selectSellerDetail, setSellerInfo, updateSeller } from '../../../features/seller_feature/seller/sellerSlice';
import StoreManage from '../store/StoreManage';
import ProfileForm from './ProfileForm';
import SellerProfile from './SellerProfile';
function ProfileManage() {
    const seller = useSelector((state) => state.seller.sellerInfo);
    const dispatch = useDispatch();
    const loading = useSelector(selectLoading);
    const error = useSelector(selectError);
    const sellerDetail = useSelector(selectSellerDetail);
    console.log(sellerDetail)
    useEffect(() => {
        if (seller.id) {
            dispatch(setSellerInfo(seller.id));
        }
    }, [dispatch, seller.id]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!sellerDetail) {
        return <div>No seller detail found.</div>;
    }
    const handleStoreFormSubmit = async (value) => {
        console.log(value)
        console.log(seller.id)
        try {
            const resultAction = await dispatch(updateSeller({ data: value, sellerId: seller.id }));
            unwrapResult(resultAction);
            dispatch(setSellerInfo(seller.id));
        } catch (err) {
            console.error('Failed to add store category:', err);
        }
    };

    return (
        <>
            <CssBaseline />
            <Box>
                <div role="presentation" >
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
                            Profile
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
                            Seller Profile
                        </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <SellerProfile sellerDetail={sellerDetail} />
                            </Grid>
                            <Grid item xs={6}>
                                <ProfileForm initialData={sellerDetail} onSubmit={handleStoreFormSubmit} />
                            </Grid>
                        </Grid>
                    </Box>
                </Paper>
                <Paper elevation={3} sx={{ width: '100%', maxWidth: '1200px', m: 1, p: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="h5" component="h6" align="left" color="primary" sx={{ marginTop: 2, marginBottom: 2 }}>
                            Store Profile
                        </Typography>
                    </Box>
                    <StoreManage />



                </Paper>
            </Box>




        </>
    );
}

export default ProfileManage;
