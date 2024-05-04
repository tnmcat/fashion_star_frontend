import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Grid, TextField, Typography } from "@mui/material";
import PropTypes from 'prop-types';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from "yup";

AttributeForm.propTypes = {
    onSubmit: PropTypes.func,
};

function AttributeForm(props) {
    const schema = yup.object().shape({
        name: yup.string().required('Please enter Attribute name'),
        value: yup.string().required('Please enter Attribute value'), // Adding validation for AttributeValue
        // Add more validation rules as needed
    });

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmitHandler = (value) => {
        console.log('form submitted', value);
        const { onSubmit } = props;
        if (onSubmit) {
            onSubmit(value);
        }
    };

    return (
        <>
            <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
                New Attribute
            </Typography>
            <form onSubmit={handleSubmit(onSubmitHandler)}>
                <Grid container
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center">
                    <Grid item>
                        <TextField {...register("name")} id="standard-basic" label="Attribute name" variant="standard" />
                        <p>{errors.name?.message}</p>
                    </Grid>
                    <Grid item>
                        <TextField {...register("value")} id="standard-basic" label="Attribute value" variant="standard" />
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

export default AttributeForm;
