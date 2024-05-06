import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { addOptionValue, fetchOptionValuesByOptionId, updateOptionValue } from '../../../features/seller_feature/option_value/optionValueSlice';
import OptionValueForm from './OptionValueForm';
import OptionValueList from './OptionValueList';
import { unwrapResult } from '@reduxjs/toolkit';
import { Grid, Typography } from '@mui/material';

function OptionValueManage(props) {
    const dispatch = useDispatch();
    const [optionValueList, setOptionValueList] = useState(null);
    const { option } = props; // Destructure 'optionList' from props
    const [updateDone, setUpdateDone] = useState(false); // State to track update
    console.log(option);
    const fetchOptionValues = async () => {
        try {
            if (option && option.id) { // Check if 'option' is not null and has an 'id'
                const optionValuesResult = await dispatch(fetchOptionValuesByOptionId(option.id)); // Use 'option.id' instead of 'optionList[0].id'
                const optionValues = unwrapResult(optionValuesResult);
                setOptionValueList(optionValues);
            }
        } catch (error) {
            console.error("Failed to fetch option values:", error);
        }
    };


    useEffect(() => {
        fetchOptionValues();
    }, [option, updateDone]); // Listen to changes in 'option' instead of 'optionList'

    const handleOptionValueFormSubmit = async (value) => {
        try {
            const resultAction = await dispatch(addOptionValue({ data: value, optionId: option.id }));
            unwrapResult(resultAction);
            // Refetch option values after successfully adding a new option value
            fetchOptionValues();
        } catch (err) {
            console.error('Failed to add option value:', err);
        }
    };
    const handleEditFormSubmit = async (data) => {
        console.log(data)
        try {
            const resultAction = await dispatch(updateOptionValue(data)); // Pass data object directly
            unwrapResult(resultAction);
            setUpdateDone(!updateDone); // Toggle updateDone to trigger reload
        } catch (err) {
            console.error('Failed to edit option:', err);
        }
    };

    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={5}>  <Typography variant="h6" component="div" sx={{ mt: 4, mb: 2 }}>
                    Values for {option.name}
                </Typography>
                    <OptionValueForm onSubmit={handleOptionValueFormSubmit} /></Grid>
                <Grid item xs={7}> <OptionValueList optionValueList={optionValueList} onSubmit={handleEditFormSubmit} />
                </Grid>
            </Grid>


        </>
    );
}

OptionValueManage.propTypes = {
    optionList: PropTypes.object,
};

export default OptionValueManage;
