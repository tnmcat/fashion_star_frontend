import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, InputLabel, TextField, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from "yup";
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { v4 } from "uuid";
import { firebaseStorage } from '../../../firebase';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
StoreRegisterForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    defaultValues: PropTypes.object
};

function StoreRegisterForm({ onSubmit, defaultValues = {} }) { // Provide a default value for initialData
    const schema = yup.object().shape({
        name: yup.string()
            .required('Please enter store name')
            .matches(/^[a-zA-Z0-9\s]+$/, 'Store name must contain only letters and numbers')
            .min(3, 'Store name must be at least 3 characters')
            .max(30, 'Store name must be at most 30 characters'),
        description: yup.string().required('Please enter the store description'),
        file: yup.mixed().required('Please upload an image'),
        // Add more validation rules as needed
    });

    const { register, handleSubmit, formState: { errors }, setValue } = useForm({
        resolver: yupResolver(schema),
    });
    const [firebaseFile, setFirebaseFile] = useState('');
    const [progresspercent, setProgresspercent] = useState(0);

    const onSubmitHandler = (data) => {
        const formDataWithFile = { ...data, logo: firebaseFile };

        console.log(formDataWithFile);
        onSubmit(formDataWithFile);
    };
    const handleFile = (e) => {
        const file = e.target.files[0];
        if (file) {
            const storageRef = ref(firebaseStorage, `files/${file.name} + ${v4()}`);
            const uploadTask = uploadBytesResumable(storageRef, file);

            uploadTask.on("state_changed",
                (snapshot) => {
                    const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                    setProgresspercent(progress);
                },
                (error) => {
                    alert(error);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        setFirebaseFile(downloadURL);
                    });
                }
            );
        }
    }

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const [formData, setFormData] = useState(null);

    return (
        <>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <form onSubmit={handleSubmit(onSubmitHandler)}>
                    <br />
                    <InputLabel >Store Name</InputLabel>
                    <TextField
                        {...register("name")}
                        defaultValue={defaultValues?.store.name || ""} // Set default value here
                        fullWidth
                        variant="standard"
                        id="standard-basic"
                        label=""
                        name="name"
                        error={!!errors.name}
                        helperText={errors.name?.message}
                        sx={{ marginBottom: '10px', paddingRight: '20px' }} // Điều chỉnh margin và padding ở đây
                    />

                    <TextField
                        defaultValue={defaultValues?.store.description || ""}
                        id="outlined-multiline-flexible"
                        label="Store Description"
                        multiline
                        rows={4}
                        placeholder="Input your description to introduce your store"
                        fullWidth
                        {...register("description")}
                        error={!!errors.description}
                        helperText={errors.description?.message}
                        sx={{ marginBottom: '10px', paddingRight: '20px' }} // Điều chỉnh margin và padding ở đây
                    />
                    <InputLabel >Pickup address:   <Button onClick={handleClickOpen}>
                        <EditIcon />
                    </Button></InputLabel>
                    {formData && (
                        <Typography>
                            {formData.pickup_city && `${formData.pickup_city} city, `}
                            {formData.pickup_district && `${formData.pickup_district} district, `}
                            {formData.pickup_ward && `${formData.pickup_ward} ward, `}
                            {formData.pickup_street && `${formData.pickup_street} street`}
                        </Typography>
                    )}
                    {defaultValues.store && (
                        <Typography>
                            {defaultValues?.store?.pickup_city && `${defaultValues?.store?.pickup_city} city, `}
                            {defaultValues?.store?.pickup_district && `${defaultValues?.store?.pickup_district} district, `}
                            {defaultValues?.store?.pickup_ward && `${defaultValues?.store?.pickup_ward} ward, `}
                            {defaultValues?.store?.pickup_street && `${defaultValues?.store?.pickup_street} street`}
                        </Typography>
                    )}


                    <Box className='text-titleFont mt-5 mb-5'>
                        <InputLabel >Store Logo</InputLabel>
                        <input  {...register("file")} type="file" name="file" {...register("file")} onChange={handleFile} />
                        <small className='text-red-700 text-titleFont'>
                            {errors?.file && errors.file.message}
                        </small>
                        {firebaseFile && (
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <img alt='logo_image' src={firebaseFile} className="rounded-3xl w-30 h-30 mt-10" />
                            </div>
                        )}
                        {!firebaseFile && defaultValues?.store?.logo && (
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <img alt='logo_image' src={defaultValues.store.logo} className="rounded-3xl w-30 h-30 mt-10" />
                            </div>
                        )}

                    </Box>

                    <Button type="submit" variant="contained" size="small">
                        Save
                    </Button>
                </form>
            </Box>


            <Dialog
                open={open}
                onClose={handleClose}
                PaperProps={{
                    component: 'form',
                    onSubmit: (event) => {
                        event.preventDefault();
                        const formData = new FormData(event.currentTarget);
                        const formJson = Object.fromEntries(formData.entries());
                        console.log(formJson);
                        setFormData(formJson);
                        handleClose();
                    },
                }}
            >
                <DialogTitle>Pickup Address </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Pickup address will be used for pickup and will be showed on shipping labels.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="pickup_city"
                        name="pickup_city"
                        {...register("pickup_city")}
                        defaultValue={defaultValues?.store.pickup_city || ""}
                        label="City"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        autoFocus
                        {...register("pickup_district")}
                        defaultValue={defaultValues?.store.pickup_district || ""}
                        required
                        margin="dense"
                        id="pickup_district"
                        name="pickup_district"
                        label="District"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        autoFocus
                        required
                        {...register("pickup_ward")}
                        defaultValue={defaultValues?.store.pickup_ward || ""}
                        margin="dense"
                        id="pickup_ward"
                        name="pickup_ward"
                        label="Ward"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        autoFocus
                        required
                        {...register("pickup_street")}
                        defaultValue={defaultValues?.store.pickup_street || ""}
                        margin="dense"
                        id="pickup_street"
                        name="pickup_street"
                        label="Street"
                        fullWidth
                        variant="standard"
                    />

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button type="submit">Save</Button>
                </DialogActions>
            </Dialog>

        </>
    );
}

export default StoreRegisterForm;
