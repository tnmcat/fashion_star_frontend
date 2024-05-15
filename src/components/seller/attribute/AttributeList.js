import { List, ListItem, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { fetchAttributesByProductId } from '../../../features/seller_feature/attribute/attributeSlice';
import { unwrapResult } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

AttributeList.propTypes = {
    product: PropTypes.object
};
function AttributeList({ product }) {
    const dispatch = useDispatch();
    const [attributeList, setAttributeList] = useState(null);

    const productId = product.id; // Assume productId is passed as props
    console.log(product)
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
    }, [productId]);


    return (
        <>
            <Typography variant="h6" component="div" sx={{ mt: 4, mb: 2 }}>
                Attribute List
            </Typography>
            {attributeList && attributeList.length ? (
                <List >
                    {attributeList.map((attribute) => (
                        <ListItem key={attribute.id} sx={{ paddingX: 0 }}>
                            {attribute.name} - {attribute.value}
                        </ListItem>
                    ))}
                </List>
            ) : (
                <Typography variant="body1">No attributes found.</Typography>
            )}
        </>
    );
}


export default AttributeList;
