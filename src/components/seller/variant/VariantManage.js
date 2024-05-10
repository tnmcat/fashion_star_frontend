import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getVariantsByProductId, updateVariant, deleteVariant, addVariant } from '../../../features/seller_feature/variant/variantSlice';
import VariantList from './VariantList';
import { unwrapResult } from '@reduxjs/toolkit';
import PropTypes from 'prop-types';
import { Box, Button, Grid, Paper, Typography } from '@mui/material';
VariantManage.propTypes = {

};
function VariantManage({ productId }) {
    //const { productId } = useParams();
    const dispatch = useDispatch();
    const [variantList, setVariantList] = useState([]);
    const [updateDone, setUpdateDone] = useState(false);
    console.log(variantList);
    const fetchVariants = async () => {
        try {
            const variantsResult = await dispatch(getVariantsByProductId(productId));
            const variants = variantsResult.payload; // Extract the payload from the result
            setVariantList(variants);
        } catch (error) {
            console.error("Failed to fetch variants:", error);
        }
    };

    useEffect(() => {
        fetchVariants();
    }, [dispatch, productId, updateDone]);

    const handleEditFormSubmit = async (variantId, updatedVariant) => {
        try {
            const variantsResult = await dispatch(updateVariant({ variantId, updatedVariant }));
            setUpdateDone(!updateDone);
        } catch (err) {
            console.error('Failed to edit option:', err);
        }
    };

    const handleDeleteVariant = async (variantId) => {
        try {
            const resultAction = await dispatch(deleteVariant(variantId));
            unwrapResult(resultAction);
            setUpdateDone(!updateDone); // Reload the variant list after deletion
        } catch (err) {
            console.error('Failed to delete variant:', err);
        }
    };
    const createRawVariants = async () => {
        try {
            const variantsResult = await dispatch(addVariant({ productId }));
            unwrapResult(variantsResult);
            fetchVariants();
        } catch (error) {
            console.error("Failed to create variants:", error);
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
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                        <Typography variant="h5" component="h6" align="left" color="primary" sx={{ marginTop: 2, marginBottom: 2 }}>Variant List</Typography> {/* Thêm margin-top và margin-bottom */}

                        <Button variant="contained" color="primary" onClick={createRawVariants}>Create Variant</Button>
                    </Box>
                    <VariantList variantList={variantList} onSubmit={handleEditFormSubmit} onDelete={handleDeleteVariant} />
                </Paper>
            </Box>
        </>
    );
}

export default VariantManage;
