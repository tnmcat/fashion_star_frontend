
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

VariantForm.propTypes = {
    onSubmit: PropTypes.func,
    productOptions: PropTypes.array,
    editingVariant: PropTypes.object
};

function VariantForm(props) {
    const { onSubmit, productOptions, editingVariant } = props;

    const schema = yup.object().shape({
        skuCode: yup.string().required('Please enter SKU code'),
        stockQuantity: yup.number().required('Please enter stock quantity').positive('Stock quantity must be a positive number').integer('Stock quantity must be an integer'),
        price: yup.number().required('Please enter price').positive('Price must be a positive number'),
        salePrice: yup.number().positive('Sale price must be a positive number'),
        isDeleted: yup.boolean().required('Please select the deleted status'),
    });

    const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    const [selectedOptionValues, setSelectedOptionValues] = useState({});

    useEffect(() => {
        if (editingVariant) {
            Object.entries(editingVariant).forEach(([key, value]) => {
                if (key !== 'optionValueDTOList') {
                    setValue(key, value || '');
                }
            });

            const updatedSelectedOptionValues = {};
            editingVariant.optionValueDTOList.forEach((optionValue) => {
                updatedSelectedOptionValues[optionValue.optionId] = optionValue.id;
            });
            setSelectedOptionValues(updatedSelectedOptionValues);
        } else {
            reset(); // Reset the form if editingVariant is null
            setSelectedOptionValues({});
        }
    }, [editingVariant, reset, setValue]);

    const handleOptionValueChange = (optionId, optionGroupId) => {
        setSelectedOptionValues(prevState => ({
            ...prevState,
            [optionGroupId]: optionId
        }));
    };

    const onSubmitHandler = (data) => {
        const formData = { ...data, optionValueIds: Object.values(selectedOptionValues) };
        if (typeof onSubmit === 'function') {
            onSubmit(formData);
            reset(); // Reset the form after submission
        }
    };

    const [open, setOpen] = useState(false);
    const handleClose = () => setOpen(false);
    return (
        <>
            <h1>Add new variant</h1>
            <form onSubmit={handleSubmit(onSubmitHandler)}>
                <br />
                <input {...register("skuCode")} placeholder="SKU code" type="text" />
                <p>{errors.skuCode?.message}</p>
                <br />
                <input {...register("stockQuantity")} placeholder="Stock quantity" type="number" />
                <p>{errors.stockQuantity?.message}</p>
                <br />
                <input {...register("price")} placeholder="Price" type="number" step="0.01" />
                <p>{errors.price?.message}</p>
                <br />
                <input {...register("salePrice")} placeholder="Sale price" type="number" step="0.01" />
                <p>{errors.salePrice?.message}</p>
                <br />
                <select {...register("isDeleted")}>
                    <option value="">Select deleted status</option>
                    <option value="true">True</option>
                    <option value="false">False</option>
                </select>
                <p>{errors.isDeleted?.message}</p>
                <br />

                <label>Option Values:</label>
                {productOptions.map((option) => (
                    <div key={option.id}>
                        <h3>{option.name}</h3>
                        {option.optionValueDTOList.map((optionValue) => (
                            <div key={optionValue.id}>
                                <input
                                    type="radio"
                                    id={optionValue.id}
                                    name={`optionValue_${option.id}`}
                                    value={optionValue.id}
                                    checked={selectedOptionValues[option.id] === optionValue.id}
                                    onChange={() => handleOptionValueChange(optionValue.id, option.id)}
                                />
                                <label htmlFor={optionValue.id}>{optionValue.value}</label>
                            </div>
                        ))}
                    </div>
                ))}

                <p>{errors.optionValueIds?.message}</p>
                <br />
                <br />
                <button type="submit">Submit</button>
            </form>
        </>
    );
}

export default VariantForm;
