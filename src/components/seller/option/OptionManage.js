import { unwrapResult } from '@reduxjs/toolkit';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { createOption, fetchOptionsByProductId, updateOption } from '../../../features/option/optionSlice';
import OptionForm from './OptionForm';
import OptionList from './OptionList';
import OptionValueManage from '../option_value/OptionValue';
import VariantManage from '../variant/VariantManage';
import { addVariant } from '../../../features/variant/variantSlice';
import OptionValue from '../option_value/OptionValue';
import { Box, Button, Grid, Paper, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function OptionManage(props) {
    const dispatch = useDispatch();
    const [optionList, setOptionList] = useState(null);
    const [updateDone, setUpdateDone] = useState(false); // State to track update

    const productId = props.productId; // Assume productId is passed as props

    const fetchOptions = async () => {
        try {
            const options_result = await dispatch(fetchOptionsByProductId(productId));
            const options = unwrapResult(options_result);
            setOptionList(options);
        } catch (error) {
            console.error("Failed to fetch options:", error);
        }
    };

    useEffect(() => {
        if (productId) {
            fetchOptions();
        }
    }, [productId, updateDone]); // Add updateDone as a dependency


    const handleAddOptionFormSubmit = async (value) => {
        try {
            const resultAction = await dispatch(createOption({ data: value, productId: productId }));
            unwrapResult(resultAction);
            setUpdateDone(!updateDone); // Toggle updateDone to trigger reload
        } catch (err) {
            console.error('Failed to add option:', err);
        }
    };

    const handleEditOptionFormSubmit = async (data) => {
        try {
            const resultAction = await dispatch(updateOption(data)); // Pass data object directly
            unwrapResult(resultAction);
            setUpdateDone(!updateDone); // Toggle updateDone to trigger reload
        } catch (err) {
            console.error('Failed to edit option:', err);
        }
    };
    const navigate = useNavigate()
    const createRawVariants = async () => {
        try {
            const variantsResult = await dispatch(addVariant({ productId }));
            unwrapResult(variantsResult);
            navigate(``)
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
                    <Grid
                        container
                        spacing={2}
                    >
                        <Grid item xs={3}>
                            <Typography variant="h6" component="div" sx={{ mt: 0, mb: 0 }}>
                                Option
                            </Typography>
                            <OptionForm onSubmit={handleAddOptionFormSubmit} />
                            <OptionList optionList={optionList} onSubmit={handleEditOptionFormSubmit} />
                        </Grid>
                        <Grid item xs={9}>
                            <OptionValue optionList={optionList} />
                        </Grid>
                    </Grid>
                    <Grid container spacing={2}>
                        <Grid item>
                            <Button variant="contained">Create Variant</Button>
                        </Grid>
                        <Grid item>
                            <Button onClick={createRawVariants} variant="contained" color="secondary">Manage Variant</Button>
                        </Grid>
                    </Grid>
                </Paper>
            </Box >



        </>
    );
}

OptionManage.propTypes = {
    productId: PropTypes.number
};

export default OptionManage;
