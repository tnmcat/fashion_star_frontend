import React from 'react';
import RegisterForm from './RegisterForm';
import { useDispatch } from 'react-redux';
import { registerSeller } from '../../../features/seller_feature/seller/sellerSlice';
import { unwrapResult } from '@reduxjs/toolkit';
import { useNavigate } from 'react-router-dom';

function SellerRegister() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleSubmit = async (values) => {
        console.log('form submit', values);

        try {
            const resultAction = await dispatch(registerSeller(values)); // Dispatch registerSeller directly
            const user = unwrapResult(resultAction);
            console.log(user);
            navigate('/seller/signin');
        } catch (error) {
            console.log('fail to register', error);
        }
    };

    return (
        <div>
            <RegisterForm onSubmit={handleSubmit} />
        </div>
    );
}

export default SellerRegister;
