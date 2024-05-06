import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

StoreForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    initialData: PropTypes.object // Make initialData optional
};

function StoreForm({ onSubmit, initialData = {} }) { // Provide a default value for initialData
    const schema = yup.object().shape({
        name: yup.string().required('Please enter the store name'),
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
            <h1>Store Form</h1>
            <form onSubmit={handleSubmit(onSubmitHandler)}>
                <br />
                <label htmlFor="name">Name:</label>
                <input {...register("name")} id="name" type="text" placeholder="Store name" />
                <p>{errors.name?.message}</p>
                <br />
                {/* Add more fields for store information */}
                <button type="submit">Submit</button>
            </form>
        </>
    );
}

export default StoreForm;
