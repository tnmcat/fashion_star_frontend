import { yupResolver } from "@hookform/resolvers/yup";
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from "yup";
import convertTimestampToDate from '../../../utils/common';
import { Button, Grid, TextField, Typography } from "@mui/material";

ProfileForm.propTypes = {
    onSubmit: PropTypes.func.isRequired, // Make onSubmit prop required
    initialData: PropTypes.object.isRequired // Make initialData prop required
};

function ProfileForm({ onSubmit, initialData }) {
    // Define validation schema using Yup
    const schema = yup.object().shape({
        sellerName: yup.string().required('Please enter your name'),
        phone: yup.string().required('Please enter your phone number'),
    });

    // Initialize react-hook-form with validation schema and default values
    const { register, handleSubmit, formState: { errors }, setValue } = useForm({
        resolver: yupResolver(schema),
        defaultValues: initialData
    });

    // Set form values from initialData when component mounts or initialData changes
    useEffect(() => {
        if (initialData) {
            for (const key in initialData) {
                setValue(key, initialData[key]); // Use setValue to set form values
            }
        }
    }, [initialData, setValue]);

    // Form submission handler
    const onSubmitHandler = (value) => {
        console.log('Form submitted:', value);
        onSubmit(value); // Call onSubmit prop with form data
    };
    console.log('date:', initialData?.birthDay);
    return (
        <>
            <h1 >
                Edit Profile
            </h1>
            <form onSubmit={handleSubmit(onSubmitHandler)}>
                <TextField fullWidth {...register("sellerName")} id="standard-basic" label="Seller Name" variant="standard" />
                <p>{errors.sellerName?.message}</p>
                <br />
                <TextField fullWidth {...register("phone")} id="standard-basic" label="Seller phone" variant="standard" />
                <p>{errors.phone?.message}</p>
                <br />
                <Button type="submit" variant="contained" size="small">
                    Save
                </Button>
            </form>
        </>
    );
}

export default ProfileForm;
