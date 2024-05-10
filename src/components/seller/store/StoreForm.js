import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, TextField } from '@mui/material';

StoreForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    initialData: PropTypes.object // Make initialData optional
};

function StoreForm({ onSubmit, initialData = {} }) { // Provide a default value for initialData
    const schema = yup.object().shape({
        name: yup.string().required('Please enter the store name'),
        description: yup.string().required('Please enter the store description'),
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
        console.log(value);
        onSubmit(value);
    };

    return (
        <>
            <h1>Edit store</h1>
            <form onSubmit={handleSubmit(onSubmitHandler)}>
                <br />
                <TextField required
                    id="filled-required"
                    helperText="Store name must be not changed in 60 day next"
                    defaultValue="Hello World"
                    variant="filled"
                    fullWidth {...register("name")} label="Store Name" />
                <p>{errors.name?.message}</p>
                <br />
                <TextField
                    id="filled-multiline-static"
                    label="Store Description"
                    multiline
                    rows={4}
                    defaultValue=" "
                    variant="filled"
                    placeholder="Input your description to introduce your store"
                    fullWidth {...register("description")} />
                <p>{errors.description?.message}</p>
                <br />
                <Button type="submit" variant="contained" size="small">
                    Save
                </Button>
            </form>
        </>
    );
}

export default StoreForm;
