import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, FormControl, FormControlLabel, FormLabel, InputLabel, Radio, RadioGroup, TextField } from '@mui/material';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { v4 } from "uuid";
import * as yup from "yup";
import { firebaseStorage } from '../../../firebase';
IdentityForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    defaultValues: PropTypes.object
};

function IdentityForm({ onSubmit, defaultValues = {} }) { // Provide a default value for initialData
    const schema = yup.object().shape({
        identity_num: yup.string()
            .required('Please enter Identity Card/Passport Number')
            .matches(/^[a-zA-Z0-9\s]+$/, 'Identity Card/Passport Number must contain only letters and numbers')
            .min(10, 'Identity Card/Passport Number must be at least 10 characters')
            .max(30, 'Identity Card/Passport Number must be at most 30 characters'),
        identity_image_1: yup.mixed().required('Please upload an image'),
        identity_image_2: yup.mixed().required('Please upload an image'),
        // Add more validation rules as needed
    });

    const { register, handleSubmit, formState: { errors }, setValue } = useForm({
        resolver: yupResolver(schema),
    });
    const [firebaseFile1, setFirebaseFile1] = useState('');
    const [firebaseFile2, setFirebaseFile2] = useState('');
    const [progresspercent1, setProgresspercent1] = useState(0);
    const [progresspercent2, setProgresspercent2] = useState(0);

    const onSubmitHandler = (data) => {
        const formDataWithFile = { ...data, identity_type: identityTypeValue, identity_image_1: firebaseFile1, identity_image_2: firebaseFile1 };
        console.log(formDataWithFile);
        onSubmit(formDataWithFile);
    };
    const handleFile1 = (e) => {
        const file = e.target.files[0];
        if (file) {
            const storageRef = ref(firebaseStorage, `files/${file.name} + ${v4()}`);
            const uploadTask = uploadBytesResumable(storageRef, file);

            uploadTask.on("state_changed",
                (snapshot) => {
                    const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                    setProgresspercent1(progress);
                },
                (error) => {
                    alert(error);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        setFirebaseFile1(downloadURL);
                    });
                }
            );
        }
    }
    const handleFile2 = (e) => {
        const file = e.target.files[0];
        if (file) {
            const storageRef = ref(firebaseStorage, `files/${file.name} + ${v4()}`);
            const uploadTask = uploadBytesResumable(storageRef, file);

            uploadTask.on("state_changed",
                (snapshot) => {
                    const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                    setProgresspercent2(progress);
                },
                (error) => {
                    alert(error);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        setFirebaseFile2(downloadURL);
                    });
                }
            );
        }
    }
    const [identityTypeValue, setIdentityTypeValue] = useState('cccd');

    const handleChange = (event) => {
        setIdentityTypeValue(event.target.value);
    };

    return (
        <>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <form onSubmit={handleSubmit(onSubmitHandler)}>
                    <FormControl>
                        <FormLabel id="demo-controlled-radio-buttons-group">Identity Type</FormLabel>
                        <RadioGroup
                            aria-labelledby="demo-controlled-radio-buttons-group"
                            name="controlled-radio-buttons-group"
                            value={identityTypeValue}
                            onChange={handleChange}

                        >
                            <FormControlLabel value="cccd" control={<Radio />} label="Identify Card" />
                            <FormControlLabel value="passport" control={<Radio />} label="Passport" />
                        </RadioGroup>
                    </FormControl>
                    <InputLabel >Identity Card/Passport Number</InputLabel>
                    <TextField
                        {...register("identity_num")}
                        defaultValue={defaultValues?.identity.identity_num || ""}
                        fullWidth
                        variant="standard"
                        id="standard-basic"
                        label=""
                        name="identity_num"
                        error={!!errors.identity_num}
                        helperText={errors.identity_num?.message}
                        sx={{ marginBottom: '10px', paddingRight: '20px' }} // Điều chỉnh margin và padding ở đây
                    />

                    <Box className='text-titleFont mt-5 mb-5'>
                        <InputLabel >Identify Card/Passport Image</InputLabel>
                        <input  {...register("file")} type="file" name="identity_image_1" {...register("identity_image_1")} onChange={handleFile1} />
                        <small className='text-red-700 text-titleFont'>
                            {errors?.file && errors.identity_image_1.message}
                        </small>
                        {firebaseFile1 && <div style={{ display: 'flex', alignItems: 'center' }}>
                            <img alt='product_image' src={firebaseFile1} className="rounded-3xl w-30 h-30 mt-10" />
                        </div>}
                        {!firebaseFile1 && <div className='outerbar'><div className='innerbar text-titleFont'>{progresspercent1}%</div></div>}
                    </Box>
                    <Box className='text-titleFont mt-5 mb-5'>
                        <InputLabel >Photo holding ID card/citizen identity card/passport:</InputLabel>
                        <input  {...register("file")} type="file" name="identity_image_2" {...register("identity_image_2")} onChange={handleFile2} />
                        <small className='text-red-700 text-titleFont'>
                            {errors?.file && errors.identity_image_2.message}
                        </small>
                        {firebaseFile2 && <div style={{ display: 'flex', alignItems: 'center' }}>
                            <img alt='product_image' src={firebaseFile2} className="rounded-3xl w-30 h-30 mt-10" />
                        </div>}
                        {!firebaseFile2 && <div className='outerbar'><div className='innerbar text-titleFont'>{progresspercent2}%</div></div>}
                    </Box>
                    <Button type="submit" variant="contained" size="small">
                        Save
                    </Button>
                </form>
            </Box>

        </>
    );
}

export default IdentityForm;
