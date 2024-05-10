import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Grid, TextField, Typography } from "@mui/material";
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from "yup";

AttributeDefaultForm.propTypes = {
    onSubmit: PropTypes.func,
    initialData: PropTypes.object
};

function AttributeDefaultForm({ onSubmit, initialData = {} }) {
    const schema = yup.object().shape({
        name: yup.string().required('Please enter Attribute name'),
        value: yup.string().required('Please enter Attribute value'), // Adding validation for AttributeValue
        // Add more validation rules as needed
    });


    const { register, handleSubmit, formState: { errors }, setValue } = useForm({
        resolver: yupResolver(schema),
        defaultValues: initialData
    });
    useEffect(() => {
        if (initialData) {
            for (const key in initialData) {
                setValue(key, initialData[key]);
            }
        }
    }, [initialData, setValue]);
    const onSubmitHandler = (value) => {
        console.log('form submitted', value);
        if (onSubmit) {
            onSubmit(value);
        }
    };

    return (
        <>
            <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">

            </Typography>
            <form onSubmit={handleSubmit(onSubmitHandler)}>
                <Grid container
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center">
                    <Grid item>
                        <TextField {...register("name")} id="standard-basic" label="Name" variant="standard" />
                        <p>{errors.name?.message}</p>
                    </Grid>
                    <Grid item>
                        <TextField {...register("value")} id="standard-basic" label="Value" variant="standard" />
                        <p>{errors.value?.message}</p>
                    </Grid>
                    <Grid item>
                        <Button type="submit" variant="contained" size="small">
                            Add
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </>
    );
}

export default AttributeDefaultForm;
