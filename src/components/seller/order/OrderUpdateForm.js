import { yupResolver } from "@hookform/resolvers/yup";
import PropTypes from 'prop-types';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from "yup";

function OrderUpdateForm(props) {
    const schema = yup.object().shape({
        status: yup.string().required('Please select an order status'),
    });

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmitHandler = (value) => {
        console.log('Form submitted:', value);
        const { onSubmit } = props;
        if (onSubmit) {
            onSubmit(value);
        }
    };

    return (
        <>
            <h1>Update Order Status</h1>
            <form onSubmit={handleSubmit(onSubmitHandler)}>
                <br />
                <label htmlFor="status">Order Status:</label>
                <select {...register("status")} id="orderStatus">
                    <option value="PENDING">Pending</option>
                    <option value="ACCEPTED">Accepted</option>
                    <option value="SHIPPING">Shipping</option>
                    <option value="RECEIVED">Received</option>
                </select>
                <p>{errors.orderStatus?.message}</p>
                <br />
                <button type="submit">Update Status</button>
            </form>
        </>
    );
}

OrderUpdateForm.propTypes = {
    onSubmit: PropTypes.func,
};

export default OrderUpdateForm;
