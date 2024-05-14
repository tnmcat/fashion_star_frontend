import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {
    Button,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField
} from '@mui/material';

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



    return (
        <>
            <h1>Add new variant</h1>
            <form onSubmit={handleSubmit(onSubmitHandler)}>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <TextField {...register("skuCode")} label="SKU code" variant="outlined" fullWidth />
                        <p>{errors.skuCode?.message}</p>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField {...register("stockQuantity")} label="Stock quantity" variant="outlined" fullWidth type="number" />
                        <p>{errors.stockQuantity?.message}</p>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField {...register("price")} label="Price" variant="outlined" fullWidth type="number" step="0.01" />
                        <p>{errors.price?.message}</p>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField {...register("salePrice")} label="Sale price" variant="outlined" fullWidth type="number" step="0.01" />
                        <p>{errors.salePrice?.message}</p>
                    </Grid>
                    <Grid item xs={6}>
                        <FormControl fullWidth>
                            <InputLabel id="isDeleted-label">Deleted status</InputLabel>
                            <Select
                                {...register("isDeleted")}
                                labelId="isDeleted-label"
                                label="Deleted status"
                            >
                                <MenuItem value="">Select deleted status</MenuItem>
                                <MenuItem value="true">True</MenuItem>
                                <MenuItem value="false">False</MenuItem>
                            </Select>
                        </FormControl>
                        <p>{errors.isDeleted?.message}</p>
                    </Grid>
                </Grid>

                <TableContainer component={Paper}>
                    <Table aria-label="option values">
                        <TableHead>
                            <TableRow>
                                <TableCell>Option</TableCell>
                                <TableCell align="center">Value</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {productOptions.map((option) => (
                                <TableRow key={option.id}>
                                    <TableCell component="th" scope="row">
                                        {option.name}
                                    </TableCell>
                                    <TableCell align="center">
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
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                <p>{errors.optionValueIds?.message}</p>
                <br />
                <br />
                <Button type="submit" variant="contained" color="primary">Submit</Button>
            </form>
        </>
    );
}

export default VariantForm;
