import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

AddressForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    initialData: PropTypes.object // Make initialData optional
};

function AddressForm({ onSubmit, initialData = {} }) { // Provide a default value for initialData
    const schema = yup.object().shape({
        street: yup.string().required('Please enter the street'),
        city: yup.string().required('Please enter the city'),
        district: yup.string().required('Please enter the district'),
        ward: yup.string().required('Please enter the ward'),
        defaultAddress: yup.boolean() // Define validation for the default address field
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
        console.log(value)
        onSubmit(value);
    };

    return (
        <>
            <h1>Address Form</h1>
            <form onSubmit={handleSubmit(onSubmitHandler)}>
                <br />
                <label htmlFor="street">Street:</label>
                <input {...register("street")} id="street" type="text" placeholder="Street" />
                <p>{errors.street?.message}</p>
                <br />
                <label htmlFor="city">City:</label>
                <input {...register("city")} id="city" type="text" placeholder="City" />
                <p>{errors.city?.message}</p>
                <br />
                <label htmlFor="district">District:</label> {/* Correct capitalization */}
                <input {...register("district")} id="district" type="text" placeholder="District" />
                <p>{errors.district?.message}</p>
                <br />
                <label htmlFor="ward">Ward:</label> {/* Correct capitalization */}
                <input {...register("ward")} id="ward" type="text" placeholder="Ward" />
                <p>{errors.ward?.message}</p>
                <br />
                <label htmlFor="defaultAddress">Default Address:</label>
                <input type="checkbox" id="defaultAddress" {...register("defaultAddress")} />
                <br />
                <button type="submit">Submit</button>
            </form>
        </>
    );
}

export default AddressForm;
