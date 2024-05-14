import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, FormControlLabel, FormLabel, IconButton, InputLabel, Radio, RadioGroup, TextField, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from "yup";
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { v4 } from "uuid";
import { firebaseStorage } from '../../../firebase';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
TaxRegisterForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    defaultValues: PropTypes.object
};

function TaxRegisterForm({ onSubmit, defaultValues = {} }) { // Provide a default value for initialData
    const schema = yup.object().shape({
        tax_num: yup.string().required('Please enter tax number'),

        // Add more validation rules as needed
    });
    const [businessType, setBusinessType] = useState('personal');
    const { register, handleSubmit, formState: { errors }, setValue } = useForm({
        resolver: yupResolver(schema),
    });
    const [firebaseFile, setFirebaseFile] = useState('');
    const [progresspercent, setProgresspercent] = useState(0);

    const [requiredImage, setRequiredImage] = useState(false);
    const onSubmitHandler = (data) => {
        // Create an object to hold the address data
        const addressData = {
            tax_city: formData?.tax_city || defaultValues?.tax?.tax_city || "",
            tax_district: formData?.tax_district || defaultValues?.tax?.tax_district || "",
            tax_ward: formData?.tax_ward || defaultValues?.tax?.tax_ward || "",
            tax_street: formData?.tax_street || defaultValues?.tax?.tax_street || ""
        };

        // Combine the address data with other form data
        const formDataWithAddress = {
            ...data,
            ...addressData
        };

        console.log(firebaseFile);
        if (businessType === 'company' && !firebaseFile) {
            setRequiredImage(true);
            return;
        }

        const formDataWithFile = { ...formDataWithAddress, type: businessType === 'personal' ? false : true, certificate_image: firebaseFile };
        console.log(formDataWithFile);
        setFirebaseFile('');
        setProgresspercent(0)
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

    const handleCompanyTypeChange = (event) => {
        setBusinessType(event.target.value);
        setRequiredImage(false);
    };

    return (
        <>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <form onSubmit={handleSubmit(onSubmitHandler)}>
                    <br />
                    <FormControl>
                        <FormLabel id="demo-radio-buttons-group-label">Business Type</FormLabel>
                        <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            defaultValue="personal"
                            name="radio-buttons-group"
                            value={businessType}
                            onChange={handleCompanyTypeChange}
                        >
                            <FormControlLabel value="personal" control={<Radio />} label="Personal" />
                            <FormControlLabel value="company" control={<Radio />} label="Company" />

                        </RadioGroup>
                    </FormControl>

                    <InputLabel >Business registration address:   <Button onClick={handleClickOpen}>
                        <EditIcon />
                    </Button>
                    </InputLabel>

                    {formData && (
                        <Typography>
                            {formData.tax_city && `${formData.tax_city} city, `}
                            {formData.tax_district && `${formData.tax_district} district, `}
                            {formData.tax_ward && `${formData.tax_ward} ward, `}
                            {formData.tax_street && `${formData.tax_street} street`}
                        </Typography>
                    )}
                    <InputLabel >Tax Number</InputLabel>
                    <TextField
                        {...register("tax_num")}
                        defaultValue={defaultValues?.tax.tax_num || ""}
                        fullWidth
                        variant="standard"
                        id="standard-basic"
                        label=""
                        error={!!errors.tax_num}
                        helperText={errors.tax_num?.message}
                        sx={{ marginBottom: '10px', paddingRight: '20px' }} // Điều chỉnh margin và padding ở đây
                    />

                    {businessType === 'company' && ( // Render upload image section if company type is selected
                        <Box className='text-titleFont mt-5 mb-5'>
                            <InputLabel >Business registration certificate:</InputLabel>
                            <input {...register("file")} type="file" name="file" onChange={handleFile} />

                            {firebaseFile && <div style={{ display: 'flex', alignItems: 'center' }}>
                                <img alt='product_image' src={firebaseFile} className="rounded-3xl w-30 h-30 mt-10" />
                            </div>}
                            {requiredImage && <Typography color="error">Please upload image</Typography>}
                            {!firebaseFile && <div className='outerbar'><div className='innerbar text-titleFont'>{progresspercent}%</div></div>}
                        </Box>
                    )}



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
                <DialogTitle>Business registration address</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Business registration address will be used to print in electronic invoice.
                    </DialogContentText>
                    <TextField
                        defaultValue={defaultValues?.tax.tax_city || ""}
                        autoFocus
                        required
                        margin="dense"
                        id="city"
                        name="tax_city"
                        label="City"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        autoFocus
                        defaultValue={defaultValues?.tax.tax_district || ""}
                        required
                        margin="dense"
                        id="district"
                        name="tax_district"
                        label="District"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        autoFocus
                        defaultValue={defaultValues?.tax.tax_ward || ""}
                        required
                        margin="dense"
                        id="ward"
                        name="tax_ward"
                        label="Ward"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        autoFocus
                        defaultValue={defaultValues?.tax.tax_street || ""}
                        required
                        margin="dense"
                        id="street"
                        name="tax_street"
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

export default TaxRegisterForm;
