import { yupResolver } from "@hookform/resolvers/yup";
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from "yup";
import convertTimestampToDate from '../../../utils/common';

ProfileForm.propTypes = {
    onSubmit: PropTypes.func.isRequired, // Make onSubmit prop required
    initialData: PropTypes.object.isRequired // Make initialData prop required
};

function ProfileForm({ onSubmit, initialData }) {
    // Define validation schema using Yup
    const schema = yup.object().shape({
        sellerName: yup.string().required('Please enter your name'),
        phone: yup.string().required('Please enter your phone number'),
        birthDay: yup.date().required('Please enter your birth day').nullable(),
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
            <h1>Edit Profile</h1>
            <form onSubmit={handleSubmit(onSubmitHandler)}>
                <br />
                <label htmlFor="sellerName">Name:</label>
                <input {...register("sellerName")} id="sellerName" type="text" placeholder="Your name" />
                <p>{errors.sellerName?.message}</p>
                <br />
                <label htmlFor="phone">Phone:</label>
                <input {...register("phone")} id="phone" type="text" placeholder="Your phone number" />
                <p>{errors.phone?.message}</p>
                <br />
                <label htmlFor="birthDay">Birth Day:</label>
                <input {...register("birthDay")} id="birthDay" min="1900-01-01" type="date" defaultValue={convertTimestampToDate(initialData?.birthDay)} />
                <p>{errors.birthDay?.message}</p>
                <br />
                <button type="submit">Submit</button>
            </form>
        </>
    );
}

export default ProfileForm;
