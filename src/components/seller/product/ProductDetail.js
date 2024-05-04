import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import AttributeManage from '../attribute/AttributeManage';
import OptionManage from '../option/OptionManage';
import { addVariant } from '../../../features/variant/variantSlice';
import { unwrapResult } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

function ProductDetail(props) {
    const { productId } = useParams();
    const dispatch = useDispatch();

    const createRawVariants = async () => {
        try {
            const variantsResult = await dispatch(addVariant({ productId }));
            unwrapResult(variantsResult);
        } catch (error) {
            console.error("Failed to create variants:", error);
        }
    };

    return (
        <div>
            <h1>Product Details</h1>
            <AttributeManage productId={productId} />
            <OptionManage productId={productId} />

            {/* Button to create raw variants */}
            <button onClick={createRawVariants}>Create Variants</button>

            {/* Link to manage variants */}
            <Link to={`variants`}>Manage Variants</Link>
        </div>
    );
}

export default ProductDetail;
