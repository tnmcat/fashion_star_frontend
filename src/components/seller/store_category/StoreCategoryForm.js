import { yupResolver } from "@hookform/resolvers/yup";
import { Button, DialogActions, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from "yup";

StoreCategoryForm.propTypes = {
    onSubmit: PropTypes.func,
    categoryList: PropTypes.array
};

function StoreCategoryForm(props) {
    const { categoryList } = props;
    const schema = yup.object().shape({
        name: yup.string().required('Please enter store name'),
        category_id: yup.string().required('Please select a category'),
    });
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(schema),
    });
    const onSubmitHandler = (value) => {
        const { onSubmit } = props;
        if (onSubmit) {
            onSubmit(value);
        }
    };
    const [openModal, setOpenModal] = useState(false);

    const handleOpenModal = () => {
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };
    return (
        <>
            <form onSubmit={handleSubmit(onSubmitHandler)}>
                <TextField autoFocus fullWidth label="Store category name"
                    variant="standard" margin="dense" {...register("name")} type="text" />
                <p>{errors.name?.message}</p>
                <br />
                {categoryList && categoryList.length ? (
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Main Category</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="Main Category"
                            {...register("category_id")}
                            defaultValue="" // Set default value as empty string
                        >
                            {categoryList.map((item) => (
                                <MenuItem key={item.id} value={item.id}>
                                    {item.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                ) : (
                    <p>No store category found.</p>
                )}

                <p>{errors.category_id?.message}</p>
                <DialogActions>
                    <Button type="submit" autoFocus color="primary">Submit</Button>
                </DialogActions>
            </form>
        </>
    );
}

export default StoreCategoryForm;
