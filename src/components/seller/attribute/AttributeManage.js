import { unwrapResult } from '@reduxjs/toolkit';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { createAttribute, deleteAttribute, fetchAttributesByProductId, updateAttribute } from '../../../features/seller_feature/attribute/attributeSlice';
import AttributeForm from './AttributeForm';
import AttributeList from './AttributeList';
import { Box, Paper } from '@mui/material';
import AttributeDefaultForm from './AttributeDefaultForm';
AttributeManage.propTypes = {
    product: PropTypes.object
};
function AttributeManage({ product }) {
    const dispatch = useDispatch();
    const [attributeList, setAttributeList] = useState(null);

    const productId = product.id; // Assume productId is passed as props
    console.log(productId)
    const fetchAttributes = async () => {
        try {
            const attributes_result = await dispatch(fetchAttributesByProductId(productId));
            const attributes = unwrapResult(attributes_result);
            setAttributeList(attributes);
        } catch (error) {
            console.error("Failed to fetch attributes:", error);
        }
    };


    useEffect(() => {
        if (productId) {
            fetchAttributes();
        }
    }, [productId]); // Add updateDone as a dependency


    return (
        <>
            <Box
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                }}
            >
                <Paper elevation={3} sx={{ width: '100%', maxWidth: '1200px', m: 1, p: 2 }}>

                    <AttributeList attributeList={attributeList} />

                </Paper>
            </Box >
        </>
    );
}



export default AttributeManage;
