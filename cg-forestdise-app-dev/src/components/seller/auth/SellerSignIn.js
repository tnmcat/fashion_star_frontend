import { unwrapResult } from '@reduxjs/toolkit';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginSeller, setSellerInfo } from '../../../features/seller_feature/seller/sellerSlice';
import SignInForm from './SignInForm';
import { getStoreBySellerId } from '../../../features/seller_feature/store/sellerStoreSlice';

function SellerSignIn(props) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [seller, setSeller] = useState(null);
    const [store, setStore] = useState(null);
    const handleSubmit = async (values) => {
        console.log('form submit', values);
        try {
            // Pass values to register action
            const sellerId = await dispatch(loginSeller(values));
            // console.log("seller:  " + sellerId.payload);
            const result_seller = await dispatch(setSellerInfo(sellerId.payload));
            const seller = unwrapResult(result_seller);
            const result_store = await dispatch(getStoreBySellerId(sellerId.payload));
            const store = unwrapResult(result_store);
            // console.log(seller);
            // console.log(store);
            setSeller(seller)
            setStore(store);
            setTimeout(() => {
                navigate("/selling");
            }, 0);
        } catch (error) {
            console.log('fail to login', error);

        }
    };

    return (
        <div>
            <SignInForm onSubmit={handleSubmit} />
        </div>
    );

}

export default SellerSignIn;


