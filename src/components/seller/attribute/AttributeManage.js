import { unwrapResult } from '@reduxjs/toolkit';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { createAttribute, deleteAttribute, fetchAttributesByProductId, updateAttribute } from '../../../features/seller_feature/attribute/attributeSlice';
import AttributeForm from './AttributeForm';
import AttributeList from './AttributeList';
import { Box, Paper } from '@mui/material';
import AttributeDefaultForm from './AttributeDefaultForm';

function AttributeManage(props) {
    const dispatch = useDispatch();
    const [attributeList, setAttributeList] = useState(null);
    const [updateDone, setUpdateDone] = useState(false); // State to track update

    const productId = props.productId; // Assume productId is passed as props
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

    const defaultAttributes = [
        { name: 'Manufacturer', value: '' },
        { name: 'Brand', value: '' },
        { name: 'Origin', value: '' }
    ];
    useEffect(() => {
        if (productId) {
            fetchAttributes();
        }
    }, [productId, updateDone]); // Add updateDone as a dependency


    const handleAddAttributeFormSubmit = async (value) => {
        try {
            const resultAction = await dispatch(createAttribute({ data: value, productId: productId }));
            unwrapResult(resultAction);
            setUpdateDone(!updateDone); // Toggle updateDone to trigger reload
        } catch (err) {
            console.error('Failed to add attribute:', err);
        }
    };

    const handleEditAttributeFormSubmit = async (data) => {
        try {
            const resultAction = await dispatch(updateAttribute(data)); // Pass data object directly
            unwrapResult(resultAction);
            setUpdateDone(!updateDone); // Toggle updateDone to trigger reload
        } catch (err) {
            console.error('Failed to edit attribute:', err);
        }
    };
    const handleDeleteAttribute = async (attribute) => {
        try {
            console.log(attribute.id)
            const resultAction = await dispatch(deleteAttribute(attribute.id));
            unwrapResult(resultAction);
            setUpdateDone(!updateDone); // Reload the variant list after deletion
        } catch (err) {
            console.error('Failed to delete Attribute:', err);
        }
    };

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
                    <AttributeForm onSubmit={handleAddAttributeFormSubmit} />
                    {defaultAttributes && defaultAttributes.length > 0 && (
                        defaultAttributes.map((attribute, index) => (
                            <AttributeDefaultForm key={index} initialData={attribute} onSubmit={handleAddAttributeFormSubmit} />
                        ))
                    )}
                    <AttributeList attributeList={attributeList} onDelete={handleDeleteAttribute} onSubmit={handleEditAttributeFormSubmit} />

                </Paper>
            </Box >
        </>
    );
}

AttributeManage.propTypes = {

};

export default AttributeManage;
