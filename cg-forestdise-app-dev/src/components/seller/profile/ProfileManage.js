import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectError, selectLoading, selectSellerDetail, setSellerInfo, updateSeller } from '../../../features/seller_feature/seller/sellerSlice';

import { unwrapResult } from '@reduxjs/toolkit';
import ProfileDetails from './ProfileDetails';
import ProfileForm from './ProfileForm';
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
            <ProfileDetails sellerDetail={sellerDetail} />
            <ProfileForm initialData={sellerDetail} onSubmit={handleStoreFormSubmit} />
        </>
    );
}

export default ProfileManage;
